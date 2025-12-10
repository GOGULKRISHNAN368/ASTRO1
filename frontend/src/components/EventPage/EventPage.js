import React from "react";
import "./EventPage.css";

const EventPage = () => {
  return (
    <div className="event-page">
      <header className="event-hero" id="home">
        <div className="event-hero-overlay" />
        <div className="event-hero-content">
          <p className="event-chip">College Tech & Cultural Festival</p>
          <h1 className="event-headline">Astronaova 2025</h1>
          <p className="event-subhead">
            Celebrate innovation with technical and non-technical events, workshops, and
            cultural showcases.
          </p>
          <div className="event-actions">
            <a href="#register" className="primary-btn">Register</a>
            <a href="#about" className="ghost-btn">About Us</a>
          </div>
        </div>
      </header>

      <section className="event-section" id="about">
        <div className="section-header">
          <p className="eyebrow">About Us</p>
          <h2>Where Ideas Ignite</h2>
          <p className="section-desc">
            A two-day college festival bringing together coders, designers, and creators.
            Explore challenges, learn from workshops, and showcase talent across technical
            and non-technical tracks.
          </p>
        </div>
        <div className="about-grid">
          <div className="about-card">
            <h3>Vision</h3>
            <p>
              Spark collaboration between students, mentors, and industry experts through
              hands-on competitions.
            </p>
          </div>
          <div className="about-card">
            <h3>Experience</h3>
            <p>
              Mix of hackathons, gaming, design, debate, and cultural events so everyone finds
              a stage to shine.
            </p>
          </div>
          <div className="about-card">
            <h3>Community</h3>
            <p>
              Built by students, for students — supported by alumni and partners who love
              building the future together.
            </p>
          </div>
        </div>
      </section>

      <section className="event-section alt" id="events">
        <div className="section-header">
          <p className="eyebrow">Events</p>
          <h2>Technical & Non-Technical</h2>
          <p className="section-desc">
            Choose your track — from hardcore coding to creativity-driven contests.
          </p>
        </div>
        <div className="event-grid">
          <div className="event-card">
            <h3>Technical</h3>
            <ul>
              <li>24h Hackathon</li>
              <li>AI/ML Challenge</li>
              <li>CTF & Cybersec</li>
              <li>Web & App Sprint</li>
              <li>Robotics Line Follower</li>
            </ul>
          </div>
          <div className="event-card">
            <h3>Non-Technical</h3>
            <ul>
              <li>Designathon</li>
              <li>Esports Arena</li>
              <li>Debate & Pitch</li>
              <li>Photography Walk</li>
              <li>Quiz & Puzzles</li>
            </ul>
          </div>
          <div className="event-card">
            <h3>Workshops</h3>
            <ul>
              <li>GenAI & Prompting</li>
              <li>Product Thinking</li>
              <li>UI/UX Systems</li>
              <li>Cloud & DevOps</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="event-section" id="register">
        <div className="register-card">
          <div>
            <p className="eyebrow">Register</p>
            <h2>Join the Fest</h2>
            <p className="section-desc">
              Form your crew and secure your slot. Limited seats for each track.
            </p>
            <ul className="register-list">
              <li>Team size: 2-4 (solo allowed for select events)</li>
              <li>Registration closes: 25 April 2025</li>
              <li>Event days: 30 & 31 January</li>
            </ul>
          </div>
          <a className="primary-btn" href="#home">Start Registration</a>
        </div>
      </section>

      <footer className="event-footer">
        <p>Hackfest 2025 · College of Engineering · Built by the student community</p>
      </footer>
    </div>
  );
};

export default EventPage;

