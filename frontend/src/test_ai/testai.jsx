import React, { useState } from 'react';
import './testai.css';

const DSA_TOPICS = [
    "Arrays",
    "Linked Lists",
    "Stacks",
    "Queues",
    "Trees",
    "Binary Search Trees",
    "Heaps",
    "Graphs",
    "Hash Tables",
    "Sorting Algorithms",
    "Searching Algorithms",
    "Dynamic Programming",
    "Greedy Algorithms",
    "Backtracking",
    "Bit Manipulation",
    "String Manipulation",
    "Recursion",
    "Time Complexity",
    "Space Complexity"
];

export const TestAI = () => {
    const [difficulty, setDifficulty] = useState('Medium');
    const [topics, setTopics] = useState([]);
    const [challengeMode, setChallengeMode] = useState(false);
    const [energyLevel, setEnergyLevel] = useState('High');
    const [stressLevel, setStressLevel] = useState('Low');
    const [timeSpent, setTimeSpent] = useState(60);

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [timeLeft, setTimeLeft] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === "topics") {
            const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
            setTopics(selectedOptions);
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
        setError('');
        setScore(0);
        setCurrentPage(0);
        setShowResults(false);
        setTimeLeft(timeSpent * 60); // Convert minutes to seconds

        const requestBody = {
            difficulty_level: difficulty,
            topics: topics.length > 0 ? topics : ["General DSA"],
            challenge_mode: challengeMode,
            energy_level: energyLevel,
            stress_level: stressLevel,
            time_spent: timeSpent
        };

        try {
            const response = await fetch('http://localhost:5000/generate-questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to generate questions');
            }

            if (!data.questions || !Array.isArray(data.questions)) {
                throw new Error('Invalid response format');
            }

            setQuestions(data.questions);
            setAnswers(new Array(data.questions.length).fill(''));
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerChange = (questionIndex, selectedOption) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex] = selectedOption;
        setAnswers(newAnswers);
    };

    const handleScoreCalculation = () => {
        let newScore = 0;
        questions.forEach((q, index) => {
            if (answers[index] === q.answer) {
                newScore += 1;
            }
        });
        setScore(newScore);
        setShowResults(true);
    };

    const handlePrevQuestion = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentPage < questions.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    // Timer effect
    React.useEffect(() => {
        let timer;
        if (timeLeft > 0 && !showResults) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && !showResults) {
            handleScoreCalculation();
        }
        return () => clearInterval(timer);
    }, [timeLeft, showResults]);

    return (
        <div className="testai-container">
            <h1>Generate Your AI Test</h1>

            {!questions.length && (
                <div className="input-form">
                    <label>
                        Topics (Select multiple)
                        <select
                            name="topics"
                            multiple
                            value={topics}
                            onChange={handleChange}
                            className="topics-select"
                        >
                            {DSA_TOPICS.map((topic) => (
                                <option key={topic} value={topic}>
                                    {topic}
                                </option>
                            ))}
                        </select>
                        <small>Hold Ctrl/Cmd to select multiple topics</small>
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
                            type="number"
                            value={timeSpent}
                            onChange={handleChange}
                            min="30"
                            max="120"
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

                    {error && <div className="error-message">{error}</div>}
                </div>
            )}

            {questions.length > 0 && !showResults && (
                <div className="questions-container">
                    <div className="timer">Time Left: {formatTime(timeLeft)}</div>

                    <div className="question-card">
                        <div className="question-header">
                            <span className="question-number">Question {currentPage + 1} of {questions.length}</span>
                        </div>

                        <p className="question-text">{questions[currentPage].question}</p>

                        <div className="options-list">
                            {Object.entries(questions[currentPage].options).map(([option, text]) => (
                                <label key={option} className="option-label">
                                    <input
                                        type="radio"
                                        name={`question-${currentPage}`}
                                        value={option}
                                        checked={answers[currentPage] === option}
                                        onChange={() => handleAnswerChange(currentPage, option)}
                                    />
                                    <span className="option-text">{option}. {text}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="navigation-buttons">
                        <button
                            onClick={handlePrevQuestion}
                            disabled={currentPage === 0}
                        >
                            Previous
                        </button>

                        {currentPage === questions.length - 1 ? (
                            <button onClick={handleScoreCalculation} className="submit-button">
                                Submit
                            </button>
                        ) : (
                            <button
                                onClick={handleNextQuestion}
                                disabled={currentPage === questions.length - 1}
                            >
                                Next
                            </button>
                        )}
                    </div>
                </div>
            )}

            {showResults && (
                <div className="results-container">
                    <h2>Test Results</h2>
                    <div className="score-display">
                        <p>Your Score: {score} out of {questions.length}</p>
                        <p>Percentage: {((score / questions.length) * 100).toFixed(1)}%</p>
                    </div>

                    <div className="questions-review">
                        {questions.map((q, index) => (
                            <div key={index} className={`review-question ${answers[index] === q.answer ? 'correct' : 'incorrect'}`}>
                                <p><strong>Q{index + 1}:</strong> {q.question}</p>
                                <p>Your Answer: {answers[index] || 'Not answered'}</p>
                                <p>Correct Answer: {q.answer}</p>
                            </div>
                        ))}
                    </div>

                    <button onClick={() => {
                        setQuestions([]);
                        setAnswers([]);
                        setScore(0);
                        setShowResults(false);
                        setCurrentPage(0);
                    }}>
                        Start New Test
                    </button>
                </div>
            )}
        </div>
    );
};

export default TestAI;