import React, { useState, useRef, useEffect } from 'react';
import AlgoSidebar from '../AlgoSidebar';
import Header from '../../../header/header.jsx';
import Sidebar from '../../../sidebar/sidebar.jsx';
import '../BaseVisualization.css';
import './TreeVisualization.css';

function getRandomArray(size = 10) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
}

// BST insert (returns steps for visualization)
function getBSTSteps(values) {
    const steps = [];
    let root = null;
    function insert(node, value, path = []) {
        if (!node) {
            const newNode = { value, left: null, right: null, path: [...path, value] };
            return newNode;
        }
        if (value < node.value) {
            node.left = insert(node.left, value, [...path, node.value]);
        } else {
            node.right = insert(node.right, value, [...path, node.value]);
        }
        return node;
    }
    let currentTree = null;
    for (let i = 0; i < values.length; i++) {
        currentTree = insert(JSON.parse(JSON.stringify(currentTree)), values[i]);
        steps.push({
            tree: JSON.parse(JSON.stringify(currentTree)),
            inserted: values[i],
            step: i + 1,
            total: values.length
        });
    }
    return steps;
}

// AVL insert (returns steps for visualization, including rotations)
function getAVLSteps(values) {
    const steps = [];
    function clone(node) {
        if (!node) return null;
        return {
            value: node.value,
            left: clone(node.left),
            right: clone(node.right),
            height: node.height,
        };
    }
    function height(node) {
        return node ? node.height : 0;
    }
    function updateHeight(node) {
        if (node) node.height = 1 + Math.max(height(node.left), height(node.right));
    }
    function getBalance(node) {
        return node ? height(node.left) - height(node.right) : 0;
    }
    function rightRotate(y) {
        const x = y.left;
        const T2 = x.right;
        x.right = y;
        y.left = T2;
        updateHeight(y);
        updateHeight(x);
        return x;
    }
    function leftRotate(x) {
        const y = x.right;
        const T2 = y.left;
        y.left = x;
        x.right = T2;
        updateHeight(x);
        updateHeight(y);
        return y;
    }
    function insert(node, value, stepList, path = []) {
        if (!node) {
            const newNode = { value, left: null, right: null, height: 1 };
            return newNode;
        }
        if (value < node.value) {
            node.left = insert(node.left, value, stepList, [...path, node.value]);
        } else if (value > node.value) {
            node.right = insert(node.right, value, stepList, [...path, node.value]);
        } else {
            return node;
        }
        updateHeight(node);
        const balance = getBalance(node);
        // Left Left
        if (balance > 1 && value < node.left.value) {
            stepList.push({
                tree: clone(node),
                inserted: value,
                rotation: 'Right Rotation (LL)',
                rotateNode: node.value,
                step: stepList.length + 1,
                total: values.length
            });
            return rightRotate(node);
        }
        // Right Right
        if (balance < -1 && value > node.right.value) {
            stepList.push({
                tree: clone(node),
                inserted: value,
                rotation: 'Left Rotation (RR)',
                rotateNode: node.value,
                step: stepList.length + 1,
                total: values.length
            });
            return leftRotate(node);
        }
        // Left Right
        if (balance > 1 && value > node.left.value) {
            stepList.push({
                tree: clone(node),
                inserted: value,
                rotation: 'Left-Right Rotation (LR)',
                rotateNode: node.value,
                step: stepList.length + 1,
                total: values.length
            });
            node.left = leftRotate(node.left);
            return rightRotate(node);
        }
        // Right Left
        if (balance < -1 && value < node.right.value) {
            stepList.push({
                tree: clone(node),
                inserted: value,
                rotation: 'Right-Left Rotation (RL)',
                rotateNode: node.value,
                step: stepList.length + 1,
                total: values.length
            });
            node.right = rightRotate(node.right);
            return leftRotate(node);
        }
        return node;
    }
    let root = null;
    for (let i = 0; i < values.length; i++) {
        root = insert(root, values[i], steps);
        steps.push({
            tree: clone(root),
            inserted: values[i],
            rotation: null,
            rotateNode: null,
            step: steps.length + 1,
            total: values.length
        });
    }
    return steps;
}

// Helper to clone a tree node
function clone(node) {
    if (!node) return null;
    return {
        value: node.value,
        left: clone(node.left),
        right: clone(node.right),
        height: node.height,
    };
}

// Generate traversal steps for BST insertion
function getBSTInsertSteps(root, value) {
    const steps = [];
    let current = root ? clone(root) : null;
    let path = [];
    let node = current;
    let parent = null;
    let dir = null;
    // Traverse to insertion point
    while (node) {
        path.push(node.value);
        steps.push({
            tree: clone(current),
            highlight: [...path],
            inserted: value,
            atNode: node.value,
            insertedYet: false,
        });
        parent = node;
        if (value < node.value) {
            dir = 'left';
            node = node.left;
        } else {
            dir = 'right';
            node = node.right;
        }
    }
    // Insert the node
    if (!parent) {
        current = { value, left: null, right: null };
    } else {
        if (dir === 'left') parent.left = { value, left: null, right: null };
        else parent.right = { value, left: null, right: null };
    }
    steps.push({
        tree: clone(current),
        highlight: [...path, value],
        inserted: value,
        atNode: value,
        insertedYet: true,
    });
    return steps;
}

// Helper to get tree depth
function getTreeDepth(node) {
    if (!node) return 0;
    return 1 + Math.max(getTreeDepth(node.left), getTreeDepth(node.right));
}

// Generate traversal steps for AVL insertion (with rotations)
function getAVLInsertSteps(root, value) {
    // We'll use a local AVL insert that records each step
    const steps = [];
    function clone(node) {
        if (!node) return null;
        return {
            value: node.value,
            left: clone(node.left),
            right: clone(node.right),
            height: node.height,
        };
    }
    function height(node) {
        return node ? node.height : 0;
    }
    function updateHeight(node) {
        if (node) node.height = 1 + Math.max(height(node.left), height(node.right));
    }
    function getBalance(node) {
        return node ? height(node.left) - height(node.right) : 0;
    }
    function rightRotate(y) {
        const x = y.left;
        const T2 = x.right;
        x.right = y;
        y.left = T2;
        updateHeight(y);
        updateHeight(x);
        return x;
    }
    function leftRotate(x) {
        const y = x.right;
        const T2 = y.left;
        y.left = x;
        x.right = T2;
        updateHeight(x);
        updateHeight(y);
        return y;
    }
    function insert(node, value, path = []) {
        if (!node) {
            const newNode = { value, left: null, right: null, height: 1 };
            steps.push({
                tree: clone(newNode),
                inserted: value,
                rotation: null,
                rotateNode: null,
                step: steps.length + 1,
                highlight: [...path, value],
                insertedYet: true,
            });
            return newNode;
        }
        if (value < node.value) {
            node.left = insert(node.left, value, [...path, node.value]);
        } else if (value > node.value) {
            node.right = insert(node.right, value, [...path, node.value]);
        } else {
            // Duplicate, do nothing
            steps.push({
                tree: clone(node),
                inserted: value,
                rotation: null,
                rotateNode: null,
                step: steps.length + 1,
                highlight: [...path, value],
                insertedYet: false,
            });
            return node;
        }
        updateHeight(node);
        const balance = getBalance(node);
        // Left Left
        if (balance > 1 && value < node.left.value) {
            // Step before rotation
            steps.push({
                tree: clone(node),
                inserted: value,
                rotation: 'Right Rotation (LL)',
                rotateNode: node.value,
                step: steps.length + 1,
                highlight: [...path, node.value],
                insertedYet: true,
                beforeRotation: true,
            });
            // Step after rotation
            const rotated = rightRotate(node);
            steps.push({
                tree: clone(rotated),
                inserted: value,
                rotation: 'Right Rotation (LL)',
                rotateNode: node.value,
                step: steps.length + 1,
                highlight: [...path, node.value],
                insertedYet: true,
                afterRotation: true,
            });
            return rotated;
        }
        // Right Right
        if (balance < -1 && value > node.right.value) {
            steps.push({
                tree: clone(node),
                inserted: value,
                rotation: 'Left Rotation (RR)',
                rotateNode: node.value,
                step: steps.length + 1,
                highlight: [...path, node.value],
                insertedYet: true,
                beforeRotation: true,
            });
            const rotated = leftRotate(node);
            steps.push({
                tree: clone(rotated),
                inserted: value,
                rotation: 'Left Rotation (RR)',
                rotateNode: node.value,
                step: steps.length + 1,
                highlight: [...path, node.value],
                insertedYet: true,
                afterRotation: true,
            });
            return rotated;
        }
        // Left Right
        if (balance > 1 && value > node.left.value) {
            steps.push({
                tree: clone(node),
                inserted: value,
                rotation: 'Left-Right Rotation (LR)',
                rotateNode: node.value,
                step: steps.length + 1,
                highlight: [...path, node.value],
                insertedYet: true,
                beforeRotation: true,
            });
            node.left = leftRotate(node.left);
            const rotated = rightRotate(node);
            steps.push({
                tree: clone(rotated),
                inserted: value,
                rotation: 'Left-Right Rotation (LR)',
                rotateNode: node.value,
                step: steps.length + 1,
                highlight: [...path, node.value],
                insertedYet: true,
                afterRotation: true,
            });
            return rotated;
        }
        // Right Left
        if (balance < -1 && value < node.right.value) {
            steps.push({
                tree: clone(node),
                inserted: value,
                rotation: 'Right-Left Rotation (RL)',
                rotateNode: node.value,
                step: steps.length + 1,
                highlight: [...path, node.value],
                insertedYet: true,
                beforeRotation: true,
            });
            node.right = rightRotate(node.right);
            const rotated = leftRotate(node);
            steps.push({
                tree: clone(rotated),
                inserted: value,
                rotation: 'Right-Left Rotation (RL)',
                rotateNode: node.value,
                step: steps.length + 1,
                highlight: [...path, node.value],
                insertedYet: true,
                afterRotation: true,
            });
            return rotated;
        }
        // Normal step
        steps.push({
            tree: clone(node),
            inserted: value,
            rotation: null,
            rotateNode: null,
            step: steps.length + 1,
            highlight: [...path, node.value],
            insertedYet: true,
        });
        return node;
    }
    let newRoot = insert(root, value);
    return steps;
}

// Helper to get tree width (leftmost to rightmost node)
function getTreeWidth(node, level = 0, positions = { min: Infinity, max: -Infinity }) {
    if (!node) return positions;
    
    // Update min and max positions
    positions.min = Math.min(positions.min, level);
    positions.max = Math.max(positions.max, level);
    
    // Recursively check children
    if (node.left) getTreeWidth(node.left, level - 1, positions);
    if (node.right) getTreeWidth(node.right, level + 1, positions);
    
    return positions;
}

const sidebarData = {
    binary: {
        algorithm: `Insert(node, value):\n  if node is null:\n    return new Node(value)\n  if value < node.value:\n    node.left = Insert(node.left, value)\n  else:\n    node.right = Insert(node.right, value)\n  return node`,
        code: `class Node {\n  constructor(value) {\n    this.value = value;\n    this.left = null;\n    this.right = null;\n  }\n}\nfunction insert(node, value) {\n  if (!node) return new Node(value);\n  if (value < node.value) node.left = insert(node.left, value);\n  else node.right = insert(node.right, value);\n  return node;\n}`,
        explanation: `A Binary Search Tree (BST) is a binary tree where each node has a value greater than all values in its left subtree and less than all values in its right subtree. Insertion is done by traversing the tree and placing the new value in the correct position.`
    },
    avl: {
        algorithm: `Insert(node, value):\n  if node is null:\n    return new Node(value)\n  if value < node.value:\n    node.left = Insert(node.left, value)\n  else:\n    node.right = Insert(node.right, value)\n  Update height\n  Get balance\n  If unbalanced, rotate (LL, RR, LR, RL)\n  return node`,
        code: `// AVL insert with rotations\nfunction insert(node, value) {\n  // ... standard BST insert ...\n  // Update height, check balance\n  // Perform rotations if needed\n  return node;\n}`,
        explanation: `An AVL Tree is a self-balancing BST. After each insertion, the tree checks the balance factor of each node and performs rotations (left, right, left-right, right-left) to keep the tree balanced. This ensures O(log n) operations.`
    }
};

export default function TreeVisualization({ algorithm, title }) {
    const [input, setInput] = useState("");
    const [root, setRoot] = useState(null);
    const [steps, setSteps] = useState([]);
    const [stepIdx, setStepIdx] = useState(0);
    const [inserting, setInserting] = useState(false);
    const [pendingValue, setPendingValue] = useState(null);
    const visualizationRef = useRef(null);

    const sidebar = sidebarData[algorithm] || {};

    // Auto-scroll to top when tree changes
    useEffect(() => {
        if (visualizationRef.current) {
            visualizationRef.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }, [root, steps, stepIdx]);

    // Start insertion process
    const handleInsert = () => {
        const value = parseInt(input.trim());
        if (isNaN(value)) return;
        setPendingValue(value);
        setSteps(
            algorithm === 'avl'
                ? getAVLInsertSteps(root, value)
                : getBSTInsertSteps(root, value)
        );
        setStepIdx(0);
        setInserting(true);
        setInput("");
    };

    // Step controls
    const handleNext = () => {
        if (stepIdx < steps.length - 1) setStepIdx(stepIdx + 1);
        else if (inserting && stepIdx === steps.length - 1) {
            // Finalize insertion
            setRoot(steps[steps.length - 1].tree);
            setInserting(false);
            setSteps([]);
            setStepIdx(0);
            setPendingValue(null);
        }
    };
    const handlePrev = () => {
        if (stepIdx > 0) setStepIdx(stepIdx - 1);
    };
    const handleReset = () => {
        setRoot(null);
        setSteps([]);
        setStepIdx(0);
        setInserting(false);
        setPendingValue(null);
        setInput("");
    };

    // Tree rendering (SVG)
    function renderTree(node, x, y, level, xOffset, highlightPath) {
        if (!node) return null;
        const nodeRadius = 22;
        const yStep = 80;
        // Use a fixed xOffset for better visibility of unbalanced trees
        const fixedXOffset = 120;
        const children = [];
        if (node.left) {
            children.push(
                <line
                    key={node.value + '-l'}
                    x1={x}
                    y1={y}
                    x2={x - fixedXOffset}
                    y2={y + yStep}
                    stroke="#aaa"
                    strokeWidth={2}
                />
            );
        }
        if (node.right) {
            children.push(
                <line
                    key={node.value + '-r'}
                    x1={x}
                    y1={y}
                    x2={x + fixedXOffset}
                    y2={y + yStep}
                    stroke="#aaa"
                    strokeWidth={2}
                />
            );
        }
        const isHighlighted = highlightPath && highlightPath.includes(node.value);
        return (
            <g key={node.value + '-' + x + '-' + y}>
                {children}
                <circle
                    cx={x}
                    cy={y}
                    r={nodeRadius}
                    fill={isHighlighted ? '#e879f9' : '#a879ff'}
                    stroke={isHighlighted ? '#d726a4' : '#5d3d85'}
                    strokeWidth={isHighlighted ? 5 : 3}
                />
                <text
                    x={x}
                    y={y}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fontSize="18"
                    fill="#fff"
                    fontWeight="bold"
                >
                    {node.value}
                </text>
                {node.left && renderTree(node.left, x - fixedXOffset, y + yStep, level - 1, xOffset, highlightPath)}
                {node.right && renderTree(node.right, x + fixedXOffset, y + yStep, level + 1, xOffset, highlightPath)}
            </g>
        );
    }

    // Calculate dynamic SVG size
    const currentTree = inserting ? steps[stepIdx]?.tree : root;
    const treeDepth = getTreeDepth(currentTree);
    const treeWidth = getTreeWidth(currentTree);
    const actualWidth = Math.abs(treeWidth.max - treeWidth.min) * 120 + 300;
    const svgWidth = Math.max(900, actualWidth);
    const svgHeight = Math.max(500, treeDepth * 100 + 200);
    const centerX = (treeWidth.max + treeWidth.min) * -60 + svgWidth / 2;
    const startY = 100;

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#1c0b3a' }}>
            <Sidebar />
            <div style={{ flex: 1, marginLeft: 60 }}>
                <Header />
                <div className="base-vis-layout" style={{ paddingTop: 80 }}>
                    <div className="base-vis-main">
                        <div className="base-vis-header">
                            <h1>{title}</h1>
                        </div>
                        <div className="base-vis-controls" style={{ 
                            display: 'flex', 
                            gap: '1rem', 
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            padding: '1rem'
                        }}>
                            <input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                placeholder="Enter value"
                                className="base-vis-input"
                                disabled={inserting}
                                onKeyDown={e => e.key === 'Enter' && handleInsert()}
                            />
                            <button onClick={handleInsert} className="base-vis-btn" disabled={inserting || !input.trim()}>Insert</button>
                            <button onClick={handleReset} className="base-vis-btn">Reset</button>
                        </div>
                        <div className="base-vis-controls" style={{ 
                            display: 'flex', 
                            gap: '1rem', 
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '0.5rem 1rem'
                        }}>
                            <button onClick={handlePrev} className="base-vis-btn" disabled={stepIdx === 0 || !inserting}>Previous</button>
                            <span style={{ color: '#e879f9', fontWeight: 500, fontSize: 18 }}>
                                {inserting ? `Step ${stepIdx + 1} / ${steps.length}` : 'Ready for next insertion'}
                            </span>
                            <button onClick={handleNext} className="base-vis-btn" disabled={!inserting}>Next</button>
                        </div>
                        <div 
                            ref={visualizationRef}
                            className="base-vis-visualization" 
                            style={{ 
                                minHeight: 320, 
                                display: 'flex', 
                                justifyContent: 'center', 
                                alignItems: 'flex-start',
                                overflow: 'auto',
                                maxWidth: '100%',
                                position: 'relative',
                                padding: '1rem',
                                scrollBehavior: 'smooth'
                            }}
                        >
                            {(!root && !inserting) ? (
                                <div style={{ color: '#e879f9', fontWeight: 500, fontSize: 20, margin: '2rem 0' }}>Insert values to build the tree</div>
                            ) : (
                                <div style={{ 
                                    overflow: 'visible',
                                    maxWidth: '100%',
                                    padding: '1rem',
                                    position: 'relative'
                                }}>
                                    <svg 
                                        width={svgWidth} 
                                        height={svgHeight} 
                                        style={{ 
                                            background: 'none',
                                            minWidth: '100%',
                                            display: 'block',
                                            padding: '40px 0 20px 0'
                                        }}
                                        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                                        preserveAspectRatio="xMidYMin meet"
                                    >
                                        {inserting
                                            ? renderTree(steps[stepIdx]?.tree, centerX, startY, 0, svgWidth / 4, steps[stepIdx]?.highlight)
                                            : renderTree(root, centerX, startY, 0, svgWidth / 4, null)
                                        }
                                    </svg>
                                </div>
                            )}
                        </div>
                        <div style={{ 
                            minHeight: 32, 
                            marginTop: 8, 
                            textAlign: 'center', 
                            color: '#e879f9', 
                            fontWeight: 500, 
                            fontSize: 18,
                            padding: '0.5rem 1rem'
                        }}>
                            {inserting && steps.length > 0 && (
                                <>
                                    Inserting: <b>{pendingValue}</b> (Step {stepIdx + 1} of {steps.length})
                                </>
                            )}
                        </div>
                    </div>
                    <div className="base-vis-sidebar" style={{ overflowY: 'auto', maxHeight: '100vh' }}>
                        <AlgoSidebar
                            algorithm={sidebar.algorithm}
                            code={sidebar.code}
                            explanation={sidebar.explanation}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
} 