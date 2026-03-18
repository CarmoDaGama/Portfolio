import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useLanguage } from './context/LanguageContext';

function App() {
  const { translations } = useLanguage();
  const infoLabels = translations.contact.info;

  const socialLinks = [
    {
      href: 'mailto:carmodagama@gmail.com',
      label: infoLabels.email,
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="m4 6 8 5 8-5" />
          <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
        </svg>
      ),
    },
    {
      href: 'https://linkedin.com/in/carmodagama',
      label: infoLabels.linkedin,
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27ZM5.33 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14Zm1.78 13.02H3.54V9h3.57v11.45Z" />
        </svg>
      ),
    },
    {
      href: 'https://github.com/CarmoDaGama',
      label: infoLabels.github,
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .5C5.649.5.5 5.649.5 12a11.5 11.5 0 008.005 10.94c.584.108.797-.254.797-.564 0-.278-.01-1.015-.016-1.992-3.256.708-3.943-1.57-3.943-1.57-.532-1.351-1.3-1.712-1.3-1.712-1.062-.726.08-.711.08-.711 1.174.082 1.792 1.205 1.792 1.205 1.044 1.788 2.739 1.271 3.406.972.106-.756.408-1.271.743-1.563-2.6-.296-5.335-1.3-5.335-5.786 0-1.278.457-2.323 1.206-3.142-.121-.296-.523-1.487.114-3.102 0 0 .983-.315 3.22 1.2a11.23 11.23 0 015.864 0c2.236-1.515 3.218-1.2 3.218-1.2.639 1.615.237 2.806.117 3.102.75.819 1.205 1.864 1.205 3.142 0 4.498-2.739 5.486-5.346 5.775.42.361.794 1.075.794 2.167 0 1.565-.014 2.827-.014 3.212 0 .313.21.678.802.563A11.5 11.5 0 0023.5 12C23.5 5.649 18.351.5 12 .5z" />
        </svg>
      ),
    },
    {
      href: 'tel:+244928477942',
      label: infoLabels.phone,
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M22 16.92v2a2 2 0 0 1-2.18 2 19.74 19.74 0 0 1-8.63-3.07 19.46 19.46 0 0 1-6-6A19.74 19.74 0 0 1 2.08 3.18 2 2 0 0 1 4.07 1h2a2 2 0 0 1 2 1.72c.12.86.32 1.7.59 2.5a2 2 0 0 1-.45 2.11L7.28 8.3a16 16 0 0 0 8.41 8.41l.97-.93a2 2 0 0 1 2.11-.45c.8.27 1.64.47 2.5.59A2 2 0 0 1 22 16.92Z"
          />
        </svg>
      ),
    },
  ];

  return (
    <ThemeProvider>
      <div className="relative overflow-x-clip">
        <div className="noise-overlay" aria-hidden="true" />

        <aside className="pointer-events-none fixed bottom-0 left-8 z-40 hidden xl:flex flex-col items-center gap-5">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="pointer-events-auto text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
          <span className="h-28 w-px bg-[var(--color-line)]" />
        </aside>

        <aside className="pointer-events-none fixed bottom-0 right-8 z-40 hidden xl:flex flex-col items-center gap-5">
          <a
            href="mailto:carmodagama@gmail.com"
            className="pointer-events-auto font-mono text-xs tracking-[0.22em] text-[var(--color-muted)] transition-colors [writing-mode:vertical-rl] hover:text-[var(--color-accent)]"
            aria-label={infoLabels.email}
          >
            carmodagama@gmail.com
          </a>
          <span className="h-28 w-px bg-[var(--color-line)]" />
        </aside>

        <header>
          <Navbar />
        </header>

        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Education />
          <Projects />
          <Contact />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;

