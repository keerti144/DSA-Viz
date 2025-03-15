import React, { useState } from "react";
import appleInc from "./apple-inc.png";
import back from "./back.png";
import microsoft from "./microsoft.png";
import "./signupstyle.css";

export const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

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
                    <p className="see-the-logic-master">See the Logic, Master the Code!</p>
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
          <p className="welcome-to-algorize">Welcome to AlgoRize! Let’s Make DSA Less ‘Ugh’ and More ‘Whoa!’</p>
          <div className="text-wrapper-5">Sign Up</div>

          <form onSubmit={handleSubmit} className="signup-form">
            <label className="text-wrapper-6">Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Enter email/username" className="input-box" />
            
            <label className="text-wrapper-7">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter password" className="input-box" />
            
            <label className="text-wrapper-8">Confirm Password</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm password" className="input-box" />
            
            <button type="submit" className="sign-up-button">Sign Up</button>
          </form>

          <div className="group-wrapper">
            <div className="group-3">
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
