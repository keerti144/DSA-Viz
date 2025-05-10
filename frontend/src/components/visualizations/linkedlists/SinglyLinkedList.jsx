import React, { useState } from 'react';
import BaseVisualization from '../BaseVisualization';
import './LinkedList.css';

const SinglyLinkedList = () => {
    const [nodes, setNodes] = useState([]);
    const [head, setHead] = useState(null);

    const generateArray = (size) => {
        const newNodes = Array.from({ length: size }, (_, i) => ({
            value: Math.floor(Math.random() * 100) + 1,
            next: i < size - 1 ? i + 1 : null
        }));
        setNodes(newNodes);
        setHead(0);
        return newNodes;
    };

    const visualize = async (array, speed) => {
        // Example visualization: traverse the list
        let current = head;
        const nodeElements = document.getElementsByClassName('linked-list-node');

        while (current !== null) {
            // Highlight current node
            nodeElements[current].classList.add('active');
            await new Promise(resolve => setTimeout(resolve, speed));

            // Move to next node
            nodeElements[current].classList.remove('active');
            current = nodes[current].next;
        }
    };

    const renderLinkedList = () => {
        return (
            <div className="linked-list-container">
                {nodes.map((node, index) => (
                    <div key={index} className="linked-list-node-wrapper">
                        <div className="linked-list-node">
                            <div className="node-value">{node.value}</div>
                            <div className="node-pointer">
                                {node.next !== null ? '→' : 'null'}
                            </div>
                        </div>
                        {node.next !== null && <div className="node-connector" />}
                    </div>
                ))}
            </div>
        );
    };

    const code = `class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null;
    }

    insert(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
    }
}`;

    const explanation = `A Singly Linked List is a linear data structure where each element (node) 
    contains a value and a reference (pointer) to the next node in the sequence. The last node points 
    to null, indicating the end of the list. This structure allows for efficient insertions and 
    deletions at any position, as it only requires updating the pointers.`;

    return (
        <BaseVisualization
            title="Singly Linked List"
            algorithm="Singly Linked List"
            timeComplexity="O(n) for traversal, O(1) for insertion/deletion at head"
            spaceComplexity="O(n)"
            stability="N/A"
            generateArray={generateArray}
            visualize={visualize}
            code={code}
            explanation={explanation}
            customRender={renderLinkedList}
        />
    );
};

export default SinglyLinkedList; 