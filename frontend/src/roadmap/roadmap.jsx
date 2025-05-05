import React, { useState } from "react";
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import "./roadmap.css";

const roadmapData = {
  recommended: [
    {
      title: "Mastering DSA",
      description: "From arrays to graphs — step-by-step guide to crack coding interviews.",
      tag: "Intermediate",
      content: "This roadmap covers arrays, linked lists, trees, graphs, and dynamic programming with code examples and real-world interview tips.",
    },
    {
      title: "Backend Developer",
      description: "Build scalable APIs, learn databases, Docker & more.",
      tag: "Career Path",
      content: "Start with Node.js/Express, then databases like MongoDB/PostgreSQL, then learn Docker, Redis, and cloud deployment.",
    },
    {
      title: "AI & ML Path",
      description: "Get started with AI/ML — Math, Python, Algorithms, Projects.",
      tag: "Advanced",
      content: "Linear algebra, probability, scikit-learn, TensorFlow/PyTorch, ML projects — this path prepares you for research and industry.",
    },
  ],
  popular: [
    {
      title: "Frontend Development",
      description: "HTML, CSS, JS, React — all you need for modern web UIs.",
      tag: "Beginner",
      content: "Start with HTML/CSS basics, then JavaScript, then React. Later dive into UI frameworks and build portfolio projects.",
    },
    {
      title: "System Design",
      description: "Understand the architecture behind scalable systems.",
      tag: "Interview",
      content: "Learn load balancing, caching, databases, microservices, CAP theorem, and draw architecture diagrams with tradeoffs.",
    },
    {
      title: "Competitive Programming",
      description: "Sharpen your problem-solving skills with structured topics.",
      tag: "Contest Ready",
      content: "Focus on patterns, greedy algorithms, DP, number theory, and solve problems on Codeforces/Leetcode regularly.",
    },
  ],
};

export const Roadmap = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleCard = (section, index) => {
    const id = `${section}-${index}`;
    setExpandedCard(expandedCard === id ? null : id);
  };

  const renderCards = (data, sectionName) =>
    data.map((item, index) => {
      const id = `${sectionName}-${index}`;
      const isExpanded = expandedCard === id;

      return (
        <div className={`card ${isExpanded ? "expanded" : ""}`} key={index} onClick={() => toggleCard(sectionName, index)}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <span className="tag">{item.tag}</span>
          {isExpanded && (
            <div className="card-content">
              <p>{item.content}</p>
            </div>
          )}
        </div>
      );
    });

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
            {renderCards(roadmapData.recommended, "recommended")}
          </div>
        </div>

        <div className="section">
          <h2>Most Used Roadmaps</h2>
          <div className="grid">
            {renderCards(roadmapData.popular, "popular")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
