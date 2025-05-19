import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./startpage.css";

export const StartPage = () => {
  const navigate = useNavigate();
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate floating particles dynamically
    const particleArray = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      top: `${Math.random() * 100}vh`,
      size: `${Math.random() * 8 + 2}px`,
      animationDuration: `${Math.random() * 10 + 5}s`,
    }));
    setParticles(particleArray);
  }, []);

  return (
    <div className="start-page">
      {/* Twinkling Background */}
      <div className="stars"></div>
      <div className="twinkling"></div>

      {/* Floating Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDuration: p.animationDuration,
          }}
        ></div>
      ))}

      {/* Main Content */}
      <div className="content">
        <h1 className="title">AlgoRize</h1>
        <p className="subtitle">See the Logic, Master the Code!</p>

        <div className="buttons">
          <button className="btn-login" onClick={() => navigate("/login")}>
            Log In
          </button>
          <button className="btn-signup" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>

        <p className="description">
          AlgoRize – Visualize, Practice, and Master DSA Like Never Before.  
          Tired of staring at dry code? Watch algorithms dance, play with data structures,  
          and level up your skills—one visualization at a time.
        </p>

        <button className="get-started" onClick={() => navigate("/homepage")}>
          Get Started
        </button>
      </div>
    </div>
  );
};
