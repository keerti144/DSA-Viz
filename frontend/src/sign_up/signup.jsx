import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar1/Navbar.jsx";
import appleInc from "../assets/apple-inc.png";
import microsoft from "../assets/microsoft.png";
import "./signup.css";

export const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="signup-container">
      {/* Navbar */}
      <Navbar />

      {/* Signup Box */}
      <div className="signup-box">
        <h2 className="signup-heading">Sign Up</h2>

        <form onSubmit={handleSubmit} className="signup-form">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter email/username"
            className="input-box"
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="input-box"
          />

          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            className="input-box"
          />

          <button type="submit" className="signup-button">Sign Up</button>
        </form>

        {/* Social Login */}
        <div className="social-login">
          <p className="or-text">or sign up with</p>
          <div className="social-icons">
            <img src={microsoft} alt="Microsoft" className="social-icon" />
            <img src={appleInc} alt="Apple" className="social-icon" />
          </div>
        </div>

        {/* Already have an account? */}
        <p className="login-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="login-btn">
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};
