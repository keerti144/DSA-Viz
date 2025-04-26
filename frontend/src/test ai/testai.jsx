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

  const handleSubmit = async () => {
    setLoading(true);
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
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
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
              <li>A. {q.options.A}</li>
              <li>B. {q.options.B}</li>
              <li>C. {q.options.C}</li>
              <li>D. {q.options.D}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestAI;
