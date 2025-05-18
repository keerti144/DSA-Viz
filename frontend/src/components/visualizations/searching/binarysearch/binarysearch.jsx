import React from 'react';
import SearchingVisualization from '../SearchingVisualization';

const BinarySearch = () => {
    const code = `function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) {
            return mid;  // Return index if found
        }

        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;  // Return -1 if not found
}`;

    const explanation = `Binary Search is an efficient algorithm for finding an element in a sorted array. 
    It works by repeatedly dividing the search interval in half. If the value of the search key is less than 
    the item in the middle of the interval, narrow the interval to the lower half. Otherwise, narrow it to 
    the upper half.

    Key characteristics:
    - Time complexity: O(log n)
    - Space complexity: O(1) for iterative implementation
    - Requires sorted array
    - Much faster than linear search for large datasets
    - Not suitable for unsorted arrays
    - Can be implemented iteratively or recursively`;

    return (
        <SearchingVisualization
            algorithm="binarysearch"
            title="Binary Search"
            timeComplexity="O(log n)"
            spaceComplexity="O(1)"
            code={code}
            explanation={explanation}
        />
    );
};

export default BinarySearch;