import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TestNext.css';

export const TestNext = () => {
       const navigate = useNavigate();
  return (
    <div className="testnext-container">
      <h2 className="testnext-header">Choose Your Test Mode</h2>
      
      <div className="testnext-buttons">
        <Link to="/testmcq" className="testnext-button">
          MCQ
        </Link>
        
        <Link to="/testinterview" className="testnext-button">
          Interview
        </Link>
        
        <Link to="/testdebug" className="testnext-button">
          Debug
        </Link>
      </div>
    </div>
  );
};

export default TestNext;
