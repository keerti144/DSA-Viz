import React from 'react';
import SortingVisualization from '../SortingVisualization';

const InsertionSort = () => {
    const code = `function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        const key = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`;

    const explanation = `InsertionSort is a simple sorting algorithm that builds the final sorted array one item 
    at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, 
    or merge sort. However, insertion sort provides several advantages:

    Key characteristics:
    - Time complexity: O(n²) in worst and average cases
    - Best case time complexity: O(n) when array is already sorted
    - Space complexity: O(1)
    - Stable sorting algorithm
    - In-place sorting algorithm
    - Efficient for small data sets
    - Adaptive: efficient for data sets that are already substantially sorted`;

    return (
        <SortingVisualization
            algorithm="insertionsort"
            title="Insertion Sort"
            timeComplexity="O(n²)"
            spaceComplexity="O(1)"
            code={code}
            explanation={explanation}
        />
    );
};

export default InsertionSort;
