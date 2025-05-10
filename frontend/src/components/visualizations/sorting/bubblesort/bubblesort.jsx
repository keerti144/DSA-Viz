import React from 'react';
import BaseVisualization from '../BaseVisualization';

const algorithmSteps = `1. Start at the beginning of the array.
2. Compare each pair of adjacent elements.
3. Swap them if they are in the wrong order.
4. Continue until the end of the array.
5. Repeat for all elements until no swaps are needed.`;

const code = `function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`;

const explanation = `Bubble Sort is a simple comparison-based algorithm. It repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.\nBest Case: O(n) | Average/Worst Case: O(n^2)`;

// Step-by-step generator for Bubble Sort
function bubbleSortSteps(inputArr) {
  const arr = [...inputArr];
  const steps = [];
  let n = arr.length;
  let swapped;
  steps.push([...arr]);
  for (let i = 0; i < n - 1; i++) {
    swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
      steps.push([...arr]);
    }
    if (!swapped) break;
  }
  return steps;
}

const generateArray = (size) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 50) + 1);
};

const BubbleSort = () => (
  <BaseVisualization
    title="Bubble Sort"
    algorithm="bubblesort"
    timeComplexity="O(n^2)"
    spaceComplexity="O(1)"
    stability="Stable"
    generateArray={generateArray}
    visualize={bubbleSortSteps}
    code={code}
    explanation={explanation}
    algorithmSteps={algorithmSteps}
  />
);

export default BubbleSort;
