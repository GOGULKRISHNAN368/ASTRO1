import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/pageheader.tsx";
import Footer from "../components/footer.tsx";


interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface IntroProps {
  onComplete?: () => void;
}

const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const eventDate = new Date('2026-01-23T09:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = eventDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds }
  ];

  return (
    <div className="fixed inset-0 z-50 min-h-screen flex flex-col">
      <div className="flex-grow relative w-full overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
        {/* 🔶 HEADER WITH useRouterLinks={false} */}
<Header useRouterLinks={false} />

        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#d4a57330_1px,transparent_1px),linear-gradient(to_bottom,#d4a57330_1px,transparent_1px)] bg-[size:64px_64px] animate-[grid_20s_linear_infinite]" />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-orange-100/50 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-amber-200/30 via-transparent to-purple-200/20" />

        {/* Stars / sparkles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-br from-orange-400 to-amber-600 rounded-full animate-[twinkle_3s_ease-in-out_infinite]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.6 + 0.2
              }}
            />
          ))}
        </div>

        {/* Floating glowing shapes */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-orange-300/30 rounded-full blur-[120px] animate-[float_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-300/20 rounded-full blur-[100px] animate-[float_10s_ease-in-out_infinite]" />

        {/* Main content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
          <div className="max-w-6xl w-full">
            {/* Title */}
            <div className={`text-center mb-4 transition-all duration-1000 px-6 ${showContent ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"}`}>
              <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-2">
                <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-red-600 bg-clip-text text-transparent animate-[gradient_3s_ease_infinite] bg-[length:200%_auto]">
                  ASTRANOVA
                </span>
              </h1>
            </div>

            {/* Tagline */}
            <div className={`text-center mb-8 transition-all duration-1000 ${showContent ? "opacity-100" : "opacity-0"}`}>
              <p className="text-2xl md:text-3xl font-light text-gray-800 tracking-wide">
                Ignite the Future
              </p>
            </div>

            {/* Date */}
            <div className={`text-center mb-12 transition-all duration-1000 ${showContent ? "opacity-100" : "opacity-0"}`}>
              <div className="inline-flex items-center gap-3 px-8 py-3 bg-white/70 backdrop-blur-md border-2 border-orange-400/50 rounded-full shadow-xl">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-cyan-500 opacity-75" />
                  <span className="relative h-3 w-3 rounded-full bg-gradient-to-r from-orange-600 via-orange-500 to-red-600" />
                </span>

                <span className="text-gray-800 font-semibold">January 23 & 24, 2026</span>
              </div>
            </div>

            {/* Countdown */}
            <div className={`text-center transition-all duration-1000 ${showContent ? "opacity-100" : "opacity-0"}`}>
              <p className="text-gray-700 text-sm uppercase tracking-widest mb-6 font-semibold">Event Starts In</p>

              <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-2xl mx-auto px-2">
                {timeBlocks.map((block) => (
                  <div
                    key={block.label}
                    className="bg-white/70 backdrop-blur-sm border-2 border-orange-400/50 rounded-xl p-2 sm:p-6 shadow-lg min-w-0"
                  >
                    <div className="text-xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-br from-orange-600 to-orange-500 bg-clip-text text-transparent mb-1 sm:mb-2">
                      {String(block.value).padStart(2, "0")}
                    </div>
                    <div className="text-gray-600 text-xs uppercase tracking-tight font-semibold truncate">
                      {block.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Schedule Button */}
              <div className="mt-8">
                <button
                  onClick={() => {
                    // Hide intro first, then navigate so Router can render the target
                    if (onComplete) onComplete();
                    setTimeout(() => navigate('/clock'), 60);
                  }}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold shadow-lg hover:brightness-105 transition"
                >
                  View Schedule
                </button>
              </div>
            </div>            
          </div>
        </div>
      </div>
      
      {/* Footer component */}
      <Footer />
    </div>
  );
};

export default Intro;