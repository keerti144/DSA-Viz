import React from "react";
import { Outlet } from "react-router-dom";
import "./VisualizerLayout.css";

const VisualizerLayout = () => {
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
