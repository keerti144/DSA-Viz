import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './testnext.css';
import Sidebar from "../sidebar/sidebar.jsx";
import Header from "../header/header.jsx";

export const TestNext = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { topic } = location.state || {};
  
  const [difficulty, setDifficulty] = useState('');
  const [testMode, setTestMode] = useState('');
  const [questionCount, setQuestionCount] = useState(5);

  const handleStartTest = () => {
    if (!difficulty || !testMode) {
      alert('Please select both difficulty and test mode');
      return;
    }

    if (!topic) {
      alert('Please select a topic first');
      navigate('/test');
      return;
    }

    navigate('/test-questions', {
      state: {
        difficulty,
        testMode,
        questionCount,
        topic: topic.toLowerCase()
      }
    });
  };

  return (
    <div className="testnext-container">
      <Header />
      <Sidebar />
      <div className="testnext-content">
        <h1 className="testnext-header">Configure Your Test</h1>
        
        {topic ? (
          <>
            <div className="topic-display">
              <h2>Selected Topic: {topic}</h2>
            </div>

            <div className="config-section">
              <h3>Select Difficulty</h3>
              <div className="difficulty-buttons">
                <button
                  className={`difficulty-btn ${difficulty === 'easy' ? 'selected' : ''}`}
                  onClick={() => setDifficulty('easy')}
                >
                  Easy
                </button>
                <button
                  className={`difficulty-btn ${difficulty === 'medium' ? 'selected' : ''}`}
                  onClick={() => setDifficulty('medium')}
                >
                  Medium
                </button>
                <button
                  className={`difficulty-btn ${difficulty === 'hard' ? 'selected' : ''}`}
                  onClick={() => setDifficulty('hard')}
                >
                  Hard
                </button>
              </div>
            </div>

            <div className="config-section">
              <h3>Select Test Mode</h3>
              <div className="test-mode-buttons">
                <button
                  className={`test-mode-btn ${testMode === 'mcq' ? 'selected' : ''}`}
                  onClick={() => setTestMode('mcq')}
                >
                  Multiple Choice
                </button>
                <button
                  className={`test-mode-btn ${testMode === 'coding' ? 'selected' : ''}`}
                  onClick={() => setTestMode('coding')}
                >
                  Coding
                </button>
                <button
                  className={`test-mode-btn ${testMode === 'interview' ? 'selected' : ''}`}
                  onClick={() => setTestMode('interview')}
                >
                  Interview Questions
                </button>
              </div>
            </div>

            <div className="config-section">
              <h3>Number of Questions</h3>
              <div className="question-count">
                <button
                  onClick={() => setQuestionCount(prev => Math.max(1, prev - 1))}
                  disabled={questionCount <= 1}
                >
                  -
                </button>
                <span>{questionCount}</span>
                <button
                  onClick={() => setQuestionCount(prev => Math.min(10, prev + 1))}
                  disabled={questionCount >= 10}
                >
                  +
                </button>
              </div>
            </div>

            <button
              className="start-test-btn"
              onClick={handleStartTest}
              disabled={!difficulty || !testMode}
            >
              Start Test
            </button>
          </>
        ) : (
          <div className="no-topic-selected">
            <p>Please select a topic first</p>
            <button 
              className="start-test-btn"
              onClick={() => navigate('/test')}
            >
              Go to Topics
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestNext;