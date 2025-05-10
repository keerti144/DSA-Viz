import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../header/header';
import Sidebar from '../sidebar/sidebar';
import './TopicDetail.css';

// Copy topicDetails here for standalone use
const topicDetails = {
    'Arrays': {
        basics: { subtopics: ['Introduction', '1D/2D Arrays', 'Basic Operations'], time: 2 },
        intermediate: { subtopics: ['Searching/Sorting', 'Sliding Window', 'Prefix Sum'], time: 3 },
        expert: { subtopics: ['Advanced Patterns', 'Competitive Problems'], time: 4 },
    },
    'Linked Lists': {
        basics: { subtopics: ['Singly Linked List', 'Insertion/Deletion'], time: 2 },
        intermediate: { subtopics: ['Doubly/Circular', 'Reversal', 'Middle/Detect Cycle'], time: 3 },
        expert: { subtopics: ['LRU Cache', 'Hard Interview Problems'], time: 4 },
    },
    'Stacks': {
        basics: { subtopics: ['Stack Operations', 'Applications'], time: 1 },
        intermediate: { subtopics: ['Infix/Postfix', 'Min Stack'], time: 2 },
        expert: { subtopics: ['Monotonic Stack', 'Advanced Problems'], time: 3 },
    },
    'Queues': {
        basics: { subtopics: ['Queue Operations', 'Applications'], time: 1 },
        intermediate: { subtopics: ['Circular Queue', 'Deque'], time: 2 },
        expert: { subtopics: ['Priority Queue', 'Sliding Window Max'], time: 3 },
    },
    'Trees': {
        basics: { subtopics: ['Binary Tree', 'Traversals'], time: 2 },
        intermediate: { subtopics: ['BST', 'Balanced Trees'], time: 3 },
        expert: { subtopics: ['Segment Tree', 'Trie', 'AVL/Red-Black'], time: 4 },
    },
    'Graphs': {
        basics: { subtopics: ['Graph Representation', 'BFS/DFS'], time: 2 },
        intermediate: { subtopics: ['Topological Sort', 'Shortest Path'], time: 3 },
        expert: { subtopics: ['MST', 'Network Flow', 'Advanced Graphs'], time: 4 },
    },
    'Sorting': {
        basics: { subtopics: ['Bubble/Selection/Insertion'], time: 1 },
        intermediate: { subtopics: ['Merge/Quick Sort'], time: 2 },
        expert: { subtopics: ['Counting/Radix/Bucket'], time: 2 },
    },
    'Searching': {
        basics: { subtopics: ['Linear Search'], time: 1 },
        intermediate: { subtopics: ['Binary Search', 'Applications'], time: 2 },
        expert: { subtopics: ['Search in Rotated Array', 'Advanced Patterns'], time: 2 },
    },
    'Hashing': {
        basics: { subtopics: ['Hash Table', 'Basic Operations'], time: 1 },
        intermediate: { subtopics: ['Collision Handling', 'Applications'], time: 2 },
        expert: { subtopics: ['Custom Hash', 'Interview Problems'], time: 2 },
    },
    'Recursion': {
        basics: { subtopics: ['Base/Recursive Case', 'Simple Problems'], time: 1 },
        intermediate: { subtopics: ['Backtracking', 'Memoization'], time: 2 },
        expert: { subtopics: ['DP with Recursion', 'Hard Problems'], time: 2 },
    },
    'Dynamic Programming': {
        basics: { subtopics: ['Intro to DP', 'Fibonacci', 'Tabulation'], time: 2 },
        intermediate: { subtopics: ['1D/2D DP', 'Knapsack', 'LIS'], time: 3 },
        expert: { subtopics: ['DP on Trees/Graphs', 'Optimization'], time: 4 },
    },
    'Backend Developer': {
        basics: { subtopics: ['Node.js/Express Basics', 'REST APIs', 'Project Structure'], time: 3 },
        intermediate: { subtopics: ['Databases (MongoDB/PostgreSQL)', 'Authentication', 'CRUD Operations'], time: 4 },
        expert: { subtopics: ['Docker', 'Redis', 'Cloud Deployment', 'CI/CD'], time: 5 },
    },
    'AI & ML Path': {
        basics: { subtopics: ['Python for Data Science', 'Numpy/Pandas', 'Math Basics'], time: 3 },
        intermediate: { subtopics: ['Probability', 'scikit-learn', 'Regression/Classification'], time: 4 },
        expert: { subtopics: ['TensorFlow/PyTorch', 'Deep Learning', 'ML Projects'], time: 5 },
    },
    'Frontend Development': {
        basics: { subtopics: ['HTML/CSS', 'Responsive Design', 'JavaScript Basics'], time: 2 },
        intermediate: { subtopics: ['React.js', 'State Management', 'APIs'], time: 3 },
        expert: { subtopics: ['UI Frameworks', 'Performance', 'Portfolio Projects'], time: 4 },
    },
    'System Design': {
        basics: { subtopics: ['Scalability Basics', 'Load Balancing', 'Caching'], time: 2 },
        intermediate: { subtopics: ['Databases', 'Microservices', 'CAP Theorem'], time: 3 },
        expert: { subtopics: ['Architecture Diagrams', 'Tradeoffs', 'Case Studies'], time: 4 },
    },
    'Competitive Programming': {
        basics: { subtopics: ['Patterns', 'Greedy Algorithms', 'Sorting/Searching'], time: 2 },
        intermediate: { subtopics: ['DP', 'Number Theory', 'Practice Contests'], time: 3 },
        expert: { subtopics: ['Advanced Problems', 'Codeforces/Leetcode', 'Optimization'], time: 4 },
    },
};

const TopicDetail = () => {
    const { topic } = useParams();
    const navigate = useNavigate();
    const details = topicDetails[topic];

    if (!details) {
        return (
            <div className="topic-detail-page">
                <Header />
                <Sidebar />
                <div className="topic-detail-container">
                    <h1>Topic “{topic}” Not Found</h1>
                    <button className="btn" onClick={() => navigate('/roadmap')}>Back to Roadmap</button>
                </div>
            </div>
        );
    }

    return (
        <div className="topic-detail-page">
            <Header />
            <Sidebar />
            <div className="topic-detail-container">
                <h1>Detailed Roadmap for: {topic}</h1>
                <button className="btn" onClick={() => navigate('/roadmap')}>Back to Roadmap</button>
                {Object.entries(details).map(([level, { subtopics, time }]) => (
                    <div key={level} className="level-section">
                        <h2 className="level-header">{level.charAt(0).toUpperCase() + level.slice(1)}</h2>
                        <p className="level-time">Estimated time: ~{time} days</p>
                        <ul className="subtopic-list">
                            {subtopics.map(sub => (
                                <li key={sub}>• {sub}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopicDetail; 