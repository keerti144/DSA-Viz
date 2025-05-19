// src/components/visualizations/trees/avltree.js

export class AVLNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

export class AVLTree {
  constructor() {
    this.root = null;
  }

  height(node) {
    return node ? node.height : 0;
  }

  getBalance(node) {
    if (!node) return 0;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return leftHeight - rightHeight;
  }

  updateHeight(node) {
    if (!node) return;
    node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  rightRotate(y) {
    if (!y || !y.left) return y;

    const x = y.left;
    const T2 = x.right;

    x.right = y;
    y.left = T2;

    this.updateHeight(y);
    this.updateHeight(x);

    return x;
  }

  leftRotate(x) {
    if (!x || !x.right) return x;

    const y = x.right;
    const T2 = y.left;

    y.left = x;
    x.right = T2;

    this.updateHeight(x);
    this.updateHeight(y);

    return y;
  }

  insert(value) {
    this.root = this._insert(this.root, value);
  }

  _insert(node, value) {
    if (!node) return new AVLNode(value);

    if (value < node.value) {
      node.left = this._insert(node.left, value);
    } else if (value > node.value) {
      node.right = this._insert(node.right, value);
    } else {
      return node;
    }

    this.updateHeight(node);

    const balance = this.getBalance(node);

    if (balance > 1 && value < node.left.value) return this.rightRotate(node);
    if (balance < -1 && value > node.right.value) return this.leftRotate(node);
    if (balance > 1 && value > node.left.value) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }
    if (balance < -1 && value < node.right.value) {
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }

    return node;
  }

  isBalanced(node = this.root) {
    if (!node) return true;

    const balance = this.getBalance(node);
    if (Math.abs(balance) > 1) return false;

    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  getTreeHeight(node = this.root) {
    if (!node) return 0;
    return node.height;
  }
}
