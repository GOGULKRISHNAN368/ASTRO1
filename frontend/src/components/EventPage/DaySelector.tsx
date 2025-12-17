import { Day } from "./EventPage";

interface DaySelectorProps {
  selectedDay: Day;
  onDayChange: (day: Day) => void;
}

const styles = `
  @keyframes button-pop {
    0% { transform: scale(0.9); opacity: 0; }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes shimmer-move {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  @keyframes pulse-border {
    0%, 100% { box-shadow: 0 0 0 0 rgba(180, 83, 9, 0.4); }
    50% { box-shadow: 0 0 0 6px rgba(180, 83, 9, 0); }
  }
`;

export const DaySelector = ({ selectedDay, onDayChange }: DaySelectorProps) => {
  return (
    <>
      <style>{styles}</style>
      <div 
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'clamp(8px, 2vw, 16px)',
          flexWrap: 'wrap',
        }}
      >
        {(["day1", "day2"] as Day[]).map((day, index) => {
          const isSelected = selectedDay === day;
          return (
            <button
              key={day}
              onClick={() => onDayChange(day)}
              style={{
                position: 'relative',
                padding: 'clamp(10px, 2vw, 14px) clamp(24px, 5vw, 40px)',
                borderRadius: '14px',
                fontWeight: 700,
                fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
                cursor: 'pointer',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                animation: `button-pop 0.5s ease-out ${index * 0.1}s backwards`,
                transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                background: isSelected 
                  ? 'linear-gradient(135deg, #b45309 0%, #ea580c 100%)'
                  : 'linear-gradient(145deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
                border: isSelected 
                  ? '2px solid rgba(180, 83, 9, 0.8)' 
                  : '2px solid rgba(180, 83, 9, 0.2)',
                color: isSelected ? '#ffffff' : '#78350f',
                boxShadow: isSelected 
                  ? '0 8px 30px rgba(180, 83, 9, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
                  : '0 4px 15px rgba(120, 53, 15, 0.1)',
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.transform = 'scale(1.08) translateY(-2px)';
                  e.currentTarget.style.borderColor = 'rgba(180, 83, 9, 0.5)';
                  e.currentTarget.style.boxShadow = '0 12px 35px rgba(180, 83, 9, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.borderColor = 'rgba(180, 83, 9, 0.2)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(120, 53, 15, 0.1)';
                }
              }}
            >
              {/* Shimmer effect for selected */}
              {isSelected && (
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    overflow: 'hidden',
                    borderRadius: '12px',
                  }}
                >
                  <div 
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
                      animation: 'shimmer-move 2.5s infinite',
                    }}
                  />
                </div>
              )}
              
              {/* Glow effect */}
              {isSelected && (
                <div 
                  style={{
                    position: 'absolute',
                    inset: '-4px',
                    background: 'linear-gradient(135deg, rgba(180, 83, 9, 0.3) 0%, rgba(234, 88, 12, 0.2) 100%)',
                    borderRadius: '18px',
                    filter: 'blur(12px)',
                    zIndex: -1,
                    animation: 'pulse-border 2s ease-in-out infinite',
                  }}
                />
              )}
              
              <span style={{ position: 'relative', zIndex: 1 }}>
                {day === "day1" ? " Day 1" : " Day 2"}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
};
