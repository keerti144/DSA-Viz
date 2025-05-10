import React from 'react';
import SortingVisualization from '../SortingVisualization';

const QuickSort = () => {
    const code = `function quickSort(arr, low, high) {
    if (low < high) {
        const pivotIndex = partition(arr, low, high);
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}`;

    const explanation = `QuickSort is a highly efficient, comparison-based, divide-and-conquer sorting algorithm. 
    It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays 
    according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively. 
    This process continues until the entire array is sorted.

    Key characteristics:
    - Average time complexity: O(n log n)
    - Worst-case time complexity: O(n²)
    - Space complexity: O(log n)
    - Not stable
    - In-place sorting algorithm`;

    return (
        <SortingVisualization
            algorithm="quicksort"
            title="Quick Sort"
            timeComplexity="O(n log n) average, O(n²) worst"
            spaceComplexity="O(log n)"
            code={code}
            explanation={explanation}
        />
    );
};

export default QuickSort;
