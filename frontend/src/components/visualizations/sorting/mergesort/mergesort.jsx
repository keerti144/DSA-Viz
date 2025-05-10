import React from 'react';
import SortingVisualization from '../SortingVisualization';

const MergeSort = () => {
  const code = `function mergeSort(arr, left, right) {
    if (left < right) {
        const mid = Math.floor((left + right) / 2);
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

function merge(arr, left, mid, right) {
    const leftArray = arr.slice(left, mid + 1);
    const rightArray = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;
    while (i < leftArray.length && j < rightArray.length) {
        if (leftArray[i] <= rightArray[j]) {
            arr[k] = leftArray[i];
            i++;
        } else {
            arr[k] = rightArray[j];
            j++;
        }
        k++;
    }
    while (i < leftArray.length) {
        arr[k] = leftArray[i];
        i++;
        k++;
    }
    while (j < rightArray.length) {
        arr[k] = rightArray[j];
        j++;
        k++;
    }
}`;
  const explanation = `Merge Sort is a stable divide-and-conquer sorting algorithm. It recursively splits the array in half, sorts each half, and merges them.\nBest/Average/Worst Case: O(n log n)`;
  return (
    <SortingVisualization
      algorithm="mergesort"
      title="Merge Sort"
      timeComplexity="O(n log n)"
      spaceComplexity="O(n)"
      code={code}
      explanation={explanation}
    />
  );
};

export default MergeSort;
