import React from "react";

const LinkedListDisplay = ({
  list,
  highlightedNodes = [],
  isDoubly = false,
  isCircular = false,
}) => {
  return (
    <div className="list-container">
      {list.map((node, index) => (
        <React.Fragment key={index}>
          <div className="node-circle-wrapper">
            <div
              className={`node-circle${highlightedNodes.includes(node) ? " highlighted" : ""}`}
            >
              {node}
            </div>
            {/* Arrow to next node */}
            {(index !== list.length - 1 || isCircular) && (
              <span className="node-arrow">
                {isDoubly ? <>&#8646;</> : <>&#8594;</>}
              </span>
            )}
          </div>
        </React.Fragment>
      ))}
      {isCircular && list.length > 0 && (
        <div className="circular-label">↻ Circular Link to Start</div>
      )}
    </div>
  );
};

export default LinkedListDisplay;
