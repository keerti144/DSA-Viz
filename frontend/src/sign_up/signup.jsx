import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar1/Navbar.jsx";
import google from "./google.jpg"
import "./signup.css";
import GoogleLoginButton from "./googlesignup";  

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
    
    // Input validation
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      alert("All fields are required.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Form Data:", formData);
  };

  return (
    <div className="signup-container">
      {/* Navbar */}
      <Navbar />
      <div className="signup-box">
        {/* Form */}
        <p className="form-title">
          Welcome to AlgoRize! Let’s Make DSA Less ‘Ugh’ and More ‘Whoa!’
        </p>
        <h2 className="signup-heading">Sign Up</h2>

        <form onSubmit={handleSubmit} className="signup-form">
          <label>Email</label>
          <input
            type="text"
            name="username"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
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
        <br />
        <br />
        {/* Social Logins */}
        <button className="social-button">
          <GoogleLoginButton />
         </button>

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
