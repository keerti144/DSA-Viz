import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './testmain.css';
import Sidebar from "../sidebar/sidebar.jsx";
import Header from "../header/header.jsx";

const TestMain = () => {
  const navigate = useNavigate();
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
  const [selectedQuestionCount, setSelectedQuestionCount] = useState(5);
  const [selectedTestMode, setSelectedTestMode] = useState('mcq');

  const handleStartTest = (topic) => {
    console.log('Starting test with settings:', {
      difficulty: selectedDifficulty,
      questionCount: selectedQuestionCount,
      testMode: selectedTestMode,
      topic: topic.toLowerCase()
    });

    navigate('/testnext', {
      state: {
        difficulty: selectedDifficulty,
        questionCount: selectedQuestionCount,
        testMode: selectedTestMode,
        topic: topic.toLowerCase()
      }
    });
  };

  return (
    <div className="testmain-container">
      <Header />
      <Sidebar />
      
      <div className="testmain-content">
        <h1 className="testmain-header">Test Yourself</h1>
        
        <div className="test-settings">
          <div className="setting-group">
            <label>Difficulty:</label>
            <select 
              value={selectedDifficulty} 
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="setting-group">
            <label>Number of Questions:</label>
            <select 
              value={selectedQuestionCount} 
              onChange={(e) => setSelectedQuestionCount(Number(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </div>

          <div className="setting-group">
            <label>Test Mode:</label>
            <select 
              value={selectedTestMode} 
              onChange={(e) => setSelectedTestMode(e.target.value)}
            >
              <option value="mcq">Multiple Choice</option>
              <option value="coding">Coding (Debugging)</option>
              <option value="interview">Interview Questions</option>
            </select>
          </div>
        </div>

        <div className="topics-grid">
          <button 
            className="topic-btn" 
            onClick={() => handleStartTest('arrays')}
          >
            Arrays
          </button>
          <button 
            className="topic-btn" 
            onClick={() => handleStartTest('linked lists')}
          >
            Linked Lists
          </button>
          <button 
            className="topic-btn" 
            onClick={() => handleStartTest('stacks')}
          >
            Stacks
          </button>
          <button 
            className="topic-btn" 
            onClick={() => handleStartTest('queues')}
          >
            Queues
          </button>
          <button 
            className="topic-btn" 
            onClick={() => handleStartTest('trees')}
          >
            Trees
          </button>
          <button 
            className="topic-btn" 
            onClick={() => handleStartTest('graphs')}
          >
            Graphs
          </button>
          <button 
            className="topic-btn" 
            onClick={() => handleStartTest('dynamic programming')}
          >
            Dynamic Programming
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestMain; 