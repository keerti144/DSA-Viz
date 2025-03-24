import React, { useState } from 'react';
import './testmcq.css';

export const TestMCQ = () => {
  const questions = [
    {
      question: 'question 1',
      options: ['a', 'b', 'c', 'd'],
      correctAnswer: 'b',
    },
    {
      question: 'Which language is used for web development?',
      options: ['Java', 'Python', 'JavaScript', 'C#'],
      correctAnswer: 'JavaScript',
    },
    {
      question: 'What is the result of 5 + 3?',
      options: ['5', '8', '15', '10'],
      correctAnswer: '8',
    },
    // Add more questions as needed
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

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

  return (
    <div className="testmcq-container">
      {!finished ? (
        <div className="question-container">
          <h2>{questions[currentQuestion].question}</h2>
          <div className="options-container">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${selectedAnswer === option ? 'selected' : ''}`}
                onClick={() => handleAnswerSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <button className="next-button" onClick={handleNextQuestion}>
            Next Question
          </button>
        </div>
      ) : (
        <div className="result-container">
          <h2>Your Score: {score} / {questions.length}</h2>
          <button className="retry-button" onClick={handleRetry}>
            Retry Test
          </button>
        </div>
      )}
    </div>
  );
};

export default TestMCQ;
