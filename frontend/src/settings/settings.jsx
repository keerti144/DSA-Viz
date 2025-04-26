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

export const Settings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [name, setName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode");
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
    try {
      if (auth.currentUser) {
        // Update Full Name in Authentication
        await updateProfile(auth.currentUser, {
          displayName: fullName,
        });
  
        // Update Username separately in Firestore
        const userRef = doc(db, "users", auth.currentUser.uid);
        await setDoc(userRef, {
          username: name,
        }, { merge: true });
  
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update profile.");
    }
  };
  
  
  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      console.log("Current User:", currentUser);
    
      if (!currentUser) {
        console.log("No user is signed in yet.");
        return; // 🔥 Safely exit if no user
      }
    
      const userDocRef = doc(db, "users", currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);
    
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        setName(userData.username);
        setFullName(userData.fullName);
        setEmail(userData.email);
      } else {
        console.log("No user data found!");
      }
    };
    

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("Current User:", currentUser);
        setEmail(currentUser.email || "No Email");
        setName(currentUser.displayName || "No Username");
        setFullName(currentUser.displayName || "No Full Name");  // You can improve later
      } else {
        console.log("No user logged in.");
      }
    });
    
    fetchUserData(); // Fetch user data when component mounts

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);
  

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
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>


          <div className="settings-item">
            <span>Theme</span>
            <div className="toggle-container">
              <label className="switch">
                <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
                <span className="slider"></span>
              </label>
              <span className="toggle-label">{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
            </div>
          </div>

          <div className="button-cover">
            <button className="settings-btn" onClick={handleSave}>Save Changes</button>
          </div>
        </section>
      </main>
    </div>
  );
};
