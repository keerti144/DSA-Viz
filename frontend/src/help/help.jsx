import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./help.css";

export const Help = () => {
    const [query, setQuery] = useState("");
    const [openFAQ, setOpenFAQ] = useState(null);  
    const navigate = useNavigate();

    const previousHelp = [
        "How to visualize a binary search tree?",
        "Steps to run a Dijkstra algorithm simulation",
        "Understanding time complexity in sorting algorithms"
    ];

    const faqs = [
        { question: "🔹 How do I reset an animation?", answer: "Click the 'Reset' button on the visualization page in AlgoRize." },
        { question: "🔹 Can I change the speed of visualization?", answer: "Yes! Use the speed slider at the top of the visualization panel in AlgoRize." },
        { question: "🔹 Where can I find detailed explanations?", answer: "Each algorithm page contains a section with a step-by-step breakdown inside AlgoRize." },
        { question: "🔹 What devices support AlgoRize?", answer: "AlgoRize is fully responsive and works on desktops, tablets, and mobile devices." },
        { question: "🔹 Can I contribute my own algorithms to AlgoRize?", answer: "Yes! AlgoRize is open-source. Check our GitHub for contribution guidelines." }
    ];

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    return (
        <div className="help">
            <div className="help-container">
                {/* Header Section */}
                <div className="help-header">
                    <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
                    <h1 className="help-title">AlgoRize Help & Support</h1>
                </div>

                {/* Previous Queries Section */}
                <div className="previous-queries">
                    <h3>Recent Help Topics</h3>
                    <ul>
                        {previousHelp.map((topic, index) => (
                            <li key={index} className="fade-in">{topic}</li>
                        ))}
                    </ul>
                </div>

                {/* Search Section */}
                <div className="query-section">
                    <input
                        type="text"
                        className="query-input"
                        placeholder="Type your query here..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button className="submit-query">Submit</button>
                </div>

                {/* FAQ Section */}
                <div className="faq-section">
                    <h3>Frequently Asked Questions</h3>
                    {faqs.map((faq, index) => (
                        <div 
                            key={index} 
                            className={`faq-item ${openFAQ === index ? "open" : ""}`} 
                            onClick={() => toggleFAQ(index)}
                        >
                            <h4>{faq.question}</h4>
                            {openFAQ === index && <p className="faq-answer">{faq.answer}</p>}
                        </div>
                    ))}
                </div>

                {/* Contact Support */}
                <div className="contact-section">
                    <h3>Still Need Help?</h3>
                    <p>Reach out to us at <a href="mailto:support@algorize.com">support@algorize.com</a></p>
                </div>
            </div>
        </div>
    );
};
