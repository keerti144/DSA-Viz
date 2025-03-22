import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/sidebar.jsx";
import femaleUser from "../assets/female-user.png";
import search from "../dashboard-open/search.png";
import menuIcon from "../assets/menu.png";
import "./homepage.css";

export const Homepage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="homepage">
      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Header */}
      <div className="header">
        <button className="menu-btn" onClick={toggleSidebar}>
          <img src={menuIcon} alt="Menu" />
        </button>
        <div className="logo">AlgoRize</div>
        <div className="user-profile">
          <img className="user-icon" src={femaleUser} alt="User" />
        </div>
      </div>

      {/* Main Content */}
      <div className={`main-content ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <div className="search-container">
          <input type="text" className="search-input" placeholder="Search here" />
          <img src={search} alt="Search" className="search-icon" />
        </div>

        <h1 className="welcome-text">WELCOME!!! SOMENAME!!</h1>

        {/* Buttons */}
        <div className="button-container">
          <button className="topic-button" onClick={() => navigate("/dashboard")}>
            Start new Topic
          </button>
          <button className="challenge-button" onClick={() => navigate("/test")}>
            Try a Challenge
          </button>
        </div>

        {/* Continue Learning */}
        <div className="continue-section">
          <h2>Continue learning</h2>
          <div className="learning-boxes">
            <div className="learning-box"></div>
            <div className="learning-box"></div>
            <div className="learning-box"></div>
            <div className="learning-box"></div>
          </div>
        </div>

        {/* Continue Tests */}
        <div className="continue-section">
          <h2>Continue tests</h2>
          <div className="test-boxes">
            <div className="test-box"></div>
            <div className="test-box"></div>
            <div className="test-box"></div>
            <div className="test-box"></div>
          </div>
        </div>

        {/* About Section */}
        <div className="about-section">About us</div>
      </div>
    </div>
  );
};

export default Homepage;
