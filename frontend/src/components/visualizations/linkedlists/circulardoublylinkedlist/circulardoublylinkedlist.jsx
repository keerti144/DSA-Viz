import React, { useState } from "react";
import LinkedListControls from "../LinkedListControls";
import LinkedListDisplay from "../LinkedListDisplay";
import AlgoSidebar from '../../AlgoSidebar';
import '../../linkedlists/LinkedListControls.css';

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

const sidebarData = {
  title: 'Circular Doubly Linked List',
  algorithm: `Insert at Front: O(1)\nInsert at Back: O(1)\nDelete at Front: O(1)\nDelete at Back: O(1)\nReverse: O(n)`,
  code: `class Node {\n  constructor(val) {\n    this.val = val;\n    this.next = null;\n    this.prev = null;\n  }\n}\n// ...`,
  explanation: 'A circular doubly linked list allows traversal in both directions and connects the last node back to the first.'
};

const CircularDoublyLinkedListVisualizer = () => {
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
    <div className="base-vis-layout">
      <div className="base-vis-main" style={{ paddingTop: '0.5rem' }}>
        <div className="base-vis-header" style={{ marginBottom: '1.2rem' }}></div>
        <div className="base-vis-controls">
          <LinkedListControls
            onInsertFront={handleInsertFront}
            onInsertBack={handleInsertBack}
            onDeleteFront={handleDeleteFront}
            onDeleteBack={handleDeleteBack}
            onReverse={handleReverse}
            isAnimating={isAnimating}
            isEmpty={list.length === 0}
          />
        </div>
        <div className="base-vis-step-controls">
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
        <div style={{ marginTop: 24 }}>
          <LinkedListDisplay
            list={stepMode ? steps[stepIdx].list : list}
            highlightedNodes={stepMode ? steps[stepIdx].highlight : []}
            isDoubly={true}
            isCircular={true}
          />
        </div>
      </div>
      <div className="base-vis-sidebar">
        <AlgoSidebar
          algorithm={sidebarData.algorithm}
          code={sidebarData.code}
          explanation={sidebarData.explanation}
        />
      </div>
    </div>
  );
};

export default CircularDoublyLinkedListVisualizer;
