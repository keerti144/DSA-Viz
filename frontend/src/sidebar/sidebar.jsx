import React from "react";
import { useNavigate } from "react-router-dom";
import "./sidebar.css";

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="details-btn" onClick={() => navigate("/dashboard")}>
        <span className="label">Dashboard</span>
      </button>
      <button className="test-results-btn" onClick={() => navigate("/test")}>
        <span className="label">Test Yourself</span>
      </button>
      <button className="eye-btn" onClick={() => navigate("/visualize")}>
        <span className="label">Visualize</span>
      </button>
      <button className="notifications-btn" onClick={() => navigate("/community")}>
        <span className="label">Community</span>
      </button>
      <button className="gears-btn" onClick={() => navigate("/settings")}>
        <span className="label">Settings</span>
      </button>
      <button className="inquiry-btn" onClick={() => navigate("/inquiry")}>
        <span className="label">Inquiry</span>
      </button>
    </div>
  );
};

export default Sidebar;
