import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../header/header';
import Sidebar from '../sidebar/sidebar';
import './TopicDetail.css';

// Copy topicDetails here for standalone use
const topicDetails = {
    'Arrays': {
        description: 'Learn the fundamentals of arrays, a core data structure for storing and manipulating collections of data efficiently.',
        prerequisites: [
            'Basic programming knowledge',
            'Familiarity with variables and loops'
        ],
        basics: {
            subtopics: ['Introduction', '1D/2D Arrays', 'Basic Operations'],
            time: 2,
            projects: ['Build an interactive array visualizer', 'Implement basic array operations (insert, delete, search)'],
            resources: [
                'https://www.geeksforgeeks.org/arrays-in-c-cpp/',
                'https://www.youtube.com/watch?v=1j0QOqkFQbA'
            ]
        },
        intermediate: {
            subtopics: ['Searching/Sorting', 'Sliding Window', 'Prefix Sum'],
            time: 3,
            projects: ['Sliding window sum calculator', 'Prefix sum range query tool'],
            resources: [
                'https://leetcode.com/tag/sliding-window/',
                'https://www.youtube.com/watch?v=agxS5ke7lqw'
            ]
        },
        expert: {
            subtopics: ['Advanced Patterns', 'Competitive Problems'],
            time: 4,
            projects: ['Competitive programming array problem set', 'Implement a dynamic array in C++'],
            resources: [
                'https://codeforces.com/problemset?tags=array',
                'https://www.geeksforgeeks.org/advanced-array-data-structure/'
            ]
        }
    },
    'Linked Lists': {
        description: 'Understand linked lists, a dynamic data structure for efficient insertions and deletions.',
        prerequisites: [
            'Basic programming knowledge',
            'Understanding of pointers or references'
        ],
        basics: {
            subtopics: ['Singly Linked List', 'Insertion/Deletion'],
            time: 2,
            projects: ['Singly linked list visualizer', 'Implement insert and delete operations'],
            resources: [
                'https://www.geeksforgeeks.org/data-structures/linked-list/',
                'https://www.youtube.com/watch?v=njTh_OwMljA'
            ]
        },
        intermediate: {
            subtopics: ['Doubly/Circular', 'Reversal', 'Middle/Detect Cycle'],
            time: 3,
            projects: ['Detect cycle in a linked list', 'Reverse a doubly linked list'],
            resources: [
                'https://leetcode.com/tag/linked-list/',
                'https://www.youtube.com/watch?v=jcZtMh_jov0'
            ]
        },
        expert: {
            subtopics: ['LRU Cache', 'Hard Interview Problems'],
            time: 4,
            projects: ['LRU Cache implementation', 'Hard linked list interview problems'],
            resources: [
                'https://leetcode.com/problems/lru-cache/',
                'https://www.interviewbit.com/linked-list-interview-questions/'
            ]
        }
    },
    'Stacks': {
        description: 'Master stack operations and applications, essential for parsing, backtracking, and more.',
        prerequisites: [
            'Basic programming knowledge',
            'Understanding of arrays or linked lists'
        ],
        basics: {
            subtopics: ['Stack Operations', 'Applications'],
            time: 1,
            projects: ['Stack visualizer', 'Implement stack using arrays'],
            resources: [
                'https://www.geeksforgeeks.org/stack-data-structure/',
                'https://www.youtube.com/watch?v=wjI1WNcIntg'
            ]
        },
        intermediate: {
            subtopics: ['Infix/Postfix', 'Min Stack'],
            time: 2,
            projects: ['Infix to postfix converter', 'Min stack implementation'],
            resources: [
                'https://leetcode.com/problems/min-stack/',
                'https://www.tutorialspoint.com/data_structures_algorithms/infix_to_postfix_algorithm.htm'
            ]
        },
        expert: {
            subtopics: ['Monotonic Stack', 'Advanced Problems'],
            time: 3,
            projects: ['Monotonic stack problem solver', 'Advanced stack-based algorithms'],
            resources: [
                'https://www.youtube.com/watch?v=VNbkzsnllsU',
                'https://www.geeksforgeeks.org/stack-set-4-evaluation-postfix-expression/'
            ]
        }
    },
    'Queues': {
        description: 'Explore queues and their variants, crucial for scheduling, buffering, and breadth-first search.',
        prerequisites: [
            'Basic programming knowledge',
            'Understanding of arrays or linked lists'
        ],
        basics: {
            subtopics: ['Queue Operations', 'Applications'],
            time: 1,
            projects: ['Queue visualizer', 'Implement queue using arrays'],
            resources: [
                'https://www.geeksforgeeks.org/queue-data-structure/',
                'https://www.youtube.com/watch?v=okr-XE8yTO8'
            ]
        },
        intermediate: {
            subtopics: ['Circular Queue', 'Deque'],
            time: 2,
            projects: ['Circular queue implementation', 'Deque visualizer'],
            resources: [
                'https://www.geeksforgeeks.org/deque-set-1-introduction-applications/',
                'https://www.youtube.com/watch?v=0jW8mC0o8q8'
            ]
        },
        expert: {
            subtopics: ['Priority Queue', 'Sliding Window Max'],
            time: 3,
            projects: ['Priority queue implementation', 'Sliding window maximum'],
            resources: [
                'https://leetcode.com/problems/sliding-window-maximum/',
                'https://www.programiz.com/dsa/priority-queue'
            ]
        }
    },
    'Trees': {
        description: 'Learn about trees, hierarchical data structures used in searching, sorting, and more.',
        prerequisites: [
            'Basic programming knowledge',
            'Understanding of recursion'
        ],
        basics: {
            subtopics: ['Binary Tree', 'Traversals'],
            time: 2,
            projects: ['Binary tree visualizer', 'Implement tree traversals'],
            resources: [
                'https://www.geeksforgeeks.org/binary-tree-data-structure/',
                'https://www.youtube.com/watch?v=9RHO6jU--GU'
            ]
        },
        intermediate: {
            subtopics: ['BST', 'Balanced Trees'],
            time: 3,
            projects: ['BST operations demo', 'Balanced tree checker'],
            resources: [
                'https://www.geeksforgeeks.org/binary-search-tree-data-structure/',
                'https://www.youtube.com/watch?v=Q4r2F3z2lGk'
            ]
        },
        expert: {
            subtopics: ['Segment Tree', 'Trie', 'AVL/Red-Black'],
            time: 4,
            projects: ['Segment tree visualizer', 'Trie implementation'],
            resources: [
                'https://cp-algorithms.com/data_structures/segment_tree.html',
                'https://www.geeksforgeeks.org/trie-insert-and-search/'
            ]
        }
    },
    'Graphs': {
        description: 'Understand graphs, a versatile data structure used in various algorithms and applications.',
        prerequisites: [
            'Basic programming knowledge',
            'Understanding of trees and recursion'
        ],
        basics: {
            subtopics: ['Graph Representation', 'BFS/DFS'],
            time: 2,
            projects: ['Graph traversal visualizer'],
            resources: ['BFS/DFS Guide', 'YouTube: Graphs']
        },
        intermediate: {
            subtopics: ['Topological Sort', 'Shortest Path'],
            time: 3,
            projects: ['Topological sort demo'],
            resources: ['Shortest Path Algorithms', 'Topological Sort Problems']
        },
        expert: {
            subtopics: ['MST', 'Network Flow', 'Advanced Graphs'],
            time: 4,
            projects: ['MST visualizer', 'Network flow demo'],
            resources: ['MST Guide', 'Network Flow Problems']
        }
    },
    'Sorting': {
        description: 'Master sorting algorithms and their applications in various data structures and problems.',
        prerequisites: [
            'Basic programming knowledge',
            'Understanding of arrays and recursion'
        ],
        basics: {
            subtopics: ['Bubble/Selection/Insertion'],
            time: 1,
            projects: ['Sorting visualizer'],
            resources: ['Sorting Basics', 'YouTube: Sorting']
        },
        intermediate: {
            subtopics: ['Merge/Quick Sort'],
            time: 2,
            projects: ['Merge sort demo'],
            resources: ['Merge Sort Guide', 'Quick Sort Problems']
        },
        expert: {
            subtopics: ['Counting/Radix/Bucket'],
            time: 2,
            projects: ['Radix sort implementation'],
            resources: ['Counting Sort Guide', 'Bucket Sort Problems']
        }
    },
    'Searching': {
        description: 'Learn about searching algorithms and their applications in various data structures and problems.',
        prerequisites: [
            'Basic programming knowledge',
            'Understanding of arrays and recursion'
        ],
        basics: {
            subtopics: ['Linear Search'],
            time: 1,
            projects: ['Linear search demo'],
            resources: ['Linear Search Guide', 'YouTube: Searching']
        },
        intermediate: {
            subtopics: ['Binary Search', 'Applications'],
            time: 2,
            projects: ['Binary search visualizer'],
            resources: ['Binary Search Patterns', 'Applications of Binary Search']
        },
        expert: {
            subtopics: ['Search in Rotated Array', 'Advanced Patterns'],
            time: 2,
            projects: ['Rotated array search demo'],
            resources: ['Rotated Array Guide', 'Advanced Search Problems']
        }
    },
    'Hashing': {
        description: 'Understand hashing and its applications in data structures and algorithms.',
        prerequisites: [
            'Basic programming knowledge',
            'Understanding of arrays and recursion'
        ],
        basics: {
            subtopics: ['Hash Table', 'Basic Operations'],
            time: 1,
            projects: ['Hash table implementation'],
            resources: ['Hash Table Guide', 'YouTube: Hashing']
        },
        intermediate: {
            subtopics: ['Collision Handling', 'Applications'],
            time: 2,
            projects: ['Collision handling demo'],
            resources: ['Collision Handling Patterns', 'Hashing Applications']
        },
        expert: {
            subtopics: ['Custom Hash', 'Interview Problems'],
            time: 2,
            projects: ['Custom hash function'],
            resources: ['Custom Hash Guide', 'Hash Interview Problems']
        }
    },
    'Recursion': {
        description: 'Learn about recursion and its applications in various algorithms and data structures.',
        prerequisites: [
            'Basic programming knowledge',
            'Understanding of functions and loops'
        ],
        basics: {
            subtopics: ['Base/Recursive Case', 'Simple Problems'],
            time: 1,
            projects: ['Simple recursion demo'],
            resources: ['Recursion Basics', 'YouTube: Recursion']
        },
        intermediate: {
            subtopics: ['Backtracking', 'Memoization'],
            time: 2,
            projects: ['Backtracking visualizer'],
            resources: ['Backtracking Guide', 'Memoization Patterns']
        },
        expert: {
            subtopics: ['DP with Recursion', 'Hard Problems'],
            time: 2,
            projects: ['DP recursion demo'],
            resources: ['DP with Recursion Guide', 'Hard Recursion Problems']
        }
    },
    'Dynamic Programming': {
        description: 'Master dynamic programming and its applications in various algorithms and problems.',
        prerequisites: [
            'Basic programming knowledge',
            'Understanding of recursion and optimization'
        ],
        basics: {
            subtopics: ['Intro to DP', 'Fibonacci', 'Tabulation'],
            time: 2,
            projects: ['Fibonacci tabulation demo'],
            resources: ['DP Basics', 'Tabulation Guide']
        },
        intermediate: {
            subtopics: ['1D/2D DP', 'Knapsack', 'LIS'],
            time: 3,
            projects: ['Knapsack problem visualizer'],
            resources: ['1D/2D DP Guide', 'LIS Problems']
        },
        expert: {
            subtopics: ['DP on Trees/Graphs', 'Optimization'],
            time: 4,
            projects: ['DP on trees demo'],
            resources: ['DP Optimization Guide', 'Tree/Graph DP Problems']
        }
    },
    'Backend Developer': {
        description: 'Learn to build robust backend systems, REST APIs, and scalable server-side applications using modern tools.',
        prerequisites: [
            'Basic programming knowledge',
            'Familiarity with JavaScript or Node.js'
        ],
        basics: {
            subtopics: ['Node.js/Express Basics', 'REST APIs', 'Project Structure'],
            time: 3,
            projects: ['Build a REST API', 'Project structure setup'],
            resources: ['Express Docs', 'REST API Tutorial']
        },
        intermediate: {
            subtopics: ['Databases (MongoDB/PostgreSQL)', 'Authentication', 'CRUD Operations'],
            time: 4,
            projects: ['CRUD app with MongoDB', 'User authentication demo'],
            resources: ['MongoDB Docs', 'PostgreSQL Tutorial']
        },
        expert: {
            subtopics: ['Docker', 'Redis', 'Cloud Deployment', 'CI/CD'],
            time: 5,
            projects: ['Dockerize an app', 'CI/CD pipeline setup'],
            resources: ['Docker Docs', 'CI/CD Guide']
        }
    },
    'AI & ML Path': {
        description: 'Start your journey in Artificial Intelligence and Machine Learning with hands-on projects and real-world datasets.',
        prerequisites: [
            'Basic Python programming',
            'Familiarity with high school math (algebra, probability)'
        ],
        basics: {
            subtopics: ['Python for Data Science', 'Numpy/Pandas', 'Math Basics'],
            time: 3,
            projects: ['Data analysis with Pandas'],
            resources: ['Numpy Guide', 'Pandas Tutorial']
        },
        intermediate: {
            subtopics: ['Probability', 'scikit-learn', 'Regression/Classification'],
            time: 4,
            projects: ['Regression model with scikit-learn'],
            resources: ['scikit-learn Docs', 'Regression Guide']
        },
        expert: {
            subtopics: ['TensorFlow/PyTorch', 'Deep Learning', 'ML Projects'],
            time: 5,
            projects: ['Image classifier with TensorFlow'],
            resources: ['TensorFlow Guide', 'PyTorch Tutorial']
        }
    },
    'Frontend Development': {
        description: 'Master the essentials of frontend web development, from HTML/CSS to advanced JavaScript frameworks.',
        prerequisites: [
            'Basic programming knowledge',
            'Familiarity with HTML and CSS'
        ],
        basics: {
            subtopics: ['HTML/CSS', 'Responsive Design', 'JavaScript Basics'],
            time: 2,
            projects: ['Personal portfolio site'],
            resources: ['HTML/CSS Guide', 'Responsive Design Tutorial']
        },
        intermediate: {
            subtopics: ['React.js', 'State Management', 'APIs'],
            time: 3,
            projects: ['React to-do app'],
            resources: ['React Docs', 'API Integration Guide']
        },
        expert: {
            subtopics: ['UI Frameworks', 'Performance', 'Portfolio Projects'],
            time: 4,
            projects: ['UI framework demo', 'Performance optimization'],
            resources: ['UI Framework Docs', 'Performance Guide']
        }
    },
    'System Design': {
        description: 'Understand the architecture and design of scalable, reliable systems used in the industry.',
        prerequisites: [
            'Basic knowledge of web development',
            'Familiarity with databases and networking concepts'
        ],
        basics: {
            subtopics: ['Scalability Basics', 'Load Balancing', 'Caching'],
            time: 2,
            projects: ['Load balancer simulation'],
            resources: ['System Design Basics', 'Caching Guide']
        },
        intermediate: {
            subtopics: ['Databases', 'Microservices', 'CAP Theorem'],
            time: 3,
            projects: ['Microservices demo'],
            resources: ['Database Guide', 'CAP Theorem Explained']
        },
        expert: {
            subtopics: ['Architecture Diagrams', 'Tradeoffs', 'Case Studies'],
            time: 4,
            projects: ['Draw an architecture diagram'],
            resources: ['Architecture Case Studies', 'Tradeoff Analysis']
        }
    },
    'Competitive Programming': {
        description: 'Sharpen your problem-solving skills and prepare for coding contests with structured practice.',
        prerequisites: [
            'Basic programming knowledge',
            'Familiarity with arrays and loops'
        ],
        basics: {
            subtopics: ['Patterns', 'Greedy Algorithms', 'Sorting/Searching'],
            time: 2,
            projects: ['Greedy algorithm problems'],
            resources: ['Greedy Patterns Guide', 'Sorting/Searching Problems']
        },
        intermediate: {
            subtopics: ['DP', 'Number Theory', 'Practice Contests'],
            time: 3,
            projects: ['DP contest set'],
            resources: ['Number Theory Guide', 'Practice Contest Platforms']
        },
        expert: {
            subtopics: ['Advanced Problems', 'Codeforces/Leetcode', 'Optimization'],
            time: 4,
            projects: ['Optimization problem set'],
            resources: ['Advanced CP Guide', 'Leetcode Hard Problems']
        }
    },
};

// Remove 'Description' and 'Prerequisites' keys from all topics in topicDetails
Object.keys(topicDetails).forEach(topic => {
  delete topicDetails[topic].Description;
  delete topicDetails[topic].Prerequisites;
});

const TopicDetail = () => {
    const { topic } = useParams();
    const navigate = useNavigate();
    const details = topicDetails[topic];

    // Example content for Mastering DSA (customize as needed)
    const isDSA = topic === 'Mastering DSA';
    const dsaContent = isDSA ? {
        description: 'Master the essential data structures and algorithms needed for technical interviews and efficient problem-solving.',
        prerequisites: [
            'Basic programming knowledge',
            'Understanding of time and space complexity',
        ],
        weeks: [
            {
                title: 'Basics',
                topics: [
                    'Array operations',
                    'Linear search',
                    'Binary search',
                    'Two-pointer technique',
                ],
                projects: [
                    'Implement a dynamic array',
                    'Build a search algorithm visualizer',
                ],
                resources: [
                    'Introduction to Algorithms',
                    'LeetCode Easy Array Problems',
                ],
                time: 5,
            },
            {
                title: 'Intermediate',
                topics: [
                    'Singly linked lists',
                    'Doubly linked lists',
                    'Recursive algorithms',
                    'Merge sort',
                ],
                projects: [
                    'Build a linked list visualizer',
                    'Implement recursive sorting algorithms',
                ],
                resources: [
                    'Recursion Practice Problems',
                    'Linked List Patterns',
                ],
                time: 5,
            },
            {
                title: 'Expert',
                topics: [
                    'Binary trees',
                    'BST operations',
                    'Graph traversal',
                    'Shortest path algorithms',
                ],
                projects: [
                    'Tree visualization tool',
                    'Graph pathfinding visualizer',
                ],
                resources: [
                    'Tree Traversal Guide',
                    'Graph Theory Basics',
                ],
                time: 6,
            },
            // Add more weeks as needed
        ]
    } : null;

    if (!details && !isDSA) {
        return (
            <div className="topic-detail-page">
                <Header />
                <Sidebar />
                <div className="topic-detail-container">
                    <h1>Topic "{topic}" Not Found</h1>
                    <button className="back-btn" onClick={() => navigate('/roadmap')}>Back to Roadmap</button>
                </div>
            </div>
        );
    }

    return (
        <div className="topic-detail-page">
            <Header />
            <Sidebar />
            <div className="topic-detail-container">
                <div className="back-btn-row">
                    <button className="back-btn" onClick={() => navigate('/roadmap')}>&larr; Back to Roadmaps</button>
                </div>
                <h1>{topic}</h1>
                <p>{(isDSA ? dsaContent.description : (topicDetails[topic]?.description || 'No description available.'))}</p>
                {(isDSA ? dsaContent.prerequisites : topicDetails[topic]?.prerequisites)?.length > 0 && (
                    <div className="detail-card prereq-section">
                        <div className="detail-card-title">Prerequisites</div>
                        <ul className="detail-card-list">
                            {(isDSA ? dsaContent.prerequisites : topicDetails[topic]?.prerequisites)?.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </div>
                )}
                {isDSA && dsaContent.weeks.map((week, i) => (
                    <div className="detail-card" key={i}>
                        <div className="detail-card-title">{week.title}</div>
                        <div style={{fontWeight:600, marginBottom:6, color:'#fff'}}>Topics Covered</div>
                        <ul className="detail-card-list">
                            {week.topics.map((t, j) => <li key={j}>{t}</li>)}
                        </ul>
                        <div style={{fontWeight:600, marginBottom:6, color:'#fff'}}>Projects</div>
                        <ul className="detail-card-list">
                            {week.projects.map((p, j) => <li key={j}>{p}</li>)}
                        </ul>
                        <div style={{fontWeight:600, marginBottom:6, color:'#fff'}}>Learning Resources</div>
                        <ul className="detail-card-list">
                            {week.resources.map((r, j) => <li key={j}>{r}</li>)}
                        </ul>
                        <div style={{fontWeight:600, color:'#b99cff', marginTop:8, textAlign:'right'}}>Estimated time: ~{week.time || (i === 0 ? 5 : i === 1 ? 5 : 6)} days</div>
                    </div>
                ))}
                {/* Fallback for other topics */}
                {!isDSA && (
                    <>
                        {Object.entries(details || {})
                          .filter(([level]) => level.toLowerCase() !== 'description' && level.toLowerCase() !== 'prerequisites')
                          .map(([level, data]) => (
                            <div key={level} className="detail-card">
                                <div className="detail-card-title">{level.charAt(0).toUpperCase() + level.slice(1)}</div>
                                <div style={{fontWeight:600, marginBottom:6, color:'#fff'}}>Topics Covered</div>
                                <ul className="detail-card-list">
                                    {(data.subtopics || []).map(sub => (
                                        <li key={sub}>{sub}</li>
                                    ))}
                                </ul>
                                <div style={{fontWeight:600, marginBottom:6, color:'#fff'}}>Projects</div>
                                <ul className="detail-card-list">
                                    {(data.projects && data.projects.length > 0) ? data.projects.map((p, j) => <li key={j}>{p}</li>) : <li>N/A</li>}
                                </ul>
                                <div style={{fontWeight:600, marginBottom:6, color:'#fff'}}>Learning Resources</div>
                                <ul className="detail-card-list">
                                    {(data.resources && data.resources.length > 0) ? data.resources.map((r, j) => <li key={j}>{r}</li>) : <li>N/A</li>}
                                </ul>
                                <div style={{fontWeight:600, color:'#b99cff', marginTop:8, textAlign:'right'}}>Estimated time: ~{data.time || '?'} days</div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default TopicDetail; 