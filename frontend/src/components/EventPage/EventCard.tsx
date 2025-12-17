import { Event } from "./EventGrid";
import { Category } from "./EventPage";
import { useNavigate } from 'react-router-dom';
import { 
  FileText, Code, Mic, Brain, Eye, HelpCircle, 
  Laptop, Zap, Wrench, Timer, Search, Sparkles,
  Users, Film, Tv, MapPin, Theater, DoorOpen, 
  Dice1, Trophy, Microscope, Gamepad2, Target, Swords, Crown
} from "lucide-react";

interface EventCardProps {
  event: Event;
  index: number;
  category: Category;
  day: import("./EventPage").Day;
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
`;

export const EventCard = ({ event, index, category, day }: EventCardProps) => {
  const navigate = useNavigate();
  const Icon = getEventIcon(event.name);
  const colors = categoryColors[category];
  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
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
          cursor: 'pointer',
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
            {/* Glow behind icon */}
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

          {/* Category / Register Button */}
          <button
            type="button"
            onClick={() => {
              if (category === 'flagship') {
                const slug = slugify(event.name);
                navigate(`/events/${day}/${category}/${slug}`);
              }
            }}
            aria-label={category === 'flagship' ? 'View rules for event' : `${category} category`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: 'clamp(6px, 1.5vw, 8px) clamp(12px, 2.5vw, 16px)',
              background: colors.light,
              borderRadius: '50px',
              border: `1px solid ${colors.primary}25`,
              fontSize: 'clamp(0.65rem, 1.5vw, 0.75rem)',
              fontWeight: 600,
              color: colors.primary,
              textTransform: 'capitalize',
              transition: 'all 0.15s ease',
              cursor: 'pointer',
            }}
          >
            <span 
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: colors.primary,
                boxShadow: `0 0 6px ${colors.primary}`,
              }}
            />
            {category === 'flagship' ? 'Rules' : category}
          </button>
        </div>
      </div>
    </>
  );
};
