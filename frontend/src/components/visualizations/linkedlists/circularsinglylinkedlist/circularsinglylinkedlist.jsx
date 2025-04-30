import React, { useState } from "react";
import LinkedListControls from "../LinkedListControls";

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class CircularSinglyLinkedList {
  constructor() {
    this.head = null;
  }

  insertFront(value) {
    const newNode = new Node(value);
    if (!this.head) {
      newNode.next = newNode;
      this.head = newNode;
    } else {
      let tail = this.head;
      while (tail.next !== this.head) {
        tail = tail.next;
      }
      newNode.next = this.head;
      tail.next = newNode;
      this.head = newNode;
    }
  }

  insertBack(value) {
    const newNode = new Node(value);
    if (!this.head) {
      newNode.next = newNode;
      this.head = newNode;
    } else {
      let tail = this.head;
      while (tail.next !== this.head) {
        tail = tail.next;
      }
      tail.next = newNode;
      newNode.next = this.head;
    }
  }

  deleteFront() {
    if (!this.head) return;
    if (this.head.next === this.head) {
      this.head = null;
    } else {
      let tail = this.head;
      while (tail.next !== this.head) {
        tail = tail.next;
      }
      this.head = this.head.next;
      tail.next = this.head;
    }
  }

  deleteBack() {
    if (!this.head) return;
    if (this.head.next === this.head) {
      this.head = null;
    } else {
      let current = this.head;
      while (current.next.next !== this.head) {
        current = current.next;
      }
      current.next = this.head;
    }
  }

  reverse() {
    if (!this.head || this.head.next === this.head) return;
    let prev = null;
    let current = this.head;
    let next = null;
    const start = this.head;
    do {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    } while (current !== start);
    start.next = prev;
    this.head = prev;
  }

  toArray() {
    const result = [];
    if (!this.head) return result;
    let current = this.head;
    do {
      result.push(current.value);
      current = current.next;
    } while (current !== this.head);
    return result;
  }
}

const CircularSinglyLinkedListVisualizer = () => {
  const [list] = useState(new CircularSinglyLinkedList());
  const [nodes, setNodes] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const updateList = () => {
    setNodes(list.toArray());
  };

  const handleInsertFront = (value) => {
    list.insertFront(value);
    updateList();
  };

  const handleInsertBack = (value) => {
    list.insertBack(value);
    updateList();
  };

  const handleDeleteFront = () => {
    list.deleteFront();
    updateList();
  };

  const handleDeleteBack = () => {
    list.deleteBack();
    updateList();
  };

  const handleReverse = () => {
    list.reverse();
    updateList();
  };

  return (
    <div className="visualizer-container">
      <LinkedListControls
        onInsertFront={handleInsertFront}
        onInsertBack={handleInsertBack}
        onDeleteFront={handleDeleteFront}
        onDeleteBack={handleDeleteBack}
        onReverse={handleReverse}
        isAnimating={isAnimating}
        isEmpty={nodes.length === 0}
      />
      <div className="list-display">
        {nodes.length > 0 ? (
          nodes.map((node, index) => (
            <div key={index} className="node">
              {node}
              <span className="arrow">→</span>
            </div>
          ))
        ) : (
          <div className="empty-message">List is Empty</div>
        )}
      </div>

      <style>
        {`
          .visualizer-container {
            padding: 20px;
            background: #f0f0f0;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
            margin-top: 20px;
          }
          .list-display {
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
            margin-top: 20px;
          }
          .node {
            position: relative;
            padding: 16px;
            border: 1px solid #ccc;
            border-radius: 6px;
            background: #fff;
            min-width: 50px;
            text-align: center;
          }
          .arrow {
            position: absolute;
            right: -20px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 18px;
            color: #4b5563;
          }
          .empty-message {
            color: #9ca3af;
            font-size: 14px;
            text-align: center;
            margin-top: 20px;
          }
        `}
      </style>
    </div>
  );
};

export default CircularSinglyLinkedListVisualizer;
