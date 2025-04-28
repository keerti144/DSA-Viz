import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../header/header.jsx";
import Sidebar from "../sidebar/sidebar.jsx";
import "./visnext.css";

export const VisNext = () => {
  const { algorithm } = useParams();
  const [activeSection, setActiveSection] = useState("algo");
  const [inputValue, setInputValue] = useState("");
  const [currentStep, setCurrentStep] = useState(0);

  const handleClick = (section) => {
    setActiveSection(section);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleGoClick = () => {
    console.log("Go clicked with value:", inputValue);
  };

  const handlePrevClick = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleNextClick = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const algorithms = {
    bubblesort: {
      title: "Bubble Sort",
      steps: `Steps:
      1. Compare the first two elements.
      2. Swap if the first is greater.
      3. Move to the next adjacent pair and repeat.
      4. Each pass bubbles the largest element to the end.
      5. Stop when no swaps are needed.`,
      
      code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr`,
      
      explanation: `Bubble Sort is a simple comparison-based algorithm.
Best Case: O(n) | Average/Worst Case: O(n^2)`,
    },

    quicksort: {
      title: "Quick Sort",
      steps: `Steps:
      1. Pick a pivot element.
      2. Partition the array around the pivot.
      3. Recursively apply to subarrays.`,
      
      code: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    else:
        pivot = arr[0]
        left = [x for x in arr[1:] if x < pivot]
        right = [x for x in arr[1:] if x >= pivot]
        return quick_sort(left) + [pivot] + quick_sort(right)`,
      
      explanation: `Quick Sort is a divide-and-conquer algorithm.
Best Case: O(n log n) | Average Case: O(n log n) | Worst Case: O(n^2)`,
    },

    mergesort: {
      title: "Merge Sort",
      steps: `Steps:
      1. Divide the array into halves.
      2. Recursively sort each half.
      3. Merge the sorted halves together.`,
      
      code: `def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr)//2
        left = arr[:mid]
        right = arr[mid:]
        merge_sort(left)
        merge_sort(right)
        i = j = k = 0
        while i < len(left) and j < len(right):
            if left[i] < right[j]:
                arr[k] = left[i]
                i += 1
            else:
                arr[k] = right[j]
                j += 1
            k += 1
        while i < len(left):
            arr[k] = left[i]
            i += 1
            k += 1
        while j < len(right):
            arr[k] = right[j]
            j += 1
            k += 1
    return arr`,
      
      explanation: `Merge Sort is a stable divide-and-conquer sorting algorithm.
Best/Average/Worst Case: O(n log n)`,
    },

    insertionsort: {
      title: "Insertion Sort",
      steps: `Steps:
      1. Start with the second element, assuming the first is sorted.
      2. Compare it with the elements before it.
      3. Insert it into the correct position.
      4. Repeat for all elements.`,
      
      code: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
      
      explanation: `Insertion Sort is simple and efficient for small datasets.
Best Case: O(n) | Average/Worst Case: O(n^2)`,
    },

    selectionsort: {
      title: "Selection Sort",
      steps: `Steps:
      1. Find the minimum element in the unsorted part.
      2. Swap it with the first unsorted element.
      3. Move the boundary of the sorted part one step forward.
      4. Repeat until sorted.`,
      
      code: `def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i+1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
      
      explanation: `Selection Sort repeatedly selects the minimum element.
Best, Average, Worst Case: O(n^2)`,
    },
  };

  const selectedAlgorithm = algorithms[algorithm?.toLowerCase()] || algorithms["bubblesort"];

  return (
    <div className="vis-next">
      <Header />
      <Sidebar />

      <div className="main-box">
        <h1 className="title">{selectedAlgorithm.title} Visualization</h1>

        {/* Visualization placeholder */}
        <div className="visualization-container">
          <p>Visualization for {selectedAlgorithm.title} goes here!</p>
        </div>
      </div>

      {/* Sidebar for toggling between code, algorithm, and explanation */}
      <div className="toggle-container">
        {/* Buttons Container */}
        <div className="buttons-container">
          <button className="toggle-btn" onClick={() => handleClick("algo")}>
            Algorithm
          </button>
          <button className="toggle-btn" onClick={() => handleClick("code")}>
            Code
          </button>
          <button className="toggle-btn" onClick={() => handleClick("exp")}>
            Explanation
          </button>
        </div>

        {/* Conditional rendering based on active section */}
        {activeSection === "algo" && (
          <div className="extra-section">
            <h2>{selectedAlgorithm.title} Algorithm</h2>
            <p>{selectedAlgorithm.steps}</p>
          </div>
        )}

        {activeSection === "code" && (
          <div className="extra-section">
            <h2>{selectedAlgorithm.title} Code</h2>
            <pre>{selectedAlgorithm.code}</pre>
          </div>
        )}

        {activeSection === "exp" && (
          <div className="extra-section">
            <h2>{selectedAlgorithm.title} Explanation</h2>
            <p>{selectedAlgorithm.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisNext;