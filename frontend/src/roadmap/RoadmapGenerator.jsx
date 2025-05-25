import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';
import './RoadmapGenerator.css';
import { useAuth } from '../contexts/AuthContext';

const RoadmapGenerator = ({ onClose, savedRoadmapData }) => {
    const { currentUser } = useAuth();
    // Basic Information
    const [topic, setTopic] = useState('');
    const [mainOutcome, setMainOutcome] = useState('');
    const [targetDate, setTargetDate] = useState('');
    
    // Time Commitment
    const [timeCommitment, setTimeCommitment] = useState('');
    const [roadmapFormat, setRoadmapFormat] = useState('flexible');
    
    // Learning Preferences
    const [depthLevel, setDepthLevel] = useState('beginner');
    const [learningScope, setLearningScope] = useState('broad');
    const [skipBasics, setSkipBasics] = useState(false);
    const [learningStyle, setLearningStyle] = useState([]);
    const [learningApproach, setLearningApproach] = useState([]);
    const [includeTheory, setIncludeTheory] = useState(true);
    
    // Current Level
    const [currentLevel, setCurrentLevel] = useState('absolute-beginner');
    const [existingSkills, setExistingSkills] = useState('');
    
    // UI State
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [generatedRoadmap, setGeneratedRoadmap] = useState('');
    const [showRoadmap, setShowRoadmap] = useState(false);
    const [toast, setToast] = useState('');

    const learningStyles = [
        'Videos',
        'Reading',
        'Hands-on',
        'Mentor-guided',
        'Interactive'
    ];

    const learningApproaches = [
        'Project-based',
        'Concept-based',
        'Problem-solving'
    ];

    const depthLevels = [
        { id: 'beginner', label: 'Beginner' },
        { id: 'intermediate', label: 'Intermediate' },
        { id: 'advanced', label: 'Advanced' },
        { id: 'expert', label: 'Expert' }
    ];

    const currentLevels = [
        { id: 'absolute-beginner', label: 'Absolute Beginner' },
        { id: 'know-basics', label: 'Know Basics' },
        { id: 'already-building', label: 'Already Building' }
    ];

    const roadmapFormats = [
        { id: 'daily', label: 'Daily' },
        { id: 'weekly', label: 'Weekly' },
        { id: 'flexible', label: 'Flexible' }
    ];

    const handleLearningStyleToggle = (style) => {
        setLearningStyle(prev =>
            prev.includes(style)
                ? prev.filter(s => s !== style)
                : [...prev, style]
        );
    };

    const handleLearningApproachToggle = (approach) => {
        setLearningApproach(prev =>
            prev.includes(approach)
                ? prev.filter(a => a !== approach)
                : [...prev, approach]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setShowRoadmap(false);

        try {
            const response = await fetch('http://localhost:5000/generate-roadmap', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    topic,
                    main_outcome: mainOutcome,
                    target_date: targetDate,
                    time_commitment: timeCommitment,
                    roadmap_format: roadmapFormat,
                    depth_level: depthLevel,
                    learning_scope: learningScope,
                    skip_basics: skipBasics,
                    learning_style: learningStyle,
                    learning_approach: learningApproach,
                    include_theory: includeTheory,
                    current_level: currentLevel,
                    existing_skills: existingSkills
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to generate roadmap');
            }

            setGeneratedRoadmap(data.roadmap);
            setShowRoadmap(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedRoadmap);
        setToast('Copied to clipboard!');
        setTimeout(() => setToast(''), 2000);
    };

    const handleNewRoadmap = () => {
        setShowRoadmap(false);
        setGeneratedRoadmap('');
    };

    // Add function to save roadmap
    const handleSaveRoadmap = async () => {
        try {
            const response = await fetch('http://localhost:5000/save-roadmap', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uid: currentUser.uid,
                    roadmap_data: {
                        topic,
                        main_outcome: mainOutcome,
                        target_date: targetDate,
                        time_commitment: timeCommitment,
                        roadmap_format: roadmapFormat,
                        depth_level: depthLevel,
                        learning_scope: learningScope,
                        skip_basics: skipBasics,
                        learning_style: learningStyle,
                        learning_approach: learningApproach,
                        include_theory: includeTheory,
                        current_level: currentLevel,
                        existing_skills: existingSkills,
                        generated_roadmap: generatedRoadmap
                    }
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to save roadmap');
            }

            setToast('Roadmap saved successfully!');
            setTimeout(() => setToast(''), 2000);
        } catch (err) {
            setError(err.message);
        }
    };

    // useEffect to reset state when modal is opened and load saved roadmap data if provided
    useEffect(() => {
        // Reset state when the modal is opened
        setTopic('');
        setMainOutcome('');
        setTargetDate('');
        setTimeCommitment('');
        setRoadmapFormat('flexible');
        setDepthLevel('beginner');
        setLearningScope('broad');
        setSkipBasics(false);
        setLearningStyle([]);
        setLearningApproach([]);
        setIncludeTheory(true);
        setCurrentLevel('absolute-beginner');
        setExistingSkills('');
        setGeneratedRoadmap('');
        setShowRoadmap(false);
        setError('');
        setLoading(false);
        setToast('');

        if (savedRoadmapData) {
            setTopic(savedRoadmapData.topic);
            setMainOutcome(savedRoadmapData.main_outcome);
            setTargetDate(savedRoadmapData.target_date);
            setTimeCommitment(savedRoadmapData.time_commitment);
            setRoadmapFormat(savedRoadmapData.roadmap_format);
            setDepthLevel(savedRoadmapData.depth_level);
            setLearningScope(savedRoadmapData.learning_scope);
            setSkipBasics(savedRoadmapData.skip_basics);
            setLearningStyle(savedRoadmapData.learning_style);
            setLearningApproach(savedRoadmapData.learning_approach);
            setIncludeTheory(savedRoadmapData.include_theory);
            setCurrentLevel(savedRoadmapData.current_level);
            setExistingSkills(savedRoadmapData.existing_skills);
            setGeneratedRoadmap(savedRoadmapData.generated_roadmap);
            setShowRoadmap(true);
        } 
        // Removed event listener as it's replaced by prop handling

    }, [savedRoadmapData, onClose]); // Add onClose to dependency array

    if (loading) {
        return (
            <div className="roadmap-generator-modal">
                <div className="loading-screen">
                    <div className="loading-content pop-in">
                        <div className="loading-animation">
                            <div className="loading-circle"></div>
                            <div className="loading-circle"></div>
                            <div className="loading-circle"></div>
                        </div>
                        <h2 className="loading-text shimmer">Creating Your Learning Path</h2>
                        <p className="loading-subtext">Analyzing your preferences and generating a comprehensive roadmap...</p>
                        <div className="loading-progress">
                            <div className="progress-bar"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (showRoadmap) {
        return (
            <div className="roadmap-generator-modal">
                <div className="generated-roadmap fade-in">
                    <div className="generated-roadmap-header">
                        <h2 className="slide-in">Your Learning Roadmap</h2>
                         <button type="button" className="cancel-button top" onClick={onClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                    
                    <div className="roadmap-content">
                        <ReactMarkdown 
                            remarkPlugins={[remarkGfm]}
                            components={{
                                h1: ({node, ...props}) => <h1 className="roadmap-heading" {...props} />,
                                h2: ({node, ...props}) => <h2 className="roadmap-subheading" {...props} />,
                                h3: ({node, ...props}) => <h3 className="roadmap-section" {...props} />,
                                ul: ({node, ...props}) => <ul className="roadmap-list" {...props} />,
                                ol: ({node, ...props}) => <ol className="roadmap-list" {...props} />,
                                li: ({node, ...props}) => <li className="roadmap-item" {...props} />,
                                p: ({node, ...props}) => <p className="roadmap-paragraph" {...props} />
                            }}
                        >
                            {generatedRoadmap}
                        </ReactMarkdown>
                    </div>
                    <div className="roadmap-actions">
                        {!savedRoadmapData && (
                           <button className="save-button" onClick={handleSaveRoadmap}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                                    <polyline points="17 21 17 13 7 13 7 21"></polyline>
                                    <polyline points="7 3 7 8 15 8"></polyline>
                                </svg>
                                Save Roadmap
                            </button>
                        )}
                        
                        <button className="copy-button" onClick={handleCopy}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                            Copy to Clipboard
                        </button>
                        <button className="generate-button" onClick={handleNewRoadmap}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 5v14M5 12h14"></path>
                            </svg>
                            Generate New Roadmap
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="roadmap-generator-modal">
            <div className="roadmap-form fade-in">
                <div className="form-header">
                    <h2>Generate Learning Roadmap</h2>
                    <button type="button" className="cancel-button" onClick={onClose}>
                        Cancel
                    </button>
                </div>

                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        {/* Basic Information */}
                        <div className="form-section">
                            <h3>Basic Information</h3>
                            <div className="form-group">
                                <label htmlFor="topic">What topic do you want to learn?</label>
                                <input
                                    type="text"
                                    id="topic"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    placeholder="e.g., Machine Learning, Web Development, Data Structures"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="mainOutcome">What is the main outcome you want?</label>
                                <input
                                    type="text"
                                    id="mainOutcome"
                                    value={mainOutcome}
                                    onChange={(e) => setMainOutcome(e.target.value)}
                                    placeholder="e.g., job, startup, academic research, freelancing, personal mastery"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="targetDate">What's your target date to achieve your goal?</label>
                                <input
                                    type="date"
                                    id="targetDate"
                                    value={targetDate}
                                    onChange={(e) => setTargetDate(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Time Commitment */}
                        <div className="form-section">
                            <h3>Time Commitment</h3>
                            <div className="form-group">
                                <label htmlFor="timeCommitment">How many hours per day or week can you realistically commit?</label>
                                <input
                                    type="text"
                                    id="timeCommitment"
                                    value={timeCommitment}
                                    onChange={(e) => setTimeCommitment(e.target.value)}
                                    placeholder="e.g., 2 hours per day, 10 hours per week"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Do you want a daily, weekly, or flexible roadmap format?</label>
                                <div className="button-group">
                                    {roadmapFormats.map(format => (
                                        <button
                                            key={format.id}
                                            type="button"
                                            className={`option-button ${roadmapFormat === format.id ? 'selected' : ''}`}
                                            onClick={() => setRoadmapFormat(format.id)}
                                        >
                                            {format.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Learning Preferences */}
                        <div className="form-section">
                            <h3>Learning Preferences</h3>
                            <div className="form-group">
                                <label>What depth level do you want?</label>
                                <div className="button-group">
                                    {depthLevels.map(level => (
                                        <button
                                            key={level.id}
                                            type="button"
                                            className={`option-button ${depthLevel === level.id ? 'selected' : ''}`}
                                            onClick={() => setDepthLevel(level.id)}
                                        >
                                            {level.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Do you want a broad overview or an in-depth specialization?</label>
                                <div className="button-group">
                                    <button
                                        type="button"
                                        className={`option-button ${learningScope === 'broad' ? 'selected' : ''}`}
                                        onClick={() => setLearningScope('broad')}
                                    >
                                        Broad Overview
                                    </button>
                                    <button
                                        type="button"
                                        className={`option-button ${learningScope === 'specialized' ? 'selected' : ''}`}
                                        onClick={() => setLearningScope('specialized')}
                                    >
                                        In-depth Specialization
                                    </button>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Should we skip basics if you're already familiar?</label>
                                <div className="button-group">
                                    <button
                                        type="button"
                                        className={`option-button ${skipBasics ? 'selected' : ''}`}
                                        onClick={() => setSkipBasics(true)}
                                    >
                                        Yes, Skip Basics
                                    </button>
                                    <button
                                        type="button"
                                        className={`option-button ${!skipBasics ? 'selected' : ''}`}
                                        onClick={() => setSkipBasics(false)}
                                    >
                                        No, Include Basics
                                    </button>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>What is your preferred learning style?</label>
                                <div className="focus-areas-grid">
                                    {learningStyles.map(style => (
                                        <button
                                            key={style}
                                            type="button"
                                            className={`option-button ${learningStyle.includes(style) ? 'selected' : ''}`}
                                            onClick={() => handleLearningStyleToggle(style)}
                                        >
                                            {style}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Do you prefer project-based learning, concept-based, or problem-solving focused?</label>
                                <div className="focus-areas-grid">
                                    {learningApproaches.map(approach => (
                                        <button
                                            key={approach}
                                            type="button"
                                            className={`option-button ${learningApproach.includes(approach) ? 'selected' : ''}`}
                                            onClick={() => handleLearningApproachToggle(approach)}
                                        >
                                            {approach}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Would you like theory and foundational concepts included?</label>
                                <div className="button-group">
                                    <button
                                        type="button"
                                        className={`option-button ${includeTheory ? 'selected' : ''}`}
                                        onClick={() => setIncludeTheory(true)}
                                    >
                                        Yes, Include Theory
                                    </button>
                                    <button
                                        type="button"
                                        className={`option-button ${!includeTheory ? 'selected' : ''}`}
                                        onClick={() => setIncludeTheory(false)}
                                    >
                                        Focus on Practical Only
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Current Level */}
                        <div className="form-section">
                            <h3>Current Level</h3>
                            <div className="form-group">
                                <label>What's your current level in programming/tech?</label>
                                <div className="button-group">
                                    {currentLevels.map(level => (
                                        <button
                                            key={level.id}
                                            type="button"
                                            className={`option-button ${currentLevel === level.id ? 'selected' : ''}`}
                                            onClick={() => setCurrentLevel(level.id)}
                                        >
                                            {level.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Which skills/technologies are you already familiar with?</label>
                                <textarea
                                    value={existingSkills}
                                    onChange={(e) => setExistingSkills(e.target.value)}
                                    placeholder="List any relevant skills, tools, or technologies you already know"
                                    rows="3"
                                />
                            </div>
                        </div>

                        {error && <div className="error-message">{error}</div>}

                        <div className="form-actions">
                            <button type="submit" className="generate-button rainbow">
                                Generate Roadmap
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RoadmapGenerator; 