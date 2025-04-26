import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header/header.jsx";
import Sidebar from "../sidebar/sidebar.jsx";
import "./vismain.css";

export const VisMain = () => {
  const navigate = useNavigate();
  
  return (
    <div className="vis-main">
      <Header />
      <Sidebar />
      
      <div className="vis-container">
        <h1 className="vis-title">Visualize Algorithms</h1>

        {/* Sorting Algorithms */}
        <div className="category">
          <h2>Sorting Algorithms</h2>
          <div className="button-grid">
            <button onClick={() => navigate("/visnext/bubblesort")}>Bubble Sort</button>
            <button onClick={() => navigate("/visnext/mergesort")}>Merge Sort</button>
            <button onClick={() => navigate("/visnext/quicksort")}>Quick Sort</button>
            <button onClick={() => navigate("/visnext/insertionsort")}>Insertion Sort</button>
            <button onClick={() => navigate("/visnext/selectionsort")}>Selection Sort</button>
          </div>
        </div>

        {/* Searching Algorithms */}
        <div className="category">
          <h2>Searching Algorithms</h2>
          <div className="button-grid">
            <button onClick={() => navigate("/visnext/binarysearch")}>Binary Search</button>
            <button onClick={() => navigate("/visnext/linearsearch")}>Linear Search</button>
          </div>
        </div>

        {/* Tree Traversals & Trees */}
        <div className="category">
          <h2>Tree Algorithms</h2>
          <div className="button-grid">
            <button onClick={() => navigate("/visnext/bst")}>Binary Search Tree</button>
            <button onClick={() => navigate("/visnext/avl")}>AVL Tree</button>
            <button onClick={() => navigate("/visnext/preorder")}>Preorder Traversal</button>
            <button onClick={() => navigate("/visnext/inorder")}>Inorder Traversal</button>
            <button onClick={() => navigate("/visnext/postorder")}>Postorder Traversal</button>
            <button onClick={() => navigate("/visnext/trie")}>Trie</button>
          </div>
        </div>

        {/* Graph Algorithms */}
        <div className="category">
          <h2>Graph Algorithms</h2>
          <div className="button-grid">
            <button onClick={() => navigate("/visnext/bfs")}>Breadth First Search (BFS)</button>
            <button onClick={() => navigate("/visnext/dfs")}>Depth First Search (DFS)</button>
          </div>
        </div>

        {/* Linked List Algorithms */}
        <div className="category">
          <h2>Linked List Algorithms</h2>
          <div className="button-grid">
            <button onClick={() => navigate("/visnext/singlylinkedlist")}>Singly Linked List</button>
            <button onClick={() => navigate("/visnext/doublylinkedlist")}>Doubly Linked List</button>
            <button onClick={() => navigate("/visnext/circularlinkedlist")}>Circular Linked List</button>
            <button onClick={() => navigate("/visnext/reverselinkedlist")}>Reverse Linked List</button>
          </div>
        </div>

      </div>
    </div>
  );
};
