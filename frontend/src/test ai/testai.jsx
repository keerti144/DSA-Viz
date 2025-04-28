import React, { useState } from 'react';
import './testai.css';

export const TestAI = () => {
  const [difficulty, setDifficulty] = useState('Medium');
  const [topics, setTopics] = useState([]);
  const [challengeMode, setChallengeMode] = useState(false);
  const [energyLevel, setEnergyLevel] = useState('High');
  const [stressLevel, setStressLevel] = useState('Low');
  const [timeSpent, setTimeSpent] = useState(60);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState([]); // Store selected answers
  const [score, setScore] = useState(0); // Track score

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "topics") {
      setTopics(value.split(",").map(topic => topic.trim()));
    } else {
      switch (name) {
        case "difficulty":
          setDifficulty(value);
          break;
        case "energyLevel":
          setEnergyLevel(value);
          break;
        case "stressLevel":
          setStressLevel(value);
          break;
        case "timeSpent":
          setTimeSpent(Number(value));
          break;
        case "challengeMode":
          setChallengeMode(type === "checkbox" ? checked : value);
          break;
        default:
          break;
      }
    }
  };

  const handleAnswerChange = (questionIndex, selectedOption) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = selectedOption;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setScore(0); // Reset score before generating new questions
    try {
      const response = await fetch('http://localhost:5000/generate-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          difficulty_level: difficulty,
          topics: topics,
          challenge_mode: challengeMode,
          energy_level: energyLevel,
          stress_level: stressLevel,
          time_spent: timeSpent
        }),
      });
      const data = await response.json();
      setQuestions(data.questions || []);
      setAnswers(new Array(data.questions.length).fill('')); // Initialize answers
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScoreCalculation = () => {
    let newScore = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        newScore += 1; // Increment score for correct answers
      }
    });
    setScore(newScore);
  };

  return (
    <div className="testai-container">
      <h1>Generate Your AI Test</h1>
      <div className="input-form">
        <label>
          Topics (comma separated)
          <input 
            name="topics" 
            placeholder="e.g. AI, Machine Learning, Blockchain" 
            onChange={handleChange} 
          />
        </label>

        <label>
          Difficulty
          <select name="difficulty" value={difficulty} onChange={handleChange}>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </label>

        <label>
          Energy Level
          <select name="energyLevel" value={energyLevel} onChange={handleChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>

        <label>
          Stress Level
          <select name="stressLevel" value={stressLevel} onChange={handleChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>

        <label>
          Time (minutes)
          <input 
            name="timeSpent" 
            placeholder="e.g. 60" 
            type="number" 
            value={timeSpent} 
            onChange={handleChange} 
          />
        </label>

        <label>
          Challenge Mode
          <input 
            name="challengeMode" 
            type="checkbox" 
            checked={challengeMode} 
            onChange={handleChange} 
          />
        </label>

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Generating..." : "Generate Questions"}
        </button>
      </div>

      <div className="questions-list">
        {questions.length > 0 && <h2>Generated Questions:</h2>}
        {questions.map((q, index) => (
          <div key={index} className="question-card">
            <p><strong>Q{index + 1}:</strong> {q.question}</p>
            <ul>
              <li>
                <input 
                  type="radio" 
                  id={`optionA-${index}`} 
                  name={`question-${index}`} 
                  value="A" 
                  checked={answers[index] === 'A'} 
                  onChange={() => handleAnswerChange(index, 'A')} 
                />
                <label htmlFor={`optionA-${index}`}>A. {q.options.A}</label>
              </li>
              <li>
                <input 
                  type="radio" 
                  id={`optionB-${index}`} 
                  name={`question-${index}`} 
                  value="B" 
                  checked={answers[index] === 'B'} 
                  onChange={() => handleAnswerChange(index, 'B')} 
                />
                <label htmlFor={`optionB-${index}`}>B. {q.options.B}</label>
              </li>
              <li>
                <input 
                  type="radio" 
                  id={`optionC-${index}`} 
                  name={`question-${index}`} 
                  value="C" 
                  checked={answers[index] === 'C'} 
                  onChange={() => handleAnswerChange(index, 'C')} 
                />
                <label htmlFor={`optionC-${index}`}>C. {q.options.C}</label>
              </li>
              <li>
                <input 
                  type="radio" 
                  id={`optionD-${index}`} 
                  name={`question-${index}`} 
                  value="D" 
                  checked={answers[index] === 'D'} 
                  onChange={() => handleAnswerChange(index, 'D')} 
                />
                <label htmlFor={`optionD-${index}`}>D. {q.options.D}</label>
              </li>
            </ul>
          </div>
        ))}
        {questions.length > 0 && (
          <button onClick={handleScoreCalculation}>
            Calculate Score
          </button>
        )}
        {score > 0 && <h3>Your Score: {score} / {questions.length}</h3>}
      </div>
    </div>
  );
};

export default TestAI;
