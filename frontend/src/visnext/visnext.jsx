import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../header/header.jsx";
import Sidebar from "../sidebar/sidebar.jsx";
import "./visnext.css";

export const VisNext = () => {
  const { algorithm } = useParams();
  const [activeSection, setActiveSection] = useState("algo");
  const [inputValue, setInputValue] = useState("");
  const [currentStep, setCurrentStep] = useState(0);

  const handleClick = (section) => {
    setActiveSection(section);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleGoClick = () => {
    console.log("Go clicked with value:", inputValue);
  };

  const handlePrevClick = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleNextClick = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const algorithms = {
    bubblesort: {
      title: "Bubble Sort",
      steps: `Steps:
      1. Compare the first two elements.
      2. Swap if the first is greater.
      3. Move to the next adjacent pair and repeat.
      4. Each pass bubbles the largest element to the end.
      5. Stop when no swaps are needed.`,
      
      code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr`,
      
      explanation: `Bubble Sort is a simple comparison-based algorithm.
Best Case: O(n) | Average/Worst Case: O(n^2)`,
    },

    quicksort: {
      title: "Quick Sort",
      steps: `Steps:
      1. Pick a pivot element.
      2. Partition the array around the pivot.
      3. Recursively apply to subarrays.`,
      
      code: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    else:
        pivot = arr[0]
        left = [x for x in arr[1:] if x < pivot]
        right = [x for x in arr[1:] if x >= pivot]
        return quick_sort(left) + [pivot] + quick_sort(right)`,
      
      explanation: `Quick Sort is a divide-and-conquer algorithm.
Best Case: O(n log n) | Average Case: O(n log n) | Worst Case: O(n^2)`,
    },

    mergesort: {
      title: "Merge Sort",
      steps: `Steps:
      1. Divide the array into halves.
      2. Recursively sort each half.
      3. Merge the sorted halves together.`,
      
      code: `def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr)//2
        left = arr[:mid]
        right = arr[mid:]
        merge_sort(left)
        merge_sort(right)
        i = j = k = 0
        while i < len(left) and j < len(right):
            if left[i] < right[j]:
                arr[k] = left[i]
                i += 1
            else:
                arr[k] = right[j]
                j += 1
            k += 1
        while i < len(left):
            arr[k] = left[i]
            i += 1
            k += 1
        while j < len(right):
            arr[k] = right[j]
            j += 1
            k += 1
    return arr`,
      
      explanation: `Merge Sort is a stable divide-and-conquer sorting algorithm.
Best/Average/Worst Case: O(n log n)`,
    },

    insertionsort: {
      title: "Insertion Sort",
      steps: `Steps:
      1. Start with the second element, assuming the first is sorted.
      2. Compare it with the elements before it.
      3. Insert it into the correct position.
      4. Repeat for all elements.`,
      
      code: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
      
      explanation: `Insertion Sort is simple and efficient for small datasets.
Best Case: O(n) | Average/Worst Case: O(n^2)`,
    },

    selectionsort: {
      title: "Selection Sort",
      steps: `Steps:
      1. Find the minimum element in the unsorted part.
      2. Swap it with the first unsorted element.
      3. Move the boundary of the sorted part one step forward.
      4. Repeat until sorted.`,
      
      code: `def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i+1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
      
      explanation: `Selection Sort repeatedly selects the minimum element.
Best, Average, Worst Case: O(n^2)`,
    },
    linearsearch: {
      title: "Linear Search",
      steps: `Steps:
      1. Start from the first element.
      2. Compare each element with the target.
      3. If found, return the index.
      4. If not found till the end, return -1.`,
      code: `def linear_search(arr, target):
      for i in range(len(arr)):
          if arr[i] == target:
              return i
      return -1`,
      explanation: `Linear Search checks each element one by one.
  Best/Average/Worst Case: O(n)`,
    },
  
    binarysearch: {
      title: "Binary Search",
      steps: `Steps:
      1. Start with the middle element.
      2. If it matches the target, return the index.
      3. If the target is smaller, search the left half.
      4. If the target is larger, search the right half.
      5. Repeat until found or array ends.`,
      code: `def binary_search(arr, target):
      low = 0
      high = len(arr) - 1
      while low <= high:
          mid = (low + high) // 2
          if arr[mid] == target:
              return mid
          elif arr[mid] < target:
              low = mid + 1
          else:
              high = mid - 1
      return -1`,
      explanation: `Binary Search works on sorted arrays by repeatedly dividing the search interval.
  Best/Average Case: O(log n) | Worst Case: O(log n)`,
    },
    trie: {
      title: "Trie",
      steps: `Steps:
      1. Create a root node.
      2. For each character, check if it exists in children.
      3. If not, create a new node.
      4. Move to the next character.
      5. Mark the end of the word.`,
      code: `class TrieNode:
      def __init__(self):
          self.children = {}
          self.is_end = False
  
  class Trie:
      def __init__(self):
          self.root = TrieNode()
  
      def insert(self, word):
          node = self.root
          for char in word:
              if char not in node.children:
                  node.children[char] = TrieNode()
              node = node.children[char]
          node.is_end = True`,
      explanation: `A Trie (Prefix Tree) is an efficient information retrieval data structure.
  Insertion and Search: O(m), where m = length of the word.`,
    },
    inorder: {
      title: "Inorder Traversal",
      steps: `Steps:
      1. Traverse the left subtree.
      2. Visit the root node.
      3. Traverse the right subtree.`,
      code: `def inorder_traversal(root):
      if root:
          inorder_traversal(root.left)
          print(root.val)
          inorder_traversal(root.right)`,
      explanation: `Inorder traversal visits nodes in ascending order for BSTs.
  Time Complexity: O(n)`,
    },
    preorder: {
      title: "Preorder Traversal",
      steps: `Steps:
      1. Visit the root node.
      2. Traverse the left subtree.
      3. Traverse the right subtree.`,
      code: `def preorder_traversal(root):
      if root:
          print(root.val)
          preorder_traversal(root.left)
          preorder_traversal(root.right)`,
      explanation: `Preorder traversal is useful for copying the tree.
  Time Complexity: O(n)`,
    },
    postorder: {
      title: "Postorder Traversal",
      steps: `Steps:
      1. Traverse the left subtree.
      2. Traverse the right subtree.
      3. Visit the root node.`,
      code: `def postorder_traversal(root):
      if root:
          postorder_traversal(root.left)
          postorder_traversal(root.right)
          print(root.val)`,
      explanation: `Postorder traversal is useful for deleting the tree.
  Time Complexity: O(n)`,
    },
    avltree: {
      title: "AVL Tree",
      steps: `Steps:
      1. Perform normal BST insertions.
      2. Update the height of each node.
      3. Check balance factor (left height - right height).
      4. Perform rotations if the tree becomes unbalanced.`,
      code: `class AVLNode:
      def __init__(self, key):
          self.key = key
          self.left = None
          self.right = None
          self.height = 1`,
      explanation: `AVL Tree is a self-balancing Binary Search Tree.
  Insertion/Deletion/Search: O(log n)`,
    },
    bst: {
      title: "Binary Search Tree (BST)",
      steps: `Steps:
      1. Start at the root.
      2. If value is smaller, go left.
      3. If value is larger, go right.
      4. Insert when reaching a null spot.`,
      code: `class Node:
      def __init__(self, key):
          self.left = None
          self.right = None
          self.val = key
  
  def insert(root, key):
      if root is None:
          return Node(key)
      if key < root.val:
          root.left = insert(root.left, key)
      else:
          root.right = insert(root.right, key)
      return root`,
      explanation: `BST maintains sorted order of elements.
  Average Time: O(log n), Worst Time (unbalanced): O(n)`,
    },
  };


  const selectedAlgorithm = algorithms[algorithm?.toLowerCase()] || algorithms["bubblesort"];

  return (
    <div className="vis-next">
      <Header />
      <Sidebar />

      <div className="main-box">
        <h1 className="title">{selectedAlgorithm.title} Visualization</h1>

        {/* Visualization placeholder */}
        <div className="visualization-container">
          <p>Visualization for {selectedAlgorithm.title} goes here!</p>
        </div>
      </div>

      {/* Sidebar for toggling between code, algorithm, and explanation */}
      <div className="toggle-container">
        {/* Buttons Container */}
        <div className="buttons-container">
          <button className="toggle-btn" onClick={() => handleClick("algo")}>
            Algorithm
          </button>
          <button className="toggle-btn" onClick={() => handleClick("code")}>
            Code
          </button>
          <button className="toggle-btn" onClick={() => handleClick("exp")}>
            Explanation
          </button>
        </div>

        {/* Conditional rendering based on active section */}
        {activeSection === "algo" && (
          <div className="extra-section">
            <h2>{selectedAlgorithm.title} Algorithm</h2>
            <p>{selectedAlgorithm.steps}</p>
          </div>
        )}

        {activeSection === "code" && (
          <div className="extra-section">
            <h2>{selectedAlgorithm.title} Code</h2>
            <pre>{selectedAlgorithm.code}</pre>
          </div>
        )}

        {activeSection === "exp" && (
          <div className="extra-section">
            <h2>{selectedAlgorithm.title} Explanation</h2>
            <p>{selectedAlgorithm.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisNext;