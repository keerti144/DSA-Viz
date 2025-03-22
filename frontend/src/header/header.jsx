import React from "react";
import { useNavigate } from "react-router-dom";
import menuIcon from "../assets/menu.png";
import profilePic from "../assets/female-user.png";
import "./header.css";

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <button className="menu-btn" onClick={toggleSidebar}>
        <img src={menuIcon} alt="Menu" />
      </button>
      <div className="logo">AlgoRize</div>
      <button className="profile-btn" onClick={() => navigate("/settings")}>
        <img src={profilePic} alt="Profile" />
      </button>
    </header>
  );
};

export default Header;
