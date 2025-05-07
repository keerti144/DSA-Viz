import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import CommunityForum from './components/CommunityForum';
import TimeBoundChallenges from './components/TimeBoundChallenges';
import { AuthProvider } from './contexts/AuthContext';

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
import TestQuestions from "./testnext/TestQuestions.jsx";

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',
        },
        secondary: {
            main: '#f48fb1',
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <AuthProvider>
                    <Navbar />
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <Routes>
                            <Route path="/" element={<StartPage />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/forum" element={<CommunityForum />} />
                            <Route path="/challenges" element={<TimeBoundChallenges />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/homepage" element={<Homepage />} />
                            <Route path="/dashboard-open" element={<DashboardOpen />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/help" element={<Help />} />
                            <Route path="/community" element={<Community />} />
                            <Route path="/test" element={<TestMain />} />
                            <Route path="/visualize" element={<VisMain />} />
                            <Route path="/visnext/:algorithm" element={<VisNext />} />
                            <Route path="/visalgo" element={<VisAlgo />} />
                            <Route path="/flashcards" element={<FlashcardsAndNotes />} />
                            <Route path="/roadmap" element={<Roadmap />} />
                            <Route path="/testnext" element={<TestNext />} />
                            <Route path="/testmcq" element={<TestMCQ />} />
                            <Route path="/visnext/singlylinkedlist" element={<SinglyLinkedListVisualizer />} />
                            <Route path="/visnext/circularsinglylinkedlist" element={<CircularSinglyLinkedListVisualizer />} />
                            <Route path="/visnext/doublylinkedlist" element={<DoublyLinkedListVisualizer />} />
                            <Route path="/visnext/cirulardoublylinkedlist" element={<CircularDoublyLinkedListVisualizer />} />
                            <Route path="/test-questions" element={<TestQuestions />} />
                        </Routes>
                    </Box>
                </AuthProvider>
            </Box>
        </ThemeProvider>
    );
}

export default App;
