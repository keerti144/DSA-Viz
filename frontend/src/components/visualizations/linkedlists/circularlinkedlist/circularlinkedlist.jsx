import React, { useState } from "react";

const CircularLinkedListVisualizer = () => {
  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addNode = () => {
    if (inputValue.trim() !== "") {
      setList([...list, inputValue]);
      setInputValue("");
    }
  };

  const deleteNode = () => {
    if (list.length > 0) {
      setList(list.slice(1));
    }
  };

  return (
    <div className="visualizer">
      <h2>Circular Linked List</h2>

      <div className="controls">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter node value"
        />
        <button onClick={addNode}>Add Node</button>
        <button onClick={deleteNode}>Delete Head</button>
      </div>

      <div className="linked-list">
        {list.map((node, index) => (
          <div key={index} className="node">
            {node}
            <span className="arrow">→</span>
          </div>
        ))}
        {list.length > 0 && <div className="node start">Back to Start</div>}
      </div>
    </div>
  );
};

export default CircularLinkedListVisualizer;
