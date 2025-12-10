import React from 'react';
import { Link } from 'react-router-dom';
import './Registration.css';

const Registration = () => {
  return (
    <div className="registration-page">
      <nav className="nav-bar">
        <Link to="/" className="nav-logo">ASTONOVA</Link>
        <Link to="/" className="nav-link">← Back to Events</Link>
      </nav>
      
      <div className="registration-container">
        <h1>Registration</h1>
        <p>Registration form coming soon...</p>
        
        <div className="registration-info">
          <h3>Event Details</h3>
          <ul>
            <li>Date: January 30 & 31, 2025</li>
            <li>Team size: 2-4 members (solo allowed for select events)</li>
            <li>Registration deadline: April 25, 2025</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Registration;