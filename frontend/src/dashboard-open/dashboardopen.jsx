import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/sidebar.jsx";
import Header from "../header/header.jsx"
import femaleUser from "../assets/female-user.png";
import "./dashboardopen.css";

export const DashboardOpen = () => {
  const navigate = useNavigate();
  return (
    <div className="dashboard-open">
      <Header />
      <Sidebar />
      
      {/* Header
      <div className="header">
        <div className="logo">AlgoRize</div>
        <div className="user-profile" onClick={() => navigate("/settings")}> 
          <img className="user-icon" src={femaleUser} alt="User" />
        </div>
      </div> */}

      {/* Main Content */}
      <div className="dashboard-content">
        <h1 className="dashboard-title">Your Progress Dashboard</h1>
        
        {/* Streak & Leaderboard */}
        <div className="progress-section">
          <div className="streak-box">
            <h2>Streak</h2>
            <p>Days Active: <span>15</span></p>
            <p>Points Earned: <span>850</span></p>
          </div>
          <div className="leaderboard-box">
            <h2>Leaderboard Rank</h2>
            <p>Your Rank: <span>#12</span></p>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="progress-overview">
          <h2>Your Performance</h2>
          <div className="progress-items">
            <div className="progress-item">
              <p>Best at:</p>
              <span>Graph Algorithms</span>
            </div>
            <div className="progress-item">
              <p>Needs Improvement:</p>
              <span>Dynamic Programming</span>
            </div>
            <div className="progress-item">
              <p>Overall Completion:</p>
              <span>72%</span>
            </div>
          </div>
        </div>

        {/* Saved Content */}
        <div className="saved-content">
          <h2>📌 Saved Notes & Flashcards</h2>
          <div className="saved-items">
            <div className="saved-item">Binary Trees - Flashcard</div>
            <div className="saved-item">Dynamic Programming Basics - Notes</div>
            <div className="saved-item">Greedy Algorithms - Test Record</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOpen;