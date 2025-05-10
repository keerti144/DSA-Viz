import React, { useState } from "react";
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import "./flashcardsandnotes.css";

export const FlashcardsAndNotes = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const topicNotes = {
    "Stacks and Queues": {
      title: "Quick Notes: Stacks & Queues",
      content: [
        {
          section: "Stacks (LIFO)",
          points: [
            "Linear structure, Last-In-First-Out",
            "Push/Pop/Peek: O(1)"
          ]
        },
        {
          section: "Queues (FIFO)",
          points: [
            "Linear structure, First-In-First-Out",
            "Enqueue/Dequeue/Front: O(1)"
          ]
        },
        {
          section: "Key Differences",
          points: [
            "Stack: One end (LIFO)",
            "Queue: Two ends (FIFO)"
          ]
        }
      ]
    },
    "Sorting Algorithms": {
      title: "Quick Notes: Sorting",
      content: [
        {
          section: "Comparison Sorts",
          points: [
            "Quick Sort: O(n log n) average",
            "Quick Sort: O(n²) worst",
            "Merge Sort: O(n log n) stable",
            "Heap Sort: O(n log n) in-place"
          ]
        },
        {
          section: "Simple Sorts",
          points: [
            "Bubble Sort: O(n²) stable",
            "Insertion Sort: O(n²) stable",
            "Insertion Sort: Good for small arrays",
            "Selection Sort: O(n²) in-place"
          ]
        },
        {
          section: "Key Points",
          points: [
            "Stable: Equal elements maintain order",
            "In-place: O(1) extra space",
            "Adaptive: Faster on nearly sorted data"
          ]
        }
      ]
    },
    "Graph Theory Basics": {
      title: "Quick Notes: Graph Theory",
      content: [
        {
          section: "Graph Types",
          points: [
            "Directed: Edges have direction",
            "Undirected: Bidirectional edges",
            "Weighted: Edges have values"
          ]
        },
        {
          section: "Representations",
          points: [
            "Adjacency List: O(V + E) space",
            "Adjacency Matrix: O(V²) space",
            "Edge List: O(E) space"
          ]
        },
        {
          section: "Common Concepts",
          points: [
            "Path: Sequence of vertices",
            "Cycle: Path that starts and ends at same vertex",
            "Connected: Path exists between all vertices"
          ]
        }
      ]
    },
    "Recursion": {
      title: "Quick Notes: Recursion",
      content: [
        {
          section: "Core Concepts",
          points: [
            "Function calls itself",
            "Base case stops recursion",
            "Recursive case reduces problem size"
          ]
        },
        {
          section: "Types",
          points: [
            "Direct: Function calls itself",
            "Indirect: A calls B, B calls A",
            "Tail: Recursive call is last operation"
          ]
        },
        {
          section: "Key Points",
          points: [
            "Stack space: O(n) for depth",
            "Base case is crucial",
            "Can be converted to iteration"
          ]
        }
      ]
    },
    "Dynamic Programming": {
      title: "Quick Notes: Dynamic Programming",
      content: [
        {
          section: "Core Concepts",
          points: [
            "Break into subproblems",
            "Store solutions (memoization)",
            "Build up from base cases"
          ]
        },
        {
          section: "Approaches",
          points: [
            "Top-down: Recursive with memoization",
            "Bottom-up: Iterative with table",
            "Both avoid redundant calculations"
          ]
        },
        {
          section: "Common Problems",
          points: [
            "Longest Common Subsequence",
            "Knapsack Problem",
            "Matrix Chain Multiplication"
          ]
        }
      ]
    },
    "Bit Manipulation": {
      title: "Quick Notes: Bit Manipulation",
      content: [
        {
          section: "Basic Operations",
          points: [
            "AND (&): Both bits 1",
            "OR (|): Either bit 1",
            "XOR (^): Bits different"
          ]
        },
        {
          section: "Shifts",
          points: [
            "Left (<<): Multiply by 2",
            "Right (>>): Divide by 2",
            "Zero-fill (>>>): Unsigned right shift"
          ]
        },
        {
          section: "Common Tricks",
          points: [
            "n & (n-1): Remove last 1",
            "n & (-n): Get last 1",
            "n ^ n = 0: XOR with self"
          ]
        }
      ]
    },
    "Hash Tables": {
      title: "Quick Notes: Hash Tables",
      content: [
        {
          section: "Core Concepts",
          points: [
            "Key-value storage",
            "O(1) average lookup",
            "Hash function maps keys"
          ]
        },
        {
          section: "Collision Handling",
          points: [
            "Chaining: Linked lists",
            "Open addressing: Probing",
            "Load factor affects performance"
          ]
        },
        {
          section: "Applications",
          points: [
            "Dictionaries",
            "Caching",
            "Counting frequencies"
          ]
        }
      ]
    },
    "Tree Traversals": {
      title: "Quick Notes: Tree Traversals",
      content: [
        {
          section: "DFS Traversals",
          points: [
            "Inorder: Left, Root, Right",
            "Preorder: Root, Left, Right",
            "Postorder: Left, Right, Root"
          ]
        },
        {
          section: "BFS Traversal",
          points: [
            "Level order: Top to bottom",
            "Uses queue",
            "O(n) time complexity"
          ]
        },
        {
          section: "Applications",
          points: [
            "Inorder: BST in order",
            "Preorder: Tree structure",
            "Postorder: Delete tree"
          ]
        }
      ]
    },
    "Backtracking": {
      title: "Quick Notes: Backtracking",
      content: [
        {
          section: "Core Concept",
          points: [
            "Try choices",
            "Backtrack if invalid",
            "Find all solutions"
          ]
        },
        {
          section: "Common Problems",
          points: [
            "N-Queens",
            "Sudoku",
            "Permutations"
          ]
        },
        {
          section: "Key Points",
          points: [
            "State space tree",
            "Pruning invalid paths",
            "O(2^n) time complexity"
          ]
        }
      ]
    },
    "Greedy Algorithms": {
      title: "Quick Notes: Greedy",
      content: [
        {
          section: "Core Concept",
          points: [
            "Make locally optimal choice",
            "Hope for global optimum",
            "No backtracking"
          ]
        },
        {
          section: "Common Problems",
          points: [
            "Activity Selection",
            "Huffman Coding",
            "Fractional Knapsack"
          ]
        },
        {
          section: "Key Points",
          points: [
            "Not always optimal",
            "Fast and simple",
            "Need proof of correctness"
          ]
        }
      ]
    },
    "Linked Lists": {
      title: "Quick Notes: Linked Lists",
      content: [
        {
          section: "Types",
          points: [
            "Singly: One pointer",
            "Doubly: Two pointers",
            "Circular: Last points to first"
          ]
        },
        {
          section: "Operations",
          points: [
            "Insert: O(1) at head",
            "Delete: O(1) at head",
            "Search: O(n) worst case"
          ]
        },
        {
          section: "Applications",
          points: [
            "LRU Cache",
            "Undo/Redo",
            "Polynomial arithmetic"
          ]
        }
      ]
    },
    "Binary Search": {
      title: "Quick Notes: Binary Search",
      content: [
        {
          section: "Core Concept",
          points: [
            "Divide and conquer",
            "O(log n) time",
            "Requires sorted array"
          ]
        },
        {
          section: "Variations",
          points: [
            "Find first occurrence",
            "Find last occurrence",
            "Find insertion point"
          ]
        },
        {
          section: "Key Points",
          points: [
            "Mid calculation: (low + high) / 2",
            "Overflow prevention",
            "Edge cases handling"
          ]
        }
      ]
    },
    "Graph Traversals: BFS vs DFS": {
      title: "Quick Notes: Graph Traversals",
      content: [
        {
          section: "BFS",
          points: [
            "Uses queue",
            "Level by level",
            "Shortest path in unweighted"
          ]
        },
        {
          section: "DFS",
          points: [
            "Uses stack/recursion",
            "Goes deep first",
            "Backtracking"
          ]
        },
        {
          section: "Applications",
          points: [
            "BFS: Shortest path",
            "DFS: Cycle detection",
            "Both: O(V + E) time"
          ]
        }
      ]
    },
    "Heap and Priority Queue": {
      title: "Quick Notes: Heap & PQ",
      content: [
        {
          section: "Heap Properties",
          points: [
            "Complete binary tree",
            "Heap property",
            "O(log n) operations"
          ]
        },
        {
          section: "Operations",
          points: [
            "Insert: O(log n)",
            "Extract: O(log n)",
            "Peek: O(1)"
          ]
        },
        {
          section: "Applications",
          points: [
            "Priority Queue",
            "Heap Sort",
            "Dijkstra's algorithm"
          ]
        }
      ]
    },
    "Trie (Prefix Tree)": {
      title: "Quick Notes: Trie",
      content: [
        {
          section: "Core Concept",
          points: [
            "Tree for strings",
            "Prefix sharing",
            "O(m) search time"
          ]
        },
        {
          section: "Operations",
          points: [
            "Insert: O(m)",
            "Search: O(m)",
            "Delete: O(m)"
          ]
        },
        {
          section: "Applications",
          points: [
            "Autocomplete",
            "Spell checker",
            "IP routing"
          ]
        }
      ]
    },
    "Union-Find (Disjoint Set)": {
      title: "Quick Notes: Union-Find",
      content: [
        {
          section: "Core Concept",
          points: [
            "Disjoint sets",
            "Union by rank",
            "Path compression"
          ]
        },
        {
          section: "Operations",
          points: [
            "Find: O(α(n))",
            "Union: O(α(n))",
            "α: Inverse Ackermann"
          ]
        },
        {
          section: "Applications",
          points: [
            "Kruskal's algorithm",
            "Connected components",
            "Image processing"
          ]
        }
      ]
    },
    "Sliding Window Technique": {
      title: "Quick Notes: Sliding Window",
      content: [
        {
          section: "Core Concept",
          points: [
            "Fixed/variable window",
            "O(n) time complexity",
            "Maintain window state"
          ]
        },
        {
          section: "Types",
          points: [
            "Fixed size: k elements",
            "Variable size: Dynamic",
            "Two pointers variant"
          ]
        },
        {
          section: "Applications",
          points: [
            "Maximum subarray",
            "Longest substring",
            "Anagrams"
          ]
        }
      ]
    },
    "Two Pointers Technique": {
      title: "Quick Notes: Two Pointers",
      content: [
        {
          section: "Core Concept",
          points: [
            "Two indices",
            "O(n) time complexity",
            "Array must be sorted"
          ]
        },
        {
          section: "Patterns",
          points: [
            "Opposite ends",
            "Fast and slow",
            "Window variant"
          ]
        },
        {
          section: "Applications",
          points: [
            "Pair sum",
            "Remove duplicates",
            "Cycle detection"
          ]
        }
      ]
    },
    "Time and Space Complexity": {
      title: "Quick Notes: Complexity",
      content: [
        {
          section: "Common Complexities",
          points: [
            "O(1): Constant",
            "O(log n): Logarithmic",
            "O(n): Linear"
          ]
        },
        {
          section: "Higher Complexities",
          points: [
            "O(n log n): Linearithmic",
            "O(n²): Quadratic",
            "O(2^n): Exponential"
          ]
        },
        {
          section: "Key Points",
          points: [
            "Worst case analysis",
            "Drop constants",
            "Consider both time and space"
          ]
        }
      ]
    },
    "Binary Trees vs Binary Search Trees": {
      title: "Quick Notes: BT vs BST",
      content: [
        {
          section: "Binary Tree",
          points: [
            "Any binary structure",
            "No ordering rules",
            "O(n) search time"
          ]
        },
        {
          section: "Binary Search Tree",
          points: [
            "Left < Root < Right",
            "O(log n) search time",
            "Must be balanced"
          ]
        },
        {
          section: "Key Differences",
          points: [
            "BST has ordering",
            "BST faster search",
            "Both O(n) space"
          ]
        }
      ]
    }
  };

  const flashcards = [

      { title: "Stacks and Queues", category: "Data Structures", contentFront: "What is the difference between a stack and a queue?", contentBack: "Stack: LIFO, Queue: FIFO. Stack operates at one end, queue at both." },
      { title: "Stacks and Queues", category: "Data Structures", contentFront: "Give a real-life example of a queue.", contentBack: "Example: People waiting in line." },
      { title: "Stacks and Queues", category: "Data Structures", contentFront: "Give a real-life example of a stack.", contentBack: "Example: A stack of plates." },
      { title: "Stacks and Queues", category: "Data Structures", contentFront: "Which operations are typically supported by a stack?", contentBack: "Push, Pop, Peek." },
      { title: "Stacks and Queues", category: "Data Structures", contentFront: "What is the time complexity of push and pop operations in a stack?", contentBack: "O(1)" },
      { title: "Stacks and Queues", category: "Data Structures", contentFront: "What is the time complexity of enqueue and dequeue operations in a queue?", contentBack: "O(1)" },
    
      // === Sorting Algorithms (6 questions) ===
      { title: "Sorting Algorithms", category: "Algorithms", contentFront: "What is the time complexity of Merge Sort?", contentBack: "O(n log n)" },
      { title: "Sorting Algorithms", category: "Algorithms", contentFront: "Is Quick Sort stable?", contentBack: "No. Equal elements may be reordered." },
      { title: "Sorting Algorithms", category: "Algorithms", contentFront: "What is the best case time complexity for Insertion Sort?", contentBack: "O(n)" },
      { title: "Sorting Algorithms", category: "Algorithms", contentFront: "What is the worst-case time complexity of Quick Sort?", contentBack: "O(n^2)" },
      { title: "Sorting Algorithms", category: "Algorithms", contentFront: "Which sorting algorithm is stable and in-place?", contentBack: "Insertion Sort." },
      { title: "Sorting Algorithms", category: "Algorithms", contentFront: "What is the time complexity of Bubble Sort?", contentBack: "O(n^2)" },
    
      // === Graph Theory Basics (6 questions) ===
      { title: "Graph Theory Basics", category: "Algorithms", contentFront: "What is an adjacency list?", contentBack: "A graph representation storing lists of connected vertices for each vertex." },
      { title: "Graph Theory Basics", category: "Algorithms", contentFront: "What is an adjacency matrix?", contentBack: "2D array where entry [i][j] indicates edge presence." },
      { title: "Graph Theory Basics", category: "Algorithms", contentFront: "What is a directed graph?", contentBack: "A graph where edges have direction (A → B)." },
      { title: "Graph Theory Basics", category: "Algorithms", contentFront: "What is an undirected graph?", contentBack: "A graph where edges are bidirectional (A—B)." },
      { title: "Graph Theory Basics", category: "Algorithms", contentFront: "What is the time complexity of BFS?", contentBack: "O(V + E), where V is the number of vertices and E is the number of edges." },
      { title: "Graph Theory Basics", category: "Algorithms", contentFront: "What is the time complexity of DFS?", contentBack: "O(V + E), where V is the number of vertices and E is the number of edges." },
    
      // === Recursion (6 questions) ===
      { title: "Recursion", category: "Programming Concept", contentFront: "What is the base case in recursion?", contentBack: "The condition where recursion stops." },
      { title: "Recursion", category: "Programming Concept", contentFront: "What is a recursive function?", contentBack: "A function that calls itself in order to solve smaller instances of the same problem." },
      { title: "Recursion", category: "Programming Concept", contentFront: "Why is it important to have a base case in recursion?", contentBack: "To prevent infinite recursion and allow the function to terminate." },
      { title: "Recursion", category: "Programming Concept", contentFront: "How does recursion differ from iteration?", contentBack: "Recursion involves function calls, while iteration involves repeated looping." },
      { title: "Recursion", category: "Programming Concept", contentFront: "What is tail recursion?", contentBack: "A type of recursion where the recursive call is the last operation in the function." },
      { title: "Recursion", category: "Programming Concept", contentFront: "What is the time complexity of a recursive Fibonacci function?", contentBack: "O(2^n) without memoization." },
    
      // === Dynamic Programming (6 questions) ===
      { title: "Dynamic Programming", category: "Algorithms", contentFront: "What are the two key properties of DP?", contentBack: "Overlapping subproblems and optimal substructure." },
      { title: "Dynamic Programming", category: "Algorithms", contentFront: "What is memoization?", contentBack: "Storing previously computed results to avoid redundant calculations." },
      { title: "Dynamic Programming", category: "Algorithms", contentFront: "What is the time complexity of the Knapsack problem using DP?", contentBack: "O(nW), where n is the number of items and W is the capacity." },
      { title: "Dynamic Programming", category: "Algorithms", contentFront: "What is the difference between dynamic programming and divide-and-conquer?", contentBack: "DP solves overlapping subproblems, while divide-and-conquer solves independent subproblems." },
      { title: "Dynamic Programming", category: "Algorithms", contentFront: "What is a bottom-up approach in DP?", contentBack: "Building the solution from the smallest subproblems up to the final solution." },
      { title: "Dynamic Programming", category: "Algorithms", contentFront: "What is the time complexity of the Longest Common Subsequence problem using DP?", contentBack: "O(mn), where m and n are the lengths of the two strings." },
    
      // === Bit Manipulation (6 questions) ===
      { title: "Bit Manipulation", category: "Programming", contentFront: "What does the '&' bitwise operator do?", contentBack: "Performs bitwise AND." },
      { title: "Bit Manipulation", category: "Programming", contentFront: "What does the '|' bitwise operator do?", contentBack: "Performs bitwise OR." },
      { title: "Bit Manipulation", category: "Programming", contentFront: "What is a left shift operation?", contentBack: "Shifting the bits of a number to the left, effectively multiplying by 2." },
      { title: "Bit Manipulation", category: "Programming", contentFront: "What is a right shift operation?", contentBack: "Shifting the bits of a number to the right, effectively dividing by 2." },
      { title: "Bit Manipulation", category: "Programming", contentFront: "What does the '^' bitwise operator do?", contentBack: "Performs bitwise XOR." },
      { title: "Bit Manipulation", category: "Programming", contentFront: "What is the time complexity of flipping a bit?", contentBack: "O(1)." },
    
      // === Hash Tables (6 questions) ===
      { title: "Hash Tables", category: "Data Structures", contentFront: "What is a hash collision?", contentBack: "When two keys map to the same index." },
      { title: "Hash Tables", category: "Data Structures", contentFront: "How does open addressing resolve hash collisions?", contentBack: "By finding the next available index using linear or quadratic probing." },
      { title: "Hash Tables", category: "Data Structures", contentFront: "What is chaining in hash tables?", contentBack: "Storing multiple elements at the same index using a linked list." },
      { title: "Hash Tables", category: "Data Structures", contentFront: "What is the time complexity of searching in a hash table?", contentBack: "O(1) on average, O(n) in the worst case." },
      { title: "Hash Tables", category: "Data Structures", contentFront: "What is the purpose of a hash function?", contentBack: "To convert a key into an index in the hash table." },
      { title: "Hash Tables", category: "Data Structures", contentFront: "What is the time complexity of inserting an element into a hash table?", contentBack: "O(1) on average, O(n) in the worst case." },
    
      // === Tree Traversals (6 questions) ===
      { title: "Tree Traversals", category: "Trees", contentFront: "What are the three DFS tree traversals?", contentBack: "Inorder, Preorder, Postorder." },
      { title: "Tree Traversals", category: "Trees", contentFront: "What is the time complexity of DFS?", contentBack: "O(n), where n is the number of nodes." },
      { title: "Tree Traversals", category: "Trees", contentFront: "What is the difference between DFS and BFS?", contentBack: "DFS uses a stack (or recursion), while BFS uses a queue." },
      { title: "Tree Traversals", category: "Trees", contentFront: "What is an inorder traversal of a binary search tree?", contentBack: "Visiting nodes in ascending order of their values." },
      { title: "Tree Traversals", category: "Trees", contentFront: "What is a level-order traversal?", contentBack: "Visiting nodes level by level, from top to bottom." },
      { title: "Tree Traversals", category: "Trees", contentFront: "What is the time complexity of a level-order traversal?", contentBack: "O(n), where n is the number of nodes." },
    
      { title: "Backtracking", category: "Algorithms", contentFront: "What is backtracking used for?", contentBack: "Exploring all possible solutions and undoing choices." },
      { title: "Backtracking", category: "Algorithms", contentFront: "What is the general approach of a backtracking algorithm?", contentBack: "Try a solution, backtrack if it leads to an invalid state, and continue exploring." },
      { title: "Backtracking", category: "Algorithms", contentFront: "What is the time complexity of backtracking in a general case?", contentBack: "O(2^n) for problems with binary decisions." },
      { title: "Backtracking", category: "Algorithms", contentFront: "What is the difference between backtracking and brute force?", contentBack: "Backtracking prunes the search space, while brute force explores all possibilities." },
      { title: "Backtracking", category: "Algorithms", contentFront: "Give an example of a problem that uses backtracking.", contentBack: "Examples: N-Queens, Sudoku solving." },
      { title: "Backtracking", category: "Algorithms", contentFront: "What is pruning in backtracking?", contentBack: "Pruning refers to cutting off paths that do not lead to valid solutions." },
    
      // === Greedy Algorithms (6 questions) ===
      { title: "Greedy Algorithms", category: "Algorithms", contentFront: "What is the greedy choice property?", contentBack: "Choosing the best local option leads to a global optimum." },
      { title: "Greedy Algorithms", category: "Algorithms", contentFront: "What is the time complexity of a greedy algorithm?", contentBack: "Usually O(n log n) depending on the problem (e.g., sorting or heap operations)." },
      { title: "Greedy Algorithms", category: "Algorithms", contentFront: "What is a common use case for greedy algorithms?", contentBack: "Problems like Huffman coding, Activity Selection, and Fractional Knapsack." },
      { title: "Greedy Algorithms", category: "Algorithms", contentFront: "What is the key difference between greedy algorithms and dynamic programming?", contentBack: "Greedy algorithms make the locally optimal choice, while DP considers the global optimum." },
      { title: "Greedy Algorithms", category: "Algorithms", contentFront: "When is a greedy algorithm optimal?", contentBack: "When the problem has the greedy-choice property and optimal substructure." },
      { title: "Greedy Algorithms", category: "Algorithms", contentFront: "What is an example of a greedy algorithm?", contentBack: "Example: Kruskal's or Prim's algorithm for minimum spanning tree." },
    
      // === Linked Lists (6 questions) ===
      { title: "Linked Lists", category: "Data Structures", contentFront: "What is the time complexity to insert at the head of a singly linked list?", contentBack: "O(1)" },
      { title: "Linked Lists", category: "Data Structures", contentFront: "What is the time complexity to insert at the tail of a singly linked list?", contentBack: "O(n) if we don't have a tail pointer, O(1) with a tail pointer." },
      { title: "Linked Lists", category: "Data Structures", contentFront: "What is the time complexity to delete from the head of a singly linked list?", contentBack: "O(1)" },
      { title: "Linked Lists", category: "Data Structures", contentFront: "What is the time complexity to search for an element in a singly linked list?", contentBack: "O(n)" },
      { title: "Linked Lists", category: "Data Structures", contentFront: "What is the difference between a singly linked list and a doubly linked list?", contentBack: "A doubly linked list has two pointers per node (next and previous), while a singly linked list has one." },
      { title: "Linked Lists", category: "Data Structures", contentFront: "What is the time complexity of reversing a singly linked list?", contentBack: "O(n)" },
    
      // === Binary Search (6 questions) ===
      { title: "Binary Search", category: "Algorithms", contentFront: "When can binary search be used?", contentBack: "When the array is sorted." },
      { title: "Binary Search", category: "Algorithms", contentFront: "What is the time complexity of binary search?", contentBack: "O(log n)" },
      { title: "Binary Search", category: "Algorithms", contentFront: "What is the space complexity of binary search?", contentBack: "O(1) if implemented iteratively, O(log n) if implemented recursively." },
      { title: "Binary Search", category: "Algorithms", contentFront: "What is the main advantage of binary search over linear search?", contentBack: "Binary search has a much better time complexity: O(log n) vs O(n)." },
      { title: "Binary Search", category: "Algorithms", contentFront: "Can binary search be used on unsorted arrays?", contentBack: "No, binary search requires the array to be sorted." },
      { title: "Binary Search", category: "Algorithms", contentFront: "What is the mid-point calculation in binary search?", contentBack: "mid = (low + high) / 2" },
    
      // === Graph Traversals: BFS vs DFS (6 questions) ===
      { title: "Graph Traversals: BFS vs DFS", category: "Algorithms", contentFront: "Which traversal uses a queue?", contentBack: "Breadth-First Search (BFS)." },
      { title: "Graph Traversals: BFS vs DFS", category: "Algorithms", contentFront: "Which traversal uses a stack?", contentBack: "Depth-First Search (DFS)." },
      { title: "Graph Traversals: BFS vs DFS", category: "Algorithms", contentFront: "What is the time complexity of BFS?", contentBack: "O(V + E), where V is the number of vertices and E is the number of edges." },
      { title: "Graph Traversals: BFS vs DFS", category: "Algorithms", contentFront: "What is the time complexity of DFS?", contentBack: "O(V + E), where V is the number of vertices and E is the number of edges." },
      { title: "Graph Traversals: BFS vs DFS", category: "Algorithms", contentFront: "What is the key difference between BFS and DFS?", contentBack: "BFS explores level by level using a queue, while DFS explores as deep as possible using a stack." },
      { title: "Graph Traversals: BFS vs DFS", category: "Algorithms", contentFront: "When is BFS preferred over DFS?", contentBack: "When finding the shortest path in an unweighted graph." },
    
      // === Heap and Priority Queue (6 questions) ===
      { title: "Heap and Priority Queue", category: "Data Structures", contentFront: "What property does a min-heap maintain?", contentBack: "Each node is smaller than its children." },
      { title: "Heap and Priority Queue", category: "Data Structures", contentFront: "What is the time complexity for inserting an element into a heap?", contentBack: "O(log n)" },
      { title: "Heap and Priority Queue", category: "Data Structures", contentFront: "What is the time complexity for extracting the minimum from a min-heap?", contentBack: "O(log n)" },
      { title: "Heap and Priority Queue", category: "Data Structures", contentFront: "What is the time complexity for building a heap?", contentBack: "O(n)" },
      { title: "Heap and Priority Queue", category: "Data Structures", contentFront: "What is the difference between a heap and a priority queue?", contentBack: "A heap is a specific binary tree structure; a priority queue is an abstract data type that uses a heap to maintain priority." },
      { title: "Heap and Priority Queue", category: "Data Structures", contentFront: "What is the time complexity for peeking at the top of a heap?", contentBack: "O(1)" },
    
      // === Trie (Prefix Tree) (6 questions) ===
      { title: "Trie (Prefix Tree)", category: "Data Structures", contentFront: "What is a Trie used for?", contentBack: "Efficient prefix searching and autocomplete." },
      { title: "Trie (Prefix Tree)", category: "Data Structures", contentFront: "What is the time complexity to insert a word into a Trie?", contentBack: "O(m), where m is the length of the word." },
      { title: "Trie (Prefix Tree)", category: "Data Structures", contentFront: "What is the space complexity of a Trie?", contentBack: "O(n * m), where n is the number of words and m is the average length of the word." },
      { title: "Trie (Prefix Tree)", category: "Data Structures", contentFront: "What is the time complexity to search for a word in a Trie?", contentBack: "O(m), where m is the length of the word." },
      { title: "Trie (Prefix Tree)", category: "Data Structures", contentFront: "What are the advantages of using a Trie over a hash map?", contentBack: "Tries are faster for prefix-based search operations." },
      { title: "Trie (Prefix Tree)", category: "Data Structures", contentFront: "What are the drawbacks of using a Trie?", contentBack: "Higher memory usage due to storing all the characters for each word." },
    
      // === Union-Find (Disjoint Set) (6 questions) ===
      { title: "Union-Find (Disjoint Set)", category: "Algorithms", contentFront: "What is path compression in Union-Find?", contentBack: "Flattens the structure of the tree for fast lookup." },
      { title: "Union-Find (Disjoint Set)", category: "Algorithms", contentFront: "What is the time complexity of Union-Find with path compression?", contentBack: "O(α(n)), where α is the inverse Ackermann function." },
      { title: "Union-Find (Disjoint Set)", category: "Algorithms", contentFront: "What is union by rank in Union-Find?", contentBack: "Union by rank attaches the smaller tree to the root of the larger tree." },
      { title: "Union-Find (Disjoint Set)", category: "Algorithms", contentFront: "What is the time complexity of the union operation in Union-Find with path compression and union by rank?", contentBack: "O(α(n))" },
      { title: "Union-Find (Disjoint Set)", category: "Algorithms", contentFront: "What problem does Union-Find solve?", contentBack: "Finding connected components in a graph or determining if two elements are in the same set." },
      { title: "Union-Find (Disjoint Set)", category: "Algorithms", contentFront: "What is the time complexity of the find operation in Union-Find with path compression?", contentBack: "O(α(n))" },
    
      // === Sliding Window Technique (6 questions) ===
      { title: "Sliding Window Technique", category: "Algorithms", contentFront: "What type of problems use the sliding window technique?", contentBack: "Problems involving subarrays or substrings." },
      { title: "Sliding Window Technique", category: "Algorithms", contentFront: "What is the time complexity of the sliding window technique?", contentBack: "O(n), where n is the size of the input." },
      { title: "Sliding Window Technique", category: "Algorithms", contentFront: "When is the sliding window technique useful?", contentBack: "When the problem involves finding the maximum, minimum, or sum of elements in a subarray." },
      { title: "Sliding Window Technique", category: "Algorithms", contentFront: "What is the difference between a fixed-size and a variable-size sliding window?", contentBack: "Fixed-size window moves by one step, while variable-size adjusts based on conditions." },
      { title: "Sliding Window Technique", category: "Algorithms", contentFront: "Give an example problem that can be solved using the sliding window technique.", contentBack: "Example: Maximum sum of a subarray of size k." },
      { title: "Sliding Window Technique", category: "Algorithms", contentFront: "How does the sliding window technique reduce time complexity?", contentBack: "It avoids recalculating the results from scratch for overlapping subarrays." },
    
      // === Two Pointers Technique (6 questions) ===
      { title: "Two Pointers Technique", category: "Algorithms", contentFront: "When is the two-pointer technique useful?", contentBack: "When solving problems on sorted arrays." },
      { title: "Two Pointers Technique", category: "Algorithms", contentFront: "What is the time complexity of the two-pointer technique?", contentBack: "O(n), where n is the size of the input." },
      { title: "Two Pointers Technique", category: "Algorithms", contentFront: "What are some common problems that use the two-pointer technique?", contentBack: "Examples: Pair sum, partitioning an array, reversing a string." },
      { title: "Two Pointers Technique", category: "Algorithms", contentFront: "What is the difference between the slow and fast pointers in the two-pointer technique?", contentBack: "Slow pointer moves one step, fast pointer moves two steps to find cycles." },
      { title: "Two Pointers Technique", category: "Algorithms", contentFront: "What is a classic example of using two pointers?", contentBack: "Example: Checking if a linked list has a cycle using Floyd's Tortoise and Hare algorithm." },
      { title: "Two Pointers Technique", category: "Algorithms", contentFront: "How does the two-pointer technique help in problems involving arrays?", contentBack: "It reduces the need for nested loops and optimizes performance." },
    
      // === Time and Space Complexity (6 questions) ===
      { title: "Time and Space Complexity", category: "Analysis", contentFront: "What does O(n^2) mean?", contentBack: "Time grows quadratically with input size." },
      { title: "Time and Space Complexity", category: "Analysis", contentFront: "What does O(1) mean in terms of time complexity?", contentBack: "Time remains constant regardless of input size." },
      { title: "Time and Space Complexity", category: "Analysis", contentFront: "What is the time complexity of accessing an element in an array?", contentBack: "O(1)" },
      { title: "Time and Space Complexity", category: "Analysis", contentFront: "What does O(log n) mean in terms of time complexity?", contentBack: "Time grows logarithmically with input size." },
      { title: "Time and Space Complexity", category: "Analysis", contentFront: "What is the difference between time complexity and space complexity?", contentBack: "Time complexity measures execution time; space complexity measures memory usage." },
      { title: "Time and Space Complexity", category: "Analysis", contentFront: "What does O(n log n) mean in terms of time complexity?", contentBack: "Time grows as a combination of linear and logarithmic growth." },
    
      // === Binary Trees vs Binary Search Trees (6 questions) ===
      { title: "Binary Trees vs Binary Search Trees", category: "Trees", contentFront: "What is the difference between BT and BST?", contentBack: "BST has ordered left/right children; BT has no order." },
      { title: "Binary Trees vs Binary Search Trees", category: "Trees", contentFront: "What is the time complexity for searching an element in a BST?", contentBack: "O(log n) for balanced BST, O(n) for unbalanced BST." },
      { title: "Binary Trees vs Binary Search Trees", category: "Trees", contentFront: "What is the time complexity for inserting an element in a BST?", contentBack: "O(log n) for balanced BST, O(n) for unbalanced BST." },
      { title: "Binary Trees vs Binary Search Trees", category: "Trees", contentFront: "What is the space complexity of a binary tree?", contentBack: "O(n), where n is the number of nodes." },
      { title: "Binary Trees vs Binary Search Trees", category: "Trees", contentFront: "What traversal is commonly used to retrieve elements in a BST?", contentBack: "In-order traversal, as it visits elements in sorted order." },
      { title: "Binary Trees vs Binary Search Trees", category: "Trees", contentFront: "What is a full binary tree?", contentBack: "A tree where every node has either 0 or 2 children." }
  ];

  const topics = Array.from(new Set(flashcards.map((card) => card.title)));
  const topicCards = flashcards.filter((card) => card.title === selectedTopic);
  const currentCard = topicCards[currentCardIndex] || null;

  const handleFlip = () => setFlipped((prev) => !prev);

  const handleNext = () => {
    setFlipped(false);
    if (currentCardIndex < topicCards.length - 1) {
      setCurrentCardIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setFlipped(false);
    if (currentCardIndex > 0) {
      setCurrentCardIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="flashcards-wrapper">
      <Header />
      <Sidebar />

      <div className="flashcards-main">
        <div className="flashcard-list">
          <h2>Flashcards</h2>
          {topics.map((topic, index) => (
            <button
              key={index}
              className={`flashcard-button ${selectedTopic === topic ? "active" : ""}`}
              onClick={() => {
                setSelectedTopic(topic);
                setCurrentCardIndex(0);
                setFlipped(false);
              }}
            >
              {topic}
            </button>
          ))}
        </div>

        <div className="flashcard-content">
          {currentCard ? (
            <div className="card-container">
              <span className="category-badge">{currentCard.category}</span>
              <div className={`flashcard ${flipped ? "flipped" : ""}`} onClick={handleFlip}>
                <div className="front"><p>{currentCard.contentFront}</p></div>
                <div className="back"><p>{currentCard.contentBack}</p></div>
              </div>

              <div className="card-controls">
                <button onClick={handlePrev} disabled={currentCardIndex === 0}>Previous</button>
                <button onClick={handleFlip}>Flip</button>
                <button onClick={handleNext} disabled={currentCardIndex === topicCards.length - 1}>Next</button>
              </div>

              <p className="card-count">
                Card {currentCardIndex + 1} of {topicCards.length}
              </p>

              {selectedTopic && topicNotes[selectedTopic] && (
                <div className="topic-notes">
                  <h3>{topicNotes[selectedTopic].title}</h3>
                  {topicNotes[selectedTopic].content.map((section, index) => (
                    <div key={index} className="notes-section">
                      <h4>{section.section}</h4>
                      <ul>
                        {section.points.map((point, pointIndex) => (
                          <li key={pointIndex}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <p className="placeholder">Click a flashcard topic to begin</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlashcardsAndNotes;
