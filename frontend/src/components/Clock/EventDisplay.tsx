import React from 'react';
import { TimeSlot } from './types';

interface EventDisplayProps {
  timeSlot: TimeSlot | null;
  dayName: string;
}

const EventDisplay: React.FC<EventDisplayProps> = ({ timeSlot, dayName }) => {
  if (!timeSlot) {
    return (
      <div
        style={{
          padding: '24px',
          textAlign: 'center',
          color: 'hsl(45, 10%, 55%)',
          fontFamily: 'Rajdhani, sans-serif',
          fontSize: '18px',
        }}
      >
        <p style={{ marginBottom: '8px', fontFamily: 'Orbitron, sans-serif', color: 'hsl(43, 74%, 49%)' }}>
          {dayName}
        </p>
        <p>Click on a time to view events</p>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: '20px',
        animation: 'fadeIn 0.3s ease-out',
      }}
    >
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
      
      {/* Priority Header */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px',
          paddingBottom: '16px',
          borderBottom: '1px solid hsl(43, 30%, 20%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span
              style={{
                fontFamily: 'Rajdhani, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                color: 'hsl(45, 30%, 70%)',
                textTransform: 'uppercase',
                letterSpacing: '2px',
              }}
            >
              EVENT
            </span>
            <div
              style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '32px',
                fontWeight: 700,
                color: 'hsl(43, 74%, 49%)',
                textShadow: '0 0 20px hsl(43, 100%, 50%, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '56px',
                height: '56px',
                background: 'radial-gradient(circle, hsl(43, 74%, 49%, 0.15) 0%, transparent 70%)',
                borderRadius: '50%',
                border: '2px solid hsl(43, 74%, 49%, 0.3)',
              }}
            >
              #{timeSlot.hour}
            </div>
          </div>
          <div
            style={{
              padding: '4px 12px',
              background: 'hsl(43, 74%, 49%, 0.15)',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 600,
              color: 'hsl(43, 80%, 65%)',
              border: '1px solid hsl(43, 74%, 49%, 0.3)',
            }}
          >
            {dayName.split(' - ')[0]}
          </div>
        </div>
        <p
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: '12px',
            color: 'hsl(45, 10%, 50%)',
            margin: 0,
            fontStyle: 'italic',
          }}
        >
          Event order on the schedule • Lower number = Earlier in the day
        </p>
      </div>

      {/* Events Grid */}
      <div
        style={{
          display: 'grid',
          gap: '16px',
        }}
      >
        {timeSlot.events.map((event, index) => (
          <div
            key={event.id}
            style={{
              padding: '16px',
              background: 'linear-gradient(135deg, hsl(0, 0%, 8%) 0%, hsl(0, 0%, 6%) 100%)',
              borderRadius: '12px',
              border: '1px solid hsl(43, 30%, 20%)',
              transition: 'all 0.3s ease',
              animation: `fadeIn 0.3s ease-out ${index * 0.1}s both`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'hsl(43, 74%, 49%)';
              e.currentTarget.style.boxShadow = '0 0 20px hsl(43, 74%, 49%, 0.2)';
              e.currentTarget.style.transform = 'translateX(5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'hsl(43, 30%, 20%)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            {/* Event Type Badge */}
            <div
              style={{
                display: 'inline-block',
                padding: '2px 8px',
                marginBottom: '8px',
                background: event.type === 'technical' 
                  ? 'hsl(200, 80%, 40%, 0.2)' 
                  : 'hsl(340, 80%, 50%, 0.2)',
                color: event.type === 'technical' 
                  ? 'hsl(200, 80%, 60%)' 
                  : 'hsl(340, 80%, 70%)',
                borderRadius: '4px',
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              {event.type}
            </div>
            
            {/* Event Name */}
            <h3
              style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '16px',
                fontWeight: 600,
                color: 'hsl(45, 30%, 90%)',
                marginBottom: '6px',
              }}
            >
              {event.name}
            </h3>
            
            {/* Event Description */}
            <p
              style={{
                fontSize: '14px',
                color: 'hsl(45, 10%, 60%)',
                marginBottom: '10px',
                lineHeight: 1.4,
              }}
            >
              {event.description}
            </p>
            
            {/* Venue */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                color: 'hsl(43, 74%, 49%)',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              {event.venue}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventDisplay;
