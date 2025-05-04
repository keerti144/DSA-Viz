import React, { useState } from "react";
import GraphControls from "../GraphControls";
import GraphDisplay from "./GraphDisplay";

const DFS = () => {
  const [graph, setGraph] = useState({});
  const [traversalOrder, setTraversalOrder] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const addEdge = (from, to) => {
    setGraph((prevGraph) => {
      const updated = { ...prevGraph };
      if (!updated[from]) updated[from] = [];
      updated[from].push(to);
      return updated;
    });
  };

  const dfs = (start) => {
    if (!start || !graph[start]) return;
    const visited = new Set();
    const result = [];

    const dfsHelper = (node) => {
      if (visited.has(node)) return;
      visited.add(node);
      result.push(node);
      for (let neighbor of graph[node] || []) {
        dfsHelper(neighbor);
      }
    };

    dfsHelper(start);
    setTraversalOrder(result);
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "#0f172a", minHeight: "100vh" }}>
      <h2 style={{ color: "#f8fafc", fontSize: "2rem", marginBottom: "1rem" }}>
        DFS Visualizer
      </h2>

      <GraphControls
        addEdge={addEdge}
        dfs={dfs}
        bfs={() => {}}
        isAnimating={isAnimating}
        setIsAnimating={setIsAnimating}
      />

      <GraphDisplay graph={graph} traversalOrder={traversalOrder} />
    </div>
  );
};

export default DFS;
