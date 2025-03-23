import React from "react";
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import "./flashcardsandnotes.css";

export const FlashcardsAndNotes = () => {
  return (
    <div className="flashcards-page">
      <Header />
      <Sidebar />
      <div className="flashcards-container">
        <h1 className="title">Flashcards & Notes</h1>

        <div className="action-buttons">
          <button className="btn">Create Your Own</button>
          <button className="btn">Generate with AI</button>
        </div>

        <div className="section">
          <h2>Recommended for You</h2>
          <div className="grid">
            <div className="card">Sorting Algorithms</div>
            <div className="card">Graph Theory Basics</div>
            <div className="card">Recursion Concepts</div>
          </div>
        </div>

        <div className="section">
          <h2>Popular Flashcards</h2>
          <div className="grid">
            <div className="card">Dynamic Programming</div>
            <div className="card">Bit Manipulation</div>
            <div className="card">Data Structures</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardsAndNotes;
