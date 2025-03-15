import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        ←
      </button>

      {/* Clickable Logo */}
      <div className="brand-container" onClick={() => navigate("/")}>
        <div className="brand-name">AlgoRize</div>
        <div className="tagline">See the Logic, Master the Code!</div>
      </div>
    </div>
  );
};

export default Navbar;
