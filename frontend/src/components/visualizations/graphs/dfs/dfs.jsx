import React, { useState, useRef } from "react";
import Button from "../../ui/Button";
import getDFS from "./getdfs";
import { BackButton } from "../../ui/BackButton";
import classes from "../Graph.module.css";

const DFS = () => {
  const [graph, setGraph] = useState([]);
  const [startNode, setStartNode] = useState(0);
  const nodeRef = useRef(null);

  const generateGraph = () => {
    const nodes = 6;
    const newGraph = Array.from({ length: nodes }, () => []);
    for (let i = 0; i < nodes; i++) {
      const edges = Math.floor(Math.random() * (nodes - 1)) + 1;
      for (let j = 0; j < edges; j++) {
        const target = Math.floor(Math.random() * nodes);
        if (target !== i && !newGraph[i].includes(target)) {
          newGraph[i].push(target);
        }
      }
    }
    setGraph(newGraph);
  };

  const visualizeDFS = () => {
    const animations = getDFS(graph, startNode);
    animations.forEach((node, idx) => {
      setTimeout(() => {
        const elements = document.getElementsByClassName(nodeRef.current.className);
        if (elements[node]) {
          elements[node].style.backgroundColor = "#ff9800";
        }
      }, idx * 500);
    });
  };

  return (
    <div className={classes.container}>
      <BackButton />
      <h2 className={classes.heading}>Depth First Search</h2>
      <div className={classes.graph}>
        {graph.map((edges, idx) => (
          <div
            key={idx}
            ref={nodeRef}
            className={classes.node}
          >
            {idx}
          </div>
        ))}
      </div>
      <div className={classes.button}>
        <Button onClick={generateGraph}>Generate Graph</Button>
        <Button onClick={visualizeDFS}>Start DFS</Button>
      </div>
    </div>
  );
};

export default DFS;
