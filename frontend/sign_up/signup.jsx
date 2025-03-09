import React from "react";
import appleInc from "./apple-inc.png";
import back from "./back.png";
import microsoft from "./microsoft.png";
import "./style.css";

export const SignUp = () => {
  return (
    <div className="sign-up">
      <div className="div">
        <div className="group">
          <div className="overlap">
            <div className="overlap-wrapper">
              <div className="overlap-group">
                <div className="overlap-group-wrapper">
                  <div className="overlap">
                    <div className="div-wrapper">
                      <div className="overlap-group-2">
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

                <div className="ellipse" />
              </div>
            </div>

            <img className="back" alt="Back" src={back} />
          </div>
        </div>

        <div className="overlap-2">
          <div className="rectangle" />

          <p className="welcome-to-algorize">
            <span className="text-wrapper-3">
              Welcome to AlgoRize! <br /> Let’s Make DSA Less ‘Ugh’ and More
              ‘Whoa!’
              <br />
            </span>

            <span className="text-wrapper-4">
              <br />
            </span>
          </p>

          <div className="text-wrapper-5">Sign Up</div>

          <div className="rectangle-2" />

          <div className="rectangle-3" />

          <div className="rectangle-4" />

          <div className="text-wrapper-6">Username</div>

          <div className="text-wrapper-7">Password</div>

          <div className="text-wrapper-8">Confirm Password</div>

          <div className="text-wrapper-9">Enter password</div>

          <div className="text-wrapper-10">Confirm password</div>

          <div className="text-wrapper-11">Enter email/username</div>

          <div className="group-2">
            <div className="overlap-3">
              <div className="rectangle-5" />

              <div className="text-wrapper-12">Sign Up</div>
            </div>
          </div>

          <div className="group-wrapper">
            <div className="group-3">
              <div className="overlap-4">
                <div className="group-4" />
              </div>

              <div className="microsoft-wrapper">
                <img className="microsoft" alt="Microsoft" src={microsoft} />
              </div>

              <div className="apple-inc-wrapper">
                <img className="apple-inc" alt="Apple inc" src={appleInc} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
