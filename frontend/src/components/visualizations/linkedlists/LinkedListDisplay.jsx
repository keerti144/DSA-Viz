import React from "react";

const LinkedListDisplay = ({
  list,
  highlightedNodes = [],
  isDoubly = false,
  isCircular = false,
}) => {
  return (
    <>
      <div className="list-container">
        {list.map((node, index) => (
          <div key={index} className="node-wrapper">
            <div
              className={`node ${highlightedNodes.includes(node) ? "highlighted" : ""}`}
            >
              {node}
            </div>
            {/* Render arrow if not last node or if circular */}
            {(index !== list.length - 1 || isCircular) && (
              <span className="arrow">
                {isDoubly ? "⇄" : "→"}
              </span>
            )}
          </div>
        ))}

        {isCircular && list.length > 0 && (
          <div className="circular-label">↻ Circular Link to Start</div>
        )}
      </div>

      <style>
        {`
          .list-container {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            padding: 16px;
            background-color: #0f172a;
            border-radius: 8px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
            gap: 24px;
            min-height: 100px;
          }

          .node-wrapper {
            display: flex;
            align-items: center;
          }

          .node {
            position: relative;
            padding: 12px 16px;
            border: 2px solid #3b82f6;
            border-radius: 10px;
            background-color: #1e293b;
            color: #f8fafc;
            font-weight: bold;
            font-size: 16px;
            min-width: 60px;
            text-align: center;
          }

          .highlighted {
            background-color: #3b82f6;
          }

          .arrow {
            font-size: 22px;
            color: #f8fafc;
            margin-left: 10px;
            margin-right: 10px;
          }

          .circular-label {
            padding: 12px;
            font-size: 14px;
            color: #9ca3af;
            font-style: italic;
          }
        `}
      </style>
    </>
  );
};

export default LinkedListDisplay;
