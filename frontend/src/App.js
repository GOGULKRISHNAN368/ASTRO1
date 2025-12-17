import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Intro from "./Intropage/Intro.tsx";
import Header from "./components/pageheader.tsx"; 
import Footer from './components/footer.tsx';    
import Contact from "./components/Contact.tsx";
import EventPage from './components/EventPage/EventPage.tsx';
import EventDetail from './components/EventPage/EventDetail';
import WatchClock from './components/Clock/WatchClock.tsx';
import { CircuitTimeline } from './components/CircuitTimeline/CircuitTimeline.tsx';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  // Check if user is directly accessing a route other than home
  useEffect(() => {
    const path = window.location.pathname;
    // If user is directly accessing /contact, skip intro
    if (path === '/contact' || path === '/registration' || path === '/events' || path === '/CircuitTimeline' || path === '/clock') {
      setShowIntro(false);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  // Keep Router mounted always so navigation works while Intro is visible
  return (
    <Router>
      <div className="App">
        {/* Show Intro overlay when needed */}
        {showIntro && <Intro onComplete={handleIntroComplete} />}

        <Header useRouterLinks={true} />
        
        <Routes>
          <Route path="/" element={<EventPage />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/events/:day/:category/:slug" element={<EventDetail />} />
          <Route path="/CircuitTimeline" element={<CircuitTimeline />} />
          <Route path="/clock" element={<WatchClock />} />
          <Route path="/contact" element={<Contact />} /> 
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

              <Footer />
      </div>
    </Router>
  );
}

export default App;