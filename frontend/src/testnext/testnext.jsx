import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './testnext.css';

export const TestNext = () => {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState('');
  const [testMode, setTestMode] = useState('');
  const [questionCount, setQuestionCount] = useState(5);

  const handleStartTest = () => {
    if (!difficulty || !testMode) {
      alert('Please select both difficulty and test mode');
      return;
    }

    navigate('/test-questions', {
      state: {
        difficulty,
        testMode,
        questionCount
      }
    });
  };

  return (
    <div className="testnext-container">
      <div className="testnext-content">
        <h1 className="testnext-header">Configure Your Test</h1>

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
              onClick={() => setQuestionCount(prev => Math.min(20, prev + 1))}
              disabled={questionCount >= 20}
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
      </div>
    </div>
  );
};

export default TestNext;