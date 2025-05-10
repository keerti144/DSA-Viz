import React, { useState } from "react";
import AlgoSidebar from "../AlgoSidebar";
import "./StackVisualizer.css";

const stackPseudo = `
Push(x):
  top = top + 1
  stack[top] = x
Pop():
  if top == -1: error
  x = stack[top]
  top = top - 1
  return x
`;

const stackCode = `
class Stack {
  constructor() { this.items = []; }
  push(x) { this.items.push(x); }
  pop() { return this.items.pop(); }
  top() { return this.items[this.items.length-1]; }
}
`;

const stackExplanation = `
A stack is a LIFO (Last-In, First-Out) data structure. Push adds to the top, Pop removes from the top. Only the top element is accessible at any time.`;

function generateStackSteps(actions) {
    const steps = [];
    let stack = [];
    for (const act of actions) {
        if (act.type === "push") {
            stack = [...stack, act.value];
            steps.push({ stack: [...stack], highlight: stack.length - 1, action: `Push ${act.value}` });
        } else if (act.type === "pop" && stack.length > 0) {
            steps.push({ stack: [...stack], highlight: stack.length - 1, action: `Pop ${stack[stack.length - 1]}` });
            stack = stack.slice(0, -1);
            steps.push({ stack: [...stack], highlight: null, action: `After Pop` });
        }
    }
    return steps;
}

export default function StackVisualizer() {
    const [input, setInput] = useState("");
    const [actions, setActions] = useState([]);
    const [steps, setSteps] = useState([]);
    const [stepIdx, setStepIdx] = useState(0);

    const handlePush = () => {
        if (input !== "" && !isNaN(Number(input))) {
            setActions([...actions, { type: "push", value: Number(input) }]);
            setInput("");
        }
    };
    const handlePop = () => {
        setActions([...actions, { type: "pop" }]);
    };
    const handleStart = () => {
        setSteps(generateStackSteps(actions));
        setStepIdx(0);
    };
    const handleNext = () => setStepIdx((idx) => Math.min(idx + 1, steps.length - 1));
    const handlePrev = () => setStepIdx((idx) => Math.max(idx - 1, 0));
    const handleReset = () => {
        setActions([]);
        setSteps([]);
        setStepIdx(0);
        setInput("");
    };
    const handleRestart = () => setStepIdx(0);

    const current = steps[stepIdx] || { stack: [], highlight: null, action: "" };

    return (
        <div className="stack-visualizer-layout">
            <div className="stack-visualizer-main">
                <div className="input-row">
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Enter value"
                        onKeyDown={e => e.key === "Enter" && handlePush()}
                    />
                    <button onClick={handlePush}>Push</button>
                    <button onClick={handlePop} disabled={actions.filter(a => a.type === 'push').length === 0}>Pop</button>
                    <button onClick={handleStart} disabled={actions.length === 0}>Start</button>
                    <button onClick={handleReset}>Reset</button>
                </div>
                <div className="stack-box">
                    {current.stack.map((val, idx) => (
                        <div
                            key={idx}
                            className={`stack-node${current.highlight === idx ? " highlight" : ""}`}
                        >
                            {val}
                            {idx === current.stack.length - 1 && <div className="stack-top">Top</div>}
                        </div>
                    ))}
                </div>
                <div className="controls">
                    <button onClick={handlePrev} disabled={stepIdx === 0}>Previous</button>
                    <button onClick={handleNext} disabled={stepIdx === steps.length - 1}>Next</button>
                    <button onClick={handleRestart} disabled={steps.length === 0}>Restart</button>
                </div>
                <div className="explanation">{current.action}</div>
            </div>
            <AlgoSidebar
                algorithm={stackPseudo}
                code={stackCode}
                explanation={stackExplanation}
            />
        </div>
    );
} 