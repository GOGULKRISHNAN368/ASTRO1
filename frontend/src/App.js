import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Intro from './Intropage/Intro';
import EventPage from './components/EventPage/EventPage';
import Registration from './components/Registration/Registration';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  if (showIntro) {
    return <Intro onComplete={handleIntroComplete} />;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<EventPage />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
