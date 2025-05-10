import React from 'react';
import SortingVisualization from '../SortingVisualization';

const SelectionSort = () => {
  const code = `function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        }
    }
}`;
  const explanation = `Selection Sort repeatedly selects the minimum element from the unsorted part and moves it to the sorted part.\nBest, Average, Worst Case: O(n^2)`;
  return (
    <SortingVisualization
      algorithm="selectionsort"
      title="Selection Sort"
      timeComplexity="O(n^2)"
      spaceComplexity="O(1)"
      code={code}
      explanation={explanation}
    />
  );
};

export default SelectionSort;
