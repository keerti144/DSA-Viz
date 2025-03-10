import React from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to My App</h1>
      <button onClick={() => navigate("/login")}>Go to Login</button>
    </div>
  );
};

export default App;
