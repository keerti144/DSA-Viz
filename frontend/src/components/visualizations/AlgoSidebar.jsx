import React, { useState } from "react";
import "./AlgoSidebar.css";

export default function AlgoSidebar({ algorithm, code, explanation }) {
  const [tab, setTab] = useState("algorithm");
  return (
    <div className="algo-sidebar">
      <div className="tabs">
        <button className={tab === "algorithm" ? "active" : ""} onClick={() => setTab("algorithm")}>Algorithm</button>
        <button className={tab === "code" ? "active" : ""} onClick={() => setTab("code")}>Code</button>
        <button className={tab === "explanation" ? "active" : ""} onClick={() => setTab("explanation")}>Explanation</button>
      </div>
      <div className="tab-content">
        {tab === "algorithm" && <pre>{algorithm}</pre>}
        {tab === "code" && <pre>{code}</pre>}
        {tab === "explanation" && <div>{explanation}</div>}
      </div>
    </div>
  );
} 