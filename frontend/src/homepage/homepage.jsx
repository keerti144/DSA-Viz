import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/sidebar.jsx";
import femaleUser from "../assets/female-user.png";
import search from "../dashboard-open/search.png";
import "./homepage.css";

export const Homepage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const homepage = document.querySelector(".homepage");

    // Create Floating Particles
    for (let i = 0; i < 15; i++) {
      let particle = document.createElement("div");
      particle.className = "particle";
      particle.style.width = `${Math.random() * 6 + 4}px`;
      particle.style.height = particle.style.width;
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.top = `${Math.random() * 100}vh`;
      particle.style.animationDuration = `${Math.random() * 5 + 3}s`;
      homepage.appendChild(particle);
    }

    return () => {
      document.querySelectorAll(".particle").forEach((p) => p.remove());
    };
  }, []);

  return (
    <div className="homepage">
      {/* Background Animation */}
      <div className="stars"></div>
      <div className="twinkling"></div>

      {/* Sidebar */}
      <Sidebar />

      {/* Header */}
      <div className="header">
        <div className="logo">AlgoRize</div>
        <div className="user-profile" onClick={() => navigate("/settings")}>
          <img className="user-icon" src={femaleUser} alt="User" />
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="search-container">
          <input type="text" className="search-input" placeholder="Search here" />
          <img src={search} alt="Search" className="search-icon" />
        </div>

        <h1 className="welcome-text">WELCOME TO ALGORIZE!!</h1>

        <div className="button-container">
          <button className="topic-button" onClick={() => navigate("/visualize")}>
            Start New Topic
          </button>
          <button className="challenge-button" onClick={() => navigate("/test")}>
            Try a Challenge
          </button>
        </div>

        <div className="continue-section">
          <h2>Continue Learning</h2>
          <div className="learning-boxes">
            <div className="learning-box"></div>
            <div className="learning-box"></div>
            <div className="learning-box"></div>
            <div className="learning-box"></div>
          </div>
        </div>

        <div className="continue-section">
          <h2>Continue Tests</h2>
          <div className="test-boxes">
            <div className="test-box"></div>
            <div className="test-box"></div>
            <div className="test-box"></div>
            <div className="test-box"></div>
          </div>
        </div>

        <div className="about-section">About Us</div>
      </div>
    </div>
  );
};

export default Homepage;
