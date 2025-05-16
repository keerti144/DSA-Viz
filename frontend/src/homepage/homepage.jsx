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
      <div className="stars"></div>
      <div className="twinkling"></div>

      <Sidebar />

      <div className="header">
        <div className="logo">AlgoRize</div>
        <div className="user-profile" onClick={() => navigate("/settings")}>
          <img className="user-icon" src={femaleUser} alt="User" />
        </div>
      </div>

      <div className="main-content">
        <div className="search-container">
          <input type="text" className="search-input" placeholder="Search topics..." />
          <img src={search} alt="Search" className="search-icon" />
        </div>
        <br/>
        <br/>
        <br/>
        <h1 className="welcome-text">WELCOME TO ALGORIZE</h1>

        <div className="intro-section">
          <p>
            AlgoRize is your all-in-one platform for mastering Data Structures and Algorithms (DSA). <br />
            Whether you're just getting started or preparing for coding interviews, AlgoRize makes your learning interactive and effective.<br />
          </p>
          <br />
          <p>
            ✨ Visualize sorting and searching algorithms in real-time ✨
            <br />
            🧠 Take on adaptive quizzes and coding challenges 🧠 
            <br />
            📚 Keep notes and flashcards for each topic 📚
            <br />
            📊 Track your progress with interactive dashboards 📊
          </p>
        </div>

        <div className="button-container">
          <button className="topic-button" onClick={() => navigate("/visualize")}>Start Learning</button>
          <button className="challenge-button" onClick={() => navigate("/test")}>Take a Challenge</button>
        </div>
        <br/>
        <br/>
        <div className="about-section">
          <h3>About Us</h3>
          <p>
            We built AlgoRize to make DSA approachable and fun. Our team is passionate about helping students and professionals sharpen their problem-solving skills using visual learning, personalized testing, and gamified tools.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;