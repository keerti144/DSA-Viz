import React, { useState } from "react";
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import "./flashcardsandnotes.css";

export const FlashcardsAndNotes = () => {
  const [sortOption, setSortOption] = useState("name");

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    // Handle sorting based on the selected option
    // This could be dynamic if you are fetching data
  };

  // Example data (you can replace this with actual dynamic data)
  const flashcards = [
    { title: "Sorting Algorithms", category: "Algorithms", popularity: 5 },
    { title: "Graph Theory Basics", category: "Graph Theory", popularity: 4 },
    { title: "Recursion Concepts", category: "Recursion", popularity: 3 },
    { title: "Dynamic Programming", category: "Algorithms", popularity: 4 },
    { title: "Bit Manipulation", category: "Algorithms", popularity: 5 },
    { title: "Data Structures", category: "Data Structures", popularity: 4 },
  ];

  const sortedFlashcards = [...flashcards].sort((a, b) => {
    if (sortOption === "name") {
      return a.title.localeCompare(b.title);
    } else if (sortOption === "popularity") {
      return b.popularity - a.popularity;
    } else {
      return 0;
    }
  });

  return (
    <div className="flashcards-page">
      <Header />
      <Sidebar />
      <div className="flashcards-container">
        <h1 className="title">Flashcards & Notes</h1>

        {/* Sort Dropdown */}
        <div className="sort-container">
          <select
            className="sort-select"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="name">Sort by Name</option>
            <option value="popularity">Sort by Popularity</option>
          </select>
        </div>

        <div className="action-buttons">
          <button className="btn">Create Your Own</button>
          <button className="btn">Generate with AI</button>
        </div>

        <div className="section">
          <h2 className="section-title">Recommended for You</h2>
          <div className="grid">
            {sortedFlashcards.map((card, index) => (
              <div className="card" key={index}>
                <p>{card.title}</p>
                <small>{card.category}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Popular Flashcards</h2>
          <div className="grid">
            {sortedFlashcards.map((card, index) => (
              <div className="card" key={index}>
                <p>{card.title}</p>
                <small>{card.category}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardsAndNotes;
