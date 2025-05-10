import React from 'react';
import BaseVisualization from '../BaseVisualization';

const BubbleSort = () => {
    const generateArray = (size) => {
        return Array.from({ length: size }, () =>
            Math.floor(Math.random() * 100) + 1
        );
    };

    const visualize = async (array, speed) => {
        const bars = document.getElementsByClassName('array-bar');
        const n = array.length;
        const arr = [...array];

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                // Highlight bars being compared
                bars[j].classList.add('comparing');
                bars[j + 1].classList.add('comparing');

                await new Promise(resolve => setTimeout(resolve, speed));

                if (arr[j] > arr[j + 1]) {
                    // Highlight bars being swapped
                    bars[j].classList.add('swapping');
                    bars[j + 1].classList.add('swapping');

                    // Swap values
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

                    // Update heights
                    bars[j].style.height = `${arr[j]}%`;
                    bars[j + 1].style.height = `${arr[j + 1]}%`;

                    // Update displayed values
                    bars[j].querySelector('.bar-value').textContent = arr[j];
                    bars[j + 1].querySelector('.bar-value').textContent = arr[j + 1];

                    await new Promise(resolve => setTimeout(resolve, speed));
                }

                // Remove highlighting
                bars[j].classList.remove('comparing', 'swapping');
                bars[j + 1].classList.remove('comparing', 'swapping');
            }
            // Mark sorted elements
            bars[n - i - 1].classList.add('sorted');
        }
        // Mark first element as sorted
        bars[0].classList.add('sorted');
    };

    const code = `function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}`;

    const explanation = `Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, 
    compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list 
    is repeated until the list is sorted. The algorithm gets its name from the way smaller elements 
    "bubble" to the top of the list.`;

    return (
        <BaseVisualization
            title="Bubble Sort"
            algorithm="Bubble Sort"
            timeComplexity="O(n²)"
            spaceComplexity="O(1)"
            stability="Stable"
            generateArray={generateArray}
            visualize={visualize}
            code={code}
            explanation={explanation}
        />
    );
};

export default BubbleSort; 