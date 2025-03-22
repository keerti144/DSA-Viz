import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StartPage } from "./startpage/startpage.jsx";
import { Login } from "./login_page/login.jsx"; 
import { SignUp } from "./sign_up/signup.jsx"; 
import {Settings} from "./settings/settings.jsx"; // Path adjusted based on folder structure
import {Community} from "./community/community.jsx"
import {TestMain} from "./test main/testmain.jsx"
import {VisMain} from "./vis main/vismain.jsx"
import { DashboardOpen } from "./dashboard-open/dashboardopen.jsx"; 
import Homepage from "./homepage/homepage.jsx";
import {Help} from "./help/help.jsx"


ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/settings" element={<Settings />} /> 
        <Route path="/community" element={<Community />} />
        <Route path="/test" element={<TestMain />} />
        <Route path="/visualize" element={<VisMain />} />
        <Route path="/dashboard" element={<DashboardOpen />} />
        <Route path="/help" element = {<Help />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>

  
);



