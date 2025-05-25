import React, { useState } from 'react';
import AlgoSidebar from '../AlgoSidebar';
import Header from '../../../header/header.jsx';
import Sidebar from '../../../sidebar/sidebar.jsx';
import '../BaseVisualization.css';

function getRandomArray() {
    return [23, 45, 12, 67, 34, 89, 10, 56];
}

function getStepsLinearSearch(array, target) {
    const steps = [];
    for (let i = 0; i < array.length; i++) {
        steps.push({ idx: i, found: array[i] === target, done: array[i] === target });
        if (array[i] === target) break;
    }
    if (!array.includes(target)) steps.push({ idx: -1, found: false, done: true });
    return steps;
}

function getStepsBinarySearch(array, target) {
    const steps = [];
    let left = 0, right = array.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        steps.push({ left, right, mid, found: array[mid] === target, done: array[mid] === target });
        if (array[mid] === target) break;
        if (array[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    if (!array.includes(target)) steps.push({ left: -1, right: -1, mid: -1, found: false, done: true });
    return steps;
}

const sidebarData = {
    linearsearch: {
        algorithm: `for i from 0 to n-1:\n  if arr[i] == target:\n    return i\nreturn -1`,
        code: `function linearSearch(arr, target) {\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] === target) return i;\n  }\n  return -1;\n}`,
        explanation: `Linear Search checks each element in the array sequentially until it finds the target or reaches the end. It works on both sorted and unsorted arrays.`
    },
    binarysearch: {
        algorithm: `left = 0, right = n-1\nwhile left <= right:\n  mid = (left + right) // 2\n  if arr[mid] == target:\n    return mid\n  else if arr[mid] < target:\n    left = mid + 1\n  else:\n    right = mid - 1\nreturn -1`,
        code: `function binarySearch(arr, target) {\n  let left = 0, right = arr.length - 1;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}`,
        explanation: `Binary Search works on sorted arrays by repeatedly dividing the search interval in half. It is much faster than linear search for large datasets.`
    }
};

export default function SearchingVisualization({ algorithm }) {
    const [array, setArray] = useState([]);
    const [input, setInput] = useState("");
    const [target, setTarget] = useState("");
    const [steps, setSteps] = useState([]);
    const [stepIdx, setStepIdx] = useState(0);
    const [started, setStarted] = useState(false);

    const isBinary = algorithm === 'binarysearch';
    const sortedArray = isBinary ? [...array].sort((a, b) => a - b) : array;
    const displayArray = isBinary ? sortedArray : array;

    const handleRandom = () => {
        setArray(getRandomArray());
        setInput("");
        setTarget("");
        setSteps([]);
        setStepIdx(0);
        setStarted(false);
    };
    const handleReset = () => {
        setSteps([]);
        setStepIdx(0);
        setStarted(false);
        setTarget("");
    };
    const handleAdd = () => {
        const values = input.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v));
        if (values.length > 0) {
            setArray(values);
            setInput("");
            setSteps([]);
            setStepIdx(0);
            setStarted(false);
        }
    };
    const handleStart = () => {
        if (target === '' || isNaN(Number(target)) || array.length === 0) return;
        const tgt = Number(target);
        const arr = displayArray;
        let generated = isBinary ? getStepsBinarySearch(arr, tgt) : getStepsLinearSearch(arr, tgt);
        setSteps(generated);
        setStepIdx(0);
        setStarted(true);
    };
    const handleNext = () => {
        if (stepIdx < steps.length - 1) setStepIdx(stepIdx + 1);
    };
    const handlePrev = () => {
        if (stepIdx > 0) setStepIdx(stepIdx - 1);
    };

    // Highlight logic
    let highlightIdx = -1, foundIdx = -1, range = null;
    if (started && steps.length > 0) {
        const step = steps[stepIdx];
        if (isBinary) {
            highlightIdx = step.mid;
            range = { left: step.left, right: step.right };
            if (step.found) foundIdx = step.mid;
            if (step.done && !step.found) foundIdx = -1;
        } else {
            highlightIdx = step.idx;
            if (step.found) foundIdx = step.idx;
            if (step.done && !step.found) foundIdx = -1;
        }
    }

    const title = isBinary ? "Binary Search Visualizer" : "Linear Search Visualizer";
    const sidebar = sidebarData[algorithm] || {};

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #1e1e2f, #2a2a40)' }}>
            <Sidebar />
            <div style={{ flex: 1, marginLeft: 60 }}>
                <Header />
                <div className="base-vis-layout" style={{ paddingTop: 80 }}>
                    <div className="base-vis-main">
                        <div className="base-vis-header">
                            <h1>{title}</h1>
                        </div>
                        <div className="base-vis-controls">
                            <input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                placeholder="Enter array (comma separated)"
                                className="base-vis-input"
                                disabled={started}
                            />
                            <button onClick={handleAdd} className="base-vis-btn" disabled={started || !input.trim()}>Set Array</button>
                            <button onClick={handleRandom} className="base-vis-btn" disabled={started}>Random</button>
                        </div>
                        <div className="base-vis-controls">
                            <input
                                type="number"
                                min="-999"
                                max="9999"
                                value={target}
                                onChange={e => setTarget(e.target.value)}
                                placeholder="Enter value to search"
                                className="base-vis-input"
                                disabled={started || array.length === 0}
                            />
                            <button onClick={handleStart} className="base-vis-btn" disabled={started || !target || array.length === 0}>Start Search</button>
                            <button onClick={handleReset} className="base-vis-btn">Reset</button>
                            {started && (
                                <>
                                    <button onClick={handlePrev} disabled={stepIdx === 0} className="base-vis-btn">Previous</button>
                                    <button onClick={handleNext} disabled={stepIdx === steps.length - 1} className="base-vis-btn">Next</button>
                                </>
                            )}
                        </div>
                        <div className="base-vis-visualization" style={{ minHeight: 120 }}>
                            {array.length === 0 ? (
                                <div style={{ color: '#e879f9', fontWeight: 500, fontSize: 20, margin: '2rem 0' }}>Insert array to search</div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 0, margin: '2rem 0', flexWrap: 'wrap' }}>
                                    {displayArray.map((val, idx) => (
                                        <React.Fragment key={idx}>
                                            <div
                                                className="search-circle"
                                                style={{
                                                    background: foundIdx === idx ? '#2ecc71' : highlightIdx === idx ? '#e879f9' : (range && idx >= range.left && idx <= range.right) ? '#f1c40f' : '#a879ff',
                                                    color: '#fff',
                                                    border: foundIdx === idx ? '3px solid #2ecc71' : highlightIdx === idx ? '3px solid #e879f9' : '2px solid #a879ff',
                                                    boxShadow: highlightIdx === idx ? '0 0 16px #e879f9' : '0 2px 8px #0002',
                                                    fontWeight: 700,
                                                    fontSize: 22,
                                                    width: 56,
                                                    height: 56,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderRadius: '50%',
                                                    margin: '0 8px',
                                                    position: 'relative',
                                                    transition: 'background 0.3s, box-shadow 0.3s',
                                                }}
                                            >
                                                {val}
                                            </div>
                                            {idx < displayArray.length - 1 && (
                                                <span style={{ fontSize: 32, color: '#a879ff', margin: '0 2px', userSelect: 'none' }}>&rarr;</span>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div style={{ minHeight: 32, marginTop: 8, textAlign: 'center', color: '#e879f9', fontWeight: 500, fontSize: 18 }}>
                            {started && steps.length > 0 && (
                                isBinary
                                    ? (steps[stepIdx].found
                                        ? `Found ${target} at index ${steps[stepIdx].mid}`
                                        : steps[stepIdx].done ? `${target} not found` : `Checking index ${steps[stepIdx].mid}`)
                                    : (steps[stepIdx].found
                                        ? `Found ${target} at index ${steps[stepIdx].idx}`
                                        : steps[stepIdx].done ? `${target} not found` : `Checking index ${steps[stepIdx].idx}`)
                            )}
                        </div>
                    </div>
                    <div className="base-vis-sidebar">
                        <AlgoSidebar
                            algorithm={sidebar.algorithm}
                            code={sidebar.code}
                            explanation={sidebar.explanation}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
} 