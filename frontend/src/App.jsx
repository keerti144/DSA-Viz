import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./StartPage";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import Homepage from "./homepage/homepage";
import Dashboard from "./Dashboard";
import Settings from "./settings/settings";
import Help from "./help/help";
import Community from "./community/community";
import VisMain from "./vismain/vismain";
import VisNext from "./visnext/visnext";
import VisAlgo from "./visalgo/visalgo";
import FlashcardsAndNotes from "./flashcardsandnotes/flashcardsandnotes";
import Roadmap from "./roadmap/roadmap";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/login_page" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />
        <Route path="/community" element={<Community />} />
        <Route path="/visualize" element={<VisMain />} />
        <Route path="/visnext" element={<VisNext />} />
        <Route path="/visalgo" element={<VisAlgo />} />
        <Route path="/flashcards" element={<FlashcardsAndNotes />} />
        <Route path="/roadmap" element={<Roadmap />} />
      </Routes>
    </Router>
  );
}

export default App;
