const styles = `
  @keyframes title-glow {
    0%, 100% { 
      text-shadow: 0 4px 20px rgba(180, 83, 9, 0.2);
      filter: brightness(1);
    }
    50% { 
      text-shadow: 0 4px 30px rgba(180, 83, 9, 0.35);
      filter: brightness(1.05);
    }
  }
  @keyframes subtitle-slide {
    from { 
      opacity: 0; 
      transform: translateY(20px); 
      filter: blur(8px);
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
      filter: blur(0);
    }
  }
  @keyframes scale-in {
    from { 
      opacity: 0; 
      transform: scale(0.85); 
      filter: blur(15px);
    }
    to { 
      opacity: 1; 
      transform: scale(1); 
      filter: blur(0);
    }
  }
  @keyframes sparkle {
    0%, 100% { opacity: 0.4; transform: scale(1) rotate(0deg); }
    50% { opacity: 1; transform: scale(1.3) rotate(180deg); }
  }
`;

export const EventHeader = () => {
  return (
    <>
      <style>{styles}</style>
      <div 
        style={{
          textAlign: 'center',
          paddingTop: 'clamp(80px, 12vw, 120px)',
          position: 'relative',
          paddingLeft: 'clamp(16px, 4vw, 24px)',
          paddingRight: 'clamp(16px, 4vw, 24px)',
        }}
      >
        {/* Decorative top line */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'min(200px, 50vw)',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #b45309, #ea580c, transparent)',
            borderRadius: '2px',
          }}
        />
        
        {/* Sparkle decorations */}
        <div style={{ position: 'absolute', top: '20px', left: '15%', animation: 'sparkle 2.5s ease-in-out infinite' }}>
          <span style={{ color: '#b45309', fontSize: 'clamp(14px, 3vw, 20px)' }}>✦</span>
        </div>
        <div style={{ position: 'absolute', top: '35px', right: '20%', animation: 'sparkle 2.5s ease-in-out infinite 0.7s' }}>
          <span style={{ color: '#ea580c', fontSize: 'clamp(12px, 2.5vw, 16px)' }}>✦</span>
        </div>
        <div style={{ position: 'absolute', top: '50px', left: '25%', animation: 'sparkle 2.5s ease-in-out infinite 1.2s' }}>
          <span style={{ color: '#78350f', fontSize: 'clamp(10px, 2vw, 12px)' }}>✦</span>
        </div>

        <h1 
          style={{
            fontSize: 'clamp(2rem, 10vw, 5rem)',
            fontWeight: 900,
            letterSpacing: '-1px',
            background: 'linear-gradient(135deg, #78350f 0%, #b45309 35%, #ea580c 65%, #d97706 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'scale-in 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards, title-glow 3s ease-in-out infinite 1s',
            fontFamily: "'Playfair Display', Georgia, serif",
            marginBottom: 'clamp(8px, 2vw, 16px)',
          }}
        >
          ASTRANOVA
        </h1>
        
        <p 
          style={{
            fontSize: 'clamp(0.85rem, 3vw, 1.25rem)',
            color: '#78350f',
            fontWeight: 500,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            animation: 'subtitle-slide 0.8s ease-out 0.3s backwards',
            fontFamily: "'Montserrat', sans-serif",
            marginBottom: 'clamp(12px, 3vw, 20px)',
          }}
        >
          <span style={{ color: '#b45309' }}>✧</span>
          {' '}Explore Events{' '}
          <span style={{ color: '#ea580c' }}>✧</span>
        </p>

        {/* Bottom decorative line */}
        <div 
          style={{
            width: 'min(120px, 30vw)',
            height: '3px',
            margin: '0 auto',
            background: 'linear-gradient(90deg, #b45309, #ea580c)',
            borderRadius: '3px',
            animation: 'subtitle-slide 0.8s ease-out 0.5s backwards',
            boxShadow: '0 2px 12px rgba(180, 83, 9, 0.3)',
          }}
        />
      </div>
    </>
  );
};
