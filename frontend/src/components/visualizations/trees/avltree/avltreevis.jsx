// src/components/visualizations/trees/AvlTreeVisualizer.jsx

import React, { useState } from 'react';
import { AVLTree } from './avltree';
import { getLayoutedElements } from './getLayoutedElements';
import AvlTreeControls from '../AvlTreeControls';
import AvlTreeDisplay from '../AvlTreeDisplay';

const AvlTreeVisualizer = () => {
  const [tree] = useState(new AVLTree());
  const [elements, setElements] = useState({ nodes: [], edges: [] });

  const handleInsert = (value) => {
    tree.insert(value);
    const newElements = getLayoutedElements(tree.root);
    setElements(newElements);
  };

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-semibold">AVL Tree Visualizer</h2>
      <AvlTreeControls onInsert={handleInsert} />
      <AvlTreeDisplay elements={elements} />
    </div>
  );
};

export default AvlTreeVisualizer;
