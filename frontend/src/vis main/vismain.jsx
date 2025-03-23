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
            <button onClick={() => navigate("/visualize/visnext")}>Bubble Sort</button>
            <button onClick={() => navigate("/visualize/visnext")}>Merge Sort</button>
            <button onClick={() => navigate("/visualize/visnext")}>Quick Sort</button>
            <button onClick={() => navigate("/visualize/visnext")}>Insertion Sort</button>
          </div>
        </div>

        {/* Tree Algorithms */}
        <div className="category">
          <h2>Tree Algorithms</h2>
          <div className="button-grid">
            <button onClick={() => navigate("/visualize/visnext")}>Binary Search Tree</button>
            <button onClick={() => navigate("/visualize/visnext")}>Heap Sort</button>
            <button onClick={() => navigate("/visualize/visnext")}>Trie</button>
            <button onClick={() => navigate("/visualize/visnext")}>AVL Tree</button>
          </div>
        </div>

        {/* Graph Algorithms */}
        <div className="category">
          <h2>Graph Algorithms</h2>
          <div className="button-grid">
            <button onClick={() => navigate("/visualize/visnext")}>Dijkstra's Algorithm</button>
            <button onClick={() => navigate("/visualize/visnext")}>A* Algorithm</button>
            <button onClick={() => navigate("/visualize/visnext")}>Depth First Search</button>
            <button onClick={() => navigate("/visualize/visnext")}>Breadth First Search</button>
          </div>
        </div>

        {/* Linked List Algorithms */}
        <div className="category">
          <h2>Linked List Algorithms</h2>
          <div className="button-grid">
            <button onClick={() => navigate("/visualize/visnext")}>Singly Linked List</button>
            <button onClick={() => navigate("/visualize/visnext")}>Doubly Linked List</button>
            <button onClick={() => navigate("/visualize/visnext")}>Circular Linked List</button>
            <button onClick={() => navigate("/visualize/visnext")}>Reverse Linked List</button>
          </div>
        </div>

      </div>
    </div>
  );
};
