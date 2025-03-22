import React from "react";
import femaleUser from "../assets/female-user.png";
import menu from "../assets/menu.png";
import "./community.css";

export const Community = () => {
    return (
        
        <div className="community">
            <div className="div">
                <div className="group">
                    <div className="overlap-group">
                        <div className="rectangle" />

                        <div className="text-wrapper">Community</div>
                    </div>
                </div>

                <div className="rectangle-2" />

                <div className="rectangle-3" />

                <div className="rectangle-4" />

                <div className="rectangle-5" />

                <div className="rectangle-6" />

                <div className="frame">
                    <div className="group-2">
                        <div className="rectangle-7" />

                        <div className="rectangle-8" />

                        <div className="rectangle-9" />

                        <div className="rectangle-10" />

                        <div className="rectangle-11" />

                        <div className="rectangle-12" />

                        <div className="rectangle-13" />

                        <div className="rectangle-14" />
                    </div>
                </div>

                <div className="rectangle-15" />

                <div className="group-wrapper">
                    <div className="overlap-group-wrapper">
                        <div className="overlap-group-2">
                            <div className="text-wrapper-2">AlgoRize</div>

                            <div className="overlap">
                                <img className="menu" alt="Menu" src={menu} />

                                <div className="rectangle-16" />
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

                <div className="group-3">
                    <div className="overlap-wrapper">
                        <div className="overlap-2">
                            <div className="rectangle-17" />

                            <div className="div-wrapper">
                                <div className="overlap-group-3">
                                    <div className="rectangle-18" />

                                    <div className="group-4" />
                                </div>
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

                            <div className="group-13">
                                <div className="group-14" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
