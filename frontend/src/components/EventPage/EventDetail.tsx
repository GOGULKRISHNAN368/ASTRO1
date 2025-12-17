import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventsData } from './eventsData';
import { Day, Category } from './EventPage';

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const EventDetail: React.FC = () => {
  const { day, category, slug } = useParams();
  const navigate = useNavigate();

  const d = (day as Day) || 'day1';
  const c = (category as Category) || 'flagship';

  const events = (eventsData as any)[d]?.[c] || [];
  const event = events.find((e: any) => slugify(e.name) === slug);

  if (!event) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Event not found</h2>
        <p>We couldn't find the requested event.</p>
        <button onClick={() => navigate('/events')}>Back to events</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', maxWidth: 900, margin: '0 auto' }}>
      <button
        onClick={() => navigate(-1)}
        style={{ marginBottom: 16 }}
      >
        ← Back
      </button>

      <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>{event.name}</h1>
      {event.description && <p style={{ color: '#666' }}>{event.description}</p>}

      {/* Placeholder content */}
      <div style={{ marginTop: 24 }}>
        <div style={{
          width: '100%',
          aspectRatio: '16/9',
          background: '#f5f0e6',
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#a8a29e'
        }}>Event detail content goes here</div>
      </div>

      {/* Rules section */}
      <div style={{ marginTop: 24 }}>
        <h3 style={{ marginBottom: 8 }}>Rules</h3>
        {event.rules ? (
          <ul style={{ color: '#444', lineHeight: 1.6 }}>
            {event.rules.map((r: string, idx: number) => (
              <li key={idx}>{r}</li>
            ))}
          </ul>
        ) : (
          <p style={{ color: '#666' }}>Rules will be updated soon.</p>
        )}
      </div>

      <div style={{ marginTop: 24 }}>
        <button
          onClick={() => { /* no-op register button on detail page */ }}
          style={{
            padding: '10px 18px',
            background: '#ea580c',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer'
          }}
        >Register</button>
      </div>
    </div>
  );
};

export default EventDetail;
