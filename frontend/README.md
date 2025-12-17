# ASTRANOVA 2024 - Technical & Cultural Fest Website

A modern, responsive React application for ASTRANOVA 2024, featuring an interactive event schedule, animated components, and a sleek user interface.

## 🚀 Features

- **Interactive Clock Schedule** - Unique watch-style event scheduler with auto-advancing time slots
- **Event Management** - Comprehensive event listing with categories, rules, and registration
- **Responsive Design** - Mobile-first approach with adaptive layouts
- **Animated UI** - Smooth transitions, gear animations, and interactive elements
- **Auto-hide Navigation** - Windows taskbar-style header behavior
- **Real-time Countdown** - Live countdown timer to event start date
- **Dark/Light Theme** - Toggle between theme modes

## 🛠️ Tech Stack

- **React 19.2.1** - Frontend framework
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS 3.4.18** - Utility-first CSS framework
- **React Router DOM 7.10.1** - Client-side routing
- **Lucide React** - Modern icon library
- **PostCSS & Autoprefixer** - CSS processing

## 📁 Project Structure

```
src/
├── components/
│   ├── Clock/                    # Interactive watch-style scheduler
│   │   ├── WatchClock.tsx       # Main clock component
│   │   ├── ClockHands.tsx       # Animated clock hands
│   │   ├── ClockNumber.tsx      # Interactive hour numbers
│   │   ├── EventDisplay.tsx     # Event information panel
│   │   ├── DaySelector.tsx      # Day 1/2 toggle
│   │   ├── Gear.tsx             # Individual gear component
│   │   ├── GearMechanism.tsx    # Animated gear background
│   │   ├── eventData.ts         # Event schedule data
│   │   └── types.ts             # TypeScript interfaces
│   │
│   ├── EventPage/               # Event listing and management
│   │   ├── EventPage.tsx        # Main events page
│   │   ├── EventHeader.tsx      # Page header with title
│   │   ├── EventGrid.tsx        # Event cards grid
│   │   ├── EventCard.tsx        # Individual event card
│   │   ├── EventDetail.tsx      # Event details modal
│   │   ├── CategoryTabs.tsx     # Event category filters
│   │   ├── DaySelector.tsx      # Day selection component
│   │   ├── eventsData.ts        # Event data
│   │   └── eventRules.ts        # Event rules and guidelines
│   │
│   ├── CircuitTimeline/         # Alternative timeline view
│   │   ├── CircuitTimeline.tsx  # Main timeline component
│   │   ├── CircuitNode.tsx      # Timeline event nodes
│   │   └── CircuitBackground.tsx # Animated background
│   │
│   ├── Registration/            # Registration components
│   ├── pageheader.tsx          # Auto-hide navigation header
│   ├── footer.tsx              # Site footer
│   └── Contact.tsx             # Contact page
│
├── Intropage/
│   └── Intro.tsx               # Landing page with countdown
│
├── App.js                      # Main app component
├── index.css                   # Global styles and animations
└── index.js                    # App entry point
```

## 🎨 Key Components

### Clock Schedule (`/clock`)
- **Interactive Watch Interface** - Click hour numbers to view events
- **Auto-advancing Time** - Automatically cycles through event hours
- **Animated Gears** - Background mechanical animations
- **Day Selection** - Toggle between Day 1 (Technical) and Day 2 (Cultural)
- **Event Display Panel** - Shows detailed event information

### Event Management (`/events`)
- **Category Filtering** - Flagship, Technical, Non-technical, Games
- **Day Selection** - Filter events by day
- **Event Cards** - Interactive cards with hover effects
- **Event Modals** - Detailed view with rules, prizes, and contact info
- **Responsive Grid** - Adaptive layout for all screen sizes

### Navigation Header
- **Auto-hide Behavior** - Slides up/down like Windows taskbar
- **Permanent on Home** - Always visible on landing page
- **Scroll Detection** - Shows when scrolling up (mobile-friendly)
- **Theme Toggle** - Switch between light/dark modes
- **Mobile Menu** - Responsive hamburger menu

### Landing Page (`/`)
- **Animated Title** - Gradient text with animations
- **Live Countdown** - Real-time timer to event date
- **Responsive Layout** - Mobile-optimized countdown grid
- **Background Effects** - Floating elements and gradients

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Runs development server
- `npm build` - Creates production build
- `npm test` - Runs test suite
- `npm eject` - Ejects from Create React App

## 🎯 Routes

- `/` - Landing page with countdown and intro
- `/events` - Event listing and management
- `/clock` - Interactive clock schedule
- `/CircuitTimeline` - Alternative timeline view
- `/contact` - Contact information
- `/registration` - Event registration

## 🎨 Styling

- **Tailwind CSS** - Utility-first styling
- **Custom Animations** - Gear rotations, fades, and transitions
- **Responsive Design** - Mobile-first approach
- **Theme Support** - Light/dark mode variables
- **Custom Gradients** - Brand-consistent color schemes

## 📱 Mobile Optimization

- **Responsive Countdown** - Compact 4-column layout
- **Touch-friendly Navigation** - Large tap targets
- **Optimized Typography** - Clamp-based responsive text
- **Mobile Menu** - Slide-out navigation
- **Scroll Behavior** - Header shows on scroll up

## 🔧 Configuration

### Event Data
- Edit `src/components/Clock/eventData.ts` for schedule
- Edit `src/components/EventPage/eventsData.ts` for event details
- Edit `src/components/EventPage/eventRules.ts` for rules

### Styling
- Modify `tailwind.config.js` for theme customization
- Edit `src/index.css` for global styles and animations

### Countdown Timer
- Update event date in `src/Intropage/Intro.tsx`

## 🎭 Animations

- **Gear Mechanisms** - Multiple rotation speeds and directions
- **Clock Hands** - Smooth transitions with easing
- **Card Interactions** - Hover effects and transforms
- **Page Transitions** - Fade-ins and slide animations
- **Loading States** - Skeleton screens and spinners

## 🌟 Special Features

- **Auto-advancing Clock** - Cycles through events every 3 seconds
- **Interactive Time Selection** - Click any hour to jump to events
- **Priority-based Display** - Events ordered by schedule priority
- **Responsive Modals** - Adaptive sizing and positioning
- **Smooth Scrolling** - Enhanced user experience
- **Accessibility** - ARIA labels and keyboard navigation

## 📄 License

This project is private and proprietary to ASTRANOVA 2024.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📞 Support

For technical support or questions, contact the development team.

---

**ASTRANOVA 2024** - Ignite the Future 🚀