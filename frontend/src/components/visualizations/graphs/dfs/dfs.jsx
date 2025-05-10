import React from 'react';
import GraphVisualization from '../GraphVisualization';

const DFS = () => {
    const code = `function dfs(graph, start) {
    const visited = new Set();
    const result = [];

    function traverse(current) {
        visited.add(current);
        result.push(current);

        for (const neighbor of graph[current]) {
            if (!visited.has(neighbor)) {
                traverse(neighbor);
            }
        }
    }

    traverse(start);
    return result;
}`;

    const explanation = `Depth-First Search (DFS) is a graph traversal algorithm that explores as far as possible 
    along each branch before backtracking. It's particularly useful for exploring all vertices in a graph 
    and can be implemented using either recursion or a stack. DFS is often used in maze solving, 
    topological sorting, and detecting cycles in graphs.`;

    return (
        <GraphVisualization
            algorithm="dfs"
            title="Depth-First Search (DFS)"
            timeComplexity="O(V + E)"
            spaceComplexity="O(V)"
            code={code}
            explanation={explanation}
        />
    );
};

export default DFS;
