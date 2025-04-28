import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar1/Navbar.jsx";
import { auth, db } from "../../firebase"; // Import Firebase auth
import { createUserWithEmailAndPassword } from "firebase/auth"; // Import the Firebase method
import GoogleLoginButton from "./googlesignup";  
import "./signup.css";
import { collection, query, where, getDoc, doc, setDoc } from "firebase/firestore";



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
    try {
      const q = query(collection(db, "users"), where("username", "==", username));
      const querySnapshot = await getDocs(q);
  
      return !querySnapshot.empty; // If any document matches, username exists
    } catch (error) {
      console.error("Error checking username:", error);
      return false; // To avoid blocking signup if error occurs
    }
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
      
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = auth.currentUser; // Get the current user
      console.log("User created successfully!", user);

      navigate("/homepage"); // Redirect to homepage after successful signup
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          fullName: formData.fullName,
          username: formData.username,
          email: formData.email,
        });
      }
        console.log("User data saved to Firestore successfully!");

    } catch (error) {
      // Firebase error handling
      console.error("Error during signup error:", error);
      console.log(error.message);
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