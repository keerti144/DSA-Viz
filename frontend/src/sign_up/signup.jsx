import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar1/Navbar.jsx";
import { auth } from "../../firebase"; // Import Firebase auth
import { createUserWithEmailAndPassword } from "firebase/auth"; // Import the Firebase method
import GoogleLoginButton from "./googlesignup";  
import "./signup.css";

export const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    username: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // For error handling
  const [usernameError, setUsernameError] = useState(""); // For username availability check


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to check if username exists (this should be implemented on your backend)
  const checkUsernameExists = async (username) => {
    // Make an API request to your backend to check if the username exists
    const response = await fetch(`http://localhost:5000/auth/check-username?username=${username}`);
    const data = await response.json();
    return data.exists; // Assuming the response contains { exists: true/false }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation
    if (!formData.email || !formData.password || !formData.confirmPassword || !formData.fullName || !formData.username) {
      alert("All fields are required.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Check if username already exists
      const usernameExists = await checkUsernameExists(formData.username);
      if (usernameExists) {
        setUsernameError("Username already taken, please choose another.");
        return;
      } else {
        setUsernameError(""); // Clear previous error
      }

       // Sending user data to your backend API
       const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          username: formData.username,  // Send the username to the backend
          fullName: formData.fullName,  // Send full name to the backend
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("User created successfully!", data);

        localStorage.setItem("user", JSON.stringify({
          uid: data.user.uid,
          email: data.user.email,
          idToken: data.user.idToken
        }));
        // Save user info in localStorage
        // Redirect to the homepage or dashboard after sign-up
        navigate("/homepage");
      } else {
        console.error("Signup failed:", data.error);
        setErrorMessage(data.error || "An error occurred. Please try again.");
      }



      {/*
      // Create user with email and password
      const result = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      console.log("User created successfully!", result);

      // Get ID token if needed
      const token = await result.user.getIdToken();
      console.log("Token: ", token);
      
      // Redirect to the home page or dashboard after sign-up
      navigate("/homepage");
      */}
    } catch (error) {
      // Firebase error handling
      console.error("Error during signup error:", error);
      switch (error.code) {
        case "auth/email-already-in-use":
          setErrorMessage("Email already in use.");
          break;
        case "auth/invalid-email":
          setErrorMessage("Invalid email address.");
          break;
        case "auth/weak-password":
          setErrorMessage("Password should be at least 6 characters.");
          break;
        default:
          setErrorMessage("An error occurred. Please try again.");
      }
    }
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

        {/* Error message */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {usernameError && <div className="error-message">{usernameError}</div>}

        <form onSubmit={handleSubmit} className="signup-form">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
            className="input-box"
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="input-box"
          />

          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
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
        {/* Google Sign Up */}
          <GoogleLoginButton />

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
export default SignUp;