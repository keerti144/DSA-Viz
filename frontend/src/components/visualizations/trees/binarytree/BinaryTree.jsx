import React from 'react';
import TreeVisualization from '../TreeVisualization';

const BinaryTree = () => {
    const code = `class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new Node(value);
        
        if (!this.root) {
            this.root = newNode;
            return;
        }

        const queue = [this.root];
        while (queue.length > 0) {
            const current = queue.shift();
            
            if (!current.left) {
                current.left = newNode;
                return;
            }
            queue.push(current.left);
            
            if (!current.right) {
                current.right = newNode;
                return;
            }
            queue.push(current.right);
        }
    }

    // Tree Traversals
    inorderTraversal(node = this.root) {
        if (!node) return;
        this.inorderTraversal(node.left);
        console.log(node.value);
        this.inorderTraversal(node.right);
    }

    preorderTraversal(node = this.root) {
        if (!node) return;
        console.log(node.value);
        this.preorderTraversal(node.left);
        this.preorderTraversal(node.right);
    }

    postorderTraversal(node = this.root) {
        if (!node) return;
        this.postorderTraversal(node.left);
        this.postorderTraversal(node.right);
        console.log(node.value);
    }
}`;

    const explanation = `A Binary Tree is a hierarchical data structure where each node has at most two children, 
    referred to as the left child and the right child. Unlike a Binary Search Tree, there is no specific 
    ordering of values in a Binary Tree. Binary Trees are commonly used to represent hierarchical data 
    and can be traversed in three ways:
    1. Inorder (Left, Root, Right)
    2. Preorder (Root, Left, Right)
    3. Postorder (Left, Right, Root)
    
    Each traversal method has its own use cases and provides different ways to process the tree nodes.`;

    return (
        <TreeVisualization
            algorithm="binary"
            title="Binary Tree"
            timeComplexity="O(n)"
            spaceComplexity="O(n)"
            code={code}
            explanation={explanation}
        />
    );
};

export default BinaryTree; 