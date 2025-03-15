import React, { useState } from "react";
import femaleUser from "./female-user.png";
import group43 from "./group-43.png";
import menu from "./menu.png";
import "./style.css";
import username from "./username.png";

export const Settings = () => {
    const [name, setName] = useState("Username");
    const [email, setEmail] = useState("user@example.com");

    return (
        <div className="settings">
            <div className="div">
                <div className="group">
                    <div className="overlap-group">
                        <div className="rectangle" />
                        <div className="text-wrapper">My Account</div>
                    </div>
                </div>
                <div className="overlap">
                    <div className="text-wrapper-2">Name</div>
                    <input 
                        type="text" 
                        className="input-field" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                </div>
                <div className="overlap-wrapper">
                    <div className="overlap-2">
                        <div className="ellipse" />
                        <img className="female-user" alt="Female user" src={femaleUser} />
                    </div>
                </div>
                <div className="overlap-3">
                    <div className="rectangle-2" />
                    <div className="rectangle-3" />
                    <div className="rectangle-4" />
                    <div className="rectangle-5" />
                    <div className="rectangle-6" />
                    <input 
                        type="email" 
                        className="input-field" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <img className="username" alt="Username" src={username} />
                    <div className="text-wrapper-5">Email</div>
                    <div className="text-wrapper-6">Change password</div>
                    <button className="button">Change Password</button>
                    <div className="text-wrapper-7">Language</div>
                    <button className="button">Change Language</button>
                    <div className="text-wrapper-8">Delete Account</div>
                    <button className="button delete">Delete Account</button>
                    <div className="rectangle-7" />
                </div>
                <div className="overlap-group-wrapper">
                    <div className="overlap-4">
                        <div className="text-wrapper-9">Sign Out</div>
                        <button className="button signout">Sign Out</button>
                        <div className="rectangle-8" />
                    </div>
                </div>
                <div className="group-13">
                    <div className="group-14">
                        <div className="overlap-group-3">
                            <div className="text-wrapper-10">AlgoRize</div>
                            <div className="overlap-6">
                                <img className="menu" alt="Menu" src={menu} />
                                <div className="rectangle-11" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};