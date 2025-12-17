import React from 'react';

interface ClockNumberProps {
  number: number;
  angle: number;
  radius: number;
  isActive: boolean;
  hasEvents: boolean;
  onClick: () => void;
}

const ClockNumber: React.FC<ClockNumberProps> = ({
  number,
  angle,
  radius,
  isActive,
  hasEvents,
  onClick
}) => {
  // Calculate position
  const x = Math.sin((angle * Math.PI) / 180) * radius;
  const y = -Math.cos((angle * Math.PI) / 180) * radius;

  return (
    <button
      onClick={onClick}
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
        width: '48px',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Orbitron, sans-serif',
        fontSize: '18px',
        fontWeight: isActive ? 700 : 500,
        color: isActive ? 'hsl(43, 74%, 49%)' : hasEvents ? 'hsl(45, 30%, 90%)' : 'hsl(0, 0%, 70%)',
        background: isActive 
          ? 'radial-gradient(circle, hsl(43, 74%, 49%, 0.3) 0%, hsl(0, 0%, 0%, 0.4) 70%)'
          : 'radial-gradient(circle, hsl(0, 0%, 0%, 0.3) 0%, transparent 70%)',
        border: 'none',
        borderRadius: '50%',
        cursor: hasEvents ? 'pointer' : 'default',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        textShadow: isActive 
          ? '0 0 20px hsl(43, 100%, 50%), 0 0 40px hsl(43, 100%, 50%, 0.5), 2px 2px 4px hsl(0, 0%, 0%, 0.8)'
          : hasEvents 
            ? '0 0 10px hsl(43, 74%, 49%, 0.3), 2px 2px 4px hsl(0, 0%, 0%, 0.8)'
            : '2px 2px 4px hsl(0, 0%, 0%, 0.8)',
        zIndex: 20,
      }}
      onMouseEnter={(e) => {
        if (hasEvents) {
          e.currentTarget.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1.2)`;
          e.currentTarget.style.color = 'hsl(43, 80%, 60%)';
          e.currentTarget.style.textShadow = '0 0 25px hsl(43, 100%, 50%), 0 0 50px hsl(43, 100%, 50%, 0.5)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1)`;
        e.currentTarget.style.color = isActive ? 'hsl(43, 74%, 49%)' : hasEvents ? 'hsl(45, 30%, 80%)' : 'hsl(0, 0%, 50%)';
        e.currentTarget.style.textShadow = isActive 
          ? '0 0 20px hsl(43, 100%, 50%), 0 0 40px hsl(43, 100%, 50%, 0.5)'
          : hasEvents 
            ? '0 0 10px hsl(43, 74%, 49%, 0.3)'
            : 'none';
      }}
    >
      {number}
      {hasEvents && (
        <span
          style={{
            position: 'absolute',
            bottom: '-2px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '6px',
            height: '6px',
            backgroundColor: isActive ? 'hsl(43, 74%, 49%)' : 'hsl(30, 60%, 40%)',
            borderRadius: '50%',
            boxShadow: isActive ? '0 0 8px hsl(43, 100%, 50%)' : 'none',
          }}
        />
      )}
    </button>
  );
};

export default ClockNumber;
