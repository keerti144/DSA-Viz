import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../header/header.jsx";
import Sidebar from "../sidebar/sidebar.jsx";
import "./visnext.css";

export const VisNext = () => {
  const { algorithm } = useParams(); // Get the algorithm name from the URL
  const [activeSection, setActiveSection] = useState("algo"); // Default to algorithm visualization

  const handleClick = (section) => {
    setActiveSection(section);
  };

  useEffect(() => {
    // You can fetch or render specific content based on the algorithm
    console.log("Current algorithm:", algorithm);
  }, [algorithm]);

  const bubblesortalg = {
    title: "Bubble Sort",
    steps: `Steps:
      1. Compare the first two elements.
      2. If the first element is greater than the second, swap them.
      3. Move to the next adjacent pair of elements and repeat the process.
      4. Repeat the entire process for the entire list, reducing the range of comparison with each iteration, as the largest element moves to the end of the list.
      5. Once no swaps are made in a full pass, the algorithm finishes.`,
    
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
      
    explanation: `Bubble Sort is a simple comparison-based sorting algorithm. It works by repeatedly stepping through the list, comparing adjacent elements, and swapping them if they are in the wrong order. The algorithm continues looping through the list until no swaps are required, indicating that the list is sorted.
      
      Best Case:
       O(n) (when the list is already sorted)
      Average and Worst Case:
       O(n^2) (when the list is in reverse order or has random values)`,
      
    visualization: (arr) => {
      // Visualization logic (e.g., render an array of items being sorted)
      return (
        <div>
          <p>Visualization for Bubble Sort will go here</p>
          <p>{`Sorted Array: [${arr}]`}</p> {/* Example: Visualize the final sorted array */}
        </div>
      );
    }
  };
  

  return (
    <div className="vis-next">
      <Header />
      <Sidebar />

      <div className="main-box">
        <h1 className="title">{algorithm ? `${algorithm} Visualization` : "Algorithm Visualization"}</h1>

        {/* Here you would render the algorithm visualization dynamically */}
        <div className="visualization-container">
          {/* Placeholder text for visualization */}
          <p>Visualization for {algorithm} goes here!</p>
        </div>
      </div>

      {/* Sidebar for toggling between code, algorithm, and explanation */}
      <div className="toggle-container">
        <button className="toggle-btn" onClick={() => handleClick("algo")}>
          Algorithm
        </button>
        <button className="toggle-btn" onClick={() => handleClick("code")}>
          Code
        </button>
        <button className="toggle-btn" onClick={() => handleClick("exp")}>
          Explanation
        </button>

        {/* Conditional rendering of content based on the active section */}
        {activeSection === "algo" && (
          <div className="extra-section">
            <h2>{bubblesortalg.title} Algorithm</h2>
            {/* Displaying the steps */}
            <p>{bubblesortalg.steps}</p>
          </div>
        )}

        {activeSection === "code" && (
          <div className="extra-section">
            <h2>{bubblesortalg.title} Code</h2>
            {/* Displaying the code */}
            <pre>{bubblesortalg.code}</pre>
          </div>
        )}

        {activeSection === "exp" && (
          <div className="extra-section">
            <h2>{bubblesortalg.title} Explanation</h2>
            {/* Displaying the explanation and time complexities */}
            <p>{bubblesortalg.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisNext;
