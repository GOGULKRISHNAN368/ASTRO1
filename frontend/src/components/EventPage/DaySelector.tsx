import { Day } from "./EventPage.tsx";

interface DaySelectorProps {
  selectedDay: Day;
  onDayChange: (day: Day) => void;
}

export const DaySelector = ({ selectedDay, onDayChange }: DaySelectorProps) => {
  return (
    <div className="flex justify-center gap-3 md:gap-4 flex-wrap">
      {["day1", "day2"].map((day, index) => (
        <button
          key={day}
          onClick={() => onDayChange(day as Day)}
          className={`relative px-6 md:px-8 py-3 md:py-3.5 rounded-2xl font-bold text-base md:text-lg transition-all duration-300 overflow-hidden group transform hover:scale-105 active:scale-95 animate-fade-in-up whitespace-nowrap hover-raise`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Background transitions */}
          <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
            selectedDay === (day as Day)
              ? "bg-gradient-to-r from-event-orange to-event-red shadow-xl"
              : "bg-card border-2 border-border hover:border-event-orange/60"
          }`} />

          {/* Animated glow on selected */}
          {selectedDay === (day as Day) && (
            <div className="absolute -inset-1 bg-gradient-to-r from-event-orange/40 to-event-red/40 rounded-2xl blur-lg opacity-50 -z-10" />
          )}

          {/* Animated shine effect */}
          {selectedDay === (day as Day) && (
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer" />
            </div>
          )}

          {/* Content */}
          <span className={`relative z-10 transition-all duration-300 ${
            selectedDay === (day as Day)
              ? "text-accent-foreground drop-shadow-md"
              : "text-secondary-foreground group-hover:text-event-orange"
          }`}>
            {day === "day1" ? "Day 1" : "Day 2"}
          </span>
        </button>
      ))}
    </div>
  );
};