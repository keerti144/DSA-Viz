import React from 'react';
import SearchingVisualization from '../SearchingVisualization';

const LinearSearch = () => {
    const code = `function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;  // Return index if found
        }
    }
    return -1;  // Return -1 if not found
}`;

    const explanation = `Linear Search is the simplest searching algorithm. It sequentially checks each element 
    of the list until the target element is found or the end of the list is reached.

    Key characteristics:
    - Time complexity: O(n) in worst and average cases
    - Best case time complexity: O(1) when target is at first position
    - Space complexity: O(1)
    - Works on both sorted and unsorted arrays
    - Simple to implement
    - Inefficient for large datasets`;

    return (
        <SearchingVisualization
            algorithm="linearsearch"
            title="Linear Search"
            timeComplexity="O(n)"
            spaceComplexity="O(1)"
            code={code}
            explanation={explanation}
        />
    );
};

export default LinearSearch;
