import React from 'react';
import { useParams } from 'react-router-dom';
import VisualizerLayout from '../components/visualizations/visualizerlayout';
import Header from '../header/header.jsx';
import Sidebar from '../sidebar/sidebar.jsx';
import './visnext.css';

const displayNames = {
  bubblesort: 'Bubble Sort',
  mergesort: 'Merge Sort',
  quicksort: 'Quick Sort',
  insertionsort: 'Insertion Sort',
  selectionsort: 'Selection Sort',
  binarysearch: 'Binary Search',
  linearsearch: 'Linear Search',
  bst: 'Binary Search Tree',
  avl: 'AVL Tree',
  stack: 'Stack',
  queue: 'Queue',
  singlylinkedlist: 'Singly Linked List',
  doublylinkedlist: 'Doubly Linked List',
  circularsinglylinkedlist: 'Circular Singly Linked List',
  circulardoublylinkedlist: 'Circular Doubly Linked List',
  // Add more as needed
};

export const VisNext = () => {
  const { algorithm } = useParams();
  const displayName = displayNames[algorithm?.toLowerCase()] ||
    (algorithm ? algorithm.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\b\w/g, l => l.toUpperCase()) : 'Visualization');
  return (
    <div className="vis-next">
      <Header />
      <Sidebar />
      <div className="main-box">
        <h1 className="text-wrapper">
          {displayName}
        </h1>
        <VisualizerLayout algorithm={algorithm} />
      </div>
    </div>
  );
};