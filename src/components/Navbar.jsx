import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const navLinks = [
  { key: 'about', href: '#about' },
  { key: 'skills', href: '#skills' },
  { key: 'experience', href: '#experience' },
  { key: 'education', href: '#education' },
  { key: 'contact', href: '#contact' },
];

export default function Navbar() {
  const { language, setLanguage, translations } = useLanguage();
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
        scrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'
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
            <span className="text-white font-semibold text-lg hidden sm:block">
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
                      ? 'text-blue-400 bg-blue-500/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {t[link.key]}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-1 rounded-lg border border-gray-700 p-1">
            <button
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                language === 'en' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => handleLanguageChange('en')}
              aria-label={`${t.toggleLanguage}: English`}
            >
              EN
            </button>
            <button
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                language === 'pt' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => handleLanguageChange('pt')}
              aria-label={`${t.toggleLanguage}: Portugues`}
            >
              PT
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 text-gray-300 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <span
              className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
                isOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
                isOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 pt-3 pb-2 border-t border-gray-800 flex items-center gap-2">
            <button
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                language === 'en' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => handleLanguageChange('en')}
              aria-label={`${t.toggleLanguage}: English`}
            >
              EN
            </button>
            <button
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                language === 'pt' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => handleLanguageChange('pt')}
              aria-label={`${t.toggleLanguage}: Portugues`}
            >
              PT
            </button>
          </div>
          <ul className="py-2 space-y-1 border-t border-gray-800">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`block px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    activeSection === link.href.slice(1)
                      ? 'text-blue-400 bg-blue-500/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
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
