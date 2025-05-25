import React, { useState, useEffect } from "react";
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import "./roadmap.css";
import roadmapImg from '../assets/roadmap.png';
import { useNavigate } from 'react-router-dom';
import RoadmapGenerator from './RoadmapGenerator';
import { useAuth } from '../contexts/AuthContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
  const [showRoadmapGenerator, setShowRoadmapGenerator] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [savedRoadmaps, setSavedRoadmaps] = useState([]);
  const [toast, setToast] = useState('');
  
  // State to hold the roadmap data to be passed to the generator modal
  const [roadmapToView, setRoadmapToView] = useState(null);

  // State for renaming roadmaps
  const [editingRoadmapId, setEditingRoadmapId] = useState(null);
  const [newRoadmapTitle, setNewRoadmapTitle] = useState('');

  const toggleCard = (section, index, item) => {
    // On card click, navigate to details page for that topic
    if (item && item.title && topicDetails[item.title]) {
      navigate(`/roadmap/${encodeURIComponent(item.title)}`);
      return;
    }
    const id = `${section}-${index}`;
    setExpandedCard(expandedCard === id ? null : id);
  };

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

  const loadSavedRoadmaps = async () => {
    try {
      const response = await fetch(`http://localhost:5000/get-saved-roadmaps/${currentUser.uid}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to load saved roadmaps');
      }

      setSavedRoadmaps(data.saved_roadmaps);
    } catch (err) {
      console.error('Error loading saved roadmaps:', err);
    }
  };

  const handleDeleteRoadmap = async (roadmapId) => {
    try {
      const response = await fetch(`http://localhost:5000/delete-roadmap/${currentUser.uid}/${roadmapId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete roadmap');
      }

      setSavedRoadmaps(prev => prev.filter(r => r.id !== roadmapId));
      setToast('Roadmap deleted successfully!');
      setTimeout(() => setToast(''), 2000);
    } catch (err) {
      console.error('Error deleting roadmap:', err);
    }
  };
  
  // Function to handle viewing a saved roadmap
  const handleViewSavedRoadmap = (roadmap) => {
    setRoadmapToView(roadmap);
    setShowRoadmapGenerator(true);
  };

  // Functions for renaming
  const handleStartRename = (roadmap) => {
    setEditingRoadmapId(roadmap.id);
    setNewRoadmapTitle(roadmap.topic);
  };

  const handleCancelRename = () => {
    setEditingRoadmapId(null);
    setNewRoadmapTitle('');
  };

  const handleSaveRename = async (roadmapId) => {
    if (newRoadmapTitle.trim() === '') {
        // Optionally show an error or prevent saving empty title
        console.warn('Roadmap title cannot be empty.');
        return;
    }
    // TODO: Implement backend call to update the roadmap title
    console.log(`Attempting to save rename for ${roadmapId} with new title: ${newRoadmapTitle}`);
    
    // For now, update frontend state directly (will be replaced by backend update)
    setSavedRoadmaps(prevRoadmaps => 
        prevRoadmaps.map(roadmap => 
            roadmap.id === roadmapId ? { ...roadmap, topic: newRoadmapTitle } : roadmap
        )
    );

    setEditingRoadmapId(null);
    setNewRoadmapTitle('');
    setToast('Roadmap renamed (frontend update only)!'); // Temporary toast
    setTimeout(() => setToast(''), 2000);
  };

  useEffect(() => {
    if (currentUser) {
      loadSavedRoadmaps();
    }
  }, [currentUser]);

  // Function to close the generator modal and reset roadmapToView state
  const handleCloseGenerator = () => {
    setShowRoadmapGenerator(false);
    setRoadmapToView(null);
    // Also reset editing state if modal was used to view and then user tries to edit
    setEditingRoadmapId(null);
    setNewRoadmapTitle('');
  };

  return (
    <div className="roadmap-page">
      <Header />
      <Sidebar />
      <div className="roadmap-container">
        <h1 className="text-wrapper">Roadmap</h1>
        <div className="action-buttons">
          <button className="btn" onClick={() => setShowRoadmapGenerator(true)}>Generate Roadmap with AI</button>
        </div>
        
        <div className="saved-roadmaps-section">
          <h2>My Roadmaps</h2>
          {savedRoadmaps.length === 0 ? (
            <p className="no-roadmaps">No saved roadmaps yet. Generate your first roadmap to get started!</p>
          ) : (
            <div className="saved-roadmaps-grid">
              {savedRoadmaps.map(roadmap => (
                <div key={roadmap.id} className="saved-roadmap-card">
                  {/* Conditionally render title or input with icon */}
                  <div className="roadmap-title-container">
                      {editingRoadmapId === roadmap.id ? (
                          <input
                              type="text"
                              value={newRoadmapTitle}
                              onChange={(e) => setNewRoadmapTitle(e.target.value)}
                              onBlur={() => handleSaveRename(roadmap.id)} // Save on blur
                              onKeyPress={(e) => {
                                  if (e.key === 'Enter') {
                                      handleSaveRename(roadmap.id);
                                  }
                              }}
                              autoFocus
                              className="rename-input"
                          />
                      ) : (
                          <h3 onDoubleClick={() => handleStartRename(roadmap)}>{roadmap.topic}</h3> // Edit on double click
                      )}
                      {/* Add edit icon */} {/* Show icon only when not editing */}
                      {editingRoadmapId !== roadmap.id && (
                           <button className="edit-icon-button" onClick={() => handleStartRename(roadmap)} title="Rename Roadmap">
                               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                           </button>
                      )}
                  </div>

                  <div className="roadmap-details">
                    <p><strong>Goal:</strong> {roadmap.main_outcome}</p>
                    <p><strong>Target Date:</strong> {new Date(roadmap.target_date).toLocaleDateString()}</p>
                    <p><strong>Time Commitment:</strong> {roadmap.time_commitment}</p>
                  </div>

                  <div className="roadmap-actions">
                     {/* Removed Edit button */}
                     {/* Removed Save/Cancel buttons - using blur/enter on input */}

                    <button 
                      className="view-button"
                      onClick={() => handleViewSavedRoadmap(roadmap)}
                    >
                      View Roadmap
                    </button>
                    <button 
                      className="delete-button"
                      onClick={() => handleDeleteRoadmap(roadmap.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recommended Roadmaps Section */}
        <div className="section">
          <h2>Recommended Roadmaps</h2>
          <div className="grid">
            {renderCards(roadmapData.recommended, 'recommended')}
          </div>
        </div>

        {/* Most Used Roadmaps Section */}
        <div className="section">
          <h2>Most Used Roadmaps</h2>
          <div className="grid">
            {renderCards(roadmapData.popular, 'popular')}
          </div>
        </div>

      </div>

      {/* AI Roadmap Generator */}
      {showRoadmapGenerator && (
        <RoadmapGenerator 
          onClose={handleCloseGenerator} 
          savedRoadmapData={roadmapToView} // Pass the saved roadmap data here
        />
      )}

      {toast && (
        <div className="toast-notification">
          {toast}
        </div>
      )}
    </div>
  );
};

export default Roadmap;