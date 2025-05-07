import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../../firebase';
import './testnext.css';
import Sidebar from "../sidebar/sidebar.jsx";
import Header from "../header/header.jsx";

const TestQuestions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { difficulty, questionCount, testMode } = location.state || {};

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [testComplete, setTestComplete] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionsRef = collection(db, 'questions');
        const q = query(
          questionsRef,
          where('difficulty', '==', difficulty),
          where('type', '==', testMode),
          limit(questionCount)
        );

        const querySnapshot = await getDocs(q);
        const fetchedQuestions = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        console.log('Fetched questions:', fetchedQuestions);
        console.log('Query parameters:', { difficulty, testMode, questionCount });

        if (fetchedQuestions.length === 0) {
          console.error('No questions found for criteria:', { difficulty, testMode, questionCount });
          setError('No questions found for the selected criteria');
          return;
        }

        // Shuffle questions
        const shuffled = fetchedQuestions.sort(() => Math.random() - 0.5);
        setQuestions(shuffled);
      } catch (err) {
        setError('Error fetching questions: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    if (!difficulty || !questionCount || !testMode) {
      navigate('/test-next');
      return;
    }

    fetchQuestions();
  }, [difficulty, questionCount, testMode, navigate]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = async () => {
    const question = questions[currentQuestion];
    
    try {
      // Call the submit-answer endpoint
      const response = await fetch('http://localhost:5000/submit-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: localStorage.getItem('uid'), // Assuming you store user ID in localStorage
          question_id: question.id,
          selected_option: selectedAnswer,
        }),
      });

      if (!response.ok) {
        console.error('Failed to update performance:', await response.text());
      }

      // Update local score
      if (selectedAnswer === question.answer) {
        setScore(prev => prev + question.points);
      }

      // Move to next question or complete test
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer('');
      } else {
        setTestComplete(true);
      }
    } catch (error) {
      console.error('Error updating performance:', error);
      // Still proceed with the test even if performance update fails
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer('');
      } else {
        setTestComplete(true);
      }
    }
  };

  const handleRetry = () => {
    navigate('/testnext');
  };

  if (loading) {
    return (
      <div className="testnext-container">
        <div className="testnext-content">
          <div className="loading">Loading questions...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="testnext-container">
        <div className="testnext-content">
          <div className="error">{error}</div>
          <button className="start-test-btn" onClick={handleRetry}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (testComplete) {
    return (
      <div className="testnext-container">
        <div className="testnext-content">
          <h1 className="testnext-header">Test Complete!</h1>
          <div className="results">
            <h2>Your Score: {score}</h2>
            <p>Total Questions: {questions.length}</p>
            <p>Correct Answers: {Math.round(score / questions[0].points)}</p>
            <p>Accuracy: {Math.round((score / (questions.length * questions[0].points)) * 100)}%</p>
          </div>
          <button className="start-test-btn" onClick={handleRetry}>
            Try Another Test
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="testnext-container">
      <Header />
      <Sidebar />
      
      <div className="testnext-content">
        <h2 className="testnext-header">{question.topic} Test</h2>
        <div className="test-info">
          <span className="difficulty-badge">{difficulty}</span>
          <span className="mode-badge">{testMode}</span>
        </div>

        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
          <span className="progress-text">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>

        <div className="question-container">
          <h2 className="question-text">{question.question}</h2>
          
          <div className="options-container">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${selectedAnswer === option ? 'selected' : ''}`}
                onClick={() => handleAnswerSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>

          <button 
            className="start-test-btn"
            onClick={handleNextQuestion}
            disabled={!selectedAnswer}
          >
            {currentQuestion === questions.length - 1 ? 'Finish Test' : 'Next Question'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestQuestions; 