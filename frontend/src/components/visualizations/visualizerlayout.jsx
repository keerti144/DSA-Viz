import React from "react";
import { useParams } from "react-router-dom";
import SortingVisualization from './sorting/SortingVisualization';
import StackVisualizer from './stack/StackVisualizer';
import QueueVisualizer from './queue/QueueVisualizer';
import SinglyLinkedListVisualizer from './linkedlists/singlylinkedlist/singlylinkedlist.jsx';
import DoublyLinkedListVisualizer from './linkedlists/doublylinkedlist/doublylinkedlist.jsx';
import CircularSinglyLinkedListVisualizer from './linkedlists/circularsinglylinkedlist/circularsinglylinkedlist.jsx';
import CircularDoublyLinkedListVisualizer from './linkedlists/circulardoublylinkedlist/circulardoublylinkedlist.jsx';
// Import other visualizers as needed

// Example data for each algorithm/structure
const algoData = {
  bubblesort: {
    title: "Bubble Sort",
    algorithm: `for i from 0 to n-1:\n  for j from 0 to n-i-2:\n    if arr[j] > arr[j+1]:\n      swap arr[j] and arr[j+1]`,
    code: `function bubbleSort(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = 0; j < arr.length - i - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n      }\n    }\n  }\n  return arr;\n}`,
    explanation: `Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. This process is repeated until the list is sorted. It's simple but not efficient for large lists.`
  },
  insertionsort: {
    title: "Insertion Sort",
    algorithm: `for i from 1 to n-1:\n  key = arr[i]\n  j = i-1\n  while j >= 0 and arr[j] > key:\n    arr[j+1] = arr[j]\n    j = j-1\n  arr[j+1] = key`,
    code: `function insertionSort(arr) {\n  for (let i = 1; i < arr.length; i++) {\n    let key = arr[i];\n    let j = i - 1;\n    while (j >= 0 && arr[j] > key) {\n      arr[j + 1] = arr[j];\n      j--;\n    }\n    arr[j + 1] = key;\n  }\n  return arr;\n}`,
    explanation: `Insertion Sort builds the sorted array one item at a time by repeatedly inserting the next element into the correct position.`
  },
  selectionsort: {
    title: "Selection Sort",
    algorithm: `for i from 0 to n-1:\n  minIdx = i\n  for j from i+1 to n-1:\n    if arr[j] < arr[minIdx]:\n      minIdx = j\n  swap arr[i] and arr[minIdx]`,
    code: `function selectionSort(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    let minIdx = i;\n    for (let j = i + 1; j < arr.length; j++) {\n      if (arr[j] < arr[minIdx]) {\n        minIdx = j;\n      }\n    }\n    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];\n  }\n  return arr;\n}`,
    explanation: `Selection Sort repeatedly selects the minimum element from the unsorted part and puts it at the beginning.`
  },
  mergesort: {
    title: "Merge Sort",
    algorithm: `function mergeSort(arr):\n  if len(arr) > 1:\n    mid = len(arr) // 2\n    L = arr[:mid]\n    R = arr[mid:]\n    mergeSort(L)\n    mergeSort(R)\n    merge L and R into arr`,
    code: `function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  return merge(left, right);\n}\nfunction merge(left, right) {\n  let result = [], i = 0, j = 0;\n  while (i < left.length && j < right.length) {\n    if (left[i] < right[j]) result.push(left[i++]);\n    else result.push(right[j++]);\n  }\n  return result.concat(left.slice(i)).concat(right.slice(j));\n}`,
    explanation: `Merge Sort is a divide-and-conquer algorithm that splits the array into halves, recursively sorts each half, and then merges the sorted halves.`
  },
  quicksort: {
    title: "Quick Sort",
    algorithm: `function quickSort(arr, low, high):\n  if low < high:\n    pi = partition(arr, low, high)\n    quickSort(arr, low, pi-1)\n    quickSort(arr, pi+1, high)`,
    code: `function quickSort(arr, low = 0, high = arr.length - 1) {\n  if (low < high) {\n    const pi = partition(arr, low, high);\n    quickSort(arr, low, pi - 1);\n    quickSort(arr, pi + 1, high);\n  }\n  return arr;\n}\nfunction partition(arr, low, high) {\n  let pivot = arr[high];\n  let i = low - 1;\n  for (let j = low; j < high; j++) {\n    if (arr[j] < pivot) {\n      i++;\n      [arr[i], arr[j]] = [arr[j], arr[i]];\n    }\n  }\n  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];\n  return i + 1;\n}`,
    explanation: `Quick Sort is a divide-and-conquer algorithm that picks a pivot and partitions the array around the pivot, recursively sorting the partitions.`
  },
  stack: {
    title: "Stack",
    algorithm: `Push(x):\n  top = top + 1\n  stack[top] = x\nPop():\n  if top == -1: error\n  x = stack[top]\n  top = top - 1\n  return x`,
    code: `class Stack {\n  constructor() { this.items = []; }\n  push(x) { this.items.push(x); }\n  pop() { return this.items.pop(); }\n  top() { return this.items[this.items.length-1]; }\n}`,
    explanation: `A stack is a LIFO (Last-In, First-Out) data structure. Push adds to the top, Pop removes from the top. Only the top element is accessible at any time.`
  },
  queue: {
    title: "Queue",
    algorithm: `Enqueue(x):\n  rear = rear + 1\n  queue[rear] = x\nDequeue():\n  if front > rear: error\n  x = queue[front]\n  front = front + 1\n  return x`,
    code: `class Queue {\n  constructor() { this.items = []; }\n  enqueue(x) { this.items.push(x); }\n  dequeue() { return this.items.shift(); }\n  front() { return this.items[0]; }\n}`,
    explanation: `A queue is a FIFO (First-In, First-Out) data structure. Enqueue adds to the rear, Dequeue removes from the front. Both ends are clearly marked.`
  },
  // Add more algorithms/structures here
};

const VisualizerLayout = () => {
  const { algorithm } = useParams();
  const algo = algoData[algorithm?.toLowerCase()] || {};

  let Visualizer = null;
  if (["bubblesort", "insertionsort", "selectionsort", "mergesort", "quicksort"].includes(algorithm)) {
    Visualizer = <SortingVisualization algorithm={algorithm} title={algo.title} code={algo.code} explanation={algo.explanation} pseudocode={algo.algorithm} />;
  } else if (algorithm === "stack") {
    Visualizer = <StackVisualizer />;
  } else if (algorithm === "queue") {
    Visualizer = <QueueVisualizer />;
  } else if (algorithm === "singlylinkedlist") {
    Visualizer = <SinglyLinkedListVisualizer />;
  } else if (algorithm === "doublylinkedlist") {
    Visualizer = <DoublyLinkedListVisualizer />;
  } else if (algorithm === "circularsinglylinkedlist") {
    Visualizer = <CircularSinglyLinkedListVisualizer />;
  } else if (algorithm === "circulardoublylinkedlist") {
    Visualizer = <CircularDoublyLinkedListVisualizer />;
  } else {
    Visualizer = <div style={{ color: '#fff', padding: '2rem' }}>Select an algorithm or structure from the sidebar.</div>;
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        {Visualizer}
      </div>
    </div>
  );
};

export default VisualizerLayout;