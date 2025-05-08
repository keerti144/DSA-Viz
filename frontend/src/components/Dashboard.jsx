import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import {
    Box,
    Container,
    Grid,
    Paper,
    Typography,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@mui/material';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const Dashboard = () => {
    const { currentUser } = useAuth();
    const [performance, setPerformance] = useState(null);
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!currentUser) {
                setError('Please log in to view dashboard');
                setLoading(false);
                return;
            }

            try {
                console.log('Fetching dashboard data for user:', currentUser.uid);
                const [performanceRes, leaderboardRes] = await Promise.all([
                    axios.get(`http://localhost:5000/api/user/${currentUser.uid}/performance`),
                    axios.get('http://localhost:5000/api/leaderboard')
                ]);
                
                console.log('Performance data:', performanceRes.data);
                console.log('Leaderboard data:', leaderboardRes.data);

                // Validate and set performance data
                const performanceData = performanceRes.data;
                if (performanceData && performanceData.overall_stats) {
                    const formattedPerformance = {
                        level: Math.floor(performanceData.overall_stats.totalPoints / 100) + 1,
                        xp_points: performanceData.overall_stats.totalPoints || 0,
                        current_streak: performanceData.overall_stats.currentStreak || 0,
                        longest_streak: performanceData.overall_stats.longestStreak || 0,
                        topic_completion: {}
                    };

                    // Format topic completion data
                    if (performanceData.performance) {
                        Object.entries(performanceData.performance).forEach(([topic, stats]) => {
                            formattedPerformance.topic_completion[topic] = stats.accuracy || 0;
                        });
                    }

                    console.log('Formatted performance:', formattedPerformance);
                    setPerformance(formattedPerformance);
                } else {
                    console.warn('Invalid performance data format:', performanceData);
                    setPerformance({
                        level: 1,
                        xp_points: 0,
                        current_streak: 0,
                        longest_streak: 0,
                        topic_completion: {}
                    });
                }
                
                // Validate and set leaderboard data
                const leaderboardData = leaderboardRes.data;
                if (Array.isArray(leaderboardData)) {
                    setLeaderboard(leaderboardData);
                } else {
                    console.warn('Invalid leaderboard data format:', leaderboardData);
                    setLeaderboard([]);
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                setError('Failed to load dashboard data');
                setLeaderboard([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentUser]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    const chartData = Object.entries(performance?.topic_completion || {}).map(([topic, completion]) => ({
        topic,
        completion
    }));

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* User Stats */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" gutterBottom>
                            Your Stats
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary="Current Level"
                                    secondary={`Level ${performance?.level || 1}`}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="XP Points"
                                    secondary={performance?.xp_points || 0}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Current Streak"
                                    secondary={`${performance?.current_streak || 0} days`}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Longest Streak"
                                    secondary={`${performance?.longest_streak || 0} days`}
                                />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>

                {/* Topic Completion */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" gutterBottom>
                            Topic Completion
                        </Typography>
                        {chartData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart
                                    data={chartData}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="topic" />
                                    <YAxis domain={[0, 100]} />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="completion"
                                        stroke="#8884d8"
                                        name="Completion %"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <Typography variant="body1" align="center" sx={{ mt: 2 }}>
                                No topic completion data available
                            </Typography>
                        )}
                    </Paper>
                </Grid>

                {/* Leaderboard */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Leaderboard
                        </Typography>
                        <List>
                            {leaderboard.length > 0 ? (
                                leaderboard.map((entry, index) => (
                                    <React.Fragment key={entry.user_id || index}>
                                        <ListItem>
                                            <ListItemText
                                                primary={`#${index + 1} ${entry.username || 'Anonymous'}`}
                                                secondary={`Level ${entry.level || 1} - ${entry.xp_points || 0} XP`}
                                            />
                                        </ListItem>
                                        {index < leaderboard.length - 1 && <Divider />}
                                    </React.Fragment>
                                ))
                            ) : (
                                <ListItem>
                                    <ListItemText primary="No leaderboard data available" />
                                </ListItem>
                            )}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard; 