import React, { useState } from "react";
import Button from "../../ui/Button";
import { BackButton } from "../../ui/BackButton";
import classes from "../Trees.module.css";

const AVLTree = () => {
  const [values, setValues] = useState([]);
  const [tree, setTree] = useState(null);

  class Node {
    constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
      this.height = 1;
    }
  }

  const height = (node) => node ? node.height : 0;

  const rightRotate = (y) => {
    const x = y.left;
    const T2 = x.right;

    x.right = y;
    y.left = T2;

    y.height = Math.max(height(y.left), height(y.right)) + 1;
    x.height = Math.max(height(x.left), height(x.right)) + 1;

    return x;
  };

  const leftRotate = (x) => {
    const y = x.right;
    const T2 = y.left;

    y.left = x;
    x.right = T2;

    x.height = Math.max(height(x.left), height(x.right)) + 1;
    y.height = Math.max(height(y.left), height(y.right)) + 1;

    return y;
  };

  const getBalance = (node) => {
    return node ? height(node.left) - height(node.right) : 0;
  };

  const insert = (root, val) => {
    if (!root) return new Node(val);

    if (val < root.val) root.left = insert(root.left, val);
    else if (val > root.val) root.right = insert(root.right, val);
    else return root; // Duplicate keys not allowed

    root.height = 1 + Math.max(height(root.left), height(root.right));
    const balance = getBalance(root);

    if (balance > 1 && val < root.left.val) return rightRotate(root);
    if (balance < -1 && val > root.right.val) return leftRotate(root);
    if (balance > 1 && val > root.left.val) {
      root.left = leftRotate(root.left);
      return rightRotate(root);
    }
    if (balance < -1 && val < root.right.val) {
      root.right = rightRotate(root.right);
      return leftRotate(root);
    }

    return root;
  };

  const buildAVL = () => {
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
      <h2 className={classes.heading}>AVL Tree (Self-Balancing BST)</h2>

      <div className={classes.controls}>
        <Button onClick={generateRandomValues}>Generate Values</Button>
        <Button onClick={buildAVL}>Build AVL</Button>
      </div>

      {tree && <div className={classes.treeContainer}>{displayTree(tree)}</div>}
    </div>
  );
};

export default AVLTree;
