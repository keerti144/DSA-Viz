import React, { useState } from "react";

const GraphControls = ({ addEdge, dfs, bfs, isAnimating, setIsAnimating }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [startNode, setStartNode] = useState("");

  const handleAddEdge = () => {
    if (from && to) {
      addEdge(from, to);
      setFrom("");
      setTo("");
    }
  };

  return (
    <div className="graph-controls">
      <h3>Graph Controls</h3>

      <div className="control-row">
        <input
          type="text"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          placeholder="From"
          disabled={isAnimating}
        />
        <input
          type="text"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="To"
          disabled={isAnimating}
        />
        <button onClick={handleAddEdge} disabled={isAnimating}>
          Add Edge
        </button>
      </div>

      <div className="control-row">
        <input
          type="text"
          value={startNode}
          onChange={(e) => setStartNode(e.target.value)}
          placeholder="Start Node"
          disabled={isAnimating}
        />
        <button onClick={() => dfs(startNode)} disabled={isAnimating}>
          Run DFS
        </button>
        <button onClick={() => bfs(startNode)} disabled={isAnimating}>
          Run BFS
        </button>
      </div>

      <style>{`
        .graph-controls {
          background-color: #1f2937;
          color: #f8fafc;
          padding: 1rem;
          border-radius: 10px;
          margin-bottom: 1rem;
        }

        .control-row {
          display: flex;
          gap: 10px;
          margin-bottom: 10px;
        }

        input {
          padding: 0.5rem;
          background-color: #334155;
          border: 1px solid #475569;
          border-radius: 6px;
          color: #f8fafc;
        }

        button {
          background-color: #3b82f6;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
        }

        button:disabled {
          background-color: #93c5fd;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default GraphControls;
