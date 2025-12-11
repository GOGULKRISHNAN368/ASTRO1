import { Event } from "./EventGrid.tsx";
import { Category } from "./EventPage.tsx";
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
}

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

export const EventCard = ({ event, index, category }: EventCardProps) => {
  const Icon = getEventIcon(event.name);
  
  return (
    <div 
      className="group relative bg-card rounded-2xl p-5 md:p-6 border border-border shadow-md hover:shadow-xl transition-all duration-300 hover-raise cursor-pointer animate-fade-in-up overflow-hidden"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-event-orange/5 to-event-red/5 transition-opacity duration-300" />
      
      {/* Background glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-event-orange/0 via-event-orange/5 to-event-red/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur" />

      <div className="relative z-10 flex flex-col items-center text-center gap-4">
        {/* Icon Container */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-event-orange to-event-red rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
          <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-event-orange to-event-red flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-7 h-7 md:w-8 md:h-8 text-accent-foreground group-hover:scale-110 transition-transform duration-300" />
          </div>
        </div>
        
        {/* Text Content */}
        <div className="space-y-2">
          <h3 className="font-bold text-base md:text-lg text-foreground group-hover:text-accent transition-colors duration-300 line-clamp-2">
            {event.name}
          </h3>
          {event.description && (
            <p className="text-sm text-muted transition-colors duration-300">{event.description}</p>
          )}
        </div>

        {/* Image Placeholder */}
          <div className="w-full aspect-[4/3] bg-secondary rounded-xl flex items-center justify-center border border-border group-hover:border-event-orange/30 transition-colors duration-300 overflow-hidden relative">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-5 bg-gradient-to-br from-event-orange to-event-red transition-opacity duration-300" />
          <span className="text-xs text-muted">Event Image</span>
        </div>

        {/* Category Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full border border-border text-xs font-medium text-muted group-hover:bg-event-orange/10 group-hover:text-accent group-hover:border-event-orange/30 transition-all duration-300">
          <span className="w-1.5 h-1.5 rounded-full bg-event-orange/50 group-hover:bg-event-orange transition-colors" />
          {category}
        </div>
      </div>
    </div>
  );
};