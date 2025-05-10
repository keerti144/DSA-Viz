import React, { useState } from 'react';
import './SortingVisualization.css';
import AlgoSidebar from '../AlgoSidebar';

function getStepsBubbleSort(array) {
    const steps = [];
    const arr = array.slice();
    steps.push({ arr: arr.slice(), highlights: [], type: 'start' });
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            steps.push({ arr: arr.slice(), highlights: [j, j + 1], type: 'compare', indices: [j, j + 1] });
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                steps.push({ arr: arr.slice(), highlights: [j, j + 1], type: 'swap', indices: [j, j + 1] });
            }
        }
    }
    steps.push({ arr: arr.slice(), highlights: [], type: 'done' });
    return steps;
}

function getStepsInsertionSort(array) {
    const steps = [];
    const arr = array.slice();
    steps.push({ arr: arr.slice(), highlights: [], type: 'start' });
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        steps.push({ arr: arr.slice(), highlights: [i], type: 'key', indices: [i] });
        while (j >= 0 && arr[j] > key) {
            steps.push({ arr: arr.slice(), highlights: [j, j + 1], type: 'compare', indices: [j, j + 1] });
            arr[j + 1] = arr[j];
            steps.push({ arr: arr.slice(), highlights: [j, j + 1], type: 'move', indices: [j, j + 1] });
            j--;
        }
        arr[j + 1] = key;
        steps.push({ arr: arr.slice(), highlights: [j + 1], type: 'insert', indices: [j + 1] });
    }
    steps.push({ arr: arr.slice(), highlights: [], type: 'done' });
    return steps;
}

function getStepsSelectionSort(array) {
    const steps = [];
    const arr = array.slice();
    steps.push({ arr: arr.slice(), highlights: [], type: 'start' });
    for (let i = 0; i < arr.length - 1; i++) {
        let minIdx = i;
        steps.push({ arr: arr.slice(), highlights: [i], type: 'select', indices: [i] });
        for (let j = i + 1; j < arr.length; j++) {
            steps.push({ arr: arr.slice(), highlights: [minIdx, j], type: 'compare', indices: [minIdx, j] });
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
                steps.push({ arr: arr.slice(), highlights: [minIdx], type: 'newmin', indices: [minIdx] });
            }
        }
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
            steps.push({ arr: arr.slice(), highlights: [i, minIdx], type: 'swap', indices: [i, minIdx] });
        }
    }
    steps.push({ arr: arr.slice(), highlights: [], type: 'done' });
    return steps;
}

function getStepsMergeSort(array) {
    const steps = [];
    const arr = array.slice();
    steps.push({ arr: arr.slice(), highlights: [], type: 'start' });
    function mergeSort(arr, l, r) {
        if (l >= r) return;
        const m = Math.floor((l + r) / 2);
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
    function merge(arr, l, m, r) {
        let left = arr.slice(l, m + 1);
        let right = arr.slice(m + 1, r + 1);
        let i = 0, j = 0, k = l;
        while (i < left.length && j < right.length) {
            steps.push({ arr: arr.slice(), highlights: [k], type: 'merge', indices: [k] });
            if (left[i] <= right[j]) {
                arr[k] = left[i];
                i++;
            } else {
                arr[k] = right[j];
                j++;
            }
            k++;
        }
        while (i < left.length) {
            steps.push({ arr: arr.slice(), highlights: [k], type: 'merge', indices: [k] });
            arr[k++] = left[i++];
        }
        while (j < right.length) {
            steps.push({ arr: arr.slice(), highlights: [k], type: 'merge', indices: [k] });
            arr[k++] = right[j++];
        }
    }
    mergeSort(arr, 0, arr.length - 1);
    steps.push({ arr: arr.slice(), highlights: [], type: 'done' });
    return steps;
}

function getStepsQuickSort(array) {
    const steps = [];
    const arr = array.slice();
    steps.push({ arr: arr.slice(), highlights: [], type: 'start' });
    function quickSort(arr, l, r) {
        if (l < r) {
            const pi = partition(arr, l, r);
            quickSort(arr, l, pi - 1);
            quickSort(arr, pi + 1, r);
        }
    }
    function partition(arr, l, r) {
        let pivot = arr[r];
        let i = l - 1;
        for (let j = l; j < r; j++) {
            steps.push({ arr: arr.slice(), highlights: [j, r], type: 'compare', indices: [j, r] });
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                steps.push({ arr: arr.slice(), highlights: [i, j], type: 'swap', indices: [i, j] });
            }
        }
        [arr[i + 1], arr[r]] = [arr[r], arr[i + 1]];
        steps.push({ arr: arr.slice(), highlights: [i + 1, r], type: 'swap', indices: [i + 1, r] });
        return i + 1;
    }
    quickSort(arr, 0, arr.length - 1);
    steps.push({ arr: arr.slice(), highlights: [], type: 'done' });
    return steps;
}

const algoToSteps = {
    bubblesort: getStepsBubbleSort,
    insertionsort: getStepsInsertionSort,
    selectionsort: getStepsSelectionSort,
    mergesort: getStepsMergeSort,
    quicksort: getStepsQuickSort,
};

function getStepExplanation(type, indices, arr, algorithm) {
    switch (type) {
        case 'start':
            return 'Ready to start ' + (algorithm ? algorithm.replace('sort', 'Sort') : 'sorting') + '.';
        case 'compare':
            return `Comparing elements at positions ${indices[0] + 1} and ${indices[1] + 1}.`;
        case 'swap':
            return `Swapping elements at positions ${indices[0] + 1} and ${indices[1] + 1}.`;
        case 'move':
            return `Moving element at position ${indices[0] + 1} to position ${indices[1] + 1}.`;
        case 'insert':
            return `Inserting key at position ${indices[0] + 1}.`;
        case 'key':
            return `Current key for insertion is at position ${indices[0] + 1}.`;
        case 'select':
            return `Selecting minimum for this pass at position ${indices[0] + 1}.`;
        case 'newmin':
            return `New minimum found at position ${indices[0] + 1}.`;
        case 'merge':
            return `Merging subarrays, updating position ${indices[0] + 1}.`;
        case 'done':
            return 'Sorting complete!';
        default:
            return '';
    }
}

function getRandomArray(size = 7) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
}

const SortingVisualization = ({ algorithm, title, code, explanation, pseudocode }) => {
    const [array, setArray] = useState([]);
    const [steps, setSteps] = useState([]);
    const [stepIdx, setStepIdx] = useState(0);
    const [input, setInput] = useState("");

    const current = steps[stepIdx] || { arr: array, highlights: [], type: 'start', indices: [] };

    const handleAdd = () => {
        if (input !== "" && !isNaN(Number(input))) {
            setArray([...array, Number(input)]);
            setInput("");
        }
    };

    const handleSort = () => {
        if (algoToSteps[algorithm] && array.length > 1) {
            const generated = algoToSteps[algorithm](array);
            setSteps(generated);
            setStepIdx(0);
        }
    };

    const handleNext = () => setStepIdx((idx) => Math.min(idx + 1, steps.length - 1));
    const handlePrev = () => setStepIdx((idx) => Math.max(idx - 1, 0));
    const handleReset = () => {
        setSteps([]);
        setStepIdx(0);
        setArray([]);
        setInput("");
    };
    const handleRestart = () => setStepIdx(0);
    const handleRandom = () => {
        const randArr = getRandomArray();
        setArray(randArr);
        setSteps([]);
        setStepIdx(0);
    };

    // For sidebar: show step explanation in words
    const stepExplanation = steps.length > 0
        ? getStepExplanation(current.type, current.indices || [], current.arr, algorithm)
        : 'Add elements and click Sort It to start visualizing.';

    return (
        <div style={{ display: 'flex', width: '100%', height: '100%' }}>
            <div className="sort-visualizer-layout" style={{ flex: 1 }}>
                <div className="sort-visualizer-main">
                    <h2>{title}</h2>
                    <div className="input-row" style={{ marginBottom: 24 }}>
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder="Enter number"
                            onKeyDown={e => e.key === "Enter" && handleAdd()}
                            style={{ borderRadius: 8, border: '1px solid #a879ff', padding: '8px 12px', fontSize: 16, marginRight: 8 }}
                        />
                        <button onClick={handleAdd} style={{ borderRadius: 8, background: '#a879ff', color: '#fff', border: 'none', padding: '8px 16px', marginRight: 8 }}>Add</button>
                        <button onClick={handleRandom} style={{ borderRadius: 8, background: '#6a3f92', color: '#fff', border: 'none', padding: '8px 16px', marginRight: 8 }}>Random</button>
                        <button onClick={handleSort} style={{ borderRadius: 8, background: '#5d3d85', color: '#fff', border: 'none', padding: '8px 16px', marginRight: 8 }} disabled={array.length < 2}>Sort It</button>
                        <button onClick={handleReset} style={{ borderRadius: 8, background: '#2d1850', color: '#fff', border: 'none', padding: '8px 16px' }}>Reset</button>
                    </div>
                    {array.length === 0 && (
                        <div style={{ color: '#a879ff', fontSize: 20, margin: '2rem 0', textAlign: 'center', fontWeight: 500 }}>
                            Add elements to start visualizing.
                        </div>
                    )}
                    <div className="bars" style={{ display: 'flex', alignItems: 'flex-end', height: 300, margin: '2rem 0', justifyContent: 'center' }}>
                        {(current.arr || []).map((val, idx) => (
                            <div
                                key={idx}
                                className={`bar${current.highlights && current.highlights.includes(idx) ? " highlight" : ""}`}
                                style={{
                                    height: `${val * 3 + 20}px`,
                                    width: '36px',
                                    margin: '0 10px',
                                    background: current.highlights && current.highlights.includes(idx) ? '#e879f9' : '#a879ff',
                                    color: '#fff',
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    justifyContent: 'center',
                                    borderRadius: '10px',
                                    fontWeight: 600,
                                    fontSize: 18,
                                    boxShadow: current.highlights && current.highlights.includes(idx) ? '0 0 16px #e879f9' : '0 2px 8px #0002',
                                    transition: 'height 0.3s, background 0.3s',
                                }}
                            >
                                {val}
                            </div>
                        ))}
                    </div>
                    {steps.length > 0 && (
                        <div className="controls" style={{ marginBottom: 16, display: 'flex', gap: 12, justifyContent: 'center' }}>
                            <button onClick={handlePrev} disabled={stepIdx === 0} style={{ borderRadius: 8, background: stepIdx === 0 ? '#444' : '#a879ff', color: '#fff', border: 'none', padding: '8px 16px' }}>Previous</button>
                            <button onClick={handleNext} disabled={stepIdx === steps.length - 1} style={{ borderRadius: 8, background: stepIdx === steps.length - 1 ? '#444' : '#a879ff', color: '#fff', border: 'none', padding: '8px 16px' }}>Next</button>
                            <button onClick={handleRestart} disabled={steps.length === 0} style={{ borderRadius: 8, background: steps.length === 0 ? '#444' : '#6a3f92', color: '#fff', border: 'none', padding: '8px 16px' }}>Restart</button>
                        </div>
                    )}
                    <div className="explanation" style={{ minHeight: 32, marginTop: 8, textAlign: 'center', color: '#e879f9', fontWeight: 500, fontSize: 18 }}>
                        {stepExplanation}
                    </div>
                </div>
            </div>
            <div style={{ width: 340, minWidth: 320 }}>
                <AlgoSidebar algorithm={pseudocode} code={code} explanation={explanation} />
            </div>
        </div>
    );
};

export default SortingVisualization; 