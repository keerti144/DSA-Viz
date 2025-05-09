import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Divider,
    Box,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import {
    ThumbUp as ThumbUpIcon,
    ThumbDown as ThumbDownIcon,
    Comment as CommentIcon,
    Send as SendIcon,
} from '@mui/icons-material';

const CommunityForum = () => {
    const { currentUser } = useAuth();
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: '', content: '', tags: [] });
    const [newTag, setNewTag] = useState('');
    const [selectedPost, setSelectedPost] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('/api/forum/posts');
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreatePost = async () => {
        try {
            await axios.post('/api/forum/posts', {
                ...newPost,
                user_id: currentUser.uid,
                username: currentUser.displayName,
            });
            setNewPost({ title: '', content: '', tags: [] });
            fetchPosts();
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const handleAddTag = () => {
        if (newTag && !newPost.tags.includes(newTag)) {
            setNewPost({ ...newPost, tags: [...newPost.tags, newTag] });
            setNewTag('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setNewPost({
            ...newPost,
            tags: newPost.tags.filter((tag) => tag !== tagToRemove),
        });
    };

    const handleVote = async (postId, voteType) => {
        try {
            await axios.post(`/api/forum/posts/${postId}/vote`, {
                user_id: currentUser.uid,
                vote_type: voteType,
            });
            fetchPosts();
        } catch (error) {
            console.error('Error voting:', error);
        }
    };

    const handleAddComment = async (postId) => {
        try {
            await axios.post(`/api/forum/posts/${postId}/comments`, {
                user_id: currentUser.uid,
                username: currentUser.displayName,
                content: newComment,
            });
            setNewComment('');
            fetchPosts();
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {/* Create New Post */}
            <Paper sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Create New Post
                </Typography>
                <TextField
                    fullWidth
                    label="Title"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Content"
                    multiline
                    rows={4}
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    margin="normal"
                />
                <Box sx={{ mt: 2, mb: 2 }}>
                    <TextField
                        label="Add Tag"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        size="small"
                    />
                    <Button onClick={handleAddTag} sx={{ ml: 1 }}>
                        Add Tag
                    </Button>
                </Box>
                <Box sx={{ mb: 2 }}>
                    {newPost.tags.map((tag) => (
                        <Chip
                            key={tag}
                            label={tag}
                            onDelete={() => handleRemoveTag(tag)}
                            sx={{ mr: 1, mb: 1 }}
                        />
                    ))}
                </Box>
                <Button
                    variant="contained"
                    onClick={handleCreatePost}
                    disabled={!newPost.title || !newPost.content}
                >
                    Create Post
                </Button>
            </Paper>

            {/* Posts List */}
            <List>
                {posts.map((post) => (
                    <Paper key={post.post_id} sx={{ mb: 2 }}>
                        <ListItem alignItems="flex-start">
                            <ListItemText
                                primary={
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography variant="h6" component="span">
                                            {post.title}
                                        </Typography>
                                        <Box sx={{ ml: 2 }}>
                                            {post.tags.map((tag) => (
                                                <Chip
                                                    key={tag}
                                                    label={tag}
                                                    size="small"
                                                    sx={{ mr: 0.5 }}
                                                />
                                            ))}
                                        </Box>
                                    </Box>
                                }
                                secondary={
                                    <>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            Posted by {post.username}
                                        </Typography>
                                        <Typography variant="body2">{post.content}</Typography>
                                    </>
                                }
                            />
                            <ListItemSecondaryAction>
                                <IconButton
                                    onClick={() => handleVote(post.post_id, 'up')}
                                    color={post.user_vote === 'up' ? 'primary' : 'default'}
                                >
                                    <ThumbUpIcon />
                                </IconButton>
                                <Typography component="span" sx={{ mx: 1 }}>
                                    {post.upvotes - post.downvotes}
                                </Typography>
                                <IconButton
                                    onClick={() => handleVote(post.post_id, 'down')}
                                    color={post.user_vote === 'down' ? 'error' : 'default'}
                                >
                                    <ThumbDownIcon />
                                </IconButton>
                                <IconButton onClick={() => setSelectedPost(post)}>
                                    <CommentIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </Paper>
                ))}
            </List>

            {/* Comments Dialog */}
            <Dialog
                open={Boolean(selectedPost)}
                onClose={() => setSelectedPost(null)}
                maxWidth="md"
                fullWidth
            >
                {selectedPost && (
                    <>
                        <DialogTitle>{selectedPost.title}</DialogTitle>
                        <DialogContent>
                            <List>
                                {selectedPost.comments.map((comment) => (
                                    <ListItem key={comment.comment_id}>
                                        <ListItemText
                                            primary={comment.username}
                                            secondary={comment.content}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton
                                                onClick={() =>
                                                    handleVote(comment.comment_id, 'up')
                                                }
                                                color={
                                                    comment.user_vote === 'up'
                                                        ? 'primary'
                                                        : 'default'
                                                }
                                            >
                                                <ThumbUpIcon />
                                            </IconButton>
                                            <Typography component="span" sx={{ mx: 1 }}>
                                                {comment.upvotes - comment.downvotes}
                                            </Typography>
                                            <IconButton
                                                onClick={() =>
                                                    handleVote(comment.comment_id, 'down')
                                                }
                                                color={
                                                    comment.user_vote === 'down'
                                                        ? 'error'
                                                        : 'default'
                                                }
                                            >
                                                <ThumbDownIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List>
                            <Box sx={{ mt: 2 }}>
                                <TextField
                                    fullWidth
                                    label="Add Comment"
                                    multiline
                                    rows={2}
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                />
                                <Button
                                    variant="contained"
                                    endIcon={<SendIcon />}
                                    onClick={() => handleAddComment(selectedPost.post_id)}
                                    sx={{ mt: 1 }}
                                >
                                    Post Comment
                                </Button>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setSelectedPost(null)}>Close</Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </Container>
    );
};

export default CommunityForum; 