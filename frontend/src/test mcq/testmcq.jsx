import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs, limit } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import './testmcq.css';
import Sidebar from "../sidebar/sidebar.jsx";
import Header from "../header/header.jsx";

export const TestMCQ = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get test parameters from location state
  const { topic, difficulty, numQuestions } = location.state || {
    topic: 'Arrays',
    difficulty: 'medium',
    numQuestions: 5
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const db = getFirestore();
        const questionsRef = collection(db, 'questions');
        const q = query(
          questionsRef,
          where('topic', '==', topic),
          where('difficulty', '==', difficulty),
          limit(numQuestions)
        );

        const querySnapshot = await getDocs(q);
        const fetchedQuestions = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        if (fetchedQuestions.length === 0) {
          setError('No questions found for the selected criteria');
        } else {
          setQuestions(fetchedQuestions);
        }
      } catch (err) {
        setError('Failed to fetch questions');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [topic, difficulty, numQuestions]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const submitAnswer = async (isCorrect) => {
    try {
      const response = await fetch('http://localhost:5000/submit-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: currentUser.uid,
          question_id: questions[currentQuestion].id,
          selected_option: selectedAnswer,
          topic: topic,
          difficulty: difficulty
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit answer');
      }

      const data = await response.json();
      console.log('Answer submitted:', data);
    } catch (err) {
      console.error('Error submitting answer:', err);
    }
  };

  const handleNextQuestion = async () => {
    const isCorrect = selectedAnswer === questions[currentQuestion].expected_answer;
    
    if (isCorrect) {
      setScore(score + 1);
    }

    // Submit the answer to update performance
    await submitAnswer(isCorrect);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer('');
    } else {
      setFinished(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setScore(0);
    setFinished(false);
    setSelectedAnswer('');
  };

  if (loading) {
    return (
      <div className="testmcq-container">
        <Header />
        <Sidebar />
        <div className="loading">Loading questions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="testmcq-container">
        <Header />
        <Sidebar />
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="testmcq-container">
      <Header />
      <Sidebar />
      <div className="testmcq-content">
        {!finished ? (
          <div className="question-container">
            <div className="progress-bar">
              Question {currentQuestion + 1} of {questions.length}
            </div>
            <h2>{questions[currentQuestion]?.question}</h2>
            <div className="options-container">
              {questions[currentQuestion]?.options.map((option, index) => (
                <button
                  key={index}
                  className={`option-button ${selectedAnswer === option ? 'selected' : ''}`}
                  onClick={() => handleAnswerSelect(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <button 
              className="next-button"
              onClick={handleNextQuestion}
              disabled={!selectedAnswer}
            >
              {currentQuestion === questions.length - 1 ? 'Finish' : 'Next Question'}
            </button>
          </div>
        ) : (
          <div className="result-container">
            <h2>Test Complete!</h2>
            <h3>Your Score: {score} / {questions.length}</h3>
            <div className="result-buttons">
              <button className="retry-button" onClick={handleRetry}>
                Retry Test
              </button>
              <button 
                className="dashboard-button"
                onClick={() => navigate('/dashboard')}
              >
                View Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestMCQ;
