import React, { useState } from "react";
import Button from "../../ui/Button";
import { BackButton } from "../../ui/BackButton";
import classes from "../Trees.module.css";

const PostorderTraversal = () => {
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

  const postorder = (root, arr) => {
    if (!root) return;
    postorder(root.left, arr);
    postorder(root.right, arr);
    arr.push(root.val);
  };

  const handleTraversal = () => {
    let root = null;
    values.forEach(val => {
      root = insert(root, val);
    });
    const traversal = [];
    postorder(root, traversal);
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
      <h2 className={classes.heading}>Postorder Traversal</h2>

      <div className={classes.controls}>
        <Button onClick={generateRandomValues}>Generate Values</Button>
        <Button onClick={handleTraversal}>Postorder</Button>
      </div>

      {result.length > 0 && (
        <div className={classes.result}>
          {result.join(" → ")}
        </div>
      )}
    </div>
  );
};

export default PostorderTraversal;
