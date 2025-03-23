import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/sidebar"; // Sidebar remains
import Header from "../header/header"; // Header added (without menu icon)
import "./community.css";

export const Community = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [posts, setPosts] = useState([
        { id: 1, user: "Alice", text: "🚀 Learning Recursion is tough! Any tips?" },
        { id: 2, user: "Bob", text: "🧠 Just solved a Graph problem in O(n) complexity!" },
        { id: 3, user: "Charlie", text: "⚡ How do I speed up Dynamic Programming?" },
        { id: 4, user: "Eve", text: "📌 Best websites to practice Competitive Programming?" },
        { id: 5, user: "David", text: "🔥 Anyone struggling with backtracking?" }
    ]);
    const [newPost, setNewPost] = useState("");

    const trendingPosts = [
        "🔍 Mastering Binary Search!",
        "🚀 How to Approach Hard Leetcode Problems",
        "💡 Best Strategies for Greedy Algorithms",
        "🧩 Solving Tree-Based Problems Effectively",
        "⚡ Must-Know DP Patterns"
    ];

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handlePostSubmit = () => {
        if (newPost.trim() !== "") {
            setPosts([{ id: posts.length + 1, user: "You", text: newPost }, ...posts]);
            setNewPost("");
        }
    };

    return (
        <div className="community">
            <Header /> {/* Header added */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <div className={`community-content ${isSidebarOpen ? "sidebar-open" : ""}`}>
                <h1 className="community-title">AlgoRize Community</h1>

                {/* Trending DSA Topics - Horizontal Scroll */}
                <div className="trending-section">
                    <h2>🔥 Trending Topics</h2>
                    <div className="trending-scroll">
                        {trendingPosts.map((topic, index) => (
                            <div key={index} className="trending-item">{topic}</div>
                        ))}
                    </div>
                </div>

                {/* Post Submission */}
                <div className="post-section">
                    <h2>📢 Post Something</h2>
                    <textarea
                        className="post-input"
                        placeholder="Share something with the community..."
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                    />
                    <button className="post-btn" onClick={handlePostSubmit}>Post</button>
                </div>

                {/* Popular Discussions */}
                <div className="discussion-section">
                    <h2>💬 Popular Discussions</h2>
                    <ul className="discussion-list">
                        <li>🧠 Best ways to practice DSA?</li>
                        <li>⚡ How to improve problem-solving speed?</li>
                        <li>💻 What are your favorite coding platforms?</li>
                        <li>🔥 Hardest algorithm you've solved?</li>
                        <li>🎯 How to prepare for FAANG interviews?</li>
                    </ul>
                </div>

                {/* Posts */}
                <div className="posts-container">
                    <h2>📜 Latest Posts</h2>
                    {posts.map((post) => (
                        <div key={post.id} className="post-item">
                            <span className="post-user">{post.user}:</span> {post.text}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Community;
