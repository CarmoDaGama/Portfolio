import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { key: 'about', href: '#about', order: '01.' },
  { key: 'skills', href: '#skills', order: '02.' },
  { key: 'experience', href: '#experience', order: '03.' },
  { key: 'education', href: '#education', order: '04.' },
  { key: 'projects', href: '#projects', order: '05.' },
  { key: 'contact', href: '#contact', order: '06.' },
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
      setScrolled(window.scrollY > 10);

      const sections = ['hero', ...navLinks.map((l) => l.href.slice(1))];
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
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
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md' : ''
      }`}
      style={
        scrolled
          ? {
              backgroundColor: 'color-mix(in srgb, var(--color-bg) 84%, transparent)',
              borderBottom: '1px solid var(--color-line)',
            }
          : undefined
      }
    >
      <div className="section-shell">
        <div className="flex h-20 items-center justify-between">
          <a
            href="#hero"
            className="group flex items-center gap-3"
            onClick={(e) => handleLinkClick(e, '#hero')}
          >
            <span className="font-mono text-lg tracking-[0.18em] text-[var(--color-accent)]">CG.</span>
            <span className="hidden text-xs uppercase tracking-[0.18em] text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-accent)] sm:block">
              {t.brandRole}
            </span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            <a
              href="#hero"
              onClick={(e) => handleLinkClick(e, '#hero')}
              className={`rounded px-3 py-2 text-xs font-mono transition-colors ${
                activeSection === 'hero' || activeSection === ''
                  ? 'text-[var(--color-accent)]'
                  : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              {t.home}
            </a>

            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`rounded px-3 py-2 text-xs font-mono transition-colors ${
                  activeSection === link.href.slice(1)
                    ? 'text-[var(--color-accent)]'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                }`}
              >
                <span className="mr-1.5 text-[var(--color-accent)]">{link.order}</span>
                {t[link.key]}
              </a>
            ))}
            <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} className="outline-button ml-2 py-2">
              {t.resume}
            </a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleTheme}
              className="rounded border border-[var(--color-line)] p-2 text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]"
              aria-label={t.toggleTheme}
            >
              {theme === 'dark' ? (
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3c-.04.26-.06.53-.06.8a9 9 0 0 0 9 8.99c.27 0 .54-.02.85-.06Z" />
                </svg>
              ) : (
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="4" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.5M12 18.5V21M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M3 12h2.5M18.5 12H21M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77" />
                </svg>
              )}
            </button>

            <div className="hidden items-center rounded border border-[var(--color-line)] p-1 md:flex">
              <button
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                  language === 'en'
                    ? 'bg-[var(--color-accent)] text-white'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                }`}
                onClick={() => handleLanguageChange('en')}
                aria-label={`${t.toggleLanguage}: ${t.languageEnglish}`}
              >
                EN
              </button>
              <button
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                  language === 'pt'
                    ? 'bg-[var(--color-accent)] text-white'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                }`}
                onClick={() => handleLanguageChange('pt')}
                aria-label={`${t.toggleLanguage}: ${t.languagePortuguese}`}
              >
                PT
              </button>
            </div>
          </div>

          <button
            className="flex flex-col gap-1.5 p-2 text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)] lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={t.toggleMenu}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <span
              className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                isOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                isOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>

        <div
          id="mobile-menu"
          className={`overflow-hidden transition-all duration-300 lg:hidden ${
            isOpen ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0'
          }`}
          style={{ borderTop: isOpen ? '1px solid var(--color-line)' : '0 solid transparent' }}
        >
          <div className="space-y-1 py-3">
            <a
              href="#hero"
              onClick={(e) => handleLinkClick(e, '#hero')}
              className={`block rounded px-4 py-2 text-sm font-mono ${
                activeSection === 'hero' || activeSection === ''
                  ? 'text-[var(--color-accent)]'
                  : 'text-[var(--color-muted)]'
              }`}
            >
              {t.home}
            </a>

            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`block rounded px-4 py-2 text-sm font-mono ${
                  activeSection === link.href.slice(1)
                    ? 'text-[var(--color-accent)]'
                    : 'text-[var(--color-muted)]'
                }`}
              >
                <span className="mr-2 text-[var(--color-accent)]">{link.order}</span>
                {t[link.key]}
              </a>
            ))}

            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="block rounded px-4 py-2 text-sm font-mono text-[var(--color-accent)]"
            >
              {t.resume}
            </a>

            <div className="flex items-center gap-2 px-4 pt-3">
              <button
                className={`rounded px-3 py-1 text-xs font-semibold transition-colors ${
                  language === 'en'
                    ? 'bg-[var(--color-accent)] text-white'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                }`}
                onClick={() => handleLanguageChange('en')}
                aria-label={`${t.toggleLanguage}: ${t.languageEnglish}`}
              >
                EN
              </button>
              <button
                className={`rounded px-3 py-1 text-xs font-semibold transition-colors ${
                  language === 'pt'
                    ? 'bg-[var(--color-accent)] text-white'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                }`}
                onClick={() => handleLanguageChange('pt')}
                aria-label={`${t.toggleLanguage}: ${t.languagePortuguese}`}
              >
                PT
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
