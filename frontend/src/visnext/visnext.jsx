import React, { useState } from "react";
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import "./visnext.css";

export const VisNext = () => {
  const [activeSection, setActiveSection] = useState(null); // Track selected section

  const handleClick = (section) => {
    if (activeSection === section) {
      setActiveSection(null); // Close if already open
    } else {
      setActiveSection(section);
    }
  };

  return (
    <div className="vis-next">
      <Header />
      <Sidebar />

      <div className={`main-box ${activeSection ? "collapsed" : ""}`}>
        <h1 className="title">Topic Name - Visualize</h1>

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
      </div>

      {/* Conditionally Render Sections */}
      {activeSection === "algo" && (
        <div className="extra-section algo-section">
          <h2>Algorithm Visualization</h2>
          <p>Here, you can see a step-by-step simulation of the algorithm.</p>
        </div>
      )}

      {activeSection === "code" && (
        <div className="extra-section code-section">
          <h2>Code Implementation</h2>
          <p>Here, you can view the code for the selected algorithm.</p>
        </div>
      )}

      {activeSection === "exp" && (
        <div className="extra-section exp-section">
          <h2>Explanation</h2>
          <p>This section provides an in-depth explanation of the algorithm.</p>
        </div>
      )}
    </div>
  );
};
