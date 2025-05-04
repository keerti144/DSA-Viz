import React, { useEffect, useState } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

function BinaryTreeDisplay({ tree, highlighted }) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    const generatedNodes = [];
    const generatedEdges = [];

    const traverse = (node, x, y, parentId = null, direction = "") => {
      if (!node) return;

      const id = node.value.toString();
      const label = `${node.value}`;
      const style = {
        border: highlighted.includes(node.value) ? "3px solid red" : "1px solid gray",
        padding: "10px",
        borderRadius: "9999px",
        background: "#f0f0f0",
      };

      generatedNodes.push({
        id,
        data: { label },
        position: { x, y },
        style,
      });

      if (parentId) {
        generatedEdges.push({
          id: `${parentId}-${id}`,
          source: parentId,
          target: id,
          label: direction,
        });
      }

      traverse(node.left, x - 150, y + 100, id, "L");
      traverse(node.right, x + 150, y + 100, id, "R");
    };

    traverse(tree, 0, 0);
    setNodes(generatedNodes);
    setEdges(generatedEdges);
  }, [tree, highlighted]);

  return (
    <div className="w-full h-[500px] border rounded">
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default BinaryTreeDisplay;
