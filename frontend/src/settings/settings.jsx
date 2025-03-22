import React, { useState } from "react";
import femaleUser from "../assets/female-user.png";
import Sidebar from "../sidebar/sidebar";
import menuIcon from "../assets/menu.png"; // Changed to avoid variable name clash
import { useNavigate } from "react-router-dom";
import "./settings.css";

export const Settings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [name, setName] = useState("Username");
  const [email, setEmail] = useState("user@example.com");
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className={`settings ${isSidebarOpen ? "sidebar-open" : ""}`}>
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Header */}
      <header className="header">
        <button className="menu-btn" onClick={toggleSidebar}>
          <img src={menuIcon} alt="Menu" />
        </button>
        <button className="back-btn" onClick={goBack}>
          &#8592; {/* Unicode for left arrow */}
        </button>
        <div className="logo">AlgoRize</div>
        <button className="signout-btn">Sign Out</button>
      </header>

      {/* Main Settings Section */}
      <main className="settings-content">
        <div className="profile-pic">
          <img src={femaleUser} alt="Profile" />
          <p className="username-label">{name}</p>
        </div>

        <section className="settings-section">
          <h2 className="section-title">My Account</h2>

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

          <div className="button-cover">
            <button className="settings-btn">Change Password</button>
          </div>

          <br />

          <div className="button-cover">
            <button className="settings-btn delete-btn">Delete Account</button>
          </div>
        </section>
      </main>
    </div>
  );
};
