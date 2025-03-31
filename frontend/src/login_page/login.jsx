import React, { useState } from "react";
import "./styles.css";
import Navbar from "../navbar1/Navbar.jsx";
import GoogleLoginButton from "../sign_up/googlesignup";
import "../sign_up/signup.css"

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Logging in with:", username, password);
    // Add login logic here
  };

  return (
    <div className="login-container">
      {/* Importing Navbar */}
      <Navbar />

      <div className="login-box">
        <h2 className="login-title">Login</h2>

        <div className="input-group">
          <label>Email</label>
          <input
            type="text"
            placeholder="Enter email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="login-button" onClick={handleLogin}>
          LOGIN
        </button>

        <br />
        <br />
        {/* Social Logins */}
        <button className="social-button">
          <GoogleLoginButton />
         </button>

        <p className="signup-text">
          Create a new account?{" "}
          <a href="/signup" className="signup-link">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};
