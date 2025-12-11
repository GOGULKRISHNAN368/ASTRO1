export const EventHeader = () => {
  return (
    <div className="text-center space-y-4 pt-12">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight animate-scale-in text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
        ASTRANOVA
      </h1>
      <p 
        className="text-lg md:text-xl text-foreground/80 font-medium animate-fade-in-up"
        style={{ animationDelay: "0.2s", fontFamily: "'Montserrat', sans-serif" }}
      >
        Explore Events
      </p>
    </div>
  );
};