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
        <h3 className="controls-title">List Controls</h3>

        <div className="controls-row">
          <label>Insert at Front</label>
          <input
            type="checkbox"
            checked={insertAtFront}
            onChange={() => setInsertAtFront(!insertAtFront)}
            disabled={isAnimating}
          />
        </div>

        <div className="controls-row">
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
        </div>

        <div className="controls-row">
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
        </div>

        <button
          onClick={onReverse}
          disabled={isAnimating || isEmpty}
          className="reverse-button"
        >
          Reverse List
        </button>
      </div>

      {/* Inline Style Tag */}
      <style>
        {`
          .controls-container {
            background-color: #f3f4f6;
            padding: 16px;
            border-radius: 8px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          }

          .controls-title {
            font-size: 1.25rem;
            font-weight: bold;
            margin-bottom: 16px;
          }

          .controls-row {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 16px;
          }

          .input-field {
            flex: 1;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 6px;
          }

          .insert-button {
            background-color: #3b82f6;
            color: white;
            padding: 8px 12px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
          }

          .insert-button:disabled {
            background-color: #93c5fd;
            cursor: not-allowed;
          }

          .delete-button {
            flex: 1;
            background-color: #ef4444;
            color: white;
            padding: 8px 12px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
          }

          .delete-button:disabled {
            background-color: #fca5a5;
            cursor: not-allowed;
          }

          .reverse-button {
            width: 100%;
            background-color: #374151;
            color: white;
            padding: 8px 12px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
          }

          .reverse-button:disabled {
            background-color: #9ca3af;
            cursor: not-allowed;
          }
        `}
      </style>
    </>
  );
};

export default LinkedListControls;
