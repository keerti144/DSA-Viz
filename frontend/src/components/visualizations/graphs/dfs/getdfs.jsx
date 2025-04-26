const getDFS = (graph, startNode) => {
    const animations = [];
    const visited = new Array(graph.length).fill(false);
  
    const dfsHelper = (node) => {
      visited[node] = true;
      animations.push(node);
      for (let neighbor of graph[node]) {
        if (!visited[neighbor]) {
          dfsHelper(neighbor);
        }
      }
    };
  
    dfsHelper(startNode);
    return animations;
  };
  
  export default getDFS;
  