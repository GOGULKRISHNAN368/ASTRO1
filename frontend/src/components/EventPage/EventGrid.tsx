import { EventCard } from "./EventCard";
import { Category } from "./EventPage";

export interface Event {
  name: string;
  description?: string;
}

interface EventGridProps {
  events: Event[];
  category: Category;
  day: import("./EventPage").Day;
}

const styles = `
  @keyframes empty-pulse {
    0%, 100% { opacity: 0.6; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.01); }
  }
`;

export const EventGrid = ({ events, category, day }: EventGridProps) => {
  if (events.length === 0) {
    return (
      <>
        <style>{styles}</style>
        <div 
          style={{
            textAlign: 'center',
            padding: 'clamp(40px, 8vw, 60px) clamp(16px, 4vw, 20px)',
            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%)',
            borderRadius: 'clamp(16px, 3vw, 24px)',
            border: '1px solid rgba(120, 53, 15, 0.1)',
            animation: 'empty-pulse 3s ease-in-out infinite',
          }}
        >
          <div 
            style={{
              fontSize: 'clamp(2rem, 6vw, 3rem)',
              marginBottom: '16px',
              opacity: 0.6,
            }}
          >
            🎭
          </div>
          <p 
            style={{
              color: '#78716c',
              fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
              fontWeight: 500,
            }}
          >
            No events in this category
          </p>
        </div>
      </>
    );
  }

  return (
    <div 
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
        gap: 'clamp(16px, 3vw, 24px)',
      }}
    >
      {events.map((event, index) => (
        <EventCard key={event.name} event={event} index={index} category={category} day={day} />
      ))}
    </div>
  );
};
