import React from "react";
import ReactDOM from "react-dom/client";
<<<<<<< HEAD
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
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
  import {TestAI} from "./test ai/TestAI.jsx"; 


=======
import App from "./App.jsx"; // Import App.jsx
import { BrowserRouter } from "react-router-dom";
>>>>>>> 35fbac08ab26d597e299485d51614bc89713a29f

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <BrowserRouter>
<<<<<<< HEAD
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
        <Route path="/testai" element={<TestAI />} />
      </Routes>
=======
      <App />
>>>>>>> 35fbac08ab26d597e299485d51614bc89713a29f
    </BrowserRouter>
  </React.StrictMode>
);
