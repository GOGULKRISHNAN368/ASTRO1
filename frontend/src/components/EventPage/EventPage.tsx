import { useState } from "react";
import { EventHeader } from "./EventHeader.tsx";
import { DaySelector } from "./DaySelector.tsx";
import { CategoryTabs } from "./CategoryTabs.tsx";
import { EventGrid } from "./EventGrid.tsx";
import { eventsData } from "./eventsData.ts";

export type Day = "day1" | "day2";
export type Category = "flagship" | "technical" | "non-technical" | "games";

const EventPage = () => {
  const [selectedDay, setSelectedDay] = useState<Day>("day1");
  const [selectedCategory, setSelectedCategory] = useState<Category>("flagship");

  const currentEvents = eventsData[selectedDay][selectedCategory] || [];

  return (
    <div className="min-h-screen bg-background dot-pattern overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-event-orange/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-event-red/8 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-10 w-48 h-48 bg-accent/5 rounded-full blur-2xl animate-glow" />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Header Section */}
        <div className="mb-8 md:mb-10 animate-fade-in">
          <EventHeader />
        </div>

        {/* Filters Section */}
        <div 
          className="bg-card/90 backdrop-blur-sm border border-border rounded-3xl p-6 md:p-8 mb-10 shadow-lg animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="space-y-6">
            {/* Day Selector */}
            <div>
              <h3 className="text-xs font-bold text-event-orange uppercase tracking-wider mb-3">
                Select Day
              </h3>
              <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <DaySelector selectedDay={selectedDay} onDayChange={setSelectedDay} />
              </div>
            </div>

            {/* Category Tabs */}
            <div className="border-t border-border pt-6">
              <h3 className="text-xs font-bold text-accent uppercase tracking-wider mb-3">
                Event Category
              </h3>
              <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                <CategoryTabs 
                  selectedCategory={selectedCategory} 
                  onCategoryChange={setSelectedCategory} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Events Grid Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">Events</h2>
            <span className="ml-auto text-muted-foreground font-semibold text-lg">{currentEvents.length} events</span>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            <EventGrid events={currentEvents} category={selectedCategory} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;