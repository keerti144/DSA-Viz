import React, { useState } from "react";
import AlgoSidebar from "../AlgoSidebar";
import "./QueueVisualizer.css";

const queuePseudo = `
Enqueue(x):
  rear = rear + 1
  queue[rear] = x
Dequeue():
  if front > rear: error
  x = queue[front]
  front = front + 1
  return x
`;

const queueCode = `
class Queue {
  constructor() { this.items = []; }
  enqueue(x) { this.items.push(x); }
  dequeue() { return this.items.shift(); }
  front() { return this.items[0]; }
}
`;

const queueExplanation = `
A queue is a FIFO (First-In, First-Out) data structure. Enqueue adds to the rear, Dequeue removes from the front. Both ends are clearly marked.`;

function generateQueueSteps(actions) {
    const steps = [];
    let queue = [];
    for (const act of actions) {
        if (act.type === "enqueue") {
            queue = [...queue, act.value];
            steps.push({ queue: [...queue], highlight: queue.length - 1, action: `Enqueue ${act.value}` });
        } else if (act.type === "dequeue" && queue.length > 0) {
            steps.push({ queue: [...queue], highlight: 0, action: `Dequeue ${queue[0]}` });
            queue = queue.slice(1);
            steps.push({ queue: [...queue], highlight: null, action: `After Dequeue` });
        }
    }
    return steps;
}

export default function QueueVisualizer() {
    const [input, setInput] = useState("");
    const [actions, setActions] = useState([]);
    const [steps, setSteps] = useState([]);
    const [stepIdx, setStepIdx] = useState(0);

    const handleEnqueue = () => {
        if (input !== "" && !isNaN(Number(input))) {
            setActions([...actions, { type: "enqueue", value: Number(input) }]);
            setInput("");
        }
    };
    const handleDequeue = () => {
        setActions([...actions, { type: "dequeue" }]);
    };
    const handleStart = () => {
        setSteps(generateQueueSteps(actions));
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

    const current = steps[stepIdx] || { queue: [], highlight: null, action: "" };

    return (
        <div className="queue-visualizer-layout">
            <div className="queue-visualizer-main">
                <div className="input-row">
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Enter value"
                        onKeyDown={e => e.key === "Enter" && handleEnqueue()}
                    />
                    <button onClick={handleEnqueue}>Enqueue</button>
                    <button onClick={handleDequeue} disabled={actions.filter(a => a.type === 'enqueue').length === 0}>Dequeue</button>
                    <button onClick={handleStart} disabled={actions.length === 0}>Start</button>
                    <button onClick={handleReset}>Reset</button>
                </div>
                <div className="queue-box">
                    {current.queue.map((val, idx) => (
                        <div
                            key={idx}
                            className={`queue-node${current.highlight === idx ? " highlight" : ""}`}
                        >
                            {val}
                            {idx === 0 && <div className="queue-front">Front</div>}
                            {idx === current.queue.length - 1 && <div className="queue-rear">Rear</div>}
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
                algorithm={queuePseudo}
                code={queueCode}
                explanation={queueExplanation}
            />
        </div>
    );
} 