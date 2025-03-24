import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StartPage } from "./startpage/startpage.jsx";
import { Login } from "./login_page/login.jsx"; 
import { SignUp } from "./sign_up/signup.jsx"; 
import {Settings} from "./settings/settings.jsx"; // Path adjusted based on folder structure
import {Community} from "./community/community.jsx"
import {TestMain} from "./test main/testmain.jsx"
import {VisMain} from "./vismain/vismain.jsx"
import { DashboardOpen } from "./dashboard-open/dashboardopen.jsx"; 
import {Homepage} from "./homepage/homepage.jsx";
import {Help} from "./help/help.jsx"
import {FlashcardsAndNotes} from "./flashcardsandnotes/flashcardsandnotes";
import {Roadmap} from "./roadmap/roadmap";
import {VisNext} from "./visnext/visnext.jsx";
import {VisAlgo} from "./visalgo/visalgo.jsx";
import {TestNext} from "./testnext/testnext.jsx";
import {TestMCQ} from "./test mcq/testmcq.jsx";


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
        <Route path="/flashcards" element={<FlashcardsAndNotes />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/visnext" element={<VisNext />} />
        <Route path="/visalgo" element={<VisAlgo />} />
        <Route path="/testnext" element={<TestNext />} />
        <Route path="/testmcq" element={<TestMCQ />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>

  
);



