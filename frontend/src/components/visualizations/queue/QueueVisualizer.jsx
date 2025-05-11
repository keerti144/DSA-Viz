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

function getRandomQueue(size = 6) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
}

function getStepExplanation(type, value) {
    switch (type) {
        case "enqueue":
            return `Enqueued ${value} to the queue.`;
        case "dequeue":
            return `Dequeued ${value} from the queue.`;
        case "start":
            return "Ready to start queue operations.";
        default:
            return "";
    }
}

export default function QueueVisualizer() {
    const [input, setInput] = useState("");
    const [actions, setActions] = useState([]);
    const [steps, setSteps] = useState([]);
    const [stepIdx, setStepIdx] = useState(0);
    const [queue, setQueue] = useState([]);
    const [started, setStarted] = useState(false);

    const handleEnqueue = () => {
        if (input !== "" && !isNaN(Number(input)) && !started) {
            setActions([...actions, { type: "enqueue", value: Number(input) }]);
            setInput("");
        }
    };
    const handleDequeue = () => {
        if (!started) setActions([...actions, { type: "dequeue" }]);
    };
    const handleStart = () => {
        let tempQueue = [];
        const newSteps = [];
        for (const act of actions) {
            if (act.type === "enqueue") {
                tempQueue = [...tempQueue, act.value];
                newSteps.push({ queue: [...tempQueue], highlight: tempQueue.length - 1, type: "enqueue", value: act.value });
            } else if (act.type === "dequeue" && tempQueue.length > 0) {
                newSteps.push({ queue: [...tempQueue], highlight: 0, type: "dequeue", value: tempQueue[0] });
                tempQueue = tempQueue.slice(1);
            }
        }
        setSteps(newSteps);
        setStepIdx(0);
        setQueue(newSteps.length > 0 ? newSteps[0].queue : []);
        setStarted(true);
    };
    const handleNext = () => {
        if (stepIdx < steps.length - 1) {
            setStepIdx(stepIdx + 1);
            setQueue(steps[stepIdx + 1].queue);
        }
    };
    const handlePrev = () => {
        if (stepIdx > 0) {
            setStepIdx(stepIdx - 1);
            setQueue(steps[stepIdx - 1].queue);
        }
    };
    const handleReset = () => {
        setActions([]);
        setSteps([]);
        setStepIdx(0);
        setQueue([]);
        setInput("");
        setStarted(false);
    };
    const handleRestart = () => {
        setStepIdx(0);
        setQueue(steps.length > 0 ? steps[0].queue : []);
    };
    const handleRandom = () => {
        if (!started) {
            const randArr = getRandomQueue();
            const randActions = randArr.map(v => ({ type: "enqueue", value: v }));
            setActions(randActions);
            setSteps([]);
            setStepIdx(0);
            setQueue([]);
        }
    };

    const current = steps[stepIdx] || { queue, highlight: null, type: "start", value: null };
    const stepExplanation = started && steps.length > 0 ? getStepExplanation(current.type, current.value) : "Add values and click Start to visualize queue operations.";

    // Preview queue before Start
    const previewQueue = [];
    actions.forEach(act => {
        if (act.type === "enqueue") previewQueue.push(act.value);
        else if (act.type === "dequeue" && previewQueue.length > 0) previewQueue.shift();
    });

    const displayQueue = (!started ? previewQueue : current.queue);
    const queueWidth = Math.max(320, displayQueue.length * 72 + 40);

    return (
        <div style={{ display: 'flex', width: '100%', height: '100%', minHeight: '100vh', overflowY: 'auto' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', padding: '2rem 0' }}>
                {/* Controls at the top */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Enter value"
                        onKeyDown={e => e.key === "Enter" && handleEnqueue()}
                        style={{ borderRadius: 8, border: '1px solid #a879ff', padding: '8px 12px', fontSize: 16, marginRight: 8 }}
                        disabled={started}
                    />
                    <button onClick={handleEnqueue} style={{ borderRadius: 8, background: '#a879ff', color: '#fff', border: 'none', padding: '8px 16px' }} disabled={started}>Enqueue</button>
                    <button onClick={handleDequeue} style={{ borderRadius: 8, background: '#6a3f92', color: '#fff', border: 'none', padding: '8px 16px' }} disabled={started || previewQueue.length === 0}>Dequeue</button>
                    <button onClick={handleRandom} style={{ borderRadius: 8, background: '#5d3d85', color: '#fff', border: 'none', padding: '8px 16px' }} disabled={started}>Random</button>
                    <button onClick={handleStart} style={{ borderRadius: 8, background: '#4b2e6b', color: '#fff', border: 'none', padding: '8px 16px' }} disabled={started || actions.length === 0}>Start</button>
                    <button onClick={handleReset} style={{ borderRadius: 8, background: '#2d1850', color: '#fff', border: 'none', padding: '8px 16px' }}>Reset</button>
                </div>
                <h2 style={{ color: '#a879ff', fontWeight: 700, fontSize: 32, marginBottom: 24 }}>Queue</h2>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 120, margin: '2rem 0', width: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: 0, overflowX: 'auto', maxWidth: '90vw', minHeight: 80, width: queueWidth }}>
                        {displayQueue.length === 0 && (
                            <div style={{ color: '#a879ff', fontSize: 20, fontWeight: 500, padding: 24 }}>Queue is empty.</div>
                        )}
                        {displayQueue.map((val, idx, arr) => (
                            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 8px', position: 'relative' }}>
                                {/* Value box, open on both sides */}
                                <div style={{
                                    width: 64,
                                    height: 48,
                                    background: started && current.highlight === idx ? '#e879f9' : '#2d1850',
                                    color: '#fff',
                                    borderLeft: '2px solid #a879ff',
                                    borderRight: '2px solid #a879ff',
                                    borderTop: 'none',
                                    borderBottom: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 700,
                                    fontSize: 22,
                                    boxShadow: started && current.highlight === idx ? '0 0 16px #e879f9' : '0 2px 8px #0002',
                                    position: 'relative',
                                    transition: 'background 0.3s, box-shadow 0.3s',
                                }}>
                                    {val}
                                    {idx === 0 && (
                                        <div style={{ position: 'absolute', top: -28, left: '50%', transform: 'translateX(-50%)', color: '#e879f9', fontWeight: 600, fontSize: 16 }}>Front</div>
                                    )}
                                    {idx === arr.length - 1 && (
                                        <div style={{ position: 'absolute', bottom: -28, left: '50%', transform: 'translateX(-50%)', color: '#e879f9', fontWeight: 600, fontSize: 16 }}>Rear</div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {started && steps.length > 0 && (
                    <div style={{ marginBottom: 16, display: 'flex', gap: 12, justifyContent: 'center' }}>
                        <button onClick={handlePrev} disabled={stepIdx === 0} style={{ borderRadius: 8, background: stepIdx === 0 ? '#444' : '#a879ff', color: '#fff', border: 'none', padding: '8px 16px' }}>Previous</button>
                        <button onClick={handleNext} disabled={stepIdx === steps.length - 1} style={{ borderRadius: 8, background: stepIdx === steps.length - 1 ? '#444' : '#a879ff', color: '#fff', border: 'none', padding: '8px 16px' }}>Next</button>
                        <button onClick={handleRestart} disabled={steps.length === 0} style={{ borderRadius: 8, background: steps.length === 0 ? '#444' : '#6a3f92', color: '#fff', border: 'none', padding: '8px 16px' }}>Restart</button>
                    </div>
                )}
                <div style={{ minHeight: 32, marginTop: 8, textAlign: 'center', color: '#e879f9', fontWeight: 500, fontSize: 18 }}>
                    {stepExplanation}
                </div>
            </div>
            <div style={{ width: 340, minWidth: 320, maxHeight: '100vh', overflowY: 'auto' }}>
                <AlgoSidebar algorithm={queuePseudo} code={queueCode} explanation={queueExplanation} />
            </div>
        </div>
    );
} 