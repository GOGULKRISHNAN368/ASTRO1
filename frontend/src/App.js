import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Intro from "./Intropage/Intro.tsx";
import Header from "./components/pageheader.tsx"; 
import Footer from './components/footer.tsx';    
import Contact from "./components/Contact.tsx";
import EventPage from './components/EventPage/EventPage.tsx';
import Registration from './components/Registration/Registration';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  // Check if user is directly accessing a route other than home
  useEffect(() => {
    const path = window.location.pathname;
    // If user is directly accessing /contact, skip intro
    if (path === '/contact' || path === '/registration' || path === '/events') {
      setShowIntro(false);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  // Show Intro first (unless user came directly to contact page)
  if (showIntro) {
    return <Intro onComplete={handleIntroComplete} />;
  }

  return (
    <Router>
      <div className="App">
        <Header useRouterLinks={true} />
        
        <Routes>
          <Route path="/" element={<EventPage />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/contact" element={<Contact />} /> 
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

              <Footer />
      </div>
    </Router>
  );
}

export default App;