import { useState } from "react";
import { Event } from "./EventGrid";
import { Category, Day } from "./EventPage";
import { eventRules } from "./eventRules";
import { 
  FileText, Code, Mic, Brain, Eye, HelpCircle, 
  Laptop, Zap, Wrench, Timer, Search, Sparkles,
  Users, Film, Tv, MapPin, Theater, DoorOpen, 
  Dice1, Trophy, Microscope, Gamepad2, Target, Swords, Crown,
  X, Award, Clock, Phone, BookOpen
} from "lucide-react";

interface EventCardProps {
  event: Event;
  index: number;
  category: Category;
  day: Day;
}

const categoryColors: Record<Category, { primary: string; secondary: string; light: string }> = {
  flagship: { primary: '#b45309', secondary: '#ea580c', light: 'rgba(180, 83, 9, 0.1)' },
  technical: { primary: '#0369a1', secondary: '#0284c7', light: 'rgba(3, 105, 161, 0.1)' },
  'non-technical': { primary: '#be185d', secondary: '#e11d48', light: 'rgba(190, 24, 93, 0.1)' },
  games: { primary: '#047857', secondary: '#059669', light: 'rgba(4, 120, 87, 0.1)' },
};

const getEventIcon = (eventName: string): React.ElementType => {
  const iconMap: Record<string, React.ElementType> = {
    "Paper Presentation": FileText,
    "Rapid Coding": Zap,
    "Seminar": Mic,
    "Technical Quiz": Brain,
    "Logic/Puzzle Coding": Brain,
    "Blind Coding": Eye,
    "Missing Code": HelpCircle,
    "Project Expo": Laptop,
    "Relay Coding": Users,
    "Workshop": Wrench,
    "Code Golf": Target,
    "Tik Tik Tik": Timer,
    "Code Hunt": Search,
    "Prompt Masters": Sparkles,
    "Squid Game": Dice1,
    "Connexion": Users,
    "Kollywood Quiz": Film,
    "Anime Quiz": Tv,
    "Treasure Hunt": MapPin,
    "DumbCharders": Theater,
    "Escape the Room": DoorOpen,
    "Maathi Yoshi": Dice1,
    "IPL Auction": Trophy,
    "Detecting Crime": Microscope,
    "BGMI": Gamepad2,
    "Free Fire": Swords,
    "Carrom": Target,
    "E-Football": Trophy,
    "Chess": Crown,
  };
  return iconMap[eventName] || Code;
};

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// Sample event details - you can modify these
const eventDetails: Record<string, { time: string; venue: string; prizes: { first: string; second: string; third: string } }> = {
  'paper-presentation': { time: '10:00 AM - 12:00 PM', venue: 'Seminar Hall A', prizes: { first: '₹5000', second: '₹3000', third: '₹1500' } },
  'rapid-coding': { time: '2:00 PM - 4:00 PM', venue: 'Computer Lab 1', prizes: { first: '₹4000', second: '₹2500', third: '₹1000' } },
  'seminar': { time: '11:00 AM - 1:00 PM', venue: 'Main Auditorium', prizes: { first: 'Certificate', second: 'Certificate', third: 'Certificate' } },
  'technical-quiz': { time: '10:30 AM - 12:30 PM', venue: 'Room 201', prizes: { first: '₹3000', second: '₹2000', third: '₹1000' } },
  'logic-puzzle-coding': { time: '3:00 PM - 5:00 PM', venue: 'Computer Lab 2', prizes: { first: '₹3500', second: '₹2000', third: '₹1000' } },
  'blind-coding': { time: '1:00 PM - 3:00 PM', venue: 'Computer Lab 1', prizes: { first: '₹3000', second: '₹1500', third: '₹750' } },
  'missing-code': { time: '4:00 PM - 5:30 PM', venue: 'Computer Lab 3', prizes: { first: '₹2500', second: '₹1500', third: '₹750' } },
  'squid-game': { time: '2:00 PM - 5:00 PM', venue: 'Ground Floor', prizes: { first: '₹4000', second: '₹2500', third: '₹1500' } },
  'connexion': { time: '11:00 AM - 1:00 PM', venue: 'Conference Room', prizes: { first: 'Networking Pass', second: 'Networking Pass', third: 'Networking Pass' } },
  'kollywood-quiz': { time: '3:30 PM - 5:00 PM', venue: 'Room 105', prizes: { first: '₹2000', second: '₹1200', third: '₹600' } },
  'anime-quiz': { time: '2:00 PM - 3:30 PM', venue: 'Room 106', prizes: { first: '₹2000', second: '₹1200', third: '₹600' } },
  'treasure-hunt': { time: '10:00 AM - 1:00 PM', venue: 'Campus Wide', prizes: { first: '₹5000', second: '₹3000', third: '₹1500' } },
  'bgmi': { time: '10:00 AM - 6:00 PM', venue: 'Gaming Arena', prizes: { first: '₹6000', second: '₹3500', third: '₹2000' } },
  'free-fire': { time: '11:00 AM - 5:00 PM', venue: 'Gaming Arena', prizes: { first: '₹5000', second: '₹3000', third: '₹1500' } },
  'carrom': { time: '2:00 PM - 5:00 PM', venue: 'Recreation Room', prizes: { first: '₹1500', second: '₹1000', third: '₹500' } },
  'project-expo': { time: '9:00 AM - 4:00 PM', venue: 'Exhibition Hall', prizes: { first: '₹10000', second: '₹6000', third: '₹3000' } },
  'relay-coding': { time: '2:00 PM - 4:30 PM', venue: 'Computer Lab 1', prizes: { first: '₹4000', second: '₹2500', third: '₹1500' } },
  'workshop': { time: '10:00 AM - 4:00 PM', venue: 'Workshop Hall', prizes: { first: 'Certificate', second: 'Certificate', third: 'Certificate' } },
  'code-golf': { time: '11:00 AM - 1:00 PM', venue: 'Computer Lab 2', prizes: { first: '₹3000', second: '₹2000', third: '₹1000' } },
  'tik-tik-tik': { time: '3:00 PM - 4:30 PM', venue: 'Computer Lab 3', prizes: { first: '₹2500', second: '₹1500', third: '₹750' } },
  'code-hunt': { time: '1:30 PM - 3:30 PM', venue: 'Computer Lab 1', prizes: { first: '₹3000', second: '₹2000', third: '₹1000' } },
  'prompt-masters': { time: '4:00 PM - 5:30 PM', venue: 'AI Lab', prizes: { first: '₹3500', second: '₹2000', third: '₹1000' } },
  'dumbcharders': { time: '2:00 PM - 4:00 PM', venue: 'Room 103', prizes: { first: '₹2000', second: '₹1200', third: '₹600' } },
  'escape-the-room': { time: '10:00 AM - 5:00 PM', venue: 'Mystery Room', prizes: { first: '₹3500', second: '₹2000', third: '₹1000' } },
  'maathi-yoshi': { time: '3:00 PM - 5:00 PM', venue: 'Room 104', prizes: { first: '₹2000', second: '₹1200', third: '₹600' } },
  'ipl-auction': { time: '11:00 AM - 2:00 PM', venue: 'Seminar Hall B', prizes: { first: '₹3000', second: '₹2000', third: '₹1000' } },
  'detecting-crime': { time: '1:00 PM - 4:00 PM', venue: 'Investigation Room', prizes: { first: '₹3000', second: '₹2000', third: '₹1000' } },
  'e-football': { time: '10:00 AM - 4:00 PM', venue: 'Gaming Arena', prizes: { first: '₹3000', second: '₹1800', third: '₹1000' } },
  'chess': { time: '10:00 AM - 3:00 PM', venue: 'Chess Room', prizes: { first: '₹2500', second: '₹1500', third: '₹800' } },
};

const defaultDetails = { time: '10:00 AM - 5:00 PM', venue: 'Main Campus', prizes: { first: '₹3000', second: '₹2000', third: '₹1000' } };

const styles = `
  @keyframes card-enter {
    0% { 
      transform: translateY(30px) scale(0.92); 
      opacity: 0; 
      filter: blur(8px);
    }
    100% { 
      transform: translateY(0) scale(1); 
      opacity: 1; 
      filter: blur(0);
    }
  }
  @keyframes icon-float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-4px) rotate(2deg); }
  }
  @keyframes modal-backdrop {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes modal-slide {
    from { 
      opacity: 0; 
      transform: scale(0.9) translateY(20px); 
    }
    to { 
      opacity: 1; 
      transform: scale(1) translateY(0); 
    }
  }
  @keyframes prize-shine {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(180, 83, 9, 0.3); }
    50% { box-shadow: 0 0 40px rgba(234, 88, 12, 0.5); }
  }
`;

export const EventCard = ({ event, index, category, day }: EventCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const Icon = getEventIcon(event.name);
  const colors = categoryColors[category];
  const slug = slugify(event.name);
  const rules = eventRules[slug] || ['Rules will be announced at the event.'];
  const details = eventDetails[slug] || defaultDetails;
  
  return (
    <>
      <style>{styles}</style>
      <div 
        style={{
          position: 'relative',
          background: 'linear-gradient(165deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
          borderRadius: 'clamp(14px, 3vw, 20px)',
          padding: 'clamp(16px, 4vw, 24px)',
          border: '1px solid rgba(120, 53, 15, 0.1)',
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          animation: `card-enter 0.6s ease-out ${index * 0.08}s backwards`,
          boxShadow: '0 4px 20px rgba(120, 53, 15, 0.06)',
        }}
        onMouseEnter={(e) => {
          const card = e.currentTarget;
          card.style.transform = 'translateY(-8px) scale(1.02)';
          card.style.borderColor = `${colors.primary}50`;
          card.style.boxShadow = `0 20px 50px ${colors.primary}20, inset 0 1px 0 rgba(255,255,255,0.9)`;
        }}
        onMouseLeave={(e) => {
          const card = e.currentTarget;
          card.style.transform = 'translateY(0) scale(1)';
          card.style.borderColor = 'rgba(120, 53, 15, 0.1)';
          card.style.boxShadow = '0 4px 20px rgba(120, 53, 15, 0.06)';
        }}
      >
        {/* Corner accent */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 'clamp(50px, 15vw, 80px)',
            height: 'clamp(50px, 15vw, 80px)',
            background: `linear-gradient(135deg, ${colors.light} 0%, transparent 60%)`,
            borderRadius: '0 20px 0 80px',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 'clamp(12px, 3vw, 16px)' }}>
          {/* Icon Container */}
          <div style={{ position: 'relative' }}>
            <div 
              style={{
                position: 'absolute',
                inset: '-8px',
                background: `radial-gradient(circle, ${colors.primary}20 0%, transparent 70%)`,
                borderRadius: '50%',
                filter: 'blur(12px)',
                animation: 'icon-float 4s ease-in-out infinite',
              }}
            />
            <div 
              style={{
                position: 'relative',
                width: 'clamp(50px, 12vw, 64px)',
                height: 'clamp(50px, 12vw, 64px)',
                borderRadius: 'clamp(12px, 3vw, 18px)',
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 8px 25px ${colors.primary}35`,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              <Icon style={{ width: 'clamp(24px, 6vw, 32px)', height: 'clamp(24px, 6vw, 32px)', color: '#ffffff' }} />
            </div>
          </div>
          
          {/* Text Content */}
          <div>
            <h3 
              style={{
                fontWeight: 700,
                fontSize: 'clamp(0.9rem, 2.5vw, 1.15rem)',
                color: '#3d2914',
                marginBottom: '6px',
                transition: 'color 0.3s ease',
                lineHeight: 1.3,
              }}
            >
              {event.name}
            </h3>
            {event.description && (
              <p 
                style={{
                  fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                  color: '#78716c',
                  lineHeight: 1.5,
                }}
              >
                {event.description}
              </p>
            )}
          </div>

          {/* Image Placeholder */}
          <div 
            style={{
              width: '100%',
              aspectRatio: '4/3',
              background: 'linear-gradient(145deg, #f5f0e6 0%, #ede4d3 100%)',
              borderRadius: 'clamp(10px, 2vw, 14px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(120, 53, 15, 0.08)',
              overflow: 'hidden',
              position: 'relative',
              transition: 'border-color 0.3s ease',
            }}
          >
            <div 
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(135deg, ${colors.primary}06 0%, transparent 50%)`,
              }}
            />
            <span 
              style={{ 
                fontSize: 'clamp(0.65rem, 1.5vw, 0.75rem)', 
                color: '#a8a29e',
                position: 'relative',
                zIndex: 1,
              }}
            >
              Event Image
            </span>
          </div>

          {/* Rules Button */}
          <button
            type="button"
            onClick={() => setShowModal(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: 'clamp(10px, 2vw, 14px) clamp(20px, 4vw, 28px)',
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
              borderRadius: '50px',
              border: 'none',
              fontSize: 'clamp(0.75rem, 2vw, 0.9rem)',
              fontWeight: 700,
              color: '#ffffff',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              cursor: 'pointer',
              boxShadow: `0 4px 15px ${colors.primary}40`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = `0 8px 25px ${colors.primary}50`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = `0 4px 15px ${colors.primary}40`;
            }}
          >
            <BookOpen style={{ width: '16px', height: '16px' }} />
            Rules
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: 'clamp(12px, 3vw, 24px)',
            animation: 'modal-backdrop 0.3s ease-out',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '500px',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: 'linear-gradient(180deg, #fffbf5 0%, #fff8f0 100%)',
              borderRadius: 'clamp(16px, 4vw, 24px)',
              border: `2px solid ${colors.primary}30`,
              boxShadow: `0 25px 80px rgba(0, 0, 0, 0.3), 0 0 0 1px ${colors.primary}10`,
              animation: 'modal-slide 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                position: 'sticky',
                top: 0,
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                padding: 'clamp(20px, 4vw, 28px)',
                borderRadius: 'clamp(14px, 4vw, 22px) clamp(14px, 4vw, 22px) 0 0',
                textAlign: 'center',
                zIndex: 1,
              }}
            >
              <button
                onClick={() => setShowModal(false)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                  e.currentTarget.style.transform = 'rotate(90deg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.transform = 'rotate(0deg)';
                }}
              >
                <X style={{ width: '20px', height: '20px', color: '#ffffff' }} />
              </button>
              <div
                style={{
                  width: 'clamp(50px, 12vw, 70px)',
                  height: 'clamp(50px, 12vw, 70px)',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                  animation: 'pulse-glow 2s ease-in-out infinite',
                }}
              >
                <Icon style={{ width: 'clamp(28px, 7vw, 36px)', height: 'clamp(28px, 7vw, 36px)', color: '#ffffff' }} />
              </div>
              <h2
                style={{
                  color: '#ffffff',
                  fontSize: 'clamp(1.2rem, 4vw, 1.6rem)',
                  fontWeight: 800,
                  margin: 0,
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                }}
              >
                {event.name}
              </h2>
            </div>

            {/* Modal Content */}
            <div style={{ padding: 'clamp(16px, 4vw, 24px)' }}>
              {/* Prize Section */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                  borderRadius: '16px',
                  padding: 'clamp(16px, 3vw, 20px)',
                  marginBottom: '16px',
                  border: '2px solid #f59e0b30',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <Award style={{ width: '22px', height: '22px', color: '#b45309' }} />
                  <h3 style={{ margin: 0, fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', fontWeight: 700, color: '#78350f' }}>
                    Prize Pool
                  </h3>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '12px' }}>
                  {/* 1st Prize */}
                  <div style={{ textAlign: 'center', minWidth: '80px' }}>
                    <div
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #ffd700 0%, #ffb347 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 8px',
                        boxShadow: '0 4px 15px rgba(255, 215, 0, 0.4)',
                        fontSize: '20px',
                        fontWeight: 800,
                        color: '#78350f',
                      }}
                    >
                      🥇
                    </div>
                    <div style={{ fontSize: 'clamp(0.7rem, 1.8vw, 0.8rem)', color: '#78350f', fontWeight: 600 }}>1st Place</div>
                    <div style={{ fontSize: 'clamp(1rem, 3vw, 1.3rem)', fontWeight: 800, color: '#b45309' }}>{details.prizes.first}</div>
                  </div>
                  {/* 2nd Prize */}
                  <div style={{ textAlign: 'center', minWidth: '80px' }}>
                    <div
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #c0c0c0 0%, #a8a8a8 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 8px',
                        boxShadow: '0 4px 15px rgba(192, 192, 192, 0.4)',
                        fontSize: '20px',
                        fontWeight: 800,
                      }}
                    >
                      🥈
                    </div>
                    <div style={{ fontSize: 'clamp(0.7rem, 1.8vw, 0.8rem)', color: '#78350f', fontWeight: 600 }}>2nd Place</div>
                    <div style={{ fontSize: 'clamp(1rem, 3vw, 1.3rem)', fontWeight: 800, color: '#78716c' }}>{details.prizes.second}</div>
                  </div>
                  {/* 3rd Prize */}
                  <div style={{ textAlign: 'center', minWidth: '80px' }}>
                    <div
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #cd7f32 0%, #b87333 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 8px',
                        boxShadow: '0 4px 15px rgba(205, 127, 50, 0.4)',
                        fontSize: '20px',
                        fontWeight: 800,
                      }}
                    >
                      🥉
                    </div>
                    <div style={{ fontSize: 'clamp(0.7rem, 1.8vw, 0.8rem)', color: '#78350f', fontWeight: 600 }}>3rd Place</div>
                    <div style={{ fontSize: 'clamp(1rem, 3vw, 1.3rem)', fontWeight: 800, color: '#a16207' }}>{details.prizes.third}</div>
                  </div>
                </div>
              </div>

              {/* Time & Venue */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                <div
                  style={{
                    background: `linear-gradient(135deg, ${colors.light} 0%, ${colors.primary}08 100%)`,
                    borderRadius: '12px',
                    padding: 'clamp(12px, 2.5vw, 16px)',
                    border: `1px solid ${colors.primary}20`,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <Clock style={{ width: '16px', height: '16px', color: colors.primary }} />
                    <span style={{ fontSize: 'clamp(0.7rem, 1.8vw, 0.8rem)', fontWeight: 700, color: colors.primary }}>TIME</span>
                  </div>
                  <div style={{ fontSize: 'clamp(0.8rem, 2vw, 0.95rem)', fontWeight: 600, color: '#3d2914' }}>{details.time}</div>
                </div>
                <div
                  style={{
                    background: `linear-gradient(135deg, ${colors.light} 0%, ${colors.primary}08 100%)`,
                    borderRadius: '12px',
                    padding: 'clamp(12px, 2.5vw, 16px)',
                    border: `1px solid ${colors.primary}20`,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <MapPin style={{ width: '16px', height: '16px', color: colors.primary }} />
                    <span style={{ fontSize: 'clamp(0.7rem, 1.8vw, 0.8rem)', fontWeight: 700, color: colors.primary }}>VENUE</span>
                  </div>
                  <div style={{ fontSize: 'clamp(0.8rem, 2vw, 0.95rem)', fontWeight: 600, color: '#3d2914' }}>{details.venue}</div>
                </div>
              </div>

              {/* Rules Section */}
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  padding: 'clamp(14px, 3vw, 18px)',
                  marginBottom: '16px',
                  border: '1px solid rgba(120, 53, 15, 0.1)',
                  boxShadow: '0 2px 10px rgba(120, 53, 15, 0.05)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <BookOpen style={{ width: '18px', height: '18px', color: colors.primary }} />
                  <h3 style={{ margin: 0, fontSize: 'clamp(0.9rem, 2.2vw, 1rem)', fontWeight: 700, color: '#3d2914' }}>
                    Rules & Guidelines
                  </h3>
                </div>
                <ul style={{ margin: 0, paddingLeft: '20px', listStyle: 'none' }}>
                  {rules.map((rule, i) => (
                    <li
                      key={i}
                      style={{
                        position: 'relative',
                        paddingLeft: '8px',
                        marginBottom: '10px',
                        fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                        color: '#57534e',
                        lineHeight: 1.6,
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          left: '-16px',
                          top: '6px',
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                        }}
                      />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Section */}
              <div
                style={{
                  background: `linear-gradient(135deg, ${colors.primary}10 0%, ${colors.secondary}10 100%)`,
                  borderRadius: '12px',
                  padding: 'clamp(14px, 3vw, 18px)',
                  border: `1px solid ${colors.primary}20`,
                  marginBottom: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <Phone style={{ width: '18px', height: '18px', color: colors.primary }} />
                  <h3 style={{ margin: 0, fontSize: 'clamp(0.9rem, 2.2vw, 1rem)', fontWeight: 700, color: '#3d2914' }}>
                    Contact Coordinators
                  </h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div
                    style={{
                      background: '#ffffff',
                      borderRadius: '10px',
                      padding: '12px',
                      textAlign: 'center',
                      border: '1px solid rgba(120, 53, 15, 0.1)',
                    }}
                  >
                    <div style={{ fontSize: 'clamp(0.75rem, 1.8vw, 0.85rem)', fontWeight: 600, color: '#3d2914', marginBottom: '4px' }}>
                      Coordinator 1
                    </div>
                    <div style={{ fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', fontWeight: 700, color: colors.primary }}>
                      XXXX XXXX XX
                    </div>
                  </div>
                  <div
                    style={{
                      background: '#ffffff',
                      borderRadius: '10px',
                      padding: '12px',
                      textAlign: 'center',
                      border: '1px solid rgba(120, 53, 15, 0.1)',
                    }}
                  >
                    <div style={{ fontSize: 'clamp(0.75rem, 1.8vw, 0.85rem)', fontWeight: 600, color: '#3d2914', marginBottom: '4px' }}>
                      Coordinator 2
                    </div>
                    <div style={{ fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', fontWeight: 700, color: colors.primary }}>
                      XXXX XXXX XX
                    </div>
                  </div>
                </div>
              </div>

              {/* Register Button */}
              <button
                type="button"
                onClick={() => {/* Registration logic will be added */}}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  padding: 'clamp(14px, 3vw, 18px)',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  borderRadius: '14px',
                  border: 'none',
                  fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(16, 185, 129, 0.4)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02) translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(16, 185, 129, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.4)';
                }}
              >
                <Users style={{ width: '20px', height: '20px' }} />
                Register Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
