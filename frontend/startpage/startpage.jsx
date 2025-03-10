import React from "react";
import rightArrow from "./right-arrow.png";
import "./style.css";

export const StartPage = () => {
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
              <span className="span">
                <br />
              </span>

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

              <div className="text-wrapper-3">Log In</div>

              <div className="text-wrapper-4">Sign up</div>
            </div>

            <p className="algorize-visualize">
              <span className="text-wrapper-5">
                AlgoRize – Visualize, Practice, and Master DSA Like Never
                Before.
                <br />
              </span>

              <span className="text-wrapper-6">
                Tired of staring at dry code? Watch algorithms dance, play with
                data structures, and level up your skills—one visualization at a
                time. Sign up and let’s get coding!
              </span>
            </p>

            <div className="div-wrapper">
              <div className="overlap-group-2">
                <div className="rectangle-4" />

                <div className="text-wrapper-7">Get started</div>

                <img
                  className="right-arrow"
                  alt="Right arrow"
                  src={rightArrow}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};