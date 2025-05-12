import React, { useState } from "react";
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import "./roadmap.css";
import roadmapImg from '../assets/roadmap.png';
import { useNavigate } from 'react-router-dom';

const roadmapData = {
  recommended: [
    {
      title: "Mastering DSA",
      description: "From arrays to graphs — step-by-step guide to crack coding interviews.",
      tag: "Intermediate",
      content: "This roadmap covers arrays, linked lists, trees, graphs, and dynamic programming with code examples and real-world interview tips.",
    },
    {
      title: "Backend Developer",
      description: "Build scalable APIs, learn databases, Docker & more.",
      tag: "Career Path",
      content: "Start with Node.js/Express, then databases like MongoDB/PostgreSQL, then learn Docker, Redis, and cloud deployment.",
    },
    {
      title: "AI & ML Path",
      description: "Get started with AI/ML — Math, Python, Algorithms, Projects.",
      tag: "Advanced",
      content: "Linear algebra, probability, scikit-learn, TensorFlow/PyTorch, ML projects — this path prepares you for research and industry.",
    },
  ],
  popular: [
    {
      title: "Frontend Development",
      description: "HTML, CSS, JS, React — all you need for modern web UIs.",
      tag: "Beginner",
      content: "Start with HTML/CSS basics, then JavaScript, then React. Later dive into UI frameworks and build portfolio projects.",
    },
    {
      title: "System Design",
      description: "Understand the architecture behind scalable systems.",
      tag: "Interview",
      content: "Learn load balancing, caching, databases, microservices, CAP theorem, and draw architecture diagrams with tradeoffs.",
    },
    {
      title: "Competitive Programming",
      description: "Sharpen your problem-solving skills with structured topics.",
      tag: "Contest Ready",
      content: "Focus on patterns, greedy algorithms, DP, number theory, and solve problems on Codeforces/Leetcode regularly.",
    },
  ],
};

// Topic details for each level
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
};

const defaultTopics = Object.keys(topicDetails);

export const Roadmap = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [topicLevels, setTopicLevels] = useState({});
  const [customRoadmap, setCustomRoadmap] = useState(null);
  const navigate = useNavigate();

  const toggleCard = (section, index, item) => {
    // On card click, navigate to details page for that topic
    if (item && item.title && topicDetails[item.title]) {
      navigate(`/roadmap/${encodeURIComponent(item.title)}`);
      return;
    }
    const id = `${section}-${index}`;
    setExpandedCard(expandedCard === id ? null : id);
  };

  // Modal logic
  const openModal = () => {
    setShowModal(true);
    setSelectedTopics([]);
    setTopicLevels({});
    setCustomRoadmap(null);
  };
  const closeModal = () => setShowModal(false);

  const handleTopicToggle = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };
  const handleLevelChange = (topic, level) => {
    setTopicLevels((prev) => ({ ...prev, [topic]: level }));
  };
  const handleCreateRoadmap = () => {
    if (selectedTopics.length === 0) return;
    setCustomRoadmap(selectedTopics.map((topic) => {
      const level = topicLevels[topic] || 'basics';
      return {
        topic,
        level,
        ...topicDetails[topic][level],
      };
    }));
  };
  const totalTime = customRoadmap ? customRoadmap.reduce((sum, t) => sum + t.time, 0) : 0;

  const renderCards = (data, sectionName) =>
    data.map((item, index) => {
      return (
        <div className="card" key={index}>
          <div className="card-icon">{item.title === 'Mastering DSA' ? <span>&lt;/&gt;</span> : <span>📚</span>}</div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <span className="tag">{item.tag}</span>
          <hr className="card-divider" />
          <button className="card-action-btn" onClick={() => navigate(`/roadmap/${encodeURIComponent(item.title)}`)}>
            Start Learning &rarr;
          </button>
        </div>
      );
    });

  return (
    <div className="roadmap-page">
      <Header />
      <Sidebar />
      <div className="roadmap-container">
        <h1 className="title">Roadmap</h1>
        <div className="action-buttons">
          <button className="btn" onClick={openModal}>Create Your Own</button>
        </div>
        <div className="section">
          <h2>Recommended Roadmaps</h2>
          <div className="grid">
            {renderCards(roadmapData.recommended, 'recommended')}
          </div>
        </div>
        <div className="section">
          <h2>Most Used Roadmaps</h2>
          <div className="grid">
            {renderCards(roadmapData.popular, 'popular')}
          </div>
        </div>
      </div>
      {/* Modal for custom roadmap */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>&times;</button>
            <h2>Create Your Custom Roadmap</h2>
            <div className="topic-list">
              {defaultTopics.map(topic => (
                <div key={topic} className={`topic-item${selectedTopics.includes(topic) ? ' selected' : ''}`}
                  onClick={() => handleTopicToggle(topic)}>
                  <span>{topic}</span>
                  {selectedTopics.includes(topic) && (
                    <div className="level-select">
                      <button className={topicLevels[topic] === 'basics' ? 'level-btn selected' : 'level-btn'} onClick={e => { e.stopPropagation(); handleLevelChange(topic, 'basics'); }}>Basics</button>
                      <button className={topicLevels[topic] === 'intermediate' ? 'level-btn selected' : 'level-btn'} onClick={e => { e.stopPropagation(); handleLevelChange(topic, 'intermediate'); }}>Intermediate</button>
                      <button className={topicLevels[topic] === 'expert' ? 'level-btn selected' : 'level-btn'} onClick={e => { e.stopPropagation(); handleLevelChange(topic, 'expert'); }}>Expert</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button className="btn" onClick={handleCreateRoadmap} style={{ marginTop: 16 }}>Generate Roadmap</button>
            {customRoadmap && (
              <div className="custom-timeline">
                <h3>Your Roadmap Plan</h3>
                <div className="timeline-bar">
                  {customRoadmap.map((t, i) => (
                    <div
                      key={t.topic}
                      className="timeline-block"
                      style={{ flex: t.time, background: `hsl(${(i * 40) % 360},70%,60%)` }}
                    >
                      <span>{t.topic} <span className="level-label">({t.level})</span></span>
                      <ul className="subtopic-list">
                        {t.subtopics.map(sub => <li key={sub}>{sub}</li>)}
                      </ul>
                      <span className="timeline-days">~{t.time}d</span>
                    </div>
                  ))}
                </div>
                <div className="timeline-total">Total: ~{totalTime} days</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Roadmap;