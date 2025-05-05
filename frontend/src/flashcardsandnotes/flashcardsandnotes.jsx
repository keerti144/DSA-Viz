import React, { useState } from "react";
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import "./flashcardsandnotes.css";

export const FlashcardsAndNotes = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const flashcards = [
    {
      title: "Sorting Algorithms",
      category: "Algorithms",
      content:
        "Sorting algorithms organize data into a specific order. Common types include:\n\n- Bubble Sort (O(n²)): Repeatedly swaps adjacent elements.\n- Merge Sort (O(n log n)): Divide and conquer approach, stable and efficient.\n- Quick Sort (O(n log n) avg): Uses a pivot for partitioning, fast but not stable.\n- Heap Sort (O(n log n)): Builds a heap to sort elements.\n\nUse-case: When data needs to be ordered for binary search or visualization."
    },
    {
      title: "Graph Theory Basics",
      category: "Graph Theory",
      content:
        "Graphs are data structures consisting of nodes (vertices) and edges. Key types:\n\n- Directed vs. Undirected\n- Weighted vs. Unweighted\n\nUse adjacency list or matrix for representation. Applications: route planning, social networks, recommendation systems."
    },
    {
      title: "Recursion",
      category: "Core CS",
      content:
        "Recursion is when a function calls itself with modified parameters until a base condition is met. It's great for tree traversals, backtracking problems, and divide & conquer strategies. Always define a base case to avoid infinite loops."
    },
    {
      title: "Dynamic Programming",
      category: "Algorithms",
      content:
        "DP solves complex problems by breaking them down into overlapping subproblems and storing solutions (memoization or tabulation). Examples: Fibonacci, 0/1 Knapsack, Longest Common Subsequence. Reduces exponential problems to polynomial time."
    },
    {
      title: "Bit Manipulation",
      category: "Algorithms",
      content:
        "Bit manipulation uses binary operators (&, |, ^, ~, <<, >>) for efficient computation. Use-cases: finding odd/even, checking/set/unset bits, counting set bits, swapping numbers, power-of-two check."
    },
    {
      title: "Hash Tables",
      category: "Data Structures",
      content:
        "Hash tables map keys to values using a hash function. Provide O(1) average time for insertion, deletion, and lookup. Collisions handled via chaining or open addressing. Used in dictionaries, caches, etc."
    },
    {
      title: "Tree Traversals",
      category: "Trees",
      content:
        "Tree traversals define the order of visiting nodes:\n\n- Inorder (LNR): Used in BSTs for sorted output\n- Preorder (NLR): Root-first traversal\n- Postorder (LRN): Useful in deleting trees\n- Level Order: Uses queue for BFS"
    },
    {
      title: "Backtracking",
      category: "Algorithms",
      content:
        "Backtracking is a depth-first approach to explore possible options and backtrack upon failure. It's ideal for constraint satisfaction problems like N-Queens, Sudoku, word search, and permutations."
    },
    {
      title: "Greedy Algorithms",
      category: "Algorithms",
      content:
        "Greedy algorithms make the optimal choice at each step with the hope of finding a global optimum. Examples include:\n\n- Activity Selection\n- Huffman Encoding\n- Kruskal’s & Prim’s Algorithms\n- Fractional Knapsack"
    },
    {
      title: "Stacks and Queues",
      category: "Data Structures",
      content:
        "Stacks follow LIFO (Last In First Out), while Queues follow FIFO (First In First Out).\n\n- Stack: Used in undo mechanisms, recursion stack.\n- Queue: Used in scheduling, BFS traversal.\n- Deque: Double-ended queue supporting both ends."
    },
    {
      title: "Linked Lists",
      category: "Data Structures",
      content:
        "A Linked List is a linear structure where elements (nodes) point to the next. Types include:\n\n- Singly Linked List\n- Doubly Linked List\n- Circular Linked List\n\nUse-case: Dynamic memory allocation, insert/delete at head/tail."
    },
    {
      title: "Binary Search",
      category: "Algorithms",
      content:
        "Binary search efficiently finds elements in sorted arrays (O(log n)). It works by repeatedly dividing the array and comparing the middle element. Crucial for solving search-related problems quickly."
    },
    {
      title: "Graph Traversals: BFS vs DFS",
      category: "Graph Theory",
      content:
        "- BFS (Breadth-First Search): Level-by-level, uses queue. Good for shortest path.\n- DFS (Depth-First Search): Goes deep before backtracking. Uses stack/recursion.\n\nApplications: Cycle detection, pathfinding, topological sort."
    },
    {
      title: "Heap and Priority Queue",
      category: "Data Structures",
      content:
        "Heaps are binary trees that maintain a heap property (Min/Max). Priority queues are abstract data types built on heaps. Used in Dijkstra’s, scheduling, and real-time systems."
    },
    {
      title: "Trie (Prefix Tree)",
      category: "Data Structures",
      content:
        "Tries store dynamic sets of strings and enable fast prefix searches. Each node represents a character, allowing fast autocomplete and spell-checking operations."
    },
    {
      title: "Union-Find (Disjoint Set)",
      category: "Graph Theory",
      content:
        "Efficient structure to manage disjoint sets. Supports two operations:\n\n- Find: Returns root of the set\n- Union: Merges two sets\n\nUsed in Kruskal’s MST, detecting cycles in graphs."
    },
    {
      title: "Sliding Window Technique",
      category: "Algorithms",
      content:
        "Optimizes problems involving contiguous subarrays. Maintain a window that slides over the array to track sum, max, etc. Examples: Max sum subarray, longest substring without repeat."
    },
    {
      title: "Two Pointers Technique",
      category: "Algorithms",
      content:
        "Uses two indices to solve problems efficiently, especially with sorted arrays or linked lists. Examples:\n\n- Pair sum in sorted array\n- Remove duplicates\n- Reversing parts of an array"
    },
    {
      title: "Time and Space Complexity",
      category: "Core CS",
      content:
        "Time complexity describes how runtime scales. Space complexity indicates additional memory used. Big-O Notation examples:\n\n- O(1): Constant\n- O(n): Linear\n- O(log n): Binary search\n- O(n²): Nested loops"
    },
    {
      title: "Binary Trees vs Binary Search Trees",
      category: "Trees",
      content:
        "- Binary Tree: Each node has at most 2 children.\n- Binary Search Tree (BST): Left < Root < Right\n\nBST allows fast lookup, insertion, and deletion (avg O(log n)), unlike normal trees."
    }
  ];
  

  return (
    <div className="flashcards-wrapper">
      <Header />
      <Sidebar />

      <div className="flashcards-main">
        <div className="flashcard-list">
          <h2>Flashcards</h2>
          {flashcards.map((card, index) => (
            <button
              key={index}
              className={`flashcard-button ${
                selectedCard?.title === card.title ? "active" : ""
              }`}
              onClick={() => setSelectedCard(card)}
            >
              {card.title}
            </button>
          ))}
        </div>

        <div className="flashcard-content">
          {selectedCard ? (
            <>
              <h2>{selectedCard.title}</h2>
              <h4>Category: {selectedCard.category}</h4>
              <p>{selectedCard.content}</p>
            </>
          ) : (
            <p className="placeholder">Click a flashcard to view details</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlashcardsAndNotes;
