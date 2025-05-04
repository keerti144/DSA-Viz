import React from "react";

function BinaryTreeAnalysis({ tree }) {
  if (!tree) return <p className="text-muted-foreground">No tree to analyze.</p>;

  const calculateHeight = (node) => {
    if (!node) return 0;
    return 1 + Math.max(calculateHeight(node.left), calculateHeight(node.right));
  };

  const countNodes = (node) => {
    if (!node) return 0;
    return 1 + countNodes(node.left) + countNodes(node.right);
  };

  const isBSTUtil = (node, min, max) => {
    if (!node) return true;
    if (node.value <= min || node.value >= max) return false;
    return (
      isBSTUtil(node.left, min, node.value) &&
      isBSTUtil(node.right, node.value, max)
    );
  };

  const isBalanced = (node) => {
    const check = (n) => {
      if (!n) return [0, true];
      const [lh, lb] = check(n.left);
      const [rh, rb] = check(n.right);
      const balanced = lb && rb && Math.abs(lh - rh) <= 1;
      return [1 + Math.max(lh, rh), balanced];
    };
    return check(node)[1];
  };

  return (
    <div className="mt-4 space-y-2">
      <h3 className="text-lg font-semibold">Tree Analysis</h3>
      <p>Total Nodes: {countNodes(tree)}</p>
      <p>Height: {calculateHeight(tree)}</p>
      <p>Is BST: {isBSTUtil(tree, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER) ? "Yes" : "No"}</p>
      <p>Is Balanced: {isBalanced(tree) ? "Yes" : "No"}</p>
    </div>
  );
}

export default BinaryTreeAnalysis;
