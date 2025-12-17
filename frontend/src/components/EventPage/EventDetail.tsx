import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { eventsData } from './eventsData';
import { Day, Category } from './EventPage';
import { eventRules } from './eventRules';
import { Check } from 'lucide-react';

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const EventDetail: React.FC = () => {
  const { day, category, slug } = useParams();
  const navigate = useNavigate();

  const d = (day as Day) || 'day1';
  const c = (category as Category) || 'flagship';

  const events = (eventsData as any)[d]?.[c] || [];
  const event = events.find((e: any) => slugify(e.name) === slug);

  const location = useLocation();
  const [highlight, setHighlight] = React.useState(false);

  // Scroll to the rules section when the page loads if the hash is '#rules'
  // and briefly highlight it for clarity
  React.useEffect(() => {
    if (location.hash === '#rules') {
      // wait a tick for the element to be rendered
      setTimeout(() => {
        const el = document.getElementById('rules');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setHighlight(true);
          setTimeout(() => setHighlight(false), 1500);
        }
      }, 50);
    }
  }, [location.hash, slug]);

  if (!event) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Event not found</h2>
        <p>We couldn't find the requested event.</p>
        <button onClick={() => navigate('/events')}>Back to events</button>
      </div>
    );
  }

  const slugKey = slugify(event.name);
  const rules = event.rules || eventRules[slugKey] || null;

  return (
    <div style={{ padding: '40px', maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', textAlign: 'center', marginBottom: 12 }}>{event.name}</h1>
      {event.description && <p style={{ color: '#666' }}>{event.description}</p>}

      {/* Main content box (now contains Rules) */}
      <div style={{ marginTop: 24 }}>
        <div style={{
          width: '100%',
          background: 'linear-gradient(180deg, #faf6f0 0%, #f5f0e6 100%)',
          borderRadius: 14,
          padding: 24,
          overflowY: 'auto',
          color: '#444',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0 6px 24px rgba(120,53,15,0.06)'
        }}>
          {/* Decorative header */}
          <div style={{ width: '100%', maxWidth: 960, marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 8 }}>
              <button
                onClick={() => {
                  if (window.history.length > 1) {
                    navigate(-1);
                  } else {
                    navigate('/events');
                  }
                }}
                style={{ background: 'transparent', border: 'none', color: '#2b2b2b', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 700 }}
              >
                ← Back
              </button>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1rem', color: '#6b6b6b', marginBottom: 6 }}>{event.content || 'Event detail content goes here'}</div>
              <h2 style={{ margin: 0, fontSize: '1.6rem', color: '#2b2b2b', letterSpacing: '-0.5px' }}>{event.name}</h2>
              {event.description && <p style={{ color: '#7a6f63', marginTop: 8 }}>{event.description}</p>}
            </div>
          </div>

          {/* Rules grid */}
          <div style={{ width: '100%', maxWidth: 920 }}>
            <h3 style={{ textAlign: 'center', color: '#333', fontSize: '1.125rem', fontWeight: 800, marginBottom: 16 }}>Rules</h3>

            {rules ? (
              <div style={{ display: 'grid', gap: 12 }}>
                {rules.map((r: string, idx: number) => (
                  <div
                    key={idx}
                    role="article"
                    aria-label={`Rule ${idx + 1}`}
                    style={{
                      display: 'flex',
                      gap: 12,
                      alignItems: 'flex-start',
                      background: '#fff',
                      borderRadius: 12,
                      padding: '14px 18px',
                      border: (highlight && idx === 0) ? '1px solid rgba(234,88,12,0.12)' : undefined,
                      boxShadow: (highlight && idx === 0) ? '0 20px 40px rgba(234,88,12,0.08)' : '0 6px 18px rgba(20,20,20,0.03)',
                      transition: 'transform 160ms ease, box-shadow 160ms ease, border 160ms ease',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 14px 35px rgba(20,20,20,0.06)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = (highlight && idx === 0) ? '0 20px 40px rgba(234,88,12,0.08)' : '0 6px 18px rgba(20,20,20,0.03)'; }}
                  >
                    <div style={{ width: 48, height: 48, borderRadius: 10, background: 'linear-gradient(135deg, rgba(234,88,12,0.12), rgba(180,83,9,0.06))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Check color="#ea580c" size={20} />
                    </div>
                    <div style={{ color: '#3b3b3b', lineHeight: 1.6, fontSize: '1rem' }}>{r}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', color: '#666' }}>Rules will be updated soon.</div>
            )}

            <div style={{ marginTop: 18, display: 'flex', justifyContent: 'center' }}>
              <div style={{ color: '#777', fontSize: '0.9rem' }}>Last updated: {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={() => { /* no-op register button on detail page */ }}
          style={{
            padding: '12px 22px',
            background: '#ea580c',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 700,
            boxShadow: '0 8px 30px rgba(234,88,12,0.2)',
            transition: 'transform 160ms ease, box-shadow 160ms ease',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 18px 50px rgba(234,88,12,0.25)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 30px rgba(234,88,12,0.2)'; }}
        >Register</button>
      </div>
    </div>
  );
};

export default EventDetail;
