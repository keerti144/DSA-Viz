import React, { useState, useEffect } from 'react';
import './BaseVisualization.css';

const BaseVisualization = ({
    title,
    algorithm,
    timeComplexity,
    spaceComplexity,
    stability,
    generateArray,
    visualize,
    code,
    explanation,
    algorithmSteps,
    customRender,
    sidebarTab,
    setSidebarTab
}) => {
    // State for custom input and undo
    const [inputValue, setInputValue] = useState('');
    const [array, setArray] = useState([]);
    const [history, setHistory] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [steps, setSteps] = useState([]);
    const [isVisualizing, setIsVisualizing] = useState(false);

    useEffect(() => {
        // Generate initial array if needed
        if (array.length === 0) {
            handleGenerateArray();
        }
    }, []);

    // Custom input handlers
    const handleInputChange = (e) => setInputValue(e.target.value);
    const handleAdd = () => {
        const values = inputValue.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v));
        if (values.length > 0) {
            setHistory([...history, [...array]]);
            setArray([...array, ...values]);
            setInputValue('');
        }
    };
    const handleUndo = () => {
        if (history.length > 0) {
            setArray(history[history.length - 1]);
            setHistory(history.slice(0, -1));
        }
    };
    const handleGenerateArray = () => {
        const newArray = generateArray(10);
        setArray(newArray);
        setHistory([]);
        setCurrentStep(0);
        setSteps([]);
    };

    // Step navigation handlers (for step-by-step visualization)
    const handleNextStep = () => {
        if (steps.length > 0 && currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };
    const handlePrevStep = () => {
        if (steps.length > 0 && currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    // Visualization logic (to be customized per algorithm)
    const startVisualization = async () => {
        setIsVisualizing(true);
        // For step-by-step, generate all steps first
        if (typeof visualize === 'function') {
            const allSteps = await visualize(array);
            setSteps(allSteps);
            setCurrentStep(0);
        }
        setIsVisualizing(false);
    };

    // Sidebar tab state (Algorithm, Code, Explanation)
    const [activeTab, setActiveTab] = useState('algorithm');
    useEffect(() => {
        if (setSidebarTab) setSidebarTab(activeTab);
    }, [activeTab, setSidebarTab]);

    // Render sidebar content
    const renderSidebar = () => {
        switch (activeTab) {
            case 'algorithm':
                return (
                    <div className="sidebar-section">
                        <h2>Algorithm</h2>
                        <pre>{algorithmSteps}</pre>
                    </div>
                );
            case 'code':
                return (
                    <div className="sidebar-section">
                        <h2>Code</h2>
                        <pre>{code}</pre>
                    </div>
                );
            case 'explanation':
                return (
                    <div className="sidebar-section">
                        <h2>Explanation</h2>
                        <p>{explanation}</p>
                    </div>
                );
            default:
                return null;
        }
    };

    const safeSteps = Array.isArray(steps) ? steps : [];

    return (
        <div className="base-vis-layout">
            <div className="base-vis-main">
                <div className="base-vis-header">
                    <h1>{title}</h1>
                    <div className="base-vis-info">
                        <span>Time: {timeComplexity}</span>
                        <span>Space: {spaceComplexity}</span>
                        <span>Stability: {stability}</span>
                    </div>
                </div>
                <div className="base-vis-controls">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Enter values (comma separated)"
                        className="base-vis-input"
                    />
                    <button onClick={handleAdd} className="base-vis-btn">Add</button>
                    <button onClick={handleUndo} className="base-vis-btn">Undo</button>
                    <button onClick={handleGenerateArray} className="base-vis-btn">Random</button>
                    <button onClick={startVisualization} className="base-vis-btn">Visualize</button>
                </div>
                <div className="base-vis-step-controls">
                    <button onClick={handlePrevStep} className="base-vis-btn">Previous Step</button>
                    <span>Step {currentStep + 1} / {safeSteps.length || 1}</span>
                    <button onClick={handleNextStep} className="base-vis-btn">Next Step</button>
                </div>
                <div className="base-vis-visualization">
                    {typeof customRender === 'function'
                        ? customRender(array, safeSteps, currentStep)
                        : <div className="array-container">
                            {array.map((value, idx) => (
                                <div key={idx} className="array-bar" style={{ height: `${value * 3}px` }}>
                                    <span className="bar-value">{value}</span>
                                </div>
                            ))}
                        </div>
                    }
                </div>
            </div>
            <div className="base-vis-sidebar">
                <div className="base-vis-tabs">
                    <button className={activeTab === 'algorithm' ? 'active' : ''} onClick={() => setActiveTab('algorithm')}>Algorithm</button>
                    <button className={activeTab === 'code' ? 'active' : ''} onClick={() => setActiveTab('code')}>Code</button>
                    <button className={activeTab === 'explanation' ? 'active' : ''} onClick={() => setActiveTab('explanation')}>Explanation</button>
                </div>
                {renderSidebar()}
            </div>
        </div>
    );
};

export default BaseVisualization; 