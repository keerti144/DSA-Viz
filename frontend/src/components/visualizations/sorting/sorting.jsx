import React from "react";
import BubbleSort from "./sorting/bubblesort/bubblesort";
import InsertionSort from "./sorting/insertionsort/insertionsort";
import MergeSort from "./sorting/mergesort/mergesort";
import QuickSort from "./sorting/quicksort/quicksort";
import SelectionSort from "./sorting/selectionsort/selectionsort";

const Sorting = () => {
  return (
    <div>
      <h1>Sorting Algorithms Visualization</h1>
      <BubbleSort />
      <InsertionSort />
      <MergeSort />
      <QuickSort />
      <SelectionSort />
    </div>
  );
};

export default Sorting;
