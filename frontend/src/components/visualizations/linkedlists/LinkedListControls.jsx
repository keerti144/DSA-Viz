import React, { useState } from "react";

const LinkedListControls = ({
  onInsertFront,
  onInsertBack,
  onDeleteFront,
  onDeleteBack,
  onReverse,
  isAnimating,
  isEmpty,
}) => {
  const [value, setValue] = useState("");
  const [insertAtFront, setInsertAtFront] = useState(true);

  const handleInsert = () => {
    const num = Number(value);
    if (!isNaN(num)) {
      if (insertAtFront) {
        onInsertFront(num);
      } else {
        onInsertBack(num);
      }
      setValue("");
    }
  };

  return (
    <>
      <div className="controls-container">
        <h3 className="controls-title">Linked List Controls</h3>
        <div className="controls-row">
          <label style={{ marginRight: 8 }}>Insert at Front</label>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={insertAtFront}
              onChange={() => setInsertAtFront(!insertAtFront)}
              disabled={isAnimating}
            />
            <span className="toggle-slider" />
          </label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value"
            onKeyDown={(e) => e.key === "Enter" && handleInsert()}
            disabled={isAnimating}
            className="input-field"
          />
          <button
            onClick={handleInsert}
            disabled={isAnimating || !value.trim()}
            className="insert-button"
          >
            Insert
          </button>
          <button
            onClick={onDeleteFront}
            disabled={isAnimating || isEmpty}
            className="delete-button"
          >
            Delete Front
          </button>
          <button
            onClick={onDeleteBack}
            disabled={isAnimating || isEmpty}
            className="delete-button"
          >
            Delete Back
          </button>
          <button
            onClick={onReverse}
            disabled={isAnimating || isEmpty}
            className="reverse-button"
          >
            Reverse List
          </button>
        </div>
      </div>
    </>
  );
};

export default LinkedListControls;
