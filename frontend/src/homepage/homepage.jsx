import React from "react";
import femaleUser from "../assets/female-user.png";
import search from "../dashboard-open/search.png";
import menuIcon from "../assets/menu.png"; // Add a menu icon
import "./homepage.css";

export const Homepage = () => {
  return (
    <div className="homepage">
      {/* Sidebar */}
      <div className="sidebar">
        <button className="home-btn"></button>
        <button className="details-btn"></button>
        <button className="test-results-btn"></button>
        <button className="eye-btn"></button>
        <button className="notifications-btn"></button>
        <button className="gears-btn"></button>
        <button className="inquiry-btn"></button>
      </div>

      {/* Header */}
      <div className="header">
        {/* Menu Button on Left */}
        <button className="menu-btn">
          <img src={menuIcon} alt="Menu" />
        </button>

        {/* Centered AlgoRize Logo */}
        <div className="logo">AlgoRize</div>

        {/* User Icon on Right */}
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
