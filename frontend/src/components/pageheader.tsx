import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

interface HeaderProps {
  useRouterLinks?: boolean;
}

const Header: React.FC<HeaderProps> = ({ useRouterLinks = true }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('up');

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    if (useRouterLinks) {
      setCurrentPath(window.location.pathname);
    } else {
      setCurrentPath(window.location.pathname);
    }
  }, [useRouterLinks]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Schedule', path: '/clock' },
    { name: 'Members', path: '/members' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActiveLink = (path: string) => {
    if (path === '/') {
      return currentPath === '/';
    }
    return currentPath.startsWith(path);
  };

  const handleNavigation = (path: string) => {
    if (!useRouterLinks) {
      if (path.startsWith('/#')) {
        window.location.href = '/';
        setTimeout(() => {
          const sectionId = path.split('#')[1];
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        window.location.href = path;
        setCurrentPath(path);
      }
    }
  };

  const renderNavLink = (link: any, index: number) => {
    const isActive = isActiveLink(link.path);
    const linkContent = (
      <>
        <span className="relative z-10">{link.name}</span>
        <div className={`absolute inset-0 bg-gradient-to-r from-orange-100 to-orange-200 rounded-lg transition-all duration-300 ${
          isActive 
            ? 'opacity-100 transform scale-100' 
            : 'opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100'
        }`} />
        {isActive && (
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full animate-pulse" />
        )}
      </>
    );

    const className = `relative group px-4 py-2 font-medium text-sm transition-colors duration-300 ${
      isActive ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'
    }`;

    if (useRouterLinks) {
      return (
        <a
          key={link.name}
          href={link.path}
          className={className}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {linkContent}
        </a>
      );
    } else {
      return (
        <div
          key={link.name}
          onClick={() => handleNavigation(link.path)}
          className={`${className} cursor-pointer`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {linkContent}
        </div>
      );
    }
  };

  return (
    <>
      {/* Hover trigger area - only on non-home pages */}
      {currentPath !== '/' && (
        <div 
          className="fixed top-0 left-0 right-0 h-4 z-[100]"
          onMouseEnter={() => setIsHeaderVisible(true)}
        />
      )}
      
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          currentPath === '/' || isHeaderVisible || scrollDirection === 'up'
            ? 'transform translate-y-0 bg-white/90 backdrop-blur-lg shadow-lg border-b-2 border-orange-200/50'
            : 'transform -translate-y-full bg-white/90 backdrop-blur-lg shadow-lg border-b-2 border-orange-200/50'
        }`}
        onMouseEnter={() => setIsHeaderVisible(true)}
        onMouseLeave={() => currentPath !== '/' && setIsHeaderVisible(false)}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            
            {/* Logo */}
            {useRouterLinks ? (
              <a href="/" className="flex-shrink-0 group cursor-pointer">
                {renderLogoContent()}
              </a>
            ) : (
              <div 
                onClick={() => handleNavigation('/')}
                className="flex-shrink-0 group cursor-pointer"
              >
                {renderLogoContent()}
              </div>
            )}

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link, index) => renderNavLink(link, index))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="relative w-10 h-10 rounded-lg bg-white/70 backdrop-blur-sm border-2 border-orange-400/50 flex items-center justify-center hover:border-orange-500 transition-all duration-300 hover:scale-105 group"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Sun className="w-5 h-5 text-orange-600 group-hover:rotate-90 transition-transform duration-300" />
                ) : (
                  <Moon className="w-5 h-5 text-orange-600 group-hover:rotate-12 transition-transform duration-300" />
                )}
              </button>

              {/* Register Button */}
              {useRouterLinks ? (
                <a href="/registration">
                  <button className="group relative px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full font-bold text-white text-sm overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(249,115,22,0.5)]">
                    <span className="relative z-10">Register</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </button>
                </a>
              ) : (
                <button 
                  onClick={() => handleNavigation('/registration')}
                  className="group relative px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full font-bold text-white text-sm overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(249,115,22,0.5)]"
                >
                  <span className="relative z-10">Register</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
              )}
            </div>

            {/* Mobile Actions */}
            <div className="lg:hidden flex items-center gap-2">
              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="relative w-10 h-10 rounded-lg bg-white/70 backdrop-blur-sm border-2 border-orange-400/50 flex items-center justify-center hover:border-orange-500 transition-all duration-300 hover:scale-105"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Sun className="w-5 h-5 text-orange-600" />
                ) : (
                  <Moon className="w-5 h-5 text-orange-600" />
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative w-10 h-10 rounded-lg bg-white/70 backdrop-blur-sm border-2 border-orange-400/50 flex items-center justify-center hover:border-orange-500 transition-all duration-300 hover:scale-105"
                aria-label="Toggle menu"
              >
                <div className="w-5 h-4 flex flex-col justify-center relative">
                  <span
                    className={`absolute w-full h-0.5 bg-orange-600 rounded-full transform transition-all duration-300 ${
                      isMobileMenuOpen ? 'rotate-45' : '-translate-y-1.5'
                    }`}
                  />
                  <span
                    className={`w-full h-0.5 bg-orange-600 rounded-full transition-all duration-300 ${
                      isMobileMenuOpen ? 'opacity-0' : ''
                    }`}
                  />
                  <span
                    className={`absolute w-full h-0.5 bg-orange-600 rounded-full transform transition-all duration-300 ${
                      isMobileMenuOpen ? '-rotate-45' : 'translate-y-1.5'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[110] lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <div
          className={`absolute top-0 right-0 w-full sm:w-80 h-full bg-gradient-to-br from-amber-50 to-orange-50 shadow-2xl transform transition-transform duration-500 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between p-6 border-b-2 border-orange-200/50">
            {useRouterLinks ? (
              <a href="/" className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-purple-500 rounded-lg blur-md opacity-70 animate-pulse" />
                  <div className="relative bg-gradient-to-br from-orange-500 to-orange-600 p-2 rounded-lg">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18.5c-3.82-1.12-6.5-4.65-6.5-8.5V8.3l6.5-3.11 6.5 3.11V12c0 3.85-2.68 7.38-6.5 8.5z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-black bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
                    ASTRANOVA
                  </h2>
                </div>
              </a>
            ) : (
              <div 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleNavigation('/');
                }}
                className="flex items-center gap-3 cursor-pointer"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-purple-500 rounded-lg blur-md opacity-70 animate-pulse" />
                  <div className="relative bg-gradient-to-br from-orange-500 to-orange-600 p-2 rounded-lg">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18.5c-3.82-1.12-6.5-4.65-6.5-8.5V8.3l6.5-3.11 6.5 3.11V12c0 3.85-2.68 7.38-6.5 8.5z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-black bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
                    ASTRANOVA
                  </h2>
                </div>
              </div>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-10 h-10 rounded-lg bg-white/70 backdrop-blur-sm border-2 border-orange-400/50 flex items-center justify-center hover:border-orange-500 transition-all duration-300"
            >
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Links */}
          <nav className="p-6 space-y-2">
            {navLinks.map((link, index) => {
              const isActive = isActiveLink(link.path);
              const linkElement = useRouterLinks ? (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-100 to-orange-200 border-2 border-orange-400 shadow-lg'
                      : 'bg-white/70 backdrop-blur-sm border-2 border-orange-400/30 hover:border-orange-500 hover:shadow-lg'
                  } ${
                    isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                  }`}
                  style={{ 
                    transitionDelay: isMobileMenuOpen ? `${index * 0.05 + 0.3}s` : '0s'
                  }}
                >
                  <span className={`w-2 h-2 rounded-full ${
                    isActive 
                      ? 'bg-orange-600 animate-pulse' 
                      : 'bg-orange-500 group-hover:animate-pulse'
                  }`} />
                  <span className={`font-semibold transition-colors duration-300 ${
                    isActive 
                      ? 'text-orange-700' 
                      : 'text-gray-800 group-hover:text-orange-600'
                  }`}>
                    {link.name}
                  </span>
                  <svg className="w-5 h-5 ml-auto text-orange-500 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              ) : (
                <div
                  key={link.name}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleNavigation(link.path);
                  }}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-100 to-orange-200 border-2 border-orange-400 shadow-lg'
                      : 'bg-white/70 backdrop-blur-sm border-2 border-orange-400/30 hover:border-orange-500 hover:shadow-lg'
                  } ${
                    isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                  }`}
                  style={{ 
                    transitionDelay: isMobileMenuOpen ? `${index * 0.05 + 0.3}s` : '0s'
                  }}
                >
                  <span className={`w-2 h-2 rounded-full ${
                    isActive 
                      ? 'bg-orange-600 animate-pulse' 
                      : 'bg-orange-500 group-hover:animate-pulse'
                  }`} />
                  <span className={`font-semibold transition-colors duration-300 ${
                    isActive 
                      ? 'text-orange-700' 
                      : 'text-gray-800 group-hover:text-orange-600'
                  }`}>
                    {link.name}
                  </span>
                  <svg className="w-5 h-5 ml-auto text-orange-500 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              );
              return linkElement;
            })}
          </nav>

          {/* Mobile CTA */}
          <div className="p-6">
            {useRouterLinks ? (
              <a href="/registration" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full group relative px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl font-bold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] shadow-lg">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span>Register Now</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
              </a>
            ) : (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleNavigation('/registration');
                }}
                className="w-full group relative px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl font-bold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] shadow-lg"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>Register Now</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            )}
          </div>

          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-300/30 to-purple-300/30 rounded-full blur-3xl" />
        </div>
      </div>
    </>
  );
};

const renderLogoContent = () => (
  <div className="flex items-center gap-3">
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-purple-500 rounded-lg blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
      <div className="relative bg-gradient-to-br from-orange-500 to-orange-600 p-2 rounded-lg transform group-hover:scale-110 transition-transform duration-300">
        <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18.5c-3.82-1.12-6.5-4.65-6.5-8.5V8.3l6.5-3.11 6.5 3.11V12c0 3.85-2.68 7.38-6.5 8.5z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      </div>
    </div>
    <div>
      <h1 className="text-xl md:text-2xl font-black tracking-tight bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
        ASTRANOVA
      </h1>
      <p className="text-xs text-gray-600 font-medium hidden sm:block">Tech Symposium 2026</p>
    </div>
  </div>
);

export default Header;