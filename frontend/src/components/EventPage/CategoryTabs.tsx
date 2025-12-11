import { Category } from "./EventPage.tsx";
import { Code, Gamepad2, Trophy, Users } from "lucide-react";

interface CategoryTabsProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const categories: { key: Category; label: string; icon: React.ElementType }[] = [
  { key: "flagship", label: "Flagship", icon: Trophy },
  { key: "technical", label: "Technical", icon: Code },
  { key: "non-technical", label: "Non-Technical", icon: Users },
  { key: "games", label: "Games", icon: Gamepad2 },
];

export const CategoryTabs = ({ selectedCategory, onCategoryChange }: CategoryTabsProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3">
      {categories.map(({ key, label, icon: Icon }, index) => (
        <button
          key={key}
          onClick={() => onCategoryChange(key)}
          className={`relative flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-full font-bold transition-all duration-300 text-xs md:text-sm overflow-hidden group transform hover:scale-105 active:scale-95 animate-fade-in-up hover-raise`}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {/* Background transitions */}
          <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
            selectedCategory === key
              ? "bg-gradient-to-r from-event-orange to-event-red shadow-lg"
              : "bg-card border-2 border-border hover:border-event-orange/60 hover:bg-secondary/50"
          }`} />

          {/* Animated background shine effect */}
          {selectedCategory === key && (
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer" />
            </div>
          )}

          {/* Content */}
          <div className="relative z-10 flex items-center gap-2">
            <Icon className={`w-4 h-4 md:w-5 md:h-5 transition-all duration-300 ${
              selectedCategory === key
                ? "text-accent-foreground scale-110"
                : "text-secondary-foreground group-hover:text-event-orange"
            }`} />
            <span className={`transition-colors duration-300 ${
              selectedCategory === key
                ? "text-accent-foreground font-black"
                : "text-card-foreground group-hover:text-event-orange"
            }`}>
              {label}
            </span>
          </div>

          {/* Glow effect on selected */}
          {selectedCategory === key && (
            <div className="absolute -inset-1 bg-gradient-to-r from-event-orange/40 to-event-red/40 rounded-full opacity-30 blur-lg -z-10" />
          )}
        </button>
      ))}
    </div>
  );
};