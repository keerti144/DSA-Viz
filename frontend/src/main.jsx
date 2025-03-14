import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StartPage } from "./startpage/startpage.jsx";
import { Login } from "./login_page/login.jsx"; 
import { SignUp } from "./sign_up/signup.jsx"; 
import { Dashboard } from "./dashboard open/dashboardopen.jsx"; 

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
