import React, { useState } from "react";
import femaleUser from "../assets/female-user.png";
import Sidebar from "../sidebar/sidebar";
import { useNavigate } from "react-router-dom";
import "./settings.css";
import { auth, signOut } from "../../firebase";  // Adjust path if needed
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { updateProfile } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from '../../firebase'; 
import { query, collection, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";  // at top of file if not already imported

export const Settings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [name, setName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null); // Track user authentication state
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };


  const checkUsernameExists = async (newUsername) => {
    const q = query(collection(db, "users"), where("username", "==", newUsername));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return true; // Username already exists
    }
    return false;
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully!");
      navigate('/login');  // Redirect them to login page after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  
  const handleSave = async () => {
    // Check if username already exists before saving
    const usernameExists = await checkUsernameExists(name);
    if (usernameExists) {
      setErrorMessage("Username already exists. Please choose a different one.");
      return;  // Exit the function if username exists
    }

    try {
      if (user) {
        // Update Full Name in Authentication
        await updateProfile(user, { displayName: fullName });

        // Update Username separately in Firestore
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, {
          fullName: fullName,
          username: name,
          email: email,
        }, { merge: true });

        alert("Profile updated successfully!");
        setErrorMessage("");  // Clear error message if successful
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to update profile.");
    }
  };

  
  
  useEffect(() => {
    const fetchUserData = async (uid) => {
      console.log("Fetching user data for UID:", uid);  // Log when fetching user data
      try {
        const userDocRef = doc(db, "users", uid);
        const userDocSnap = await getDoc(userDocRef);
    
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          console.log("Fetched userData:", userData);  // Log fetched user data
          setName(userData.username || "");
          setFullName(userData.fullName || "");
          setEmail(userData.email || "");
        } else {
          console.log("No user data found in Firestore!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);  // Log any errors
      }
    };

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser); // Log auth state
      if (currentUser) {
        console.log("Current auth user:", currentUser);
        setUser(currentUser);  // Set user in state
  
        // Fetch user data from Firestore
        fetchUserData(currentUser.uid);
      } else {
        console.log("No user signed in. Checking localStorage.");
  
        // If no Firebase user, check localStorage for user data
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
          console.log("Logged-in user from localStorage:", user);
          setUser(user);  // Set user from localStorage
  
          // Fetch user data from Firestore using localStorage user UID
          fetchUserData(user.uid);
        } else {
          console.log("No user info found in localStorage. Redirecting to login.");
          navigate('/login');
        }
      }
    });
  
    // Cleanup the listener when the component is unmounted
    return () => unsubscribe();
  }, [navigate]);
  
  
  
  return (
    <div className="settings">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Header */}
      <header className="header">
        <div className="header-left">
          <button className="back-btn" onClick={goBack}>
            &#8592;
          </button>
        </div>
        <div className="logo">AlgoRize</div>
        <button className="signout-btn" onClick={handleLogout}>Sign Out</button>
      </header>

      {/* Main Settings Section */}
      <main className={`settings-content ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <div className="profile-pic">
          <img src={femaleUser} alt="Profile" />
          <p className="username-label">{name}</p>
        </div>

        <section className="settings-section">
          <h2 className="section-title">My Account</h2>

          <div className="settings-item">
            <span>Full Name</span>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="settings-item">
            <span>Username</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="settings-item">
            <span>Email</span>
            <input
              type="email"
              value={email}
              readOnly
            />
          </div>


          {/*<div className="settings-item">
            <span>Theme</span>
            <div className="toggle-container">
              <label className="switch">
                <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
                <span className="slider"></span>
              </label>
              <span className="toggle-label">{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
            </div>
          </div> */}

          {/* Display error message if username exists */}
          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <div className="button-cover">
            <button className="settings-btn" onClick={handleSave}>Save Changes</button>
          </div>
        </section>
      </main>
    </div>
  );
};
