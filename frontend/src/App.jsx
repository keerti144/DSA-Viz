import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./StartPage";
import LoginPage from "./LoginPage"; // Make sure it's correctly named!
import SignupPage from "./SignupPage";
import Dashboard from "./Dashboard";
import Homepage from "./homepage/homepage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/login_page" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/homepage" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;
