import React, { useState, useMemo, useEffect, useRef } from 'react';
import ClockNumber from './ClockNumber';
import ClockHands from './ClockHands';
import GearMechanism from './GearMechanism';
import EventDisplay from './EventDisplay';
import DaySelector from './DaySelector';
import { eventSchedule } from './eventData';
import { TimeSlot } from './types';

const WatchClock: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<1 | 2>(1);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialized = useRef(false);

  const currentDaySchedule = useMemo(() => {
    return eventSchedule.find(d => d.day === selectedDay)!;
  }, [selectedDay]);

  const selectedTimeSlot: TimeSlot | null = useMemo(() => {
    if (selectedHour === null) return null;
    return currentDaySchedule.timeSlots.find(ts => ts.hour === selectedHour) || null;
  }, [selectedHour, currentDaySchedule]);

  const hasEventsAtHour = (hour: number): boolean => {
    return currentDaySchedule.timeSlots.some(ts => ts.hour === hour);
  };

  // Initialize on mount - start from hour 1
  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      setSelectedHour(1);
    }
  }, []);

  // Auto-advance to next hour after 3 seconds
  useEffect(() => {
    if (selectedHour !== null) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set timeout to move to next hour after 3 seconds
      timeoutRef.current = setTimeout(() => {
        const nextHour = selectedHour === 12 ? 1 : selectedHour + 1;
        setSelectedHour(nextHour);
      }, 3000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [selectedHour]);

  // Clock radius calculation for responsive design
  const clockRadius = 130; // Base radius for number positioning

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        background: 'radial-gradient(ellipse at center, hsl(0, 0%, 8%) 0%, hsl(0, 0%, 3%) 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        gap: '30px',
      }}
    >
      {/* Title */}
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: 'clamp(24px, 5vw, 42px)',
            fontWeight: 800,
            color: 'hsl(43, 74%, 49%)',
            textShadow: '0 0 30px hsl(43, 100%, 50%, 0.5), 0 0 60px hsl(43, 100%, 50%, 0.3)',
            letterSpacing: '4px',
            marginBottom: '8px',
          }}
        >
          ASTRANOVA 2024
        </h1>
        <p
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: 'clamp(14px, 2.5vw, 18px)',
            color: 'hsl(45, 10%, 55%)',
            letterSpacing: '2px',
          }}
        >
          Technical & Cultural Fest
        </p>
      </div>

      {/* Day Selector */}
      <DaySelector selectedDay={selectedDay} onDayChange={(day) => {
        setSelectedDay(day);
        setSelectedHour(null);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      }} />

      {/* Main Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '30px',
          width: '100%',
          maxWidth: '1200px',
        }}
        className="lg:flex-row lg:items-start lg:justify-center"
      >
        {/* Watch Container */}
        <div
          style={{
            position: 'relative',
            width: 'min(380px, 90vw)',
            height: 'min(380px, 90vw)',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, hsl(0, 0%, 15%) 0%, hsl(0, 0%, 5%) 100%)',
            boxShadow: `
              0 0 0 8px hsl(43, 50%, 25%),
              0 0 0 12px hsl(0, 0%, 10%),
              0 0 0 16px hsl(43, 40%, 20%),
              0 0 60px hsl(43, 74%, 49%, 0.2),
              inset 0 0 80px hsl(0, 0%, 0%, 0.8)
            `,
          }}
        >
          {/* Gear Mechanism Background */}
          <GearMechanism />
          
          {/* Clock Face Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: '15%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, hsl(0, 0%, 18%) 0%, hsl(0, 0%, 12%) 100%)',
              boxShadow: 'inset 0 0 40px hsl(0, 0%, 0%, 0.3)',
              zIndex: 10,
            }}
          />
          
          {/* Hour Markers */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 11,
            }}
          >
            {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, index) => {
              const hour = num === 12 ? 12 : num;

              const angle = index * 30; // 30 degrees per hour
              
              return (
                <ClockNumber
                  key={num}
                  number={num}
                  angle={angle}
                  radius={clockRadius}
                  isActive={selectedHour === hour}
                  hasEvents={hasEventsAtHour(hour)}
                  onClick={() => {
                    if (hasEventsAtHour(hour)) {
                      setSelectedHour(hour);
                    }
                  }}
                />
              );
            })}
          </div>
          
          {/* Clock Hands */}
          <ClockHands selectedHour={selectedHour || 1} />
          
          {/* Watch Crown (side button) */}
          <div
            style={{
              position: 'absolute',
              right: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '24px',
              height: '40px',
              background: 'linear-gradient(90deg, hsl(43, 50%, 30%) 0%, hsl(43, 74%, 45%) 50%, hsl(43, 50%, 30%) 100%)',
              borderRadius: '4px',
              boxShadow: '2px 0 10px hsl(0, 0%, 0%, 0.5)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: '4px 2px',
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(43, 40%, 25%) 2px, hsl(43, 40%, 25%) 4px)',
                borderRadius: '2px',
              }}
            />
          </div>
          
          {/* Inner decorative ring */}
          <div
            style={{
              position: 'absolute',
              inset: '8%',
              borderRadius: '50%',
              border: '1px solid hsl(43, 30%, 20%)',
              pointerEvents: 'none',
              zIndex: 5,
            }}
          />
          
          {/* Minute markers */}
          {Array.from({ length: 60 }).map((_, i) => {
            const isMajor = i % 5 === 0;
            const angle = (i / 60) * 360;
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '12%',
                  width: isMajor ? '3px' : '2px',
                  height: isMajor ? '14px' : '8px',
                  background: isMajor ? 'hsl(43, 80%, 55%)' : 'hsl(43, 50%, 45%)',
                  transformOrigin: `center ${(50 - 12)}vmin`,
                  transform: `translateX(-50%) rotate(${angle}deg)`,
                  zIndex: 12,
                  opacity: 1,
                  boxShadow: isMajor ? '0 0 4px hsl(43, 80%, 55%, 0.5)' : 'none',
                }}
              />
            );
          })}
        </div>

        {/* Event Display Panel */}
        <div
          style={{
            width: '100%',
            maxWidth: '400px',
            minHeight: '300px',
            background: 'linear-gradient(180deg, hsl(0, 0%, 6%) 0%, hsl(0, 0%, 4%) 100%)',
            borderRadius: '16px',
            border: '1px solid hsl(43, 30%, 20%)',
            boxShadow: '0 10px 40px hsl(0, 0%, 0%, 0.5)',
            overflow: 'hidden',
          }}
        >
          <EventDisplay 
            timeSlot={selectedTimeSlot} 
            dayName={currentDaySchedule.name}
          />
        </div>
      </div>

      {/* Footer Info */}
      <div
        style={{
          textAlign: 'center',
          marginTop: '20px',
        }}
      >
        <p
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: '14px',
            color: 'hsl(45, 10%, 40%)',
          }}
        >
          Click on the clock numbers to explore events by priority
        </p>
      </div>
    </div>
  );
};

export default WatchClock;
