import React, { useState, useEffect } from "react";
import "./styles.css";
import Navbar from "../navbar1/Navbar.jsx";
import GoogleLoginButton from "../sign_up/googlesignup";
import "../sign_up/signup.css"
import {getAuth, onAuthStateChanged} from "firebase/auth";
import { useNavigate } from "react-router-dom";


export const Login = () => {
  const [email, setEmail] = useState(""); // fixed name (not username)
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null); // Add a state to track user
  const auth = getAuth(); // Initialize Firebase Auth
  const navigate = useNavigate(); // For programmatic navigation


  
  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Current auth user:", user);
        setUser(user); // Store user in state
      } else {
        console.log("No user signed in");
      }
    });
    
    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, [auth]);

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        console.log("Login success:", data);
        
        // Save user info in localStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        console.log("User info saved in localStorage:", data.user);
        
        // Redirect to homepage/dashboard after successful login
        navigate("/homepage"); // Use navigate for redirection
      } else {
        console.error("Login failed:", data.error);
        alert(data.error);
      }
    } catch (error) {
      console.error("Error logging in:", error);
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
            type="text"
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
