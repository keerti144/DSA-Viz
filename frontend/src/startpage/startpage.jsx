import React from "react";
import { useNavigate } from "react-router-dom";
import "./startpage.css";

export const StartPage = () => {
  const navigate = useNavigate();

  return (
    <div className="start-page">
      {/* Twinkling Stars Background */}
      <div className="stars"></div>
      <div className="twinkling"></div>
      
      <div className="content">
        <h1 className="title">AlgoRize</h1>
        <p className="subtitle">See the Logic, Master the Code!</p>
        
        <div className="buttons">
          <button className="btn" onClick={() => navigate("/login")}>Log In</button>
          <button className="btn" onClick={() => navigate("/signup")}>Sign Up</button>
        </div>

        <p className="description">
          AlgoRize – Visualize, Practice, and Master DSA Like Never Before.
          Tired of staring at dry code? Watch algorithms dance, play with data structures,
          and level up your skills—one visualization at a time. Sign up and let’s get coding!
        </p>

        <button className="get-started" onClick={() => navigate("/homepage")}>Get Started</button>
      </div>
    </div>
  );
};
