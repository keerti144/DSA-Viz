import React from 'react';
import GraphVisualization from '../GraphVisualization';

const BFS = () => {
    const code = `function bfs(graph, start) {
    const queue = [start];
    const visited = new Set([start]);
    const result = [];

    while (queue.length > 0) {
        const current = queue.shift();
        result.push(current);

        for (const neighbor of graph[current]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
    return result;
}`;

    const explanation = `Breadth-First Search (BFS) is a graph traversal algorithm that explores all vertices 
    at the present depth before moving on to vertices at the next depth level. It's particularly useful 
    for finding the shortest path between two vertices in an unweighted graph. BFS uses a queue data 
    structure to keep track of vertices to visit.`;

    return (
        <GraphVisualization
            algorithm="bfs"
            title="Breadth-First Search (BFS)"
            timeComplexity="O(V + E)"
            spaceComplexity="O(V)"
            code={code}
            explanation={explanation}
        />
    );
};

export default BFS;
