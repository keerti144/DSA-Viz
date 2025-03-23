import React from "react";
import { useNavigate } from "react-router-dom";
import profilePic from "../assets/female-user.png";
import "./header.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="logo">AlgoRize</div>
      <div className="header-right">
        <button className="profile-btn" onClick={() => navigate("/settings")}>
          <img src={profilePic} alt="Profile" />
        </button>
      </div>
    </header>
  );
};

export default Header;
