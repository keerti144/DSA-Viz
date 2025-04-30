import React, { useState } from "react";
import LinkedListControls from "../LinkedListControls"; // reusing your controls
import LinkedListDisplay from "../LinkedListDisplay";   // or you can create a custom display for circular doubly

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class CircularDoublyLinkedList {
  constructor() {
    this.head = null;
  }

  insertFront(value) {
    const newNode = new Node(value);
    if (!this.head) {
      newNode.next = newNode;
      newNode.prev = newNode;
      this.head = newNode;
    } else {
      const tail = this.head.prev;
      newNode.next = this.head;
      newNode.prev = tail;
      tail.next = newNode;
      this.head.prev = newNode;
      this.head = newNode;
    }
  }

  insertBack(value) {
    const newNode = new Node(value);
    if (!this.head) {
      newNode.next = newNode;
      newNode.prev = newNode;
      this.head = newNode;
    } else {
      const tail = this.head.prev;
      newNode.next = this.head;
      newNode.prev = tail;
      tail.next = newNode;
      this.head.prev = newNode;
    }
  }

  deleteFront() {
    if (!this.head) return;
    if (this.head.next === this.head) {
      this.head = null;
    } else {
      const tail = this.head.prev;
      this.head = this.head.next;
      this.head.prev = tail;
      tail.next = this.head;
    }
  }

  deleteBack() {
    if (!this.head) return;
    const tail = this.head.prev;
    if (tail === this.head) {
      this.head = null;
    } else {
      const newTail = tail.prev;
      newTail.next = this.head;
      this.head.prev = newTail;
    }
  }

  reverse() {
    if (!this.head || this.head.next === this.head) return;
    let current = this.head;
    do {
      [current.next, current.prev] = [current.prev, current.next];
      current = current.prev;
    } while (current !== this.head);
    this.head = this.head.next;
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

const CircularDoublyLinkedListVisualizer = () => {
  const [list] = useState(new CircularDoublyLinkedList());
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
              <span className="arrow-right">→</span>
              <span className="arrow-left">←</span>
            </div>
          ))
        ) : (
          <div className="empty-message">List is Empty</div>
        )}
      </div>

      {/* Styles inline */}
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
          .arrow-right {
            position: absolute;
            right: -20px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 18px;
            color: #4b5563;
          }
          .arrow-left {
            position: absolute;
            left: -20px;
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

export default CircularDoublyLinkedListVisualizer;
