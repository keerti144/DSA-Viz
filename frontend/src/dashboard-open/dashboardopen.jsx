import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getFirestore, doc, getDoc, collection, getDocs } from "firebase/firestore";
import Sidebar from "../sidebar/sidebar.jsx";
import Header from "../header/header.jsx";
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
import "./dashboardopen.css";

export const DashboardOpen = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [performanceData, setPerformanceData] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        
        if (userDoc.exists()) {
          const data = userDoc.data();
          // Format the performance data
          const formattedData = {
            performance: data.performance || {},
            overall_stats: {
              totalPoints: data.overall_stats?.totalPoints || 0,
              currentStreak: data.overall_stats?.currentStreak || 0,
              longestStreak: data.overall_stats?.longestStreak || 0,
              level: Math.floor((data.overall_stats?.totalPoints || 0) / 100) + 1
            },
            attempt_history: data.attempt_history || []
          };
          setPerformanceData(formattedData);
        }

        // Fetch leaderboard data
        const usersRef = collection(db, "users");
        const usersSnapshot = await getDocs(usersRef);
        const leaderboardData = [];
        
        usersSnapshot.forEach((doc) => {
          const userData = doc.data();
          if (userData.overall_stats) {
            leaderboardData.push({
              user_id: doc.id,
              username: userData.username || "Anonymous",
              level: Math.floor((userData.overall_stats.totalPoints || 0) / 100) + 1,
              xp_points: userData.overall_stats.totalPoints || 0
            });
          }
        });
        
        // Sort by XP points
        leaderboardData.sort((a, b) => b.xp_points - a.xp_points);
        setLeaderboard(leaderboardData);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error(err);
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
      <div className="dashboard-open">
        <Header />
        <Sidebar />
        <div className="dashboard-content">
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-open">
        <Header />
        <Sidebar />
        <div className="dashboard-content">
          <div className="error">{error}</div>
        </div>
      </div>
    );
  }

  const chartData = Object.entries(performanceData?.performance || {}).map(([topic, stats]) => ({
    topic,
    completion: stats.accuracy || 0
  }));

  return (
    <div className="dashboard-open">
      <Header />
      <Sidebar />
      <div className="dashboard-content">
        <div className="overlap">
          <h1 className="text-wrapper">Your Progress Dashboard</h1>
        </div>
        
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* User Stats */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', bgcolor: 'rgba(255, 255, 255, 0.1)' }}>
                <Typography variant="h6" gutterBottom color="white">
                  Your Stats
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Current Level"
                      secondary={`Level ${performanceData?.overall_stats?.level || 1}`}
                      primaryTypographyProps={{ color: 'white' }}
                      secondaryTypographyProps={{ color: '#b388ff' }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="XP Points"
                      secondary={performanceData?.overall_stats?.totalPoints || 0}
                      primaryTypographyProps={{ color: 'white' }}
                      secondaryTypographyProps={{ color: '#b388ff' }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Current Streak"
                      secondary={`${performanceData?.overall_stats?.currentStreak || 0} days`}
                      primaryTypographyProps={{ color: 'white' }}
                      secondaryTypographyProps={{ color: '#b388ff' }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Longest Streak"
                      secondary={`${performanceData?.overall_stats?.longestStreak || 0} days`}
                      primaryTypographyProps={{ color: 'white' }}
                      secondaryTypographyProps={{ color: '#b388ff' }}
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>

            {/* Topic Completion Chart */}
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', bgcolor: 'rgba(255, 255, 255, 0.1)' }}>
                <Typography variant="h6" gutterBottom color="white">
                  Topic Completion
                </Typography>
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={chartData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="topic" stroke="#fff" />
                      <YAxis domain={[0, 100]} stroke="#fff" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1e1230',
                          border: '1px solid #6a3f92',
                          color: '#fff'
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="completion"
                        stroke="#b388ff"
                        name="Completion %"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <Typography variant="body1" align="center" sx={{ mt: 2 }} color="white">
                    No topic completion data available
                  </Typography>
                )}
              </Paper>
            </Grid>

            {/* Leaderboard */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, bgcolor: 'rgba(255, 255, 255, 0.1)' }}>
                <Typography variant="h6" gutterBottom color="white">
                  Leaderboard
                </Typography>
                <List>
                  {leaderboard.length > 0 ? (
                    leaderboard.map((entry, index) => (
                      <React.Fragment key={entry.user_id || index}>
                        <ListItem>
                          <ListItemText
                            primary={`#${index + 1} ${entry.username}`}
                            secondary={`Level ${entry.level} - ${entry.xp_points} XP`}
                            primaryTypographyProps={{ color: 'white' }}
                            secondaryTypographyProps={{ color: '#b388ff' }}
                          />
                        </ListItem>
                        {index < leaderboard.length - 1 && <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />}
                      </React.Fragment>
                    ))
                  ) : (
                    <ListItem>
                      <ListItemText 
                        primary="No leaderboard data available"
                        primaryTypographyProps={{ color: 'white' }}
                      />
                    </ListItem>
                  )}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default DashboardOpen;