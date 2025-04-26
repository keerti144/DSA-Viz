const getBFS = (graph, startNode) => {
    const animations = [];
    const visited = new Array(graph.length).fill(false);
    const queue = [startNode];
    visited[startNode] = true;
  
    while (queue.length > 0) {
      const node = queue.shift();
      animations.push(node);
      for (let neighbor of graph[node]) {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      }
    }
  
    return animations;
  };
  
  export default getBFS;
  