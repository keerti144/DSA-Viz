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
            try {
                const [performanceRes, leaderboardRes] = await Promise.all([
                    axios.get(`/api/user/${currentUser.uid}/performance`),
                    axios.get('/api/leaderboard')
                ]);
                
                // Validate and set performance data
                setPerformance(performanceRes.data || {});
                
                // Validate and set leaderboard data
                const leaderboardData = leaderboardRes.data;
                if (Array.isArray(leaderboardData)) {
                    setLeaderboard(leaderboardData);
                } else if (leaderboardData && typeof leaderboardData === 'object') {
                    // If it's an object, try to convert it to an array
                    setLeaderboard(Object.values(leaderboardData));
                } else {
                    // If data is invalid, set empty array
                    setLeaderboard([]);
                    console.warn('Invalid leaderboard data format received');
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                setError('Failed to load dashboard data');
                setLeaderboard([]); // Set empty array on error
            } finally {
                setLoading(false);
            }
        };

        if (currentUser) {
            fetchData();
        }
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
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart
                                data={Object.entries(performance?.topic_completion || {}).map(([topic, completion]) => ({
                                    topic,
                                    completion
                                }))}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="topic" />
                                <YAxis />
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