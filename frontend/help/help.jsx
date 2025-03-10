import React from "react";
import done from "./done.png";
import femaleUser from "./female-user.png";
import menu from "./menu.png";
import "./style.css";

export const Help = () => {
    return (
        <div className="help">
            <div className="div">
                <p className="text-wrapper">What can we help you with?</p>

                <div className="text-wrapper-2">HELP</div>

                <div className="overlap">
                    <div className="rectangle" />

                    <div className="text-wrapper-3">Type your query here</div>
                </div>

                <div className="rectangle-2" />

                <div className="rectangle-3" />

                <div className="group">
                    <div className="overlap-group">
                        <div className="ellipse" />

                        <img className="done" alt="Done" src={done} />
                    </div>
                </div>

                <div className="overlap-wrapper">
                    <div className="overlap-2">
                        <div className="rectangle-4" />

                        <div className="overlap-group-wrapper">
                            <div className="overlap-group-2">
                                <div className="rectangle-5" />

                                <div className="group-2" />
                            </div>
                        </div>

                        <div className="group-wrapper">
                            <div className="group-3" />
                        </div>

                        <div className="div-wrapper">
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
                    </div>
                </div>

                <div className="group-11">
                    <div className="group-12">
                        <div className="overlap-group-3">
                            <div className="text-wrapper-4">AlgoRize</div>

                            <div className="overlap-3">
                                <img className="menu" alt="Menu" src={menu} />

                                <div className="rectangle-6" />
                            </div>

                            <div className="female-user-wrapper">
                                <img
                                    className="female-user"
                                    alt="Female user"
                                    src={femaleUser}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};