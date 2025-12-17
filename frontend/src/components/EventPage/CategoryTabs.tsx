import { Category } from "./EventPage";
import { Code, Gamepad2, Trophy, Users } from "lucide-react";

interface CategoryTabsProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const categories: { key: Category; label: string; icon: React.ElementType; color: string; hoverBg: string }[] = [
  { key: "flagship", label: "Flagship", icon: Trophy, color: "#b45309", hoverBg: "rgba(180, 83, 9, 0.1)" },
  { key: "technical", label: "Technical", icon: Code, color: "#0369a1", hoverBg: "rgba(3, 105, 161, 0.1)" },
  { key: "non-technical", label: "Non-Technical", icon: Users, color: "#be185d", hoverBg: "rgba(190, 24, 93, 0.1)" },
  { key: "games", label: "Games", icon: Gamepad2, color: "#047857", hoverBg: "rgba(4, 120, 87, 0.1)" },
];

const styles = `
  @keyframes tab-enter {
    0% { transform: scale(0.85) translateY(8px); opacity: 0; }
    100% { transform: scale(1) translateY(0); opacity: 1; }
  }
  @keyframes icon-bounce {
    0%, 100% { transform: scale(1) rotate(0deg); }
    25% { transform: scale(1.15) rotate(-5deg); }
    75% { transform: scale(1.15) rotate(5deg); }
  }
  @keyframes ring-pulse {
    0% { transform: scale(1); opacity: 0.5; }
    100% { transform: scale(1.4); opacity: 0; }
  }
`;

export const CategoryTabs = ({ selectedCategory, onCategoryChange }: CategoryTabsProps) => {
  return (
    <>
      <style>{styles}</style>
      <div 
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 'clamp(6px, 1.5vw, 12px)',
        }}
      >
        {categories.map(({ key, label, icon: Icon, color, hoverBg }, index) => {
          const isSelected = selectedCategory === key;
          return (
            <button
              key={key}
              onClick={() => onCategoryChange(key)}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(6px, 1.5vw, 10px)',
                padding: 'clamp(8px, 2vw, 12px) clamp(14px, 3vw, 24px)',
                borderRadius: '50px',
                fontWeight: 700,
                fontSize: 'clamp(0.7rem, 1.8vw, 0.9rem)',
                cursor: 'pointer',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                animation: `tab-enter 0.5s ease-out ${index * 0.08}s backwards`,
                background: isSelected 
                  ? `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`
                  : 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 100%)',
                border: isSelected 
                  ? `2px solid ${color}` 
                  : '2px solid rgba(120, 53, 15, 0.15)',
                color: isSelected ? '#ffffff' : '#4a3728',
                boxShadow: isSelected 
                  ? `0 6px 25px ${color}40, inset 0 1px 0 rgba(255, 255, 255, 0.2)` 
                  : '0 3px 12px rgba(120, 53, 15, 0.08)',
                transform: isSelected ? 'scale(1.05)' : 'scale(1)',
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.transform = 'scale(1.08) translateY(-2px)';
                  e.currentTarget.style.borderColor = `${color}60`;
                  e.currentTarget.style.background = hoverBg;
                  e.currentTarget.style.color = color;
                  e.currentTarget.style.boxShadow = `0 10px 30px ${color}25`;
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.borderColor = 'rgba(120, 53, 15, 0.15)';
                  e.currentTarget.style.background = 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 100%)';
                  e.currentTarget.style.color = '#4a3728';
                  e.currentTarget.style.boxShadow = '0 3px 12px rgba(120, 53, 15, 0.08)';
                }
              }}
            >
              {/* Animated ring on selected */}
              {isSelected && (
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    border: `2px solid ${color}`,
                    borderRadius: '50px',
                    animation: 'ring-pulse 1.5s ease-out infinite',
                  }}
                />
              )}
              
              {/* Icon */}
              <Icon 
                style={{
                  width: 'clamp(14px, 3vw, 18px)',
                  height: 'clamp(14px, 3vw, 18px)',
                  transition: 'all 0.3s ease',
                  filter: isSelected ? 'drop-shadow(0 2px 3px rgba(0,0,0,0.2))' : 'none',
                  animation: isSelected ? 'icon-bounce 0.5s ease' : 'none',
                }}
              />
              
              {/* Label */}
              <span style={{ position: 'relative', zIndex: 1, whiteSpace: 'nowrap' }}>
                {label}
              </span>
              
              {/* Glow behind */}
              {isSelected && (
                <div 
                  style={{
                    position: 'absolute',
                    inset: '-5px',
                    background: `radial-gradient(circle, ${color}35 0%, transparent 70%)`,
                    borderRadius: '60px',
                    filter: 'blur(10px)',
                    zIndex: -1,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </>
  );
};
