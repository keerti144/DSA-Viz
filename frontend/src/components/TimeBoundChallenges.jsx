import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import {
    Container,
    Paper,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    Chip,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    CircularProgress,
} from '@mui/material';
import {
    Timer as TimerIcon,
    EmojiEvents as TrophyIcon,
    Code as CodeIcon,
} from '@mui/icons-material';

const TimeBoundChallenges = () => {
    const { currentUser } = useAuth();
    const [challenges, setChallenges] = useState([]);
    const [selectedChallenge, setSelectedChallenge] = useState(null);
    const [solution, setSolution] = useState('');
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        fetchChallenges();
    }, []);

    useEffect(() => {
        let timer;
        if (selectedChallenge) {
            const endTime = new Date(selectedChallenge.end_time).getTime();
            timer = setInterval(() => {
                const now = new Date().getTime();
                const distance = endTime - now;
                
                if (distance <= 0) {
                    clearInterval(timer);
                    setTimeLeft('Challenge Ended');
                    return;
                }

                const hours = Math.floor(distance / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [selectedChallenge]);

    const fetchChallenges = async () => {
        try {
            const response = await axios.get('/api/challenges');
            setChallenges(response.data);
        } catch (error) {
            console.error('Error fetching challenges:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitSolution = async () => {
        try {
            await axios.post(`/api/challenges/${selectedChallenge.challenge_id}/submit`, {
                user_id: currentUser.uid,
                solution: solution,
            });
            setSelectedChallenge(null);
            setSolution('');
            fetchChallenges();
        } catch (error) {
            console.error('Error submitting solution:', error);
        }
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty.toLowerCase()) {
            case 'easy':
                return 'success';
            case 'medium':
                return 'warning';
            case 'hard':
                return 'error';
            default:
                return 'default';
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Time-Bound Challenges
            </Typography>
            <Grid container spacing={3}>
                {challenges.map((challenge) => (
                    <Grid item xs={12} md={6} key={challenge.challenge_id}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                    <Typography variant="h6">{challenge.title}</Typography>
                                    <Chip
                                        label={challenge.difficulty}
                                        color={getDifficultyColor(challenge.difficulty)}
                                        size="small"
                                    />
                                </Box>
                                <Typography variant="body2" color="text.secondary" paragraph>
                                    {challenge.description}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <TimerIcon sx={{ mr: 0.5 }} />
                                        <Typography variant="body2">
                                            {new Date(challenge.end_time).toLocaleString()}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <TrophyIcon sx={{ mr: 0.5 }} />
                                        <Typography variant="body2">
                                            {challenge.xp_reward} XP
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant="contained"
                                    startIcon={<CodeIcon />}
                                    onClick={() => setSelectedChallenge(challenge)}
                                >
                                    Start Challenge
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Challenge Dialog */}
            <Dialog
                open={Boolean(selectedChallenge)}
                onClose={() => setSelectedChallenge(null)}
                maxWidth="md"
                fullWidth
            >
                {selectedChallenge && (
                    <>
                        <DialogTitle>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="h6">{selectedChallenge.title}</Typography>
                                <Chip
                                    icon={<TimerIcon />}
                                    label={timeLeft}
                                    color="primary"
                                />
                            </Box>
                        </DialogTitle>
                        <DialogContent>
                            <Typography variant="body1" paragraph>
                                {selectedChallenge.description}
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={10}
                                label="Your Solution"
                                value={solution}
                                onChange={(e) => setSolution(e.target.value)}
                                sx={{ mt: 2 }}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setSelectedChallenge(null)}>Cancel</Button>
                            <Button
                                variant="contained"
                                onClick={handleSubmitSolution}
                                disabled={!solution.trim()}
                            >
                                Submit Solution
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </Container>
    );
};

export default TimeBoundChallenges; 