// src/components/visualizations/trees/AvlTreeDisplay.jsx
import React from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import AvlTreeAnalysis from "../AvlTreeAnalysis";

const AvlTreeDisplay = ({ elements, treeRoot }) => {
  return (
    <div className="space-y-4">
      <div className="h-[500px] border rounded bg-white shadow">
        <ReactFlow nodes={elements.nodes} edges={elements.edges} fitView>
          <Background />
          <Controls />
        </ReactFlow>
      </div>

      {treeRoot && (
        <div className="border p-4 bg-gray-50 rounded shadow">
          <AvlTreeAnalysis root={treeRoot} />
        </div>
      )}
    </div>
  );
};

export default AvlTreeDisplay;

