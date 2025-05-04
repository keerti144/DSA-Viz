import React from "react";

const GraphDisplay = ({ graph, traversalOrder }) => {
  return (
    <div className="graph-display">
      <h4>Graph Structure</h4>
      <pre>{JSON.stringify(graph, null, 2)}</pre>

      <h4>Traversal Order</h4>
      <div className="traversal-order">
        {traversalOrder.map((node, index) => (
          <span key={index} className="node-box">
            {node}
          </span>
        ))}
      </div>

      <style>{`
        .graph-display {
          background-color: #1e293b;
          padding: 1rem;
          border-radius: 10px;
          color: #f8fafc;
        }

        .traversal-order {
          display: flex;
          gap: 10px;
          margin-top: 1rem;
          flex-wrap: wrap;
        }

        .node-box {
          background-color: #0ea5e9;
          padding: 8px 12px;
          border-radius: 6px;
          color: white;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default GraphDisplay;
