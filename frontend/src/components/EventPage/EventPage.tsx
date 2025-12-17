import { useState } from "react";
import { EventHeader } from "./EventHeader";
import { DaySelector } from "./DaySelector";
import { CategoryTabs } from "./CategoryTabs";
import { EventGrid } from "./EventGrid";
import { eventsData } from "./eventsData";

export type Day = "day1" | "day2";
export type Category = "flagship" | "technical" | "non-technical" | "games";

const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(2deg); }
  }
  @keyframes pulse-glow {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.05); }
  }
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes border-dance {
    0%, 100% { border-color: rgba(180, 83, 9, 0.2); }
    50% { border-color: rgba(234, 88, 12, 0.4); }
  }
`;

const EventPage = () => {
  const [selectedDay, setSelectedDay] = useState<Day>("day1");
  const [selectedCategory, setSelectedCategory] = useState<Category>("flagship");

  const currentEvents = eventsData[selectedDay][selectedCategory] || [];

  return (
    <>
      <style>{styles}</style>
      <div 
        style={{ 
          minHeight: '100vh',
          overflow: 'hidden',
          position: 'relative',
          background: 'linear-gradient(145deg, #f5f0e6 0%, #ede4d3 50%, #f8f4ec 100%)',
        }}
      >
        {/* Animated background elements */}
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          {/* Warm terracotta orb */}
          <div 
            style={{
              position: 'absolute',
              top: '5%',
              left: '15%',
              width: 'min(350px, 50vw)',
              height: 'min(350px, 50vw)',
              background: 'radial-gradient(circle, rgba(234, 88, 12, 0.12) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(60px)',
              animation: 'float 8s ease-in-out infinite',
            }}
          />
          {/* Brown accent orb */}
          <div 
            style={{
              position: 'absolute',
              bottom: '15%',
              right: '10%',
              width: 'min(300px, 45vw)',
              height: 'min(300px, 45vw)',
              background: 'radial-gradient(circle, rgba(120, 53, 15, 0.1) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(80px)',
              animation: 'float 10s ease-in-out infinite 2s',
            }}
          />
          {/* Subtle golden accent */}
          <div 
            style={{
              position: 'absolute',
              top: '40%',
              right: '5%',
              width: 'min(180px, 30vw)',
              height: 'min(180px, 30vw)',
              background: 'radial-gradient(circle, rgba(217, 119, 6, 0.1) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(40px)',
              animation: 'pulse-glow 6s ease-in-out infinite',
            }}
          />
          {/* Subtle pattern overlay */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `radial-gradient(rgba(120, 53, 15, 0.03) 1px, transparent 1px)`,
              backgroundSize: '30px 30px',
            }}
          />
        </div>

        {/* Main content */}
        <div 
          style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: '1400px',
            margin: '0 auto',
            padding: 'clamp(16px, 4vw, 48px) clamp(12px, 3vw, 24px)',
          }}
        >
          {/* Header Section */}
          <div style={{ marginBottom: 'clamp(24px, 5vw, 40px)', animation: 'fade-in 0.8s ease-out forwards' }}>
            <EventHeader />
          </div>

          {/* Filters Section */}
          <div 
            style={{
              background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.7) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(180, 83, 9, 0.15)',
              borderRadius: 'clamp(16px, 3vw, 24px)',
              padding: 'clamp(16px, 4vw, 32px)',
              marginBottom: 'clamp(24px, 5vw, 40px)',
              boxShadow: '0 10px 40px rgba(120, 53, 15, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
              animation: 'fade-in 0.8s ease-out 0.2s backwards, border-dance 4s ease-in-out infinite',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(16px, 3vw, 24px)' }}>
              {/* Day Selector */}
              <div>
                <h3 
                  style={{
                    fontSize: 'clamp(10px, 1.5vw, 12px)',
                    fontWeight: 700,
                    color: '#b45309',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    marginBottom: '12px',
                  }}
                >
                  ✦ Select Day
                </h3>
                <DaySelector selectedDay={selectedDay} onDayChange={setSelectedDay} />
              </div>

              {/* Category Tabs */}
              <div style={{ borderTop: '1px solid rgba(180, 83, 9, 0.12)', paddingTop: 'clamp(16px, 3vw, 24px)' }}>
                <h3 
                  style={{
                    fontSize: 'clamp(10px, 1.5vw, 12px)',
                    fontWeight: 700,
                    color: '#92400e',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    marginBottom: '12px',
                  }}
                >
                  ✦ Event Category
                </h3>
                <CategoryTabs 
                  selectedCategory={selectedCategory} 
                  onCategoryChange={setSelectedCategory} 
                />
              </div>
            </div>
          </div>

          {/* Events Grid Section */}
          <div style={{ marginBottom: 'clamp(32px, 6vw, 48px)' }}>
            <div 
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '12px',
                marginBottom: 'clamp(16px, 3vw, 24px)',
                animation: 'fade-in 0.8s ease-out 0.4s backwards',
              }}
            >
              <h2 
                style={{
                  fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #78350f 0%, #b45309 50%, #ea580c 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Events
              </h2>
              <span 
                style={{
                  marginLeft: 'auto',
                  color: '#78350f',
                  fontWeight: 600,
                  fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                  padding: '6px 16px',
                  background: 'rgba(180, 83, 9, 0.1)',
                  borderRadius: '20px',
                  border: '1px solid rgba(180, 83, 9, 0.2)',
                }}
              >
                {currentEvents.length} events
              </span>
            </div>
            <EventGrid events={currentEvents} category={selectedCategory} day={selectedDay} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EventPage;
