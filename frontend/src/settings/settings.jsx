import React, { useState } from "react";
import femaleUser from "../assets/female-user.png";
import menu from "../assets/menu.png";
import "./settings.css";

export const Settings = () => {
  const [name, setName] = useState("Username");
  const [email, setEmail] = useState("user@example.com");

  return (
    <div className="settings">
      {/* Sidebar */}
      <aside className="sidebar">
        <button className="sidebar-btn details-btn"></button>
        <button className="sidebar-btn test-results-btn"></button>
        <button className="sidebar-btn eye-btn"></button>
        <button className="sidebar-btn notifications-btn"></button>
        <button className="sidebar-btn gears-btn"></button>
        <button className="sidebar-btn inquiry-btn"></button>
      </aside>

      {/* Header */}
      <header className="header">
        <div className="logo">AlgoRize</div>
        <button className="signout-btn">Sign Out</button>
      </header>

      {/* Main Settings Section */}
      <main className="settings-content">
        <div className="profile-pic">
          <img src={femaleUser} alt="Profile" />
          <p className="username-label">Name</p>
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
            <br/>
          <div className="button-cover" >
            <button className="settings-btn delete-btn">Delete Account</button>
          </div>
        </section>
      </main>
    </div>
  );
};
