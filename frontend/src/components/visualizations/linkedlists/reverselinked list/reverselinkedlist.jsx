import React, { useState } from "react";

const ReverseLinkedListVisualizer = () => {
  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addNode = () => {
    if (inputValue.trim() !== "") {
      setList([...list, inputValue]);
      setInputValue("");
    }
  };

  const reverseList = () => {
    setList([...list].reverse());
  };

  return (
    <div className="visualizer">
      <h2>Reverse Linked List</h2>

      <div className="controls">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter node value"
        />
        <button onClick={addNode}>Add Node</button>
        <button onClick={reverseList}>Reverse List</button>
      </div>

      <div className="linked-list">
        {list.map((node, index) => (
          <div key={index} className="node">
            {node}
            {index !== list.length - 1 && <span className="arrow">→</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReverseLinkedListVisualizer;
