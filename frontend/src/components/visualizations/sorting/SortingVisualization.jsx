import React, { useState, useEffect } from 'react';
import BaseVisualization from '../BaseVisualization';
import './SortingVisualization.css';

const SortingVisualization = ({ algorithm, title, timeComplexity, spaceComplexity, code, explanation }) => {
    const [array, setArray] = useState([]);
    const [isVisualizing, setIsVisualizing] = useState(false);

    const generateArray = (size) => {
        const newArray = Array.from({ length: size }, () =>
            Math.floor(Math.random() * 100) + 1
        );
        setArray(newArray);
        return newArray;
    };

    const visualize = async (arr, speed) => {
        setIsVisualizing(true);
        const bars = document.getElementsByClassName('array-bar');
        const arrayCopy = [...arr];

        switch (algorithm) {
            case 'quicksort':
                await quickSort(arrayCopy, 0, arrayCopy.length - 1, bars, speed);
                break;
            case 'mergesort':
                await mergeSort(arrayCopy, 0, arrayCopy.length - 1, bars, speed);
                break;
            case 'insertionsort':
                await insertionSort(arrayCopy, bars, speed);
                break;
            case 'selectionsort':
                await selectionSort(arrayCopy, bars, speed);
                break;
            default:
                break;
        }

        // Mark all bars as sorted
        Array.from(bars).forEach(bar => {
            bar.classList.add('sorted');
        });
        setIsVisualizing(false);
    };

    // QuickSort implementation
    const quickSort = async (arr, low, high, bars, speed) => {
        if (low < high) {
            const pivotIndex = await partition(arr, low, high, bars, speed);
            await quickSort(arr, low, pivotIndex - 1, bars, speed);
            await quickSort(arr, pivotIndex + 1, high, bars, speed);
        }
    };

    const partition = async (arr, low, high, bars, speed) => {
        const pivot = arr[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            bars[j].classList.add('comparing');
            bars[high].classList.add('comparing');
            await new Promise(resolve => setTimeout(resolve, speed));

            if (arr[j] < pivot) {
                i++;
                bars[i].classList.add('swapping');
                bars[j].classList.add('swapping');
                [arr[i], arr[j]] = [arr[j], arr[i]];
                updateBar(bars[i], arr[i]);
                updateBar(bars[j], arr[j]);
                await new Promise(resolve => setTimeout(resolve, speed));
                bars[i].classList.remove('swapping');
                bars[j].classList.remove('swapping');
            }

            bars[j].classList.remove('comparing');
            bars[high].classList.remove('comparing');
        }

        bars[i + 1].classList.add('swapping');
        bars[high].classList.add('swapping');
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        updateBar(bars[i + 1], arr[i + 1]);
        updateBar(bars[high], arr[high]);
        await new Promise(resolve => setTimeout(resolve, speed));
        bars[i + 1].classList.remove('swapping');
        bars[high].classList.remove('swapping');

        return i + 1;
    };

    // MergeSort implementation
    const mergeSort = async (arr, left, right, bars, speed) => {
        if (left < right) {
            const mid = Math.floor((left + right) / 2);
            await mergeSort(arr, left, mid, bars, speed);
            await mergeSort(arr, mid + 1, right, bars, speed);
            await merge(arr, left, mid, right, bars, speed);
        }
    };

    const merge = async (arr, left, mid, right, bars, speed) => {
        const leftArray = arr.slice(left, mid + 1);
        const rightArray = arr.slice(mid + 1, right + 1);
        let i = 0, j = 0, k = left;

        while (i < leftArray.length && j < rightArray.length) {
            bars[k].classList.add('comparing');
            await new Promise(resolve => setTimeout(resolve, speed));

            if (leftArray[i] <= rightArray[j]) {
                arr[k] = leftArray[i];
                i++;
            } else {
                arr[k] = rightArray[j];
                j++;
            }
            updateBar(bars[k], arr[k]);
            bars[k].classList.remove('comparing');
            k++;
        }

        while (i < leftArray.length) {
            arr[k] = leftArray[i];
            updateBar(bars[k], arr[k]);
            i++;
            k++;
        }

        while (j < rightArray.length) {
            arr[k] = rightArray[j];
            updateBar(bars[k], arr[k]);
            j++;
            k++;
        }
    };

    // InsertionSort implementation
    const insertionSort = async (arr, bars, speed) => {
        for (let i = 1; i < arr.length; i++) {
            const key = arr[i];
            let j = i - 1;

            bars[i].classList.add('comparing');
            await new Promise(resolve => setTimeout(resolve, speed));

            while (j >= 0 && arr[j] > key) {
                bars[j].classList.add('swapping');
                bars[j + 1].classList.add('swapping');
                arr[j + 1] = arr[j];
                updateBar(bars[j + 1], arr[j + 1]);
                await new Promise(resolve => setTimeout(resolve, speed));
                bars[j].classList.remove('swapping');
                bars[j + 1].classList.remove('swapping');
                j--;
            }

            arr[j + 1] = key;
            updateBar(bars[j + 1], key);
            bars[i].classList.remove('comparing');
        }
    };

    // SelectionSort implementation
    const selectionSort = async (arr, bars, speed) => {
        for (let i = 0; i < arr.length - 1; i++) {
            let minIdx = i;
            bars[i].classList.add('comparing');

            for (let j = i + 1; j < arr.length; j++) {
                bars[j].classList.add('comparing');
                await new Promise(resolve => setTimeout(resolve, speed));

                if (arr[j] < arr[minIdx]) {
                    if (minIdx !== i) bars[minIdx].classList.remove('comparing');
                    minIdx = j;
                } else {
                    bars[j].classList.remove('comparing');
                }
            }

            if (minIdx !== i) {
                bars[i].classList.add('swapping');
                bars[minIdx].classList.add('swapping');
                [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
                updateBar(bars[i], arr[i]);
                updateBar(bars[minIdx], arr[minIdx]);
                await new Promise(resolve => setTimeout(resolve, speed));
                bars[i].classList.remove('swapping');
                bars[minIdx].classList.remove('swapping');
            }

            bars[i].classList.remove('comparing');
            bars[i].classList.add('sorted');
        }
        bars[arr.length - 1].classList.add('sorted');
    };

    const updateBar = (bar, value) => {
        bar.style.height = `${value}%`;
        bar.querySelector('.bar-value').textContent = value;
    };

    const customRender = () => (
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
    );

    return (
        <BaseVisualization
            title={title}
            algorithm={algorithm}
            timeComplexity={timeComplexity}
            spaceComplexity={spaceComplexity}
            stability={algorithm === 'mergesort' || algorithm === 'insertionsort' ? 'Stable' : 'Unstable'}
            generateArray={generateArray}
            visualize={visualize}
            code={code}
            explanation={explanation}
            customRender={customRender}
        />
    );
};

export default SortingVisualization; 