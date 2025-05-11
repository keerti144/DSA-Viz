import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
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
import TopicDetail from "./roadmap/TopicDetail.jsx";
import TestAI from "./test_ai/testai.jsx";
import SearchingVisualization from "./components/visualizations/searching/SearchingVisualization.jsx";
import TreeVisualization from "./components/visualizations/trees/TreeVisualization.jsx";

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#5d3d85', // Purple theme color
        },
        secondary: {
            main: '#6a3f92', // Lighter purple
        },
        background: {
            default: '#160c25', // Dark purple background
            paper: '#1e1230', // Slightly lighter purple for cards
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <AuthProvider>
                    <Box component="main" sx={{ flexGrow: 1 }}>
                        <Routes>
                            <Route path="/" element={<StartPage />} />
                            <Route path="/dashboard" element={<DashboardOpen />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/homepage" element={<Homepage />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/help" element={<Help />} />
                            <Route path="/community" element={<Community />} />
                            <Route path="/test" element={<TestMain />} />
                            <Route path="/ai-test" element={<TestAI />} />
                            <Route path="/visualize" element={<VisMain />} />
                            <Route path="/visnext/:algorithm" element={<VisNext />} />
                            <Route path="/visalgo" element={<VisAlgo />} />
                            <Route path="/flashcards" element={<FlashcardsAndNotes />} />
                            <Route path="/roadmap" element={<Roadmap />} />
                            <Route path="/roadmap/:topic" element={<TopicDetail />} />
                            <Route path="/testnext" element={<TestNext />} />
                            <Route path="/testmcq" element={<TestMCQ />} />
                            <Route path="/test-questions" element={<TestQuestions />} />
                            <Route path="/singly-linked-list" element={<SinglyLinkedListVisualizer />} />
                            <Route path="/circular-singly-linked-list" element={<CircularSinglyLinkedListVisualizer />} />
                            <Route path="/doubly-linked-list" element={<DoublyLinkedListVisualizer />} />
                            <Route path="/circular-doubly-linked-list" element={<CircularDoublyLinkedListVisualizer />} />
                            <Route path="/visnext/binarysearch" element={<SearchingVisualization algorithm="binarysearch" />} />
                            <Route path="/visnext/linearsearch" element={<SearchingVisualization algorithm="linearsearch" />} />
                            <Route path="/visnext/bst" element={<TreeVisualization algorithm="binary" title="Binary Search Tree" />} />
                            <Route path="/visnext/avl" element={<TreeVisualization algorithm="avl" title="AVL Tree" />} />
                        </Routes>
                    </Box>
                </AuthProvider>
            </Box>
        </ThemeProvider>
    );
}

export default App;
