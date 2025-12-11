import { EventCard } from "./EventCard.tsx";
import { Category } from "./EventPage.tsx";

export interface Event {
  name: string;
  description?: string;
}

interface EventGridProps {
  events: Event[];
  category: Category;
}

export const EventGrid = ({ events, category }: EventGridProps) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <p className="text-muted-foreground text-lg">No events in this category</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {events.map((event, index) => (
        <EventCard key={event.name} event={event} index={index} category={category} />
      ))}
    </div>
  );
};