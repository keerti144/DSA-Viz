import React, { useState } from "react";
import AlgoSidebar from "../AlgoSidebar";
import "./BubbleSortVisualizer.css";

function generateBubbleSortSteps(array) {
    const steps = [];
    const arr = array.slice();
    steps.push({ arr: arr.slice(), highlights: [] });
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            steps.push({ arr: arr.slice(), highlights: [j, j + 1], type: "compare" });
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                steps.push({ arr: arr.slice(), highlights: [j, j + 1], type: "swap" });
            }
        }
    }
    steps.push({ arr: arr.slice(), highlights: [], type: "done" });
    return steps;
}

const bubbleSortPseudo = `
for i from 0 to n-1:
    for j from 0 to n-i-2:
        if arr[j] > arr[j+1]:
            swap arr[j] and arr[j+1]
`;

const bubbleSortCode = `
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
`;

const bubbleSortExplanation = `
Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. This process is repeated until the list is sorted. It's simple but not efficient for large lists.
`;

export default function BubbleSortVisualizer() {
    const [input, setInput] = useState("");
    const [array, setArray] = useState([]);
    const [steps, setSteps] = useState([]);
    const [stepIdx, setStepIdx] = useState(0);

    const handleAdd = () => {
        if (input !== "" && !isNaN(Number(input))) {
            setArray([...array, Number(input)]);
            setInput("");
        }
    };

    const handleSort = () => {
        const generated = generateBubbleSortSteps(array);
        setSteps(generated);
        setStepIdx(0);
    };

    const handleNext = () => setStepIdx((idx) => Math.min(idx + 1, steps.length - 1));
    const handlePrev = () => setStepIdx((idx) => Math.max(idx - 1, 0));
    const handleReset = () => {
        setSteps([]);
        setStepIdx(0);
        setArray([]);
    };
    const handleRestart = () => setStepIdx(0);

    const current = steps[stepIdx] || { arr: array, highlights: [] };

    return (
        <div className="sort-visualizer-layout">
            <div className="sort-visualizer-main">
                <div className="input-row">
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Enter number"
                        onKeyDown={e => e.key === "Enter" && handleAdd()}
                    />
                    <button onClick={handleAdd}>Add</button>
                    <button onClick={handleSort} disabled={array.length < 2}>Sort It</button>
                    <button onClick={handleReset}>Reset</button>
                </div>
                <div className="bars">
                    {(current.arr || []).map((val, idx) => (
                        <div
                            key={idx}
                            className={`bar${current.highlights.includes(idx) ? " highlight" : ""}`}
                            style={{ height: `${val * 3 + 20}px` }}
                        >
                            {val}
                        </div>
                    ))}
                </div>
                <div className="controls">
                    <button onClick={handlePrev} disabled={stepIdx === 0}>Previous</button>
                    <button onClick={handleNext} disabled={stepIdx === steps.length - 1}>Next</button>
                    <button onClick={handleRestart} disabled={steps.length === 0}>Restart</button>
                </div>
                <div className="explanation">
                    {steps[stepIdx]?.type === "compare" && "Comparing highlighted elements."}
                    {steps[stepIdx]?.type === "swap" && "Swapping highlighted elements."}
                    {steps[stepIdx]?.type === "done" && "Sorting complete!"}
                </div>
            </div>
            <AlgoSidebar
                algorithm={bubbleSortPseudo}
                code={bubbleSortCode}
                explanation={bubbleSortExplanation}
            />
        </div>
    );
} 