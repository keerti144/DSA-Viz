import React from "react";

const LinkedListDisplay = ({ list, highlightedNodes = [] }) => {
  return (
    <>
      <div className="list-container">
        {list.map((node, index) => (
          <div
            key={index}
            className={`node ${highlightedNodes.includes(node) ? "highlighted" : ""}`}
          >
            {node}
            {index !== list.length - 1 && (
              <span className="arrow">→</span>
            )}
          </div>
        ))}
        {list.length > 0 && (
          <div className="back-to-start">Back to Start</div>
        )}
      </div>

      {/* Inline Style Tag */}
      <style>
        {`
          .list-container {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            padding: 16px;
            background-color: #f9fafb;
            border-radius: 8px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
            gap: 16px;
          }

          .node {
            position: relative;
            padding: 16px;
            border: 1px solid #ccc;
            border-radius: 6px;
            background-color: white;
            min-width: 50px;
            text-align: center;
          }

          .highlighted {
            background-color: #bfdbfe;
          }

          .arrow {
            position: absolute;
            right: -20px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 18px;
            color: #6b7280;
          }

          .back-to-start {
            padding: 16px;
            font-size: 12px;
            color: #9ca3af;
          }
        `}
      </style>
    </>
  );
};

export default LinkedListDisplay;
