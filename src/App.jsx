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

const socialLinks = [
  {
    href: 'mailto:carmodagama@gmail.com',
    label: 'Email',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="m4 6 8 5 8-5" />
        <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
      </svg>
    ),
  },
  {
    href: 'https://linkedin.com/in/carmodagama',
    label: 'LinkedIn',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27ZM5.33 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14Zm1.78 13.02H3.54V9h3.57v11.45Z" />
      </svg>
    ),
  },
  {
    href: 'tel:+244928477942',
    label: 'Phone',
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

function App() {
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
            aria-label="Email"
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

