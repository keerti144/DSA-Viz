import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import menuIcon from "../assets/menu.png";
import detailsIcon from "../assets/details.png";
import testResultsIcon from "../assets/test-results.png";
import eyeIcon from "../assets/eye.png";
import notificationsIcon from "../assets/notifications.png";
import gearsIcon from "../assets/gears.png";
import inquiryIcon from "../assets/inquiry.png";
import "./sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`sidebar ${isExpanded ? "expanded" : ""}`}>
      {/* Menu Toggle Button Inside Sidebar */}
      <button className="menu-btn" onClick={toggleExpand}>
        <img src={menuIcon} alt="Menu" />
      </button>

      <button className="nav-btn" onClick={() => navigate("/dashboard")}>
        <img src={detailsIcon} alt="Dashboard" />
        {isExpanded && <span className="label">Dashboard</span>}
      </button>

      <button className="nav-btn" onClick={() => navigate("/test")}>
        <img src={testResultsIcon} alt="Test Yourself" />
        {isExpanded && <span className="label">Test Yourself</span>}
      </button>

      <button className="nav-btn" onClick={() => navigate("/visualize")}>
        <img src={eyeIcon} alt="Visualize" />
        {isExpanded && <span className="label">Visualize</span>}
      </button>

      <button className="nav-btn" onClick={() => navigate("/community")}>
        <img src={notificationsIcon} alt="Community" />
        {isExpanded && <span className="label">Community</span>}
      </button>

      <button className="nav-btn" onClick={() => navigate("/settings")}>
        <img src={gearsIcon} alt="Settings" />
        {isExpanded && <span className="label">Settings</span>}
      </button>

      <button className="nav-btn" onClick={() => navigate("/help")}>
        <img src={inquiryIcon} alt="Help" />
        {isExpanded && <span className="label">Help</span>}
      </button>
    </div>
  );
};

export default Sidebar;
