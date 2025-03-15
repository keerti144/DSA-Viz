import React, { useState } from "react";
import femaleUser from "./female-user.png";
import group43 from "./group-43.png";
import menu from "./menu.png";
import "./style.css";
import username from "./username.png";

export const Help = () => {
    const [query, setQuery] = useState("");
    const previousHelp = [
        "How to visualize a binary search tree?",
        "Steps to run a Dijkstra algorithm simulation",
        "Understanding time complexity in sorting algorithms"
    ];

    return (
        <div className="help">
            <div className="div">
                <p className="text-wrapper">What can we help you with?</p>
                <div className="text-wrapper-2">HELP</div>
                
                <div className="previous-queries">
                    <h3>Previous Help Topics:</h3>
                    <ul>
                        {previousHelp.map((topic, index) => (
                            <li key={index}>{topic}</li>
                        ))}
                    </ul>
                </div>
                
                <div className="overlap">
                    <div className="rectangle" />
                    <input 
                        type="text" 
                        className="query-input" 
                        placeholder="Type your query here" 
                        value={query} 
                        onChange={(e) => setQuery(e.target.value)} 
                    />
                </div>
                
                <button className="submit-query">Submit</button>
            </div>
        </div>
    );
};
