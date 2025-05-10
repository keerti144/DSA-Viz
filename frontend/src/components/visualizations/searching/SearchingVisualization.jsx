import React, { useState } from 'react';
import BaseVisualization from '../BaseVisualization';
import './SearchingVisualization.css';

const SearchingVisualization = ({ algorithm, title, timeComplexity, spaceComplexity, code, explanation }) => {
    const [array, setArray] = useState([]);
    const [target, setTarget] = useState(null);
    const [isVisualizing, setIsVisualizing] = useState(false);
    const [result, setResult] = useState(null);

    const generateArray = (size) => {
        // Generate a sorted array for binary search, random for linear search
        const newArray = Array.from({ length: size }, () =>
            Math.floor(Math.random() * 100) + 1
        );

        if (algorithm === 'binarysearch') {
            newArray.sort((a, b) => a - b);
        }

        setArray(newArray);
        setTarget(null);
        setResult(null);
        return newArray;
    };

    const visualize = async (arr, speed) => {
        if (!target) {
            alert('Please enter a target value to search for');
            return;
        }

        setIsVisualizing(true);
        setResult(null);
        const bars = document.getElementsByClassName('array-bar');
        const targetValue = parseInt(target);

        if (algorithm === 'binarysearch') {
            await binarySearch(arr, targetValue, bars, speed);
        } else {
            await linearSearch(arr, targetValue, bars, speed);
        }

        setIsVisualizing(false);
    };

    const linearSearch = async (arr, target, bars, speed) => {
        for (let i = 0; i < arr.length; i++) {
            bars[i].classList.add('comparing');
            await new Promise(resolve => setTimeout(resolve, speed));

            if (arr[i] === target) {
                bars[i].classList.add('found');
                setResult(i);
                return;
            }

            bars[i].classList.remove('comparing');
            bars[i].classList.add('searched');
        }
        setResult(-1);
    };

    const binarySearch = async (arr, target, bars, speed) => {
        let left = 0;
        let right = arr.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);

            // Highlight current search range
            for (let i = left; i <= right; i++) {
                bars[i].classList.add('range');
            }
            bars[mid].classList.add('comparing');
            await new Promise(resolve => setTimeout(resolve, speed));

            if (arr[mid] === target) {
                bars[mid].classList.add('found');
                setResult(mid);
                return;
            }

            // Clear previous highlights
            for (let i = left; i <= right; i++) {
                bars[i].classList.remove('range');
            }
            bars[mid].classList.remove('comparing');

            if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        setResult(-1);
    };

    const customRender = () => (
        <div className="search-container">
            <div className="search-input">
                <input
                    type="number"
                    min="1"
                    max="100"
                    value={target || ''}
                    onChange={(e) => setTarget(e.target.value)}
                    placeholder="Enter target value (1-100)"
                    disabled={isVisualizing}
                />
                {result !== null && (
                    <div className="search-result">
                        {result === -1
                            ? 'Target not found'
                            : `Target found at index ${result}`
                        }
                    </div>
                )}
            </div>
            <div className="array-container">
                {array.map((value, index) => (
                    <div
                        key={index}
                        className="array-bar"
                        style={{
                            height: `${value}%`,
                            width: `${100 / array.length}%`,
                        }}
                    >
                        <span className="bar-value">{value}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <BaseVisualization
            title={title}
            algorithm={algorithm}
            timeComplexity={timeComplexity}
            spaceComplexity={spaceComplexity}
            stability="N/A"
            generateArray={generateArray}
            visualize={visualize}
            code={code}
            explanation={explanation}
            customRender={customRender}
        />
    );
};

export default SearchingVisualization; 