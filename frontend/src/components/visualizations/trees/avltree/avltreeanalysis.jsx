import React from "react";

const AvlTreeAnalysis = ({ root }) => {
  const getHeight = (node) => {
    if (!node) return 0;
    return 1 + Math.max(getHeight(node.left), getHeight(node.right));
  };

  const isBalanced = (node) => {
    if (!node) return true;
    const lh = getHeight(node.left);
    const rh = getHeight(node.right);
    if (Math.abs(lh - rh) > 1) return false;
    return isBalanced(node.left) && isBalanced(node.right);
  };

  const isBST = (node, min = -Infinity, max = Infinity) => {
    if (!node) return true;
    if (node.value < min || node.value > max) return false;
    return (
      isBST(node.left, min, node.value - 1) &&
      isBST(node.right, node.value + 1, max)
    );
  };

  const countNodes = (node) => {
    if (!node) return 0;
    return 1 + countNodes(node.left) + countNodes(node.right);
  };

  return (
    <div className="p-4 border rounded shadow bg-white max-w-md">
      <h2 className="text-lg font-bold mb-2">Tree Analysis</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Height:</strong> {getHeight(root)}</li>
        <li><strong>Total Nodes:</strong> {countNodes(root)}</li>
        <li><strong>Balanced:</strong> {isBalanced(root) ? "Yes" : "No"}</li>
        <li><strong>Valid BST:</strong> {isBST(root) ? "Yes" : "No"}</li>
      </ul>
    </div>
  );
};

export default AvlTreeAnalysis;

