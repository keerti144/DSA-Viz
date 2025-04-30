import { Routes, Route } from "react-router-dom";

import { StartPage } from "./startpage/startpage.jsx";
import { Login } from "./login_page/login.jsx";
import { SignUp } from "./sign_up/signup.jsx";

import { Homepage } from "./homepage/homepage.jsx";
import { DashboardOpen } from "./dashboard-open/dashboardopen.jsx";
import { Settings } from "./settings/settings.jsx";
import { Help } from "./help/help.jsx";
import { Community } from "./community/community.jsx";

import { VisMain } from "./vismain/vismain.jsx";
import { VisNext } from "./visnext/visnext.jsx";
import { VisAlgo } from "./visalgo/visalgo.jsx";

import { FlashcardsAndNotes } from "./flashcardsandnotes/flashcardsandnotes.jsx";
import { Roadmap } from "./roadmap/roadmap.jsx";

import { TestMain } from "./test main/testmain.jsx";
import { TestNext } from "./testnext/testnext.jsx";
import { TestMCQ } from "./test mcq/testmcq.jsx";

import SinglyLinkedListVisualizer from "./components/visualizations/linkedlists/singlylinkedlist/singlylinkedlist.jsx";
import CircularSinglyLinkedListVisualizer from "./components/visualizations/linkedlists/circularsinglylinkedlist/circularsinglylinkedlist.jsx";
import DoublyLinkedListVisualizer from "./components/visualizations/linkedlists/doublylinkedlist/doublylinkedlist.jsx";
import CircularDoublyLinkedListVisualizer from "./components/visualizations/linkedlists/circulardoublylinkedlist/circulardoublylinkedlist.jsx";




function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/dashboard" element={<DashboardOpen />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/help" element={<Help />} />
      <Route path="/community" element={<Community />} />
      <Route path="/test" element={<TestMain />} />
      <Route path="/visualize" element={<VisMain />} />
      <Route path="/visnext/:algorithm" element={<VisNext />} /> {/* dynamic route */}
      <Route path="/visalgo" element={<VisAlgo />} />
      <Route path="/flashcards" element={<FlashcardsAndNotes />} />
      <Route path="/roadmap" element={<Roadmap />} />
      <Route path="/testnext" element={<TestNext />} />
      <Route path="/testmcq" element={<TestMCQ />} />

      <Route path = "/visnext/singlylinkedlist" element={<SinglyLinkedListVisualizer />} />
      <Route path = "/visnext/circularsinglylinkedlist" element={<CircularSinglyLinkedListVisualizer />} />
      <Route path = "/visnext/doublylinkedlist" element={<DoublyLinkedListVisualizer />} />
      <Route path = '/visnext/cirulardoublylinkedlist' element={<CircularDoublyLinkedListVisualizer />} />

      

    </Routes>
  );
}

export default App;
