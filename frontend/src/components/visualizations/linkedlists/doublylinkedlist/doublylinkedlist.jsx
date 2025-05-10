import React, { useState } from "react";
import LinkedListControls from "../LinkedListControls";
import LinkedListDisplay from "../LinkedListDisplay";

const OP_NONE = null;
const OP_INSERT_FRONT = "insertFront";
const OP_INSERT_BACK = "insertBack";
const OP_DELETE_FRONT = "deleteFront";
const OP_DELETE_BACK = "deleteBack";
const OP_REVERSE = "reverse";

function getSteps(list, op, value) {
  let steps = [];
  switch (op) {
    case OP_INSERT_FRONT:
      steps.push({ list: [value, ...list], highlight: [value] });
      break;
    case OP_INSERT_BACK: {
      let highlight = [];
      for (let i = 0; i < list.length; i++) {
        highlight = [list[i]];
        steps.push({ list: [...list], highlight });
      }
      steps.push({ list: [...list, value], highlight: [value] });
      break;
    }
    case OP_DELETE_FRONT:
      if (list.length > 0) {
        steps.push({ list: [...list], highlight: [list[0]] });
        steps.push({ list: list.slice(1), highlight: [] });
      }
      break;
    case OP_DELETE_BACK:
      if (list.length > 0) {
        for (let i = 0; i < list.length; i++) {
          steps.push({ list: [...list], highlight: [list[i]] });
        }
        steps.push({ list: list.slice(0, -1), highlight: [] });
      }
      break;
    case OP_REVERSE: {
      let arr = [...list];
      for (let i = 0; i < Math.floor(arr.length / 2); i++) {
        let highlight = [arr[i], arr[arr.length - 1 - i]];
        steps.push({ list: [...arr], highlight });
        [arr[i], arr[arr.length - 1 - i]] = [arr[arr.length - 1 - i], arr[i]];
        steps.push({ list: [...arr], highlight });
      }
      break;
    }
    default:
      break;
  }
  return steps;
}

const DoublyLinkedListVisualizer = () => {
  const [list, setList] = useState([]);
  const [stepMode, setStepMode] = useState(false);
  const [steps, setSteps] = useState([]);
  const [stepIdx, setStepIdx] = useState(0);
  const [currentOp, setCurrentOp] = useState(OP_NONE);
  const [pendingValue, setPendingValue] = useState("");

  const startStep = (op, value = null) => {
    setCurrentOp(op);
    setStepMode(true);
    setSteps(getSteps(list, op, value));
    setStepIdx(0);
    setPendingValue(value);
  };

  const handleInsertFront = (value) => startStep(OP_INSERT_FRONT, value);
  const handleInsertBack = (value) => startStep(OP_INSERT_BACK, value);
  const handleDeleteFront = () => startStep(OP_DELETE_FRONT);
  const handleDeleteBack = () => startStep(OP_DELETE_BACK);
  const handleReverse = () => startStep(OP_REVERSE);

  const handleNext = () => {
    if (stepIdx < steps.length - 1) {
      setStepIdx(stepIdx + 1);
    } else {
      setList(steps[steps.length - 1].list);
      setStepMode(false);
      setSteps([]);
      setStepIdx(0);
      setCurrentOp(OP_NONE);
      setPendingValue("");
    }
  };
  const handlePrev = () => {
    if (stepIdx > 0) setStepIdx(stepIdx - 1);
  };
  const isAnimating = stepMode;

  return (
    <div style={{ padding: "2rem", backgroundColor: "#0f172a", minHeight: "100vh" }}>
      <h2 style={{ color: "#f8fafc", fontSize: "2rem", marginBottom: "1rem" }}>
        Doubly Linked List
      </h2>

      <LinkedListControls
        onInsertFront={handleInsertFront}
        onInsertBack={handleInsertBack}
        onDeleteFront={handleDeleteFront}
        onDeleteBack={handleDeleteBack}
        onReverse={handleReverse}
        isAnimating={isAnimating}
        isEmpty={list.length === 0}
      />

      <div style={{ display: 'flex', gap: 16, margin: '1rem 0' }}>
        {stepMode && (
          <>
            <button onClick={handlePrev} disabled={stepIdx === 0} className="insert-button">Previous</button>
            <button onClick={handleNext} className="insert-button">Next</button>
            <span style={{ color: '#e879f9', fontWeight: 500, fontSize: 18 }}>
              Step {stepIdx + 1} / {steps.length}
            </span>
          </>
        )}
      </div>

      <LinkedListDisplay
        list={stepMode ? steps[stepIdx].list : list}
        highlightedNodes={stepMode ? steps[stepIdx].highlight : []}
        isDoubly={true}
      />
    </div>
  );
};

export default DoublyLinkedListVisualizer;
