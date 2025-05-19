import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, query, orderBy, onSnapshot, updateDoc, doc, arrayUnion, arrayRemove, serverTimestamp, where, deleteDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import Sidebar from "../sidebar/sidebar";
import Header from "../header/header.jsx";
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
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyDepth, setReplyDepth] = useState({});

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

    const handleReplySubmit = async (postId, parentReplyId = null) => {
        if (!user) {
            alert("Please sign in to reply");
            return;
        }
        const replyText = parentReplyId ? newReply[parentReplyId] : newReply[postId];
        if (!replyText?.trim()) {
            return;
        }

        try {
            console.log("Starting reply submission...");
            console.log("Post ID:", postId);
            console.log("Parent Reply ID:", parentReplyId);
            console.log("Reply Text:", replyText);

            const postRef = doc(db, "posts", postId);
            const newReplyData = {
                id: Date.now().toString(),
                text: replyText,
                userId: user.uid,
                userName: user.displayName || user.email?.split('@')[0] || "Anonymous",
                timestamp: new Date().toISOString(),
                parentId: parentReplyId,
                replies: []
            };

            console.log("New Reply Data:", newReplyData);

            if (parentReplyId) {
                // Find the parent reply and add this as a nested reply
                const post = posts.find(p => p.id === postId);
                if (!post) {
                    throw new Error("Post not found");
                }
                console.log("Found post:", post);

                const parentReply = findReplyById(post.replies, parentReplyId);
                if (!parentReply) {
                    throw new Error("Parent reply not found");
                }
                console.log("Found parent reply:", parentReply);

                // Create a new array with the updated replies
                const updatedReplies = [...post.replies];
                const updateNestedReplies = (replies) => {
                    return replies.map(reply => {
                        if (reply.id === parentReplyId) {
                            return {
                                ...reply,
                                replies: [...(reply.replies || []), newReplyData]
                            };
                        }
                        if (reply.replies) {
                            return {
                                ...reply,
                                replies: updateNestedReplies(reply.replies)
                            };
                        }
                        return reply;
                    });
                };

                const finalReplies = updateNestedReplies(updatedReplies);
                console.log("Final replies structure:", finalReplies);

                await updateDoc(postRef, { replies: finalReplies });
            } else {
                // Add as a top-level reply
                console.log("Adding as top-level reply");
                await updateDoc(postRef, {
                    replies: arrayUnion(newReplyData)
                });
            }

            // Clear the reply input
            setNewReply(prev => {
                const updated = { ...prev };
                if (parentReplyId) {
                    delete updated[parentReplyId];
                } else {
                    delete updated[postId];
                }
                return updated;
            });
            setReplyingTo(null);
            console.log("Reply submitted successfully");
        } catch (error) {
            console.error("Detailed error in handleReplySubmit:", error);
            console.error("Error stack:", error.stack);
            alert(`Error posting reply: ${error.message}`);
        }
    };

    const findReplyById = (replies, replyId) => {
        for (const reply of replies) {
            if (reply.id === replyId) {
                return reply;
            }
            if (reply.replies) {
                const found = findReplyById(reply.replies, replyId);
                if (found) return found;
            }
        }
        return null;
    };

    const renderReplies = (replies, postId, depth = 0) => {
        if (!replies || replies.length === 0) return null;

        return (
            <div className="replies-container" style={{ marginLeft: `${depth * 20}px` }}>
                {replies.map((reply) => (
                    <div key={reply.id} className="reply-item">
                        <div className="reply-user-info">
                            <div className="reply-avatar">{reply.userName?.[0]?.toUpperCase() || '?'}</div>
                            <span className="reply-username">{reply.userName}</span>
                            <span className="reply-time">{formatTimestamp(reply.timestamp)}</span>
                        </div>
                        <div className="reply-content">{reply.text}</div>
                        <div className="reply-actions">
                            <button 
                                className="reply-to-reply-btn"
                                onClick={() => {
                                    setReplyingTo(reply.id);
                                    setNewReply(prev => ({ ...prev, [reply.id]: "" }));
                                }}
                            >
                                Reply
                            </button>
                        </div>
                        {replyingTo === reply.id && (
                            <div className="nested-reply-input">
                                <input
                                    type="text"
                                    className="reply-input"
                                    placeholder="Write a reply..."
                                    value={newReply[reply.id] || ""}
                                    onChange={(e) => setNewReply(prev => ({ ...prev, [reply.id]: e.target.value }))}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            handleReplySubmit(postId, reply.id);
                                        }
                                    }}
                                />
                                <button 
                                    className="reply-submit-btn"
                                    onClick={() => handleReplySubmit(postId, reply.id)}
                                >
                                    Reply
                                </button>
                            </div>
                        )}
                        {reply.replies && renderReplies(reply.replies, postId, depth + 1)}
                    </div>
                ))}
            </div>
        );
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
        
        let date;
        if (typeof timestamp === 'string') {
            // Handle ISO string dates
            date = new Date(timestamp);
        } else if (timestamp.toDate) {
            // Handle Firestore timestamps
            date = timestamp.toDate();
        } else {
            return "";
        }

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
        <>
            <Header />
            <div className="app-container">
                <Sidebar />
                <div className="main-content">
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
                                {filteredPosts.map((post) => (
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
                                                <span 
                                                    className="action-icon" 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleReplies(post.id);
                                                    }}
                                                >
                                                    <span role="img" aria-label="comments">💬</span> {post.replies?.length || 0}
                                                </span>
                                            </div>
                                        </div>
                                        {showReplies[post.id] && (
                                            <div className="replies-section">
                                                {renderReplies(post.replies || [], post.id)}
                                                <div className="reply-input-container">
                                                    <input
                                                        type="text"
                                                        className="reply-input"
                                                        placeholder="Write a reply..."
                                                        value={newReply[post.id] || ""}
                                                        onChange={(e) => setNewReply(prev => ({ ...prev, [post.id]: e.target.value }))}
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
                                ))}
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
        </>
    );
};

export default Community;
