import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../contexts/AuthContext';
import './testnext.css';
import Sidebar from "../sidebar/sidebar.jsx";
import Header from "../header/header.jsx";

const TestQuestions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const { difficulty, questionCount, testMode, topic } = location.state || {};

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [testComplete, setTestComplete] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [originalCode, setOriginalCode] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    console.log('Current user:', currentUser);
    if (!currentUser) {
      console.error('No user found in AuthContext');
      setError('Please log in to take the test');
      setLoading(false);
      return;
    }

    const fetchQuestions = async () => {
      try {
        console.log('Starting to fetch questions with params:', { 
          difficulty, 
          testMode, 
          questionCount, 
          topic 
        });
        
        const questionsRef = collection(db, 'questions');
        let q;

        // Map testMode to the correct type in Firestore
        let questionType = testMode;
        if (testMode === 'coding') {
          questionType = 'debugging';
        }

        if (topic) {
          console.log('Filtering questions by topic:', topic);
          // If topic is specified, filter by topic
          q = query(
            questionsRef,
            where('difficulty', '==', difficulty),
            where('type', '==', questionType),
            where('topic', '==', topic.toLowerCase()),
            limit(questionCount)
          );
        } else {
          console.log('No topic specified, fetching all topics');
          // If no topic specified, get questions for all topics
          q = query(
            questionsRef,
            where('difficulty', '==', difficulty),
            where('type', '==', questionType),
            limit(questionCount)
          );
        }

        console.log('Executing Firestore query with filters:', {
          difficulty,
          type: questionType,
          topic: topic ? topic.toLowerCase() : 'all',
          limit: questionCount
        });

        const querySnapshot = await getDocs(q);
        console.log('Query completed, documents found:', querySnapshot.size);

        const fetchedQuestions = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        console.log('Fetched questions:', fetchedQuestions);

        if (fetchedQuestions.length === 0) {
          console.error('No questions found for criteria:', { 
            difficulty, 
            testMode: questionType, 
            questionCount, 
            topic 
          });
          setError(`No questions found for ${topic || 'selected topic'} with ${difficulty} difficulty`);
          setLoading(false);
          return;
        }

        // Shuffle questions
        const shuffled = fetchedQuestions.sort(() => Math.random() - 0.5);
        setQuestions(shuffled);
        setLoading(false);
      } catch (err) {
        console.error('Error in fetchQuestions:', err);
        setError('Error fetching questions: ' + err.message);
        setLoading(false);
      }
    };

    if (!difficulty || !questionCount || !testMode) {
      console.error('Missing required parameters:', { difficulty, questionCount, testMode });
      setError('Missing test parameters');
      setLoading(false);
      navigate('/testnext');
      return;
    }

    fetchQuestions();
  }, [difficulty, questionCount, testMode, topic, navigate, currentUser]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = async () => {
    const question = questions[currentQuestion];
    
    if (!currentUser) {
      console.error('No user found in AuthContext');
      // Still proceed with the test even if performance update fails
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer('');
        setShowAnswer(false);
      } else {
        setTestComplete(true);
      }
      return;
    }
    
    try {
      // Call the submit-answer endpoint
      const response = await fetch('http://localhost:5000/submit-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: currentUser.uid,
          question_id: question.id,
          selected_option: selectedAnswer,
          topic: question.topic,
          difficulty: question.difficulty
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error('Failed to update performance:', data);
        setFeedback({ type: 'error', message: data.error || 'Failed to submit answer' });
        return;
      }

      // Show the correct answer
      setShowAnswer(true);

      // Update local score based on the response
      if (data.correct) {
        setScore(prev => prev + data.awardedPoints);
        setFeedback({ 
          type: 'success', 
          message: question.type === 'debugging' 
            ? 'Great job! Your solution is correct.' 
            : question.type === 'interview'
            ? 'Good answer! You covered the key points.'
            : 'Correct answer!' 
        });
      } else {
        setFeedback({ 
          type: 'error', 
          message: question.type === 'debugging'
            ? 'Your solution has some issues. Check the correct answer below.'
            : question.type === 'interview'
            ? 'Your answer could be improved. Check the key points below.'
            : 'Incorrect answer. Check the correct answer below.'
        });
      }
    } catch (error) {
      console.error('Error updating performance:', error);
      setFeedback({ type: 'error', message: 'Failed to submit answer. Please try again.' });
    }
  };

  const handleProceedToNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer('');
      setShowAnswer(false);
      setFeedback(null);
    } else {
      setTestComplete(true);
    }
  };

  const handleRetry = () => {
    navigate('/testnext', { replace: true });
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
            <p>Correct Answers: {Math.round(score / (questions[0]?.points || 1))}</p>
            <p>Accuracy: {Math.round((score / (questions.length * (questions[0]?.points || 1))) * 100)}%</p>
          </div>
          <button className="start-test-btn" onClick={handleRetry}>
            Try Another Test
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  if (!question) {
    return (
      <div className="testnext-container">
        <div className="testnext-content">
          <div className="error">No question data available</div>
          <button className="start-test-btn" onClick={handleRetry}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const renderQuestionContent = () => {
    switch (question.type) {
      case 'mcq':
        return (
          <>
            <h2 className="question-text">{question.question}</h2>
            <div className="options-container">
              {question.options?.map((option, index) => (
                <button
                  key={index}
                  className={`option-btn ${selectedAnswer === option ? 'selected' : ''}`}
                  onClick={() => handleAnswerSelect(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            {showAnswer && (
              <div className="correct-answer">
                <h3>Correct Answer:</h3>
                <p>{question.answer}</p>
              </div>
            )}
          </>
        );
      case 'debugging':
        return (
          <>
            <h2 className="question-text">{question.question}</h2>
            <div className="debug-container">
              <div className="debug-section">
                <h3>Code with Bug:</h3>
                <div className="code-container">
                  <pre className="code-block">{question.code}</pre>
                </div>
              </div>
              
              <div className="debug-section">
                <h3>Your Solution:</h3>
                <div className="debug-instructions">
                  <p>Explain what's wrong with the code and how you would fix it:</p>
                  <p className="hint">💡 Tip: Focus on explaining the bug, its impact, and your approach to fixing it</p>
                </div>
                <textarea
                  className="answer-textarea"
                  value={selectedAnswer}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  placeholder="Explain the bug and your solution..."
                  rows={6}
                />
              </div>
              {showAnswer && (
                <div className="debug-section correct-answer">
                  <h3>Solution Explanation:</h3>
                  <div className="answer-explanation">
                    <p>{question.explanation}</p>
                  </div>
                </div>
              )}
            </div>
            {feedback && (
              <div className={`feedback ${feedback.type}`}>
                {feedback.message}
              </div>
            )}
          </>
        );
      case 'interview':
        return (
          <>
            <h2 className="question-text">{question.question}</h2>
            <textarea
              className="answer-textarea"
              value={selectedAnswer}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              placeholder="Type your answer here..."
              rows={6}
            />
            {showAnswer && (
              <div className="correct-answer">
                <h3>Sample Answer:</h3>
                <p>{question.expected_answer}</p>
                {question.explanation && (
                  <div className="answer-explanation">
                    <h4>Key Points:</h4>
                    <p>{question.explanation}</p>
                  </div>
                )}
              </div>
            )}
            {feedback && (
              <div className={`feedback ${feedback.type}`}>
                {feedback.message}
              </div>
            )}
          </>
        );
      default:
        return <div className="error">Unsupported question type</div>;
    }
  };

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
          {renderQuestionContent()}
          {!showAnswer ? (
            <button 
              className="start-test-btn"
              onClick={handleNextQuestion}
              disabled={!selectedAnswer}
            >
              Submit Answer
            </button>
          ) : (
            <button 
              className="start-test-btn"
              onClick={handleProceedToNext}
            >
              {currentQuestion === questions.length - 1 ? 'Finish Test' : 'Next Question'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestQuestions; 