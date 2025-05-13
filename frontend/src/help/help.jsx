import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./help.css";

export const Help = () => {
    const [query, setQuery] = useState("");
    const [email, setEmail] = useState("");
    const [openFAQ, setOpenFAQ] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [helpQueries, setHelpQueries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    useEffect(() => {
        fetchHelpQueries();
        // Set email from current user if available
        if (currentUser?.email) {
            setEmail(currentUser.email);
        }
    }, [currentUser]);

    const fetchHelpQueries = async () => {
        try {
            const response = await fetch('http://localhost:5000/help-queries');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setHelpQueries(data);
        } catch (error) {
            console.error('Error fetching help queries:', error);
            setSubmitStatus({ 
                type: 'error', 
                message: 'Failed to load recent queries. Please try again later.' 
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteQuery = async (queryId) => {
        if (!window.confirm('Are you sure you want to delete this query?')) {
            return;
        }

        setIsDeleting(true);
        try {
            const response = await fetch(`http://localhost:5000/help-queries/${queryId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setHelpQueries(helpQueries.filter(q => q.id !== queryId));
            setSubmitStatus({ 
                type: 'success', 
                message: 'Query deleted successfully' 
            });
        } catch (error) {
            console.error('Error deleting query:', error);
            setSubmitStatus({ 
                type: 'error', 
                message: 'Failed to delete query. Please try again later.' 
            });
        } finally {
            setIsDeleting(false);
        }
    };

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

    const handleSubmitQuery = async () => {
        if (!query.trim()) {
            setSubmitStatus({ type: 'error', message: 'Please enter your query' });
            return;
        }

        if (!currentUser) {
            setSubmitStatus({ type: 'error', message: 'Please log in to submit a query' });
            return;
        }

        if (!email.trim()) {
            setSubmitStatus({ type: 'error', message: 'Please provide your email address' });
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch('http://localhost:5000/send-help-query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    query: query.trim(),
                    email: email.trim()
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setSubmitStatus({ type: 'success', message: 'Query sent successfully! We\'ll get back to you soon.' });
            setQuery('');
            fetchHelpQueries();
        } catch (error) {
            console.error('Error submitting query:', error);
            setSubmitStatus({ 
                type: 'error', 
                message: 'Failed to send query. Please try again later.' 
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="help">
            <div className="help-container">
                {/* Header Section */}
                <div className="help-header">
                    <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
                    <h1 className="help-title">AlgoRize Help & Support</h1>
                </div>

                {/* Recent Queries Section */}
                <div className="recent-queries">
                    <h3>Recent Help Queries</h3>
                    {isLoading ? (
                        <div className="loading">Loading recent queries...</div>
                    ) : helpQueries.length > 0 ? (
                        <div className="queries-list">
                            {helpQueries.map((item) => (
                                <div key={item.id} className="query-item">
                                    <div className="query-header">
                                        <span className="query-status" data-status={item.status}>
                                            {item.status}
                                        </span>
                                        <span className="query-date">{formatDate(item.timestamp)}</span>
                                    </div>
                                    <div className="query-content">
                                        <p className="query-question">{item.question}</p>
                                        {item.answer && (
                                            <p className="query-answer">{item.answer}</p>
                                        )}
                                        {item.status === 'pending' && (
                                            <button 
                                                className="delete-query-btn"
                                                onClick={() => handleDeleteQuery(item.id)}
                                                disabled={isDeleting}
                                            >
                                                {isDeleting ? 'Deleting...' : 'Delete'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="no-queries">No recent queries found.</p>
                    )}
                </div>

                {/* Query Form Section */}
                <div className="query-section">
                    <div className="query-input-group">
                        {/*
                        <input
                            type="email"
                            className="email-input"
                            placeholder="Your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isSubmitting || !!currentUser?.email}
                        />*/}
                        <textarea
                            className="query-input"
                            placeholder="Type your query here..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            disabled={isSubmitting}
                            rows={4}
                        />
                    </div>
                    <button 
                        className="submit-query"
                        onClick={handleSubmitQuery}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Sending...' : 'Submit'}
                    </button>
                </div>

                {/* Status Message */}
                {submitStatus && (
                    <div className={`status-message ${submitStatus.type}`}>
                        {submitStatus.message}
                    </div>
                )}

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
                    <p>Reach out to us at <a href="mailto:officialkeerti14@gmail.com">officialkeerti14@gmail.com</a></p>
                </div>
            </div>
        </div>
    );
};
