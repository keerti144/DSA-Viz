import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './notesgenerator.css';

const NotesGenerator = () => {
    const [topic, setTopic] = useState('');
    const [promptDetails, setPromptDetails] = useState('');
    const [targetAudience, setTargetAudience] = useState('beginner');
    const [noteFormat, setNoteFormat] = useState('bullet');
    const [depth, setDepth] = useState('summary');
    const [referenceType, setReferenceType] = useState('textbook');
    const [languageTone, setLanguageTone] = useState('formal');
    const [includeCode, setIncludeCode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [generatedNotes, setGeneratedNotes] = useState('');
    const [showNotes, setShowNotes] = useState(false);
    const [toast, setToast] = useState('');

    const formatNotes = (notes) => {
        // Add proper spacing and formatting
        return notes
            .replace(/\n\n+/g, '\n\n') // Remove multiple empty lines
            .replace(/(?<=\n)(?=\n)/g, '') // Remove single empty lines
            .trim();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setShowNotes(false);

        try {
            const response = await fetch('http://localhost:5000/generate-notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    topic,
                    prompt_details: promptDetails + (includeCode ? ' Include code snippets where relevant.' : ''),
                    target_audience: targetAudience,
                    note_format: noteFormat,
                    depth,
                    reference_type: referenceType,
                    language_tone: languageTone,
                    include_code: includeCode
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to generate notes');
            }

            setGeneratedNotes(formatNotes(data.notes));
            setShowNotes(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedNotes);
        setToast('Copied to clipboard!');
        setTimeout(() => setToast(''), 2000);
    };

    const handleNewNotes = () => {
        setShowNotes(false);
        setGeneratedNotes('');
    };

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="loading-content pop-in">
                    <div className="loading-animation">
                        <div className="loading-circle"></div>
                        <div className="loading-circle"></div>
                        <div className="loading-circle"></div>
                    </div>
                    <h2 className="loading-text shimmer">Crafting Your Perfect Notes</h2>
                    <p className="loading-subtext">Analyzing your preferences and generating comprehensive notes...</p>
                    <div className="loading-progress">
                        <div className="progress-bar"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (showNotes) {
        return (
            <div className="notes-generator-container full-width">
                {toast && <div className="custom-toast pop-in">{toast}</div>}
                <div className="generated-notes fade-in">
                    <h2 className="slide-in">Generated Notes</h2>
                    <div className="notes-content">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{generatedNotes}</ReactMarkdown>
                    </div>
                    <div className="notes-actions">
                        <button className="copy-button pulse" onClick={handleCopy}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                            Copy to Clipboard
                        </button>
                        <button className="generate-button rainbow" onClick={handleNewNotes}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 5v14M5 12h14"></path>
                            </svg>
                            Generate New Notes
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="notes-generator-container full-width">
            {toast && <div className="custom-toast pop-in">{toast}</div>}
            <h1 className="pop-in">AI Notes Generator</h1>
            <form className="notes-form fade-in" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="topic">Topic</label>
                    <input
                        type="text"
                        id="topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Enter the topic for your notes"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="promptDetails">Prompt Details</label>
                    <textarea
                        id="promptDetails"
                        value={promptDetails}
                        onChange={(e) => setPromptDetails(e.target.value)}
                        placeholder="Provide specific details or focus areas for your notes"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Include Code Snippets?</label>
                    <div className="button-group">
                        <button
                            type="button"
                            className={`option-button code-toggle ${includeCode ? 'selected' : ''}`}
                            onClick={() => setIncludeCode(true)}
                        >
                            Yes
                        </button>
                        <button
                            type="button"
                            className={`option-button code-toggle ${!includeCode ? 'selected' : ''}`}
                            onClick={() => setIncludeCode(false)}
                        >
                            No
                        </button>
                    </div>
                </div>

                <div className="form-group">
                    <label>Target Audience</label>
                    <div className="button-group varied">
                        <button
                            type="button"
                            className={`option-button audience-beginner ${targetAudience === 'beginner' ? 'selected' : ''}`}
                            onClick={() => setTargetAudience('beginner')}
                        >
                            👶 Beginner
                        </button>
                        <button
                            type="button"
                            className={`option-button audience-intermediate ${targetAudience === 'intermediate' ? 'selected' : ''}`}
                            onClick={() => setTargetAudience('intermediate')}
                        >
                            🧑‍🎓 Intermediate
                        </button>
                        <button
                            type="button"
                            className={`option-button audience-advanced ${targetAudience === 'advanced' ? 'selected' : ''}`}
                            onClick={() => setTargetAudience('advanced')}
                        >
                            🧙‍♂️ Advanced
                        </button>
                    </div>
                </div>

                <div className="form-group">
                    <label>Note Format</label>
                    <div className="button-group varied">
                        <button
                            type="button"
                            className={`option-button format-bullet ${noteFormat === 'bullet' ? 'selected' : ''}`}
                            onClick={() => setNoteFormat('bullet')}
                        >
                            • Bullet Points
                        </button>
                        <button
                            type="button"
                            className={`option-button format-paragraph ${noteFormat === 'paragraph' ? 'selected' : ''}`}
                            onClick={() => setNoteFormat('paragraph')}
                        >
                            ¶ Paragraphs
                        </button>
                        <button
                            type="button"
                            className={`option-button format-outline ${noteFormat === 'outline' ? 'selected' : ''}`}
                            onClick={() => setNoteFormat('outline')}
                        >
                            ≡ Outline
                        </button>
                    </div>
                </div>

                <div className="form-group">
                    <label>Depth</label>
                    <div className="button-group varied">
                        <button
                            type="button"
                            className={`option-button depth-summary ${depth === 'summary' ? 'selected' : ''}`}
                            onClick={() => setDepth('summary')}
                        >
                            📝 Summary
                        </button>
                        <button
                            type="button"
                            className={`option-button depth-detailed ${depth === 'detailed' ? 'selected' : ''}`}
                            onClick={() => setDepth('detailed')}
                        >
                            📚 Detailed
                        </button>
                        <button
                            type="button"
                            className={`option-button depth-comprehensive ${depth === 'comprehensive' ? 'selected' : ''}`}
                            onClick={() => setDepth('comprehensive')}
                        >
                            🏆 Comprehensive
                        </button>
                    </div>
                </div>

                <div className="form-group">
                    <label>Reference Type</label>
                    <div className="button-group">
                        <button
                            type="button"
                            className={`option-button ${referenceType === 'textbook' ? 'selected' : ''}`}
                            onClick={() => setReferenceType('textbook')}
                        >
                            Textbook
                        </button>
                        <button
                            type="button"
                            className={`option-button ${referenceType === 'research' ? 'selected' : ''}`}
                            onClick={() => setReferenceType('research')}
                        >
                            Research
                        </button>
                        <button
                            type="button"
                            className={`option-button ${referenceType === 'practical' ? 'selected' : ''}`}
                            onClick={() => setReferenceType('practical')}
                        >
                            Practical
                        </button>
                    </div>
                </div>

                <div className="form-group">
                    <label>Language/Tone</label>
                    <div className="button-group">
                        <button
                            type="button"
                            className={`option-button ${languageTone === 'formal' ? 'selected' : ''}`}
                            onClick={() => setLanguageTone('formal')}
                        >
                            Formal
                        </button>
                        <button
                            type="button"
                            className={`option-button ${languageTone === 'casual' ? 'selected' : ''}`}
                            onClick={() => setLanguageTone('casual')}
                        >
                            Casual
                        </button>
                        <button
                            type="button"
                            className={`option-button ${languageTone === 'technical' ? 'selected' : ''}`}
                            onClick={() => setLanguageTone('technical')}
                        >
                            Technical
                        </button>
                    </div>
                </div>

                {error && <div className="error-message">{error}</div>}

                <button type="submit" className="generate-button rainbow pop-in">
                    Generate Notes
                </button>
            </form>
        </div>
    );
};

export default NotesGenerator; 