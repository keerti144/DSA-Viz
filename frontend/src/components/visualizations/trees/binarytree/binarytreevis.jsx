import React, { useState } from "react";
import BinaryTreeControls from "../BinaryTreeControls";
import BinaryTreeDisplay from "../BinaryTreeDisplay";
import BinaryTreeAnalysis from "../BinaryTreeAnalysis";

export function BinaryTreeVisualizer() {
  const [tree, setTree] = useState(null);
  const [history, setHistory] = useState([]);
  const [highlighted, setHighlighted] = useState([]);

  const insert = (value) => {
    const newNode = { value, left: null, right: null };
    const insertNode = (node, val) => {
      if (!node) return { value: val, left: null, right: null };
      if (val < node.value) node.left = insertNode(node.left, val);
      else node.right = insertNode(node.right, val);
      return node;
    };
    setTree((prev) => insertNode(prev, value));
  };

  const traverse = (type) => {
    const result = [];
    const go = (node) => {
      if (!node) return;
      if (type === "preorder") result.push(node.value);
      go(node.left);
      if (type === "inorder") result.push(node.value);
      go(node.right);
      if (type === "postorder") result.push(node.value);
    };
    go(tree);
    setHistory(result);
    setHighlighted(result);
  };

  const reset = () => {
    setTree(null);
    setHistory([]);
    setHighlighted([]);
  };

  return (
    <div className="p-6">
      <BinaryTreeControls onInsert={insert} onTraverse={traverse} onReset={reset} />
      <BinaryTreeDisplay tree={tree} highlighted={highlighted} />
      <BinaryTreeAnalysis tree={tree} />
    </div>
  );
}

export default BinaryTreeVisualizer;
