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
  push(x) { this.items.unshift(x); }
  pop() { return this.items.shift(); }
  top() { return this.items[0]; }
}
`;

const stackExplanation = `
A stack is a LIFO (Last-In, First-Out) data structure. Push adds to the top, Pop removes from the top. Only the top element is accessible at any time.`;

function getRandomStack(size = 6) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
}

function getStepExplanation(type, value) {
    switch (type) {
        case "push":
            return `Pushed ${value} to the stack.`;
        case "pop":
            return `Popped ${value} from the stack.`;
        case "start":
            return "Ready to start stack operations.";
        default:
            return "";
    }
}

export default function StackVisualizer() {
    const [input, setInput] = useState("");
    const [actions, setActions] = useState([]);
    const [steps, setSteps] = useState([]);
    const [stepIdx, setStepIdx] = useState(0);
    const [stack, setStack] = useState([]);
    const [started, setStarted] = useState(false);

    const handlePush = () => {
        if (input !== "" && !isNaN(Number(input)) && !started) {
            setActions([{ type: "push", value: Number(input) }, ...actions]);
            setInput("");
        }
    };
    const handlePop = () => {
        if (!started && actions.length > 0) setActions(actions.slice(1));
    };
    const handleStart = () => {
        let tempStack = [];
        const newSteps = [];
        for (const act of actions.slice().reverse()) {
            if (act.type === "push") {
                tempStack = [act.value, ...tempStack];
                newSteps.push({ stack: [...tempStack], highlight: 0, type: "push", value: act.value });
            } else if (act.type === "pop" && tempStack.length > 0) {
                newSteps.push({ stack: [...tempStack], highlight: 0, type: "pop", value: tempStack[0] });
                tempStack = tempStack.slice(1);
            }
        }
        setSteps(newSteps);
        setStepIdx(0);
        setStack(newSteps.length > 0 ? newSteps[0].stack : []);
        setStarted(true);
    };
    const handleNext = () => {
        if (stepIdx < steps.length - 1) {
            setStepIdx(stepIdx + 1);
            setStack(steps[stepIdx + 1].stack);
        }
    };
    const handlePrev = () => {
        if (stepIdx > 0) {
            setStepIdx(stepIdx - 1);
            setStack(steps[stepIdx - 1].stack);
        }
    };
    const handleReset = () => {
        setActions([]);
        setSteps([]);
        setStepIdx(0);
        setStack([]);
        setInput("");
        setStarted(false);
    };
    const handleRestart = () => {
        setStepIdx(0);
        setStack(steps.length > 0 ? steps[0].stack : []);
    };
    const handleRandom = () => {
        if (!started) {
            const randArr = getRandomStack();
            const randActions = randArr.map(v => ({ type: "push", value: v }));
            setActions(randActions.reverse());
            setSteps([]);
            setStepIdx(0);
            setStack([]);
        }
    };

    const current = steps[stepIdx] || { stack, highlight: null, type: "start", value: null };
    const stepExplanation = started && steps.length > 0 ? getStepExplanation(current.type, current.value) : "Add values and click Start to visualize stack operations.";

    // Preview stack before Start
    const previewStack = actions.slice().reverse().map(a => a.value);
    const displayStack = !started ? previewStack : current.stack;
    const stackHeight = Math.max(240, displayStack.length * 60 + 40);

    return (
        <div style={{ display: 'flex', width: '100%', height: '100%', minHeight: '100vh', overflowY: 'auto' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', padding: '2rem 0' }}>
                {/* Controls at the top */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Enter value"
                        onKeyDown={e => e.key === "Enter" && handlePush()}
                        style={{ borderRadius: 8, border: '1px solid #a879ff', padding: '8px 12px', fontSize: 16, marginRight: 8 }}
                        disabled={started}
                    />
                    <button onClick={handlePush} style={{ borderRadius: 8, background: '#a879ff', color: '#fff', border: 'none', padding: '8px 16px' }} disabled={started}>Push</button>
                    <button onClick={handlePop} style={{ borderRadius: 8, background: '#6a3f92', color: '#fff', border: 'none', padding: '8px 16px' }} disabled={started || actions.length === 0}>Pop</button>
                    <button onClick={handleRandom} style={{ borderRadius: 8, background: '#5d3d85', color: '#fff', border: 'none', padding: '8px 16px' }} disabled={started}>Random</button>
                    <button onClick={handleStart} style={{ borderRadius: 8, background: '#4b2e6b', color: '#fff', border: 'none', padding: '8px 16px' }} disabled={started || actions.length === 0}>Start</button>
                    <button onClick={handleReset} style={{ borderRadius: 8, background: '#2d1850', color: '#fff', border: 'none', padding: '8px 16px' }}>Reset</button>
                </div>
                <h2 style={{ color: '#a879ff', fontWeight: 700, fontSize: 32, marginBottom: 24 }}>Stack</h2>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: stackHeight, margin: '2rem 0', width: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, height: stackHeight, justifyContent: 'flex-start', overflowY: 'auto', maxHeight: 400, minWidth: 80 }}>
                        {displayStack.length === 0 && (
                            <div style={{ color: '#a879ff', fontSize: 20, fontWeight: 500, padding: 24 }}>Stack is empty.</div>
                        )}
                        {displayStack.map((val, idx) => {
                            const isTop = idx === 0;
                            return (
                                <div key={idx} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '8px 0', position: 'relative' }}>
                                    <div style={{
                                        width: 64,
                                        height: 48,
                                        background: started && isTop ? '#e879f9' : '#2d1850',
                                        color: '#fff',
                                        border: '2px solid #a879ff',
                                        borderRadius: 12,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 700,
                                        fontSize: 22,
                                        boxShadow: started && isTop ? '0 0 16px #e879f9' : '0 2px 8px #0002',
                                        transition: 'background 0.3s, box-shadow 0.3s',
                                        position: 'relative',
                                    }}>
                                        {val}
                                        {isTop && (
                                            <div style={{ position: 'absolute', top: -28, left: '50%', transform: 'translateX(-50%)', color: '#e879f9', fontWeight: 600, fontSize: 16 }}>Top</div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
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
                <AlgoSidebar algorithm={stackPseudo} code={stackCode} explanation={stackExplanation} />
            </div>
        </div>
    );
} 