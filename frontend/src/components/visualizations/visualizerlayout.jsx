import React from "react";
import { Outlet } from "react-router-dom";
import "./VisualizerLayout.css";
import SortingVisualization from './sorting/SortingVisualization';
import StackVisualizer from './stack/StackVisualizer';
import QueueVisualizer from './queue/QueueVisualizer';
// import TreeVisualizer, LinkedListVisualizer as needed

const visualizerMap = {
  bubblesort: () => <SortingVisualization title="Bubble Sort" algorithm={bubbleSortSteps} code={bubbleSortCode} explanation={bubbleSortExplanation} />,
  insertionsort: () => <SortingVisualization title="Insertion Sort" algorithm={insertionSortSteps} code={insertionSortCode} explanation={insertionSortExplanation} />,
  stack: () => <StackVisualizer />,
  queue: () => <QueueVisualizer />,
  // Add tree, linked list, etc. here
};

const VisualizerLayout = ({ algorithm }) => {
  const Visualizer = visualizerMap[algorithm?.toLowerCase()] || (() => <div>Select an algorithm</div>);
  return (
    <div className="visualizer-container">
      {/* Center Visualization Area */}
      <div className="visualizer-main">
        {/* This will render the algorithm visualization dynamically */}
        <Outlet />
      </div>

      {/* Right Sidebar Controls */}
      <div className="visualizer-controls">
        <h2>Controls</h2>
        <div className="control-group">
          <label>Speed:</label>
          <input type="range" min="1" max="10" />
        </div>
        <div className="control-group">
          <label>Size:</label>
          <input type="range" min="5" max="100" />
        </div>
        <div className="buttons-group">
          <button className="start-button">Start</button>
          <button className="reset-button">Reset</button>
        </div>
      </div>
    </div>
  );
};

export default VisualizerLayout;
