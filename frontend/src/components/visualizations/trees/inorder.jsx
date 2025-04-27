import React, { useState } from "react";
import Button from "../../ui/Button";
import { BackButton } from "../../ui/BackButton";
import classes from "../Trees.module.css";

const InorderTraversal = () => {
  const [values, setValues] = useState([]);
  const [result, setResult] = useState([]);

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

  const inorder = (root, arr) => {
    if (!root) return;
    inorder(root.left, arr);
    arr.push(root.val);
    inorder(root.right, arr);
  };

  const handleTraversal = () => {
    let root = null;
    values.forEach(val => {
      root = insert(root, val);
    });
    const traversal = [];
    inorder(root, traversal);
    setResult(traversal);
  };

  const generateRandomValues = () => {
    const arr = Array.from({ length: 7 }, () => Math.floor(Math.random() * 100));
    setValues(arr);
    setResult([]);
  };

  return (
    <div className={classes.container}>
      <BackButton />
      <h2 className={classes.heading}>Inorder Traversal</h2>

      <div className={classes.controls}>
        <Button onClick={generateRandomValues}>Generate Values</Button>
        <Button onClick={handleTraversal}>Inorder</Button>
      </div>

      {result.length > 0 && (
        <div className={classes.result}>
          {result.join(" → ")}
        </div>
      )}
    </div>
  );
};

export default InorderTraversal;
