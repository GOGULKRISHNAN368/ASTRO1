import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Globe, Facebook, Twitter, Instagram, Linkedin, Users, Calendar, Navigation } from 'lucide-react';
import Footer from './footer.tsx';

interface ContactInfo {
  icon: React.ReactNode;
  title: string;
  details: string[];
  link?: string;
  linkText?: string;
  action?: 'call' | 'mailto';
}

const Contact: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if dark mode is enabled
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };

    checkDarkMode();

    // Listen for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const contactInfo: ContactInfo[] = [
    {
      icon: <MapPin className="text-2xl" />,
      title: "Event Venue",
      details: [
        "Coimbatore Institute of Technology",
        "Civil Aerodrome Post",
        "Avinashi Road, Coimbatore",
        "Tamil Nadu 641014, India"
      ],
      link: "https://maps.google.com/?q=Coimbatore+Institute+of+Technology+Avinashi+Road",
      linkText: "Open in Maps"
    },
    {
      icon: <Users className="text-2xl" />,
      title: "Contact Persons",
      details: [
        "Akilesh: +91 87781 19280",
        "Ghayathri: +91 94889 34335"
      ],
      action: "call"
    },
    {
      icon: <Mail className="text-2xl" />,
      title: "Email Address",
      details: [
        "astranova@cit.edu.in",
        "123@gmail.com (Temporary)"
      ],
      action: "mailto"
    },
    {
      icon: <Calendar className="text-2xl" />,
      title: "Event Dates",
      details: [
        "January 23, 2026",
        "January 24, 2026"
      ]
    },
    {
      icon: <Clock className="text-2xl" />,
      title: "Event Timings",
      details: [
        "Day 1: 9:00 AM - 9:00 PM",
        "Day 2: 9:00 AM - 8:00 PM"
      ]
    },
    {
      icon: <Navigation className="text-2xl" />,
      title: "How to Reach",
      details: [
        "📍 Near Peelamedu Airport",
        "🚗 15 mins from Coimbatore Junction",
        "✈️ 10 mins from Coimbatore Airport",
        "🚌 Multiple bus routes available"
      ]
    }
  ];

  const socialLinks = [
    { icon: <Facebook />, label: "Facebook", href: "#" },
    { icon: <Twitter />, label: "Twitter", href: "#" },
    { icon: <Instagram />, label: "Instagram", href: "#" },
    { icon: <Linkedin />, label: "LinkedIn", href: "#" },
  ];

  const handleContactAction = (info: ContactInfo) => {
    if (info.action === 'call') {
      const phoneNumber = info.details[0].includes('Akhilesh') ? '+918778119280' : '+919488934335';
      window.open(`tel:${phoneNumber}`, '_blank');
    } else if (info.action === 'mailto') {
      window.open('mailto:astranova@cit.edu.in', '_blank');
    } else if (info.link) {
      window.open(info.link, '_blank');
    }
  };

  const getButtonColor = (info: ContactInfo, index: number) => {
    const colors = [
      isDarkMode 
        ? "from-blue-500 to-blue-600" 
        : "from-orange-500 to-orange-600",
      isDarkMode 
        ? "from-violet-500 to-violet-600" 
        : "from-amber-500 to-amber-600",
      isDarkMode 
        ? "from-cyan-500 to-cyan-600" 
        : "from-orange-500 to-orange-600"
    ];
    
    if (info.action === 'call') return colors[1];
    if (info.action === 'mailto') return colors[0];
    if (info.link) return colors[0];
    
    return colors[index % colors.length];
  };

  const getIconBgColor = (index: number) => {
    const colors = [
      isDarkMode 
        ? "from-blue-500 to-blue-600" 
        : "from-orange-500 to-orange-600",
      isDarkMode 
        ? "from-violet-500 to-violet-600" 
        : "from-amber-500 to-amber-600"
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Contact Content */}
      <div className="flex-grow relative bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#d4a57320_1px,transparent_1px),linear-gradient(to_bottom,#d4a57320_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#4b556320_1px,transparent_1px),linear-gradient(to_bottom,#4b556320_1px,transparent_1px)] bg-[size:64px_64px] animate-[grid_20s_linear_infinite]" />
          <div className="absolute inset-0 bg-gradient-to-t from-orange-100/50 via-transparent to-transparent dark:from-gray-800/50" />
          <div className="absolute inset-0 bg-gradient-to-br from-amber-200/30 via-transparent to-orange-200/20 dark:from-blue-900/20 dark:via-transparent dark:to-purple-900/20" />
          
          <div className="absolute top-20 left-10 w-96 h-96 bg-orange-300/20 dark:bg-blue-900/20 rounded-full blur-[120px] animate-[float_8s_ease-in-out_infinite]" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-amber-300/20 dark:bg-purple-900/20 rounded-full blur-[100px] animate-[float_10s_ease-in-out_infinite]" />
          
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-br from-orange-400 to-amber-600 dark:from-blue-400 dark:to-purple-600 rounded-full animate-[twinkle_3s_ease-in-out_infinite]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.4 + 0.2
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 md:py-20">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-500 dark:from-blue-500 dark:to-purple-500 rounded-full blur-xl opacity-70 animate-pulse" />
                <div className="relative bg-gradient-to-br from-orange-500 to-orange-600 dark:from-blue-500 dark:to-blue-600 p-4 rounded-full">
                  <Globe className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 dark:from-blue-400 dark:via-blue-300 dark:to-purple-500 bg-clip-text text-transparent animate-[gradient_3s_ease_infinite] bg-[length:200%_auto]">
                Contact Us
              </span>
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-4">
              Reach out to the ASTRANOVA 2026 team for inquiries, partnerships, or any questions
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-2 border-orange-400/50 dark:border-blue-500/50 rounded-full shadow-lg">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute h-full w-full rounded-full bg-orange-500 dark:bg-blue-500 opacity-75" />
                <span className="relative h-3 w-3 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 dark:from-blue-500 dark:to-purple-500" />
              </span>
              <span className="text-gray-700 dark:text-gray-300 font-semibold">Coimbatore Institute of Technology</span>
            </div>
          </div>

          {/* Contact Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const buttonColor = getButtonColor(info, index);
              const buttonText = info.linkText || 
                                (info.action === 'call' ? 'Call Now' : 
                                 info.action === 'mailto' ? 'Send Email' : 
                                 'View Details');
              
              return (
                <div 
                  key={index}
                  className="group relative overflow-hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-2 border-orange-200/70 dark:border-gray-700/70 rounded-3xl p-6 hover:border-orange-400 dark:hover:border-blue-400 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl shadow-lg"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {/* Floating background orb */}
                  <div className={`absolute -top-20 -right-20 w-40 h-40 ${getIconBgColor(index)} rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 opacity-20`} />
                  
                  {/* Animated border on hover */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-400/0 via-orange-400/20 to-orange-400/0 dark:from-blue-400/0 dark:via-blue-400/20 dark:to-blue-400/0 animate-[shimmer_2s_linear_infinite] bg-[length:200%_100%]" />
                  </div>
                  
                  {/* Top accent line */}
                  <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 ${getIconBgColor(index)} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:w-32`} />
                  
                  <div className="relative">
                    {/* Icon container with floating effect */}
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="flex-shrink-0 relative">
                        {/* Icon glow effect */}
                        <div className={`absolute inset-0 ${getIconBgColor(index)} rounded-2xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300 animate-[pulse_3s_ease-in-out_infinite]`} />
                        
                        {/* Icon container */}
                        <div className={`relative p-4 rounded-2xl ${getIconBgColor(index)} border-2 border-white/50 shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                          <div className="text-white">
                            {React.isValidElement(info.icon) ? (
                              React.cloneElement(info.icon as React.ReactElement<any>, {
                                className: "w-6 h-6 group-hover:w-7 group-hover:h-7 transition-all duration-300"
                              })
                            ) : (
                              <div className="w-6 h-6 group-hover:w-7 group-hover:h-7 transition-all duration-300">
                                {info.icon}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Number indicator */}
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-orange-600 to-amber-600 dark:from-blue-600 dark:to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                            {info.title}
                          </h3>
                          <div className={`w-2 h-2 ${index % 2 === 0 ? 'bg-orange-500 dark:bg-blue-500' : 'bg-amber-500 dark:bg-purple-500'} rounded-full animate-ping opacity-75`} />
                        </div>
                        
                        <ul className="space-y-3">
                          {info.details.map((detail, idx) => (
                            <li 
                              key={idx} 
                              className="flex items-start text-gray-700 dark:text-gray-300 text-sm md:text-base group/item"
                            >
                              <span className={`inline-block w-2 h-2 ${index % 2 === 0 ? 'bg-orange-400 dark:bg-blue-400' : 'bg-amber-400 dark:bg-purple-400'} rounded-full mt-2 mr-3 flex-shrink-0 group-hover/item:scale-150 transition-transform duration-300`} />
                              <span className="leading-relaxed">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {/* Action Button */}
                    {(info.action || info.link) && (
                      <div className="relative mt-8 pt-4 border-t border-orange-200/50 dark:border-gray-700/50">
                        <button
                          onClick={() => handleContactAction(info)}
                          className={`relative w-full py-4 px-6 bg-gradient-to-r ${buttonColor} text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group/btn overflow-hidden shadow-lg`}
                        >
                          {/* Button shine effect */}
                          <div className="absolute inset-0 translate-x-full group-hover/btn:translate-x-0 transition-transform duration-700">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                          </div>
                          
                          {/* Button content */}
                          <div className="relative flex items-center justify-center space-x-3">
                            <span className="text-lg">{buttonText}</span>
                            <div className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform duration-300">
                              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {info.action === 'call' ? (
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                ) : info.action === 'mailto' ? (
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                ) : (
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                )}
                              </svg>
                            </div>
                          </div>
                          
                          {/* Button corner accents */}
                          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/50 rounded-tl-xl" />
                          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/50 rounded-tr-xl" />
                          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/50 rounded-bl-xl" />
                          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/50 rounded-br-xl" />
                        </button>
                        
                        {/* Subtle help text */}
                        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Click to {info.action === 'call' ? 'call' : info.action === 'mailto' ? 'email' : 'view'} instantly
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Social Links & Footer */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-orange-300/50 dark:border-gray-700/50 rounded-2xl p-8 shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                  Connect With Us
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6 md:mb-0">
                  Follow ASTRANOVA on social media for the latest updates and announcements
                </p>
              </div>
              
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className={`w-12 h-12 rounded-full ${index === 0 ? 'bg-orange-600 hover:bg-orange-700 dark:bg-blue-600 dark:hover:bg-blue-700' : index === 1 ? 'bg-amber-600 hover:bg-amber-700 dark:bg-violet-600 dark:hover:bg-violet-700' : index === 2 ? 'bg-orange-700 hover:bg-orange-800 dark:bg-blue-700 dark:hover:bg-blue-800' : 'bg-amber-700 hover:bg-amber-800 dark:bg-violet-700 dark:hover:bg-violet-800'} flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg`}
                    aria-label={social.label}
                  >
                    <span className="text-white text-xl">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>
            
            <div className="border-t-2 border-orange-300/50 dark:border-gray-700/50 my-8" />
            
            <div className="text-center">
              <div className="inline-flex flex-wrap items-center justify-center gap-6 text-gray-700 dark:text-gray-300">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 dark:bg-blue-500 rounded-full animate-pulse" />
                  <span>Emergency Contact: +91 87781 19280</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-amber-500 dark:bg-violet-500 rounded-full animate-pulse" />
                  <span>Registration Desk Open: 8:00 AM Daily</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-600 dark:bg-cyan-500 rounded-full animate-pulse" />
                  <span>Parking Available On-Site</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center mt-12">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © 2026 ASTRANOVA - Coimbatore Institute of Technology | 
              <span className="text-orange-600 dark:text-blue-400 font-semibold ml-1">Ignite the Future</span>
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-xs mt-2">
              All contact information is subject to change. Please check our website for updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;