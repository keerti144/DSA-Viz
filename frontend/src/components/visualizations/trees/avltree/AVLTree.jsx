import React from 'react';
import TreeVisualization from '../TreeVisualization';

const AVLTree = () => {
    const code = `class AVLNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVLTree {
    constructor() {
        this.root = null;
    }

    getHeight(node) {
        return node ? node.height : 0;
    }

    getBalance(node) {
        return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
    }

    rightRotate(y) {
        const x = y.left;
        const T2 = x.right;

        x.right = y;
        y.left = T2;

        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

        return x;
    }

    leftRotate(x) {
        const y = x.right;
        const T2 = y.left;

        y.left = x;
        x.right = T2;

        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;

        return y;
    }

    insert(value) {
        this.root = this.insertNode(this.root, value);
    }

    insertNode(node, value) {
        if (!node) return new AVLNode(value);

        if (value < node.value) {
            node.left = this.insertNode(node.left, value);
        } else if (value > node.value) {
            node.right = this.insertNode(node.right, value);
        } else {
            return node;
        }

        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
        const balance = this.getBalance(node);

        // Left Left Case
        if (balance > 1 && value < node.left.value) {
            return this.rightRotate(node);
        }

        // Right Right Case
        if (balance < -1 && value > node.right.value) {
            return this.leftRotate(node);
        }

        // Left Right Case
        if (balance > 1 && value > node.left.value) {
            node.left = this.leftRotate(node.left);
            return this.rightRotate(node);
        }

        // Right Left Case
        if (balance < -1 && value < node.right.value) {
            node.right = this.rightRotate(node.right);
            return this.leftRotate(node);
        }

        return node;
    }
}`;

    const explanation = `An AVL Tree is a self-balancing Binary Search Tree where the heights of the left and right 
    subtrees of any node differ by at most one. This balancing property ensures that the tree remains 
    approximately balanced, which guarantees O(log n) time complexity for search, insert, and delete 
    operations. The tree maintains its balance through rotations (left and right) when the balance 
    factor of a node becomes greater than 1 or less than -1.`;

    return (
        <TreeVisualization
            algorithm="avl"
            title="AVL Tree"
            timeComplexity="O(log n)"
            spaceComplexity="O(n)"
            code={code}
            explanation={explanation}
        />
    );
};

export default AVLTree; 