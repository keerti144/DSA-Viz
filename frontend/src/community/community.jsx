import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, query, orderBy, onSnapshot, updateDoc, doc, arrayUnion, arrayRemove, serverTimestamp, where, deleteDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import Sidebar from "../sidebar/sidebar";
import Header from "../header/header";
import "./community.css";

export const Community = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [showNewPostModal, setShowNewPostModal] = useState(false);
    const [newPostTitle, setNewPostTitle] = useState("");
    const [newPostContent, setNewPostContent] = useState("");
    const [newPostTags, setNewPostTags] = useState([]);
    const [newTag, setNewTag] = useState("");
    const [newReply, setNewReply] = useState({});
    const [user, setUser] = useState(null);
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showReplies, setShowReplies] = useState({});
    const [expandedPosts, setExpandedPosts] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Listen for auth state changes
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        // Listen for posts
        const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
        const unsubscribePosts = onSnapshot(q, 
            (snapshot) => {
                try {
                    const postsData = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                        content: doc.data().content || "",
                        likes: doc.data().likes || [],
                        replies: doc.data().replies || [],
                        tags: doc.data().tags || []
                    }));
                    setPosts(postsData);
                    const tags = new Set();
                    postsData.forEach(post => {
                        post.tags?.forEach(tag => tags.add(tag));
                    });
                    setAllTags(Array.from(tags));
                    setLoading(false);
                } catch (err) {
                    setError("Error loading posts: " + err.message);
                    setLoading(false);
                }
            },
            (error) => {
                setError("Error loading posts: " + error.message);
                setLoading(false);
            }
        );

        return () => {
            unsubscribe();
            unsubscribePosts();
        };
    }, []);

    const handlePostSubmit = async () => {
        if (!user) {
            alert("Please sign in to post");
            return;
        }
        if (newPostTitle.trim() === "" || newPostContent.trim() === "") {
            alert("Please provide both title and content");
            return;
        }
        try {
            await addDoc(collection(db, "posts"), {
                title: newPostTitle,
                content: newPostContent,
                userId: user.uid,
                userName: user.displayName || user.email?.split('@')[0] || "Anonymous",
                timestamp: serverTimestamp(),
                likes: [],
                replies: [],
                tags: newPostTags
            });
            setNewPostTitle("");
            setNewPostContent("");
            setNewPostTags([]);
            setShowNewPostModal(false);
        } catch (error) {
            console.error("Error adding post: ", error);
            alert("Error posting. Please try again.");
        }
    };

    const handleReplySubmit = async (postId) => {
        if (!user) {
            alert("Please sign in to reply");
            return;
        }
        if (newReply[postId]?.trim() === "") {
            return;
        }
        try {
            const postRef = doc(db, "posts", postId);
            await updateDoc(postRef, {
                replies: arrayUnion({
                    text: newReply[postId],
                    userId: user.uid,
                    userName: user.displayName || user.email?.split('@')[0] || "Anonymous",
                    timestamp: serverTimestamp()
                })
            });
            setNewReply({ ...newReply, [postId]: "" });
        } catch (error) {
            console.error("Error adding reply: ", error);
            alert("Error posting reply. Please try again.");
        }
    };

    const handleLike = async (postId) => {
        if (!user) {
            alert("Please sign in to like posts");
            return;
        }

        try {
            const postRef = doc(db, "posts", postId);
            const post = posts.find(p => p.id === postId);
            
            if (post.likes.includes(user.uid)) {
                await updateDoc(postRef, {
                    likes: arrayRemove(user.uid)
                });
            } else {
                await updateDoc(postRef, {
                    likes: arrayUnion(user.uid)
                });
            }
        } catch (error) {
            console.error("Error updating like: ", error);
            alert("Error updating like. Please try again.");
        }
    };

    const handleAddTag = (e) => {
        if (e.key === 'Enter' && newTag.trim() !== '') {
            e.preventDefault();
            if (!newPostTags.includes(newTag.trim())) {
                setNewPostTags([...newPostTags, newTag.trim()]);
            }
            setNewTag('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setNewPostTags(newPostTags.filter(tag => tag !== tagToRemove));
    };

    const handleTagFilter = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const clearFilters = () => setSelectedTags([]);

    const formatTimestamp = (timestamp) => {
        if (!timestamp) return "";
        const date = timestamp.toDate();
        const now = new Date();
        const diff = Math.floor((now - date) / 1000);
        if (diff < 60) return `${diff}s ago`;
        if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
        return date.toLocaleDateString();
    };

    const filteredPosts = posts.filter(post => {
        // Filter by search query
        const matchesSearch = searchQuery === "" || 
            post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        // Filter by selected tags
        const matchesTags = selectedTags.length === 0 || 
            selectedTags.every(tag => post.tags?.includes(tag));

        return matchesSearch && matchesTags;
    });

    const toggleReplies = (postId) => {
        setShowReplies(prev => ({
            ...prev,
            [postId]: !prev[postId]
        }));
    };

    const toggleExpand = (postId) => {
        setExpandedPosts(prev => ({
            ...prev,
            [postId]: !prev[postId]
        }));
    };

    const handleDeletePost = async (postId) => {
        if (!user) return;
        
        try {
            const postRef = doc(db, "posts", postId);
            await deleteDoc(postRef);
        } catch (error) {
            console.error("Error deleting post: ", error);
            alert("Error deleting post. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="app-container">
                <Sidebar />
                <div className="main-content">
                    <div className="loading">Loading posts...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="app-container">
                <Sidebar />
                <div className="main-content">
                    <div className="error-message">{error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="app-container">
            <Sidebar />
            <div className="main-content">
                <div className="back-button" onClick={() => navigate(-1)}>
                    ← Back
                </div>
                <div className="community">
                    <div className="community-content">
                        <div className="forum-header">Community Forum</div>
                        <div className="forum-desc">Connect with peers, ask questions, and share your knowledge.</div>
                        <div className="top-bar">
                            <div className="search-container">
                                <input
                                    type="text"
                                    className="search-input"
                                    placeholder="Search discussions..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <span className="search-icon">🔍</span>
                            </div>
                            <button className="new-post-btn" onClick={() => setShowNewPostModal(true)}>
                                New Post
                            </button>
                        </div>
                        <div className="posts-container">
                            {filteredPosts.map((post) => {
                                return (
                                    <div key={post.id} className="post-item">
                                        <div className="post-header">
                                            <div className="post-title" onClick={() => toggleExpand(post.id)}>
                                                {post.title}
                                            </div>
                                            {user && post.userId === user.uid && (
                                                <button 
                                                    className="delete-post-btn"
                                                    onClick={() => {
                                                        if (window.confirm('Are you sure you want to delete this post?')) {
                                                            handleDeletePost(post.id);
                                                        }
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </div>
                                        <div className={`post-content ${expandedPosts[post.id] ? 'expanded' : 'collapsed'}`}>
                                            {post.content}
                                        </div>
                                        {post.content && post.content.length > 300 && (
                                            <button 
                                                className="expand-button"
                                                onClick={() => toggleExpand(post.id)}
                                            >
                                                {expandedPosts[post.id] ? 'Show less' : 'Show more'}
                                                <span>{expandedPosts[post.id] ? '↑' : '↓'}</span>
                                            </button>
                                        )}
                                        {post.tags && post.tags.length > 0 && (
                                            <div className="post-tags">
                                                {post.tags.map(tag => (
                                                    <span key={tag} className="post-tag">{tag}</span>
                                                ))}
                                            </div>
                                        )}
                                        <div className="post-bottom">
                                            <div className="post-user-info">
                                                <div className="post-avatar">{post.userName?.[0]?.toUpperCase() || '?'}</div>
                                                <span className="post-username">{post.userName}</span>
                                                <span className="post-time">{formatTimestamp(post.timestamp)}</span>
                                            </div>
                                            <div className="post-actions">
                                                <span className="action-icon" onClick={() => handleLike(post.id)}>
                                                    <span role="img" aria-label="like">👍</span> {post.likes?.length || 0}
                                                </span>
                                                <span className="action-icon" onClick={() => toggleReplies(post.id)}>
                                                    <span role="img" aria-label="comments">💬</span> {post.replies?.length || 0}
                                                </span>
                                            </div>
                                        </div>
                                        {showReplies[post.id] && (
                                            <div className="replies-section">
                                                {post.replies?.map((reply, index) => (
                                                    <div key={index} className="reply-item">
                                                        <div className="reply-user-info">
                                                            <div className="reply-avatar">{reply.userName?.[0]?.toUpperCase() || '?'}</div>
                                                            <span className="reply-username">{reply.userName}</span>
                                                            <span className="reply-time">{formatTimestamp(reply.timestamp)}</span>
                                                        </div>
                                                        <div className="reply-content">{reply.text}</div>
                                                    </div>
                                                ))}
                                                <div className="reply-input-container">
                                                    <input
                                                        type="text"
                                                        className="reply-input"
                                                        placeholder="Write a reply..."
                                                        value={newReply[post.id] || ""}
                                                        onChange={(e) => setNewReply({ ...newReply, [post.id]: e.target.value })}
                                                        onKeyPress={(e) => {
                                                            if (e.key === 'Enter') {
                                                                handleReplySubmit(post.id);
                                                            }
                                                        }}
                                                    />
                                                    <button 
                                                        className="reply-submit-btn"
                                                        onClick={() => handleReplySubmit(post.id)}
                                                    >
                                                        Reply
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="community-sidebar">
                        <div className="sidebar-title">Filter by Topic</div>
                        <div className="sidebar-tags">
                            {allTags.map(tag => (
                                <button
                                    key={tag}
                                    className={`sidebar-tag${selectedTags.includes(tag) ? ' active' : ''}`}
                                    onClick={() => handleTagFilter(tag)}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                        <button className="clear-filters-btn" onClick={clearFilters}>Clear Filters</button>
                    </div>
                </div>
            </div>

            {showNewPostModal && (
                <div className="modal-overlay" onClick={() => setShowNewPostModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowNewPostModal(false)}>×</button>
                        <div className="modal-title">Create New Post</div>
                        <div className="modal-form">
                            <input
                                type="text"
                                className="modal-input"
                                placeholder="Post Title"
                                value={newPostTitle}
                                onChange={(e) => setNewPostTitle(e.target.value)}
                            />
                            <textarea
                                className="modal-textarea"
                                placeholder="Write your post content here..."
                                value={newPostContent}
                                onChange={(e) => setNewPostContent(e.target.value)}
                            />
                            <div>
                                <input
                                    type="text"
                                    className="modal-input"
                                    placeholder="Add tags (press Enter)"
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    onKeyPress={handleAddTag}
                                />
                                <div className="modal-tags">
                                    {newPostTags.map(tag => (
                                        <span key={tag} className="modal-tag">
                                            {tag}
                                            <span 
                                                className="modal-tag-remove"
                                                onClick={() => handleRemoveTag(tag)}
                                            >
                                                ×
                                            </span>
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <button className="modal-submit" onClick={handlePostSubmit}>
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Community;
