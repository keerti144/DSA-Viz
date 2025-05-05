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
      return node ? this.height(node.left) - this.height(node.right) : 0;
    }
  
    rightRotate(y) {
      const x = y.left;
      const T2 = x.right;
  
      x.right = y;
      y.left = T2;
  
      y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;
      x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;
  
      return x;
    }
  
    leftRotate(x) {
      const y = x.right;
      const T2 = y.left;
  
      y.left = x;
      x.right = T2;
  
      x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;
      y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;
  
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
  
      node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
  
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
  }
  