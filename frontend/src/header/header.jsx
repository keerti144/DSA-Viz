import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import femaleUser from '../assets/female-user.png';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <Link to="/homepage" className="logo">
        AlgoRize
      </Link>
      <div className="header-right">
        <button className="profile-btn" onClick={() => navigate('/settings')}>
          <img src={femaleUser} alt="Profile" />
        </button>
      </div>
    </header>
  );
};

export default Header;
