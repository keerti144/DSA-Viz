import React from "react";
import femaleUser from "./female-user.png";
import menu from "./menu.png";
import "./style.css";

export const TestInterview = () => {
    return (
        <div className="test-interview">
            <div className="overlap-wrapper">
                <div className="overlap">
                    <div className="overlap-group">
                        <div className="group">
                            <div className="overlap-group-wrapper">
                                <div className="div">
                                    <div className="text-wrapper">AlgoRize</div>

                                    <div className="overlap-2">
                                        <img className="menu" alt="Menu" src={menu} />

                                        <div className="rectangle" />
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

                        <div className="div-wrapper">
                            <div className="overlap-3">
                                <div className="rectangle-2" />

                                <div className="group-2">
                                    <div className="overlap-group-2">
                                        <div className="rectangle-3" />

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
                    </div>

                    <div className="overlap-4">
                        <div className="group-13">
                            <div className="overlap-5">
                                <div className="rectangle-4" />

                                <div className="text-wrapper-2">MCQ</div>

                                <div className="text-wrapper-3">Debugging</div>

                                <div className="text-wrapper-4">Interview Questions</div>
                            </div>
                        </div>

                        <div className="rectangle-5" />

                        <div className="rectangle-6" />

                        <div className="rectangle-7" />
                    </div>

                    <div className="rectangle-8" />

                    <div className="group-14">
                        <div className="overlap-6">
                            <div className="rectangle-9" />

                            <div className="topic-name-interview">
                                Topic name&nbsp;&nbsp;- Interview Questions
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
