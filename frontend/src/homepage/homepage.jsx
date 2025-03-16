import React, { useState } from "react";
import femaleUser from "./assets/female-user.png";
import search from "./assets/search.png";
import menuIcon from "./assets/menu.png";
import "./homepage.css";

export const Homepage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="homepage">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
      <button className="details-btn">
    <span className="label">Dashboard</span>
  </button>
      <button className="details-btn">
    <span className="label">Dashboard</span>
  </button>
  <button className="test-results-btn">
    <span className="label">Test Yourself</span>
  </button>
  <button className="eye-btn">
    <span className="label">Visualize</span>
  </button>
  <button className="notifications-btn">
    <span className="label">Community</span>
  </button>
  <button className="gears-btn">
    <span className="label">Settings</span>
  </button>
  <button className="inquiry-btn">
    <span className="label">Settings</span>
  </button>
</div>

      </div>

      {/* Header */}
      <div className="header">
        {/* Menu Button */}
        <button className="menu-btn" onClick={toggleSidebar}>
          <img src={menuIcon} alt="Menu" />
        </button>

        {/* Centered Logo */}
        <div className="logo">AlgoRize</div>

        {/* User Icon */}
        <div className="user-profile">
          <img className="user-icon" src={femaleUser} alt="User" />
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="search-container">
          <input type="text" className="search-input" placeholder="Search here" />
          <img src={search} alt="Search" className="search-icon" />
        </div>

        <h1 className="welcome-text">WELCOME!!! SOMENAME!!</h1>

        {/* Buttons */}
        <div className="button-container">
          <button className="topic-button">Start new Topic</button>
          <button className="challenge-button">Try a Challenge</button>
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
