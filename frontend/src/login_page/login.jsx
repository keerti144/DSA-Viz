import React, { useState, useEffect } from "react";
import "./styles.css";
import Navbar from "../navbar1/Navbar.jsx";
import GoogleLoginButton from "../sign_up/googlesignup";
import "../sign_up/signup.css"
import {getAuth, onAuthStateChanged} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";  // ADD this import at top


export const Login = () => {
  const [email, setEmail] = useState(""); // fixed name (not username)
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null); // Add a state to track user
  const auth = getAuth(); // Initialize Firebase Auth
  const navigate = useNavigate(); // For programmatic navigation

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      console.log("Trying to login with:", { email, password });
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful!");
      // Redirect to homepage after successful login
      navigate("/homepage"); // Redirect to homepage
    } catch (error) {
      console.error("Error logging in:", error);
      console.log(error.message);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <Navbar />

      <div className="login-box">
        <h2 className="login-title">Login</h2>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        {/*Google Sign-In Button*/}
          <GoogleLoginButton />
        

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
