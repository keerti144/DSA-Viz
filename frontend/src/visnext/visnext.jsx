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

  return (
    <div className="vis-next">
      <Header />
      <Sidebar />

      <div className="main-box">
        <h1 className="title">{algorithm ? `${algorithm} Visualization` : "Algorithm Visualization"}</h1>

        {/* Here you would render the algorithm visualization dynamically */}
        <div className="visualization-container">
          {/* Replace this with the actual visualization of the algorithm */}
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
            <h2>{algorithm} Algorithm Visualization</h2>
            {/* Insert the dynamic visualization for the selected algorithm */}
            <p>Visualization for {algorithm} algorithm goes here.</p>
          </div>
        )}

        {activeSection === "code" && (
          <div className="extra-section">
            <h2>{algorithm} Code</h2>
            {/* Insert code display for the selected algorithm */}
            <pre>
              {`// Example code for ${algorithm}`}
              {/* Add actual code here */}
            </pre>
          </div>
        )}

        {activeSection === "exp" && (
          <div className="extra-section">
            <h2>{algorithm} Explanation</h2>
            {/* Insert the explanation for the selected algorithm */}
            <p>Explanation for {algorithm} algorithm goes here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisNext;
