import React from "react";
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import "./roadmap.css";

export const Roadmap = () => {
  return (
    <div className="roadmap-page">
      <Header />
      <Sidebar />
      <div className="roadmap-container">
        <h1 className="title">Roadmap</h1>

        <div className="action-buttons">
          <button className="btn">Create Your Own</button>
          <button className="btn">Generate for Your Mood</button>
        </div>

        <div className="section">
          <h2>Recommended Roadmaps</h2>
          <div className="grid">
            <div className="card">Mastering DSA</div>
            <div className="card">Becoming a Backend Developer</div>
            <div className="card">AI & ML Path</div>
          </div>
        </div>

        <div className="section">
          <h2>Most Used Roadmaps</h2>
          <div className="grid">
            <div className="card">Frontend Development</div>
            <div className="card">System Design Guide</div>
            <div className="card">Competitive Programming</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
