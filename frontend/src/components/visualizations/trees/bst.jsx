import React, { useState } from "react";
import Button from "../../ui/Button";
import { BackButton } from "../../ui/BackButton";
import classes from "../Trees.module.css";

const BST = () => {
  const [values, setValues] = useState([]);
  const [tree, setTree] = useState(null);

  class Node {
    constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
    }
  }

  const insert = (root, val) => {
    if (!root) return new Node(val);
    if (val < root.val) root.left = insert(root.left, val);
    else root.right = insert(root.right, val);
    return root;
  };

  const buildTree = () => {
    let root = null;
    values.forEach(val => {
      root = insert(root, val);
    });
    setTree(root);
  };

  const generateRandomValues = () => {
    const arr = Array.from({ length: 7 }, () => Math.floor(Math.random() * 100));
    setValues(arr);
    setTree(null);
  };

  const displayTree = (node) => {
    if (!node) return null;
    return (
      <div className={classes.node}>
        {node.val}
        <div className={classes.children}>
          {displayTree(node.left)}
          {displayTree(node.right)}
        </div>
      </div>
    );
  };

  return (
    <div className={classes.container}>
      <BackButton />
      <h2 className={classes.heading}>Binary Search Tree (BST)</h2>

      <div className={classes.controls}>
        <Button onClick={generateRandomValues}>Generate Values</Button>
        <Button onClick={buildTree}>Build Tree</Button>
      </div>

      {tree && <div className={classes.treeContainer}>{displayTree(tree)}</div>}
    </div>
  );
};

export default BST;
