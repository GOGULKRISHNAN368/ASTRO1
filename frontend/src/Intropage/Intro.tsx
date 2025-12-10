import React, { useEffect, useState } from 'react';
import './Intro.css';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface IntroProps {
  onComplete?: () => void;
}

const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const [showContent, setShowContent] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Show content after delay
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Countdown timer
  useEffect(() => {
    const eventDate = new Date('2026-01-30T09:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = eventDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="intro-container">
      {/* Background Layers */}
      <div className="gradient-bg" />
      <div className="gradient-overlay" />
      <div className="grid-pattern" />

      {/* Animated Stars */}
      <div className="stars-container">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Glow Orbs - Simplified */}
      <div className="glow-orbs">
        <div className="orb orb-cyan" />
        <div className="orb orb-magenta" />
      </div>

      {/* Floating Shapes */}
      <div className="floating-shapes">
        <div className="shape shape-1" />
        <div className="shape shape-2" />
        <div className="shape shape-3" />
      </div>

      {/* Main Content */}
      <div className="main-content">
        <main className="hero-section">
          <div className="content-wrapper visible">
            
            {/* Hero Title */}
            <div className="hero-container">
              <div className={`pre-title ${showContent ? 'animate-in' : ''}`} style={{ animationDelay: '0.1s' }}>
                <span className="pre-title-badge">College S Fest 2026</span>
              </div>

              <h1 className={`main-title ${showContent ? 'animate-in' : ''}`} style={{ animationDelay: '0.2s' }}>
                <span className="title-text">ASTRANOVA</span>
              </h1>

              <div className={`tagline ${showContent ? 'animate-in' : ''}`} style={{ animationDelay: '0.3s' }}>
                <span className="tagline-icon">⚡</span>
                <span className="tagline-main">Ignite the Future</span>
                <span className="tagline-icon tagline-icon-magenta">⚡</span>
              </div>

              <div className={`dates-container ${showContent ? 'animate-in' : ''}`} style={{ animationDelay: '0.4s' }}>
                <div className="dates-badge">
                  <span className="pulse-dot pulse-dot-cyan" />
                  <span className="dates-text">January 30 & 31, 2026</span>
                  <span className="pulse-dot pulse-dot-magenta" />
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className={`cta-container ${showContent ? 'animate-in' : ''}`} style={{ animationDelay: '0.5s' }}>
              <button className="cta-button cta-primary">
                <span>Explore Events</span>
              </button>
              <button className="cta-button cta-secondary">
                <span>Register Now</span>
              </button>
            </div>

            {/* Countdown Timer */}
            <div className={`countdown-container ${showContent ? 'animate-in' : ''}`} style={{ animationDelay: '0.6s' }}>
              <p className="countdown-label">Event Starts In</p>
              <div className="countdown-grid">
                {timeBlocks.map((block, index) => (
                  <div 
                    key={block.label} 
                    className="countdown-block"
                    style={{ animationDelay: `${0.7 + index * 0.1}s` }}
                  >
                    <div className="countdown-inner">
                      <div className="countdown-value">{String(block.value).padStart(2, '0')}</div>
                      <div className="countdown-unit">{block.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className={`scroll-indicator ${showContent ? 'animate-in' : ''}`} style={{ animationDelay: '0.8s' }}>
              <div className="scroll-mouse">
                <div className="scroll-wheel" />
              </div>
      
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Intro;
