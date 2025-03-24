import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook
import './testnext.css';
import Sidebar from "../sidebar/sidebar.jsx";
import Header from "../header/header.jsx";

export const TestNext = () => {
  const navigate = useNavigate();  // Initialize navigate function

  return (
    <div className="testnext-container">
      <Header />
      <Sidebar />
      <h2 className="testnext-header">Choose Your Test Mode</h2>
      
      <div className="testnext-buttons">
        <button
          className="testnext-button"
          onClick={() => navigate('/testmcq')}  // Navigate to /testmcq
        >
          MCQ
        </button>
        
        <button
          className="testnext-button"
          onClick={() => navigate('/testinterview')}  // Navigate to /testinterview
        >
          Interview
        </button>
        
        <button
          className="testnext-button"
          onClick={() => navigate('/testdebug')}  // Navigate to /testdebug
        >
          Debug
        </button>
      </div>
    </div>
  );
};

export default TestNext;
