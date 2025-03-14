import React from "react";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import rightArrow from "./right-arrow.png";
import "./startpage.css";

export const StartPage = () => {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <div className="start-page">
      <div className="div">
        <div className="group">
          <div className="overlap">
            <div className="overlap-group-wrapper">
              <div className="overlap-group">
                <div className="text-wrapper">AlgoRize</div>
              </div>
            </div>

            <p className="see-the-logic-master">
              <span className="text-wrapper-2">
                See the Logic, Master the Code!
              </span>
            </p>
          </div>
        </div>

        <div className="overlap-2">
          <div className="animation" />

          <div className="group-2">
            <div className="overlap-3">
              <div className="rectangle" />
              <div className="ellipse" />
              <div className="rectangle-2" />
              <div className="rectangle-3" />

              {/* ✅ Log In Button with Navigation */}
              <button className="text-wrapper-3" onClick={() => navigate("/login")}>
                Log In
              </button>

              {/* ✅ Sign Up Button with Navigation */}
              <button className="text-wrapper-4" onClick={() => navigate("/signup")}>
                Sign Up
              </button>
            </div>

            <p className="algorize-visualize">
              <span className="text-wrapper-5">
                AlgoRize – Visualize, Practice, and Master DSA Like Never
                Before.
              </span>
              <br />
              <span className="text-wrapper-6">
                Tired of staring at dry code? Watch algorithms dance, play with
                data structures, and level up your skills—one visualization at a
                time. Sign up and let’s get coding!
              </span>
            </p>

            <div className="div-wrapper">
              <div className="overlap-group-2">
                <div className="rectangle-4" />

                {/* ✅ Get Started Button with Navigation */}
                <button className="text-wrapper-7" onClick={() => navigate("/dashboard")}>
                  Get started
                </button>

                <img className="right-arrow" alt="Right arrow" src={rightArrow} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
