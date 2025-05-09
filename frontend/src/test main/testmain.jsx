import React from "react";
import "./testmain.css";
import Sidebar from "../sidebar/sidebar.jsx";
import Header from "../header/header.jsx";
import { useNavigate } from "react-router-dom";

export const TestMain = () => {
    const navigate = useNavigate();

    const topics = [
        { name: "Arrays", path: "/testnext" },
        { name: "Linked List", path: "/testnext" },
        { name: "Graph", path: "/testnext" },
        { name: "Trees", path: "/testnext" },
        { name: "Stack", path: "/testnext" },
        { name: "Queue", path: "/testnext" },
        { name: "Heap", path: "/testnext" },
        { name: "Dynamic Programming", path: "/testnext" }
    ];

    const handleTopicClick = (topic) => {
        navigate("/testnext", { state: { topic: topic.name } });
    };

    return (
        <div className="test-main">
            <Header />
            <Sidebar />
            <div className="div">
               
                

                {/* "Test Yourself" Section */}
                <div className="overlap">
                    <div className="rectangle" />
                    <div className="text-wrapper">Test Yourself</div>
                   
                    <div className="rectangle" /> 
                </div>
                
                
                {/* DSA Topics inside existing rectangles */}
                <div className="group">
                    {topics.map((topic, index) => (
                        <div
                            key={index}
                            className={`rectangle-${index + 2}`}
                            onClick={() => handleTopicClick(topic)}
                        >
                            <span className="topic-text">{topic.name}</span>
                        </div>
                    ))}
                </div>

                {/* Or Section */}
                <div className="or-section">
                    <span>OR</span>
                </div>
                <div className="ai-section">
                    <button
                        className="ai-test-button"
                        onClick={() => navigate("/ai-test")}
                    >
                        Test with AI
                    </button>
                    <p className="ai-description">
                        Test personalized DSA problems with AI assistance.
                    </p>
                </div>
            </div>
        </div>
    );
};
