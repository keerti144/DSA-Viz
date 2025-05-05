import React from "react";
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import "./roadmap.css";

const roadmapData = {
  recommended: [
    {
      title: "Mastering DSA",
      description: "From arrays to graphs — step-by-step guide to crack coding interviews.",
      tag: "Intermediate",
    },
    {
      title: "Backend Developer",
      description: "Build scalable APIs, learn databases, Docker & more.",
      tag: "Career Path",
    },
    {
      title: "AI & ML Path",
      description: "Get started with AI/ML — Math, Python, Algorithms, Projects.",
      tag: "Advanced",
    },
  ],
  popular: [
    {
      title: "Frontend Development",
      description: "HTML, CSS, JS, React — all you need for modern web UIs.",
      tag: "Beginner",
    },
    {
      title: "System Design",
      description: "Understand the architecture behind scalable systems.",
      tag: "Interview",
    },
    {
      title: "Competitive Programming",
      description: "Sharpen your problem-solving skills with structured topics.",
      tag: "Contest Ready",
    },
  ],
};

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
            {roadmapData.recommended.map((item, index) => (
              <div className="card" key={index}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="tag">{item.tag}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h2>Most Used Roadmaps</h2>
          <div className="grid">
            {roadmapData.popular.map((item, index) => (
              <div className="card" key={index}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="tag">{item.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
