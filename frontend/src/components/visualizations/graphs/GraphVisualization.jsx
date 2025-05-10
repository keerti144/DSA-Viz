import React, { useState, useEffect, useRef } from 'react';
import BaseVisualization from '../BaseVisualization';
import './GraphVisualization.css';

const GraphVisualization = ({ algorithm, title, timeComplexity, spaceComplexity, code, explanation }) => {
    const canvasRef = useRef(null);
    const [graph, setGraph] = useState(null);
    const [isVisualizing, setIsVisualizing] = useState(false);
    const [selectedNode, setSelectedNode] = useState(null);

    const generateArray = (size) => {
        // Generate a random graph with 'size' nodes
        const nodes = Array.from({ length: size }, (_, i) => ({
            id: i,
            x: Math.random() * 600 + 50,
            y: Math.random() * 400 + 50,
            neighbors: []
        }));

        // Add random edges (each node connects to 1-3 random neighbors)
        nodes.forEach(node => {
            const numNeighbors = Math.floor(Math.random() * 3) + 1;
            for (let i = 0; i < numNeighbors; i++) {
                const neighborId = Math.floor(Math.random() * size);
                if (neighborId !== node.id && !node.neighbors.includes(neighborId)) {
                    node.neighbors.push(neighborId);
                    nodes[neighborId].neighbors.push(node.id);
                }
            }
        });

        setGraph(nodes);
        return nodes;
    };

    const drawGraph = (ctx, nodes, visited = new Set(), current = null) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // Draw edges
        nodes.forEach(node => {
            node.neighbors.forEach(neighborId => {
                const neighbor = nodes[neighborId];
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(neighbor.x, neighbor.y);
                ctx.strokeStyle = '#666';
                ctx.stroke();
            });
        });

        // Draw nodes
        nodes.forEach(node => {
            ctx.beginPath();
            ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);

            // Color based on state
            if (current === node.id) {
                ctx.fillStyle = '#e74c3c'; // Current node
            } else if (visited.has(node.id)) {
                ctx.fillStyle = '#2ecc71'; // Visited node
            } else {
                ctx.fillStyle = '#3498db'; // Unvisited node
            }

            ctx.fill();
            ctx.strokeStyle = '#2c3e50';
            ctx.stroke();

            // Draw node label
            ctx.fillStyle = 'white';
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(node.id.toString(), node.x, node.y);
        });
    };

    const visualize = async (nodes, speed) => {
        setIsVisualizing(true);
        const ctx = canvasRef.current.getContext('2d');
        const visited = new Set();
        const queue = [0]; // Start from node 0 for BFS
        const stack = [0]; // Start from node 0 for DFS

        if (algorithm === 'bfs') {
            while (queue.length > 0) {
                const current = queue.shift();
                if (!visited.has(current)) {
                    visited.add(current);
                    drawGraph(ctx, nodes, visited, current);
                    await new Promise(resolve => setTimeout(resolve, speed));

                    nodes[current].neighbors.forEach(neighbor => {
                        if (!visited.has(neighbor)) {
                            queue.push(neighbor);
                        }
                    });
                }
            }
        } else if (algorithm === 'dfs') {
            while (stack.length > 0) {
                const current = stack.pop();
                if (!visited.has(current)) {
                    visited.add(current);
                    drawGraph(ctx, nodes, visited, current);
                    await new Promise(resolve => setTimeout(resolve, speed));

                    nodes[current].neighbors.forEach(neighbor => {
                        if (!visited.has(neighbor)) {
                            stack.push(neighbor);
                        }
                    });
                }
            }
        }

        setIsVisualizing(false);
    };

    useEffect(() => {
        if (canvasRef.current && graph) {
            const ctx = canvasRef.current.getContext('2d');
            drawGraph(ctx, graph);
        }
    }, [graph]);

    const customRender = () => (
        <div className="graph-container">
            <canvas
                ref={canvasRef}
                width={700}
                height={500}
                className="graph-canvas"
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

export default GraphVisualization; 