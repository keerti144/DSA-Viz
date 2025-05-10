import React, { useState, useEffect, useRef } from 'react';
import BaseVisualization from '../BaseVisualization';
import './TreeVisualization.css';

const TreeVisualization = ({ algorithm, title, timeComplexity, spaceComplexity, code, explanation }) => {
    const canvasRef = useRef(null);
    const [tree, setTree] = useState(null);
    const [isVisualizing, setIsVisualizing] = useState(false);

    const generateArray = (size) => {
        // Generate a balanced binary tree with 'size' nodes
        const values = Array.from({ length: size }, (_, i) =>
            Math.floor(Math.random() * 100) + 1
        ).sort((a, b) => a - b);

        const buildTree = (arr, start, end) => {
            if (start > end) return null;
            const mid = Math.floor((start + end) / 2);
            return {
                value: arr[mid],
                left: buildTree(arr, start, mid - 1),
                right: buildTree(arr, mid + 1, end),
                x: 0, // Will be set during drawing
                y: 0, // Will be set during drawing
                visited: false,
                current: false
            };
        };

        const root = buildTree(values, 0, values.length - 1);
        setTree(root);
        return root;
    };

    const drawTree = (ctx, node, x, y, level, visited = new Set(), current = null) => {
        if (!node) return;

        const nodeRadius = 20;
        const levelHeight = 80;
        const nodeSpacing = 200 / Math.pow(2, level);

        // Update node position
        node.x = x;
        node.y = y;

        // Draw edges to children
        if (node.left) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x - nodeSpacing, y + levelHeight);
            ctx.strokeStyle = '#666';
            ctx.stroke();
        }
        if (node.right) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + nodeSpacing, y + levelHeight);
            ctx.strokeStyle = '#666';
            ctx.stroke();
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI);

        // Color based on state
        if (current === node) {
            ctx.fillStyle = '#e74c3c'; // Current node
        } else if (visited.has(node)) {
            ctx.fillStyle = '#2ecc71'; // Visited node
        } else {
            ctx.fillStyle = '#3498db'; // Unvisited node
        }

        ctx.fill();
        ctx.strokeStyle = '#2c3e50';
        ctx.stroke();

        // Draw node value
        ctx.fillStyle = 'white';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.value.toString(), x, y);

        // Recursively draw children
        if (node.left) {
            drawTree(ctx, node.left, x - nodeSpacing, y + levelHeight, level + 1, visited, current);
        }
        if (node.right) {
            drawTree(ctx, node.right, x + nodeSpacing, y + levelHeight, level + 1, visited, current);
        }
    };

    const visualize = async (root, speed) => {
        setIsVisualizing(true);
        const ctx = canvasRef.current.getContext('2d');
        const visited = new Set();

        const traverse = async (node, order = 'inorder') => {
            if (!node) return;

            if (order === 'preorder') {
                visited.add(node);
                drawTree(ctx, root, 350, 50, 0, visited, node);
                await new Promise(resolve => setTimeout(resolve, speed));
            }

            await traverse(node.left, order);

            if (order === 'inorder') {
                visited.add(node);
                drawTree(ctx, root, 350, 50, 0, visited, node);
                await new Promise(resolve => setTimeout(resolve, speed));
            }

            await traverse(node.right, order);

            if (order === 'postorder') {
                visited.add(node);
                drawTree(ctx, root, 350, 50, 0, visited, node);
                await new Promise(resolve => setTimeout(resolve, speed));
            }
        };

        await traverse(root, algorithm === 'avl' ? 'inorder' : 'preorder');
        setIsVisualizing(false);
    };

    useEffect(() => {
        if (canvasRef.current && tree) {
            const ctx = canvasRef.current.getContext('2d');
            drawTree(ctx, tree, 350, 50, 0);
        }
    }, [tree]);

    const customRender = () => (
        <div className="tree-container">
            <canvas
                ref={canvasRef}
                width={700}
                height={600}
                className="tree-canvas"
            />
        </div>
    );

    return (
        <BaseVisualization
            title={title}
            algorithm={algorithm}
            timeComplexity={timeComplexity}
            spaceComplexity={spaceComplexity}
            stability="N/A"
            generateArray={generateArray}
            visualize={visualize}
            code={code}
            explanation={explanation}
            customRender={customRender}
        />
    );
};

export default TreeVisualization; 