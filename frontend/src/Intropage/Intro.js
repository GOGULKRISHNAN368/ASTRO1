import React, { useEffect, useState } from "react";
import "./Intro.css";

const Intro = ({ onComplete }) => {
  console.log('Intro component rendered');
  const [progress, setProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("Preparing your journey...");
  const [isLoaded, setIsLoaded] = useState(false);

  // Particles / Rays / Orbs Creation
  useEffect(() => {
    // === PARTICLES ===
    const particles = document.getElementById("particles");
    if (particles && particles.childElementCount === 0) {
      for (let i = 0; i < 80; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.top = Math.random() * 100 + "%";
        particle.style.animationDelay = Math.random() * 20 + "s";
        particle.style.animationDuration = Math.random() * 10 + 15 + "s";
        particles.appendChild(particle);
      }
    }

    // === LIGHT RAYS ===
    const lightRays = document.getElementById("light-rays");
    if (lightRays && lightRays.childElementCount === 0) {
      for (let i = 0; i < 5; i++) {
        const ray = document.createElement("div");
        ray.className = "ray";
        ray.style.left = i * 25 + "%";
        ray.style.animationDelay = i * 3 + "s";
        ray.style.animationDuration = Math.random() * 5 + 15 + "s";
        lightRays.appendChild(ray);
      }
    }

    // === GLOW ORBS ===
    const glowOrbs = document.getElementById("glow-orbs");
    const orbConfigs = [
      { size: 400, color: "rgba(52,152,219,0.15)", x: "20%", y: "30%" },
      { size: 500, color: "rgba(41,128,185,0.12)", x: "80%", y: "60%" },
      { size: 350, color: "rgba(52,152,219,0.1)", x: "50%", y: "20%" },
    ];

    if (glowOrbs && glowOrbs.childElementCount === 0) {
      orbConfigs.forEach((orb) => {
        const element = document.createElement("div");
        element.className = "orb";
        element.style.width = orb.size + "px";
        element.style.height = orb.size + "px";
        element.style.background = orb.color;
        element.style.left = orb.x;
        element.style.top = orb.y;
        glowOrbs.appendChild(element);
      });
    }
  }, []);

  // Simulated loading; hand off to EventPage at 100%
  useEffect(() => {
    if (isLoaded) return;
    const messages = [
      "Preparing your journey...",
      "Loading event data...",
      "Syncing schedules...",
      "Configuring experience...",
      "Almost ready...",
    ];

    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 3 + 1;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        setLoadingMessage("Welcome to ASTONOVA!");
        clearInterval(interval);
        setTimeout(() => {
          setIsLoaded(true);
          setTimeout(() => onComplete && onComplete(), 1500);
        }, 1000);
      } else {
        setProgress(current);
        const idx = Math.min(messages.length - 1, Math.floor((current / 100) * messages.length));
        setLoadingMessage(messages[idx]);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [isLoaded]);



  return (
    <div>
      {/* Background Layers */}
      <div className="gradient-bg"></div>
      <div className="gradient-overlay"></div>
      <div className="grid-pattern"></div>

      <div className="particles" id="particles"></div>
      <div className="light-rays" id="light-rays"></div>
      <div className="glow-orbs" id="glow-orbs"></div>

      {/* Main Page */}
      <div className="container">
        <section className="hero-section">
          <h1 className="event-title">ASTONOVA</h1>
          <p className="event-tagline">Ignite the Future</p>
          <p className="event-dates">January 30 & 31</p>

          <div className="cta-container">
            <button className="cta-button cta-primary">Explore Events</button>
            <button className="cta-button cta-secondary">Register Soon</button>
          </div>

          <div className="scroll-indicator"></div>
        </section>

        {/* Loading Section */}
        <section className="loading-section" id="loading-section">
          <h2 className="loading-title">Initializing Experience</h2>

          <div className="progress-container">
            <div className="percentage-text" id="percentage">
              {Math.round(progress)}%
            </div>

            <div className="progress-bar-track">
              <div
                className="progress-bar-fill"
                id="progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <p className="loading-message" id="loading-message">
            {loadingMessage}
          </p>
        </section>
      </div>
    </div>
  );
};

export default Intro;
