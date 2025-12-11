import { Event } from "./EventGrid";

type EventsData = {
  day1: {
    flagship: Event[];
    technical: Event[];
    "non-technical": Event[];
    games: Event[];
  };
  day2: {
    flagship: Event[];
    technical: Event[];
    "non-technical": Event[];
    games: Event[];
  };
};

export const eventsData: EventsData = {
  day1: {
    flagship: [
      { name: "Paper Presentation", description: "Present your research papers" },
      { name: "Rapid Coding", description: "Speed coding challenge" },
      { name: "Seminar", description: "Technical seminars" },
    ],
    technical: [
      { name: "Technical Quiz", description: "Test your technical knowledge" },
      { name: "Logic/Puzzle Coding", description: "Solve coding puzzles" },
      { name: "Blind Coding", description: "Code without seeing the screen" },
      { name: "Missing Code", description: "Find the missing code segments" },
    ],
    "non-technical": [
      { name: "Squid Game", description: "Fun survival games" },
      { name: "Connexion", description: "Connect and network" },
      { name: "Kollywood Quiz", description: "Tamil cinema quiz" },
      { name: "Anime Quiz", description: "Anime trivia challenge" },
      { name: "Treasure Hunt", description: "Find hidden treasures" },
    ],
    games: [
      { name: "BGMI", description: "Battle Royale tournament" },
      { name: "Free Fire", description: "Squad battles" },
      { name: "Carrom", description: "Classic board game" },
    ],
  },
  day2: {
    flagship: [
      { name: "Project Expo", description: "Showcase your projects" },
      { name: "Relay Coding", description: "Team coding relay" },
      { name: "Workshop", description: "Hands-on learning sessions" },
    ],
    technical: [
      { name: "Code Golf", description: "Shortest code wins" },
      { name: "Tik Tik Tik", description: "Time-bound coding" },
      { name: "Code Hunt", description: "Hunt for code solutions" },
      { name: "Prompt Masters", description: "Master AI prompts" },
    ],
    "non-technical": [
      { name: "DumbCharders", description: "Dumb charades fun" },
      { name: "Escape the Room", description: "Solve puzzles to escape" },
      { name: "Maathi Yoshi", description: "Fun group activity" },
      { name: "IPL Auction", description: "Build your dream team" },
      { name: "Detecting Crime", description: "Mystery solving" },
    ],
    games: [
      { name: "E-Football", description: "Virtual football tournament" },
      { name: "Chess", description: "Classic chess competition" },
    ],
  },
};