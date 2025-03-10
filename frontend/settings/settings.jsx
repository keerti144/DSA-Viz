import React from "react";
import femaleUser from "./female-user.png";
import group43 from "./group-43.png";
import menu from "./menu.png";
import "./style.css";
import username from "./username.png";

export const Settings = () => {
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

                    <img className="img" alt="Group" src={group43} />
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

                    <div className="text-wrapper-3">(username)</div>

                    <div className="text-wrapper-4">(email)</div>

                    <img className="username" alt="Username" src={username} />

                    <div className="text-wrapper-5">Email</div>

                    <div className="text-wrapper-6">Change password</div>

                    <div className="text-wrapper-7">Language</div>

                    <div className="text-wrapper-8">Delete Account</div>

                    <div className="rectangle-7" />
                </div>

                <div className="overlap-group-wrapper">
                    <div className="overlap-4">
                        <div className="text-wrapper-9">Sign Out</div>

                        <div className="rectangle-8" />
                    </div>
                </div>

                <div className="div-wrapper">
                    <div className="overlap-5">
                        <div className="rectangle-9" />

                        <div className="group-2">
                            <div className="overlap-group-2">
                                <div className="rectangle-10" />

                                <div className="group-3" />
                            </div>
                        </div>

                        <div className="group-wrapper">
                            <div className="group-4" />
                        </div>

                        <div className="group-5">
                            <div className="group-6" />
                        </div>

                        <div className="group-7">
                            <div className="group-8" />
                        </div>

                        <div className="group-9">
                            <div className="group-10" />
                        </div>

                        <div className="group-11">
                            <div className="group-12" />
                        </div>
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