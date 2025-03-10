import React from "react";
import femaleUser from "./female-user.png";
import menu from "./menu.png";
import "./style.css";

export const VisExp = () => {
    return (
        <div className="vis-exp">
            <div className="div">
                <div className="group">
                    <div className="overlap-group-wrapper">
                        <div className="overlap-group">
                            <div className="rectangle" />

                            <div className="topic-name-visualise">
                                Topic name&nbsp;&nbsp;- Visualise
                            </div>
                        </div>
                    </div>

                    <div className="rectangle-2" />
                </div>

                <div className="overlap-wrapper">
                    <div className="overlap">
                        <div className="rectangle-3" />

                        <div className="div-wrapper">
                            <div className="overlap-group-2">
                                <div className="rectangle-4" />

                                <div className="group-2" />
                            </div>
                        </div>

                        <div className="group-wrapper">
                            <div className="group-3" />
                        </div>

                        <div className="group-4">
                            <div className="group-5" />
                        </div>

                        <div className="group-6">
                            <div className="group-7" />
                        </div>

                        <div className="group-8">
                            <div className="group-9" />
                        </div>

                        <div className="group-10">
                            <div className="group-11" />
                        </div>
                    </div>
                </div>

                <div className="group-12">
                    <div className="group-13">
                        <div className="overlap-group-3">
                            <div className="text-wrapper">AlgoRize</div>

                            <div className="overlap-2">
                                <img className="menu" alt="Menu" src={menu} />

                                <div className="rectangle-5" />
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

                <div className="overlap-3">
                    <div className="group-14">
                        <div className="rectangle-6" />

                        <div className="overlap-4">
                            <div className="rectangle-7" />

                            <div className="text-wrapper-2">Explanation</div>
                        </div>

                        <div className="group-15" />
                    </div>

                    <div className="group-16" />
                </div>
            </div>
        </div>
    );
};
