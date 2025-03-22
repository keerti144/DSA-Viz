// Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./header.css"; // Adjust the path as needed

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="logo">AlgoRize</div>
      <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
        Toggle Sidebar
      </button>
      <button className="signout-btn" onClick={() => navigate("/signout")}>
        Sign Out
      </button>
    </header>
  );
};

export default Header;
