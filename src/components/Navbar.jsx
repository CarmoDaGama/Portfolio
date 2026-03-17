import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { key: 'about', href: '#about' },
  { key: 'skills', href: '#skills' },
  { key: 'experience', href: '#experience' },
  { key: 'education', href: '#education' },
  { key: 'projects', href: '#projects' },
  { key: 'contact', href: '#contact' },
];

export default function Navbar() {
  const { language, setLanguage, translations } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const t = translations.nav;

  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((l) => l.href.slice(1));
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLanguageChange = (nextLanguage) => {
    setLanguage(nextLanguage);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'dark:bg-gray-900/95 dark:shadow-lg dark:shadow-black/20 bg-white/95 shadow-lg shadow-gray-200/20 dark:backdrop-blur-md backdrop-blur-md' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group"
            onClick={(e) => handleLinkClick(e, '#hero')}
          >
            <span className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm group-hover:bg-blue-500 transition-colors">
              CG
            </span>
            <span className="dark:text-white text-gray-900 font-semibold text-lg hidden sm:block">
              Carmo Da Gama
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === link.href.slice(1)
                      ? 'dark:text-blue-400 dark:bg-blue-500/10 text-blue-600 bg-blue-100'
                      : 'dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/5 text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {t[link.key]}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm5.657-9.193a1 1 0 00-1.414 0l-.707.707A1 1 0 005.05 6.464l.707-.707a1 1 0 001.414-1.414zM5 11a1 1 0 100-2H4a1 1 0 100 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Language toggle - desktop */}
            <div className="hidden md:flex items-center gap-1 rounded-lg dark:border-gray-700 border-gray-300 border p-1">
              <button
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                  language === 'en' 
                    ? 'bg-blue-600 text-white' 
                    : 'dark:text-gray-300 dark:hover:text-white text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => handleLanguageChange('en')}
                aria-label={`${t.toggleLanguage}: English`}
              >
                EN
              </button>
              <button
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                  language === 'pt' 
                    ? 'bg-blue-600 text-white' 
                    : 'dark:text-gray-300 dark:hover:text-white text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => handleLanguageChange('pt')}
                aria-label={`${t.toggleLanguage}: Portugues`}
              >
                PT
              </button>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 dark:text-gray-300 dark:hover:text-white text-gray-600 hover:text-gray-900"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <span
              className={`block w-6 h-0.5 dark:bg-gray-300 bg-gray-600 transition-all duration-300 ${
                isOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 dark:bg-gray-300 bg-gray-600 transition-all duration-300 ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 dark:bg-gray-300 bg-gray-600 transition-all duration-300 ${
                isOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`md:hidden transition-all duration-300 overflow-hidden dark:bg-gray-900/95 bg-white/95 ${
            isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 pt-3 pb-2 dark:border-gray-800 border-gray-200 border-t flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm5.657-9.193a1 1 0 00-1.414 0l-.707.707A1 1 0 005.05 6.464l.707-.707a1 1 0 001.414-1.414zM5 11a1 1 0 100-2H4a1 1 0 100 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            <button
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                language === 'en' ? 'bg-blue-600 text-white' : 'dark:text-gray-300 dark:hover:text-white text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => handleLanguageChange('en')}
              aria-label={`${t.toggleLanguage}: English`}
            >
              EN
            </button>
            <button
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                language === 'pt' ? 'bg-blue-600 text-white' : 'dark:text-gray-300 dark:hover:text-white text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => handleLanguageChange('pt')}
              aria-label={`${t.toggleLanguage}: Portugues`}
            >
              PT
            </button>
          </div>
          <ul className="py-2 space-y-1 dark:border-gray-800 border-gray-200 border-t">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`block px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    activeSection === link.href.slice(1)
                      ? 'dark:text-blue-400 dark:bg-blue-500/10 text-blue-600 bg-blue-100'
                      : 'dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/5 text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {t[link.key]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
