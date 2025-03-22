import React, { useState } from "react";
import femaleUser from "../assets/female-user.png";
import Sidebar from "../sidebar/sidebar";
import menuIcon from "../assets/menu.png";
import { useNavigate } from "react-router-dom";
import "./settings.css";

export const Settings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [name, setName] = useState("Username");
  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("user@example.com");
  const [phone, setPhone] = useState("+1 234 567 890");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const goBack = () => {
    navigate(-1);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <div className="settings">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Header */}
      <header className="header">
        <div className="header-left">
          <button className="menu-btn" onClick={toggleSidebar}>
            <img src={menuIcon} alt="Menu" />
          </button>
          <button className="back-btn" onClick={goBack}>
            &#8592;
          </button>
        </div>
        <div className="logo">AlgoRize</div>
        <button className="signout-btn">Sign Out</button>
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
            <span>Phone Number</span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
            <button className="settings-btn">Change Password</button>
          </div>
        </section>
      </main>
    </div>
  );
};
