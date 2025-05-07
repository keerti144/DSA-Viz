import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Sidebar from "../sidebar/sidebar.jsx";
import Header from "../header/header.jsx";
import femaleUser from "../assets/female-user.png";
import "./dashboardopen.css";

export const DashboardOpen = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [performanceData, setPerformanceData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        
        if (userDoc.exists()) {
          const data = userDoc.data();
          setPerformanceData({
            performance: data.performance || {},
            overall_stats: data.overall_stats || {},
            attempt_history: data.attempt_history || []
          });
        }
      } catch (err) {
        setError('Failed to load performance data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchPerformanceData();
    }
  }, [currentUser]);

  // Calculate best and worst topics
  const getTopicAnalysis = () => {
    if (!performanceData?.performance) return { best: "N/A", worst: "N/A" };
    
    const topics = Object.entries(performanceData.performance);
    if (topics.length === 0) return { best: "N/A", worst: "N/A" };

    const sortedTopics = topics.sort((a, b) => b[1].accuracy - a[1].accuracy);
    return {
      best: sortedTopics[0][0],
      worst: sortedTopics[sortedTopics.length - 1][0]
    };
  };

  // Calculate overall completion
  const getOverallCompletion = () => {
    if (!performanceData?.overall_stats) return 0;
    const { totalQuestions } = performanceData.overall_stats;
    // Assuming there are 100 total questions in the system
    return Math.min(Math.round((totalQuestions / 100) * 100), 100);
  };

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

  const topicAnalysis = getTopicAnalysis();
  const overallCompletion = getOverallCompletion();

  return (
    <div className="dashboard-open">
      <Header />
      <Sidebar />
      
      {/* Header
      <div className="header">
        <div className="logo">AlgoRize</div>
        <div className="user-profile" onClick={() => navigate("/settings")}> 
          <img className="user-icon" src={femaleUser} alt="User" />
        </div>
      </div> */}

      {/* Main Content */}
      <div className="dashboard-content">
        <h1 className="dashboard-title">Your Progress Dashboard</h1>
        
        {/* Streak & Leaderboard */}
        <div className="progress-section">
          <div className="streak-box">
            <h2>Streak</h2>
            <p>Days Active: <span>{performanceData?.overall_stats?.currentStreak || 0}</span></p>
            <p>Points Earned: <span>{performanceData?.overall_stats?.totalPoints || 0}</span></p>
          </div>
          <div className="leaderboard-box">
            <h2>Performance Stats</h2>
            <p>Questions Attempted: <span>{performanceData?.overall_stats?.totalQuestions || 0}</span></p>
            <p>Accuracy: <span>{performanceData?.overall_stats?.totalQuestions > 0 
              ? Math.round((performanceData.overall_stats.correctAnswers / performanceData.overall_stats.totalQuestions) * 100) 
              : 0}%</span></p>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="progress-overview">
          <h2>Your Performance</h2>
          <div className="progress-items">
            <div className="progress-item">
              <p>Best at:</p>
              <span>{topicAnalysis.best}</span>
            </div>
            <div className="progress-item">
              <p>Needs Improvement:</p>
              <span>{topicAnalysis.worst}</span>
            </div>
            <div className="progress-item">
              <p>Overall Completion:</p>
              <span>{overallCompletion}%</span>
            </div>
          </div>
        </div>

        {/* Recent Attempts */}
        <div className="saved-content">
          <h2>📝 Recent Attempts</h2>
          <div className="saved-items">
            {performanceData?.attempt_history?.slice(-3).reverse().map((attempt, index) => (
              <div key={index} className="saved-item">
                <div>{attempt.topic}</div>
                <div style={{ color: attempt.is_correct ? '#4CAF50' : '#f44336' }}>
                  {attempt.is_correct ? '✓' : '✗'} {attempt.difficulty}
                </div>
                <div>Points: {attempt.points_awarded}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOpen;