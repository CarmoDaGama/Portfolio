import { useLanguage } from '../context/LanguageContext';
import heroPortrait from '../assets/pfp.png';

export default function Hero() {
  const { translations } = useLanguage();
  const t = translations.hero;

  const handleScroll = (href) => {
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 18% 22%, rgba(100,162,255,0.23), transparent 36%), radial-gradient(circle at 86% 18%, rgba(93,207,255,0.17), transparent 30%), radial-gradient(circle at 50% 90%, rgba(100,162,255,0.15), transparent 40%)',
        }}
      />

      <div className="section-shell relative z-10 grid items-center gap-14 lg:grid-cols-[1.12fr_0.88fr]">
        <div className="fade-in-up">
          <p className="mono-label mb-6">{t.introLabel}</p>

          <h1 className="text-4xl font-semibold leading-[1.08] sm:text-6xl lg:text-7xl">
            Carmo Da Gama.
            <span className="mt-2 block text-[var(--color-muted)]">{t.buildLine}</span>
          </h1>

          <h2 className="mt-8 max-w-xl text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
            {t.description}
          </h2>

          <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-accent)]">
            {t.valueLine}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {t.highlightPills.map((pill) => (
              <span key={pill} className="chip">
                {pill}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => handleScroll('#contact')} className="solid-button">
              {t.ctaContact}
            </button>
            <a
              href="https://linkedin.com/in/carmodagama"
              target="_blank"
              rel="noopener noreferrer"
              className="outline-button"
            >
              {t.ctaCv}
            </a>
          </div>

          <button
            type="button"
            onClick={() => handleScroll('#about')}
            className="mt-12 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]"
            aria-label={t.scrollAria}
          >
            <span>{t.scroll}</span>
            <span className="h-px w-10 bg-[var(--color-line)]" />
          </button>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="glass-card p-4 sm:p-5">
            <div className="relative overflow-hidden rounded-xl border border-[var(--color-line)]">
              <img
                src={heroPortrait}
                alt={t.profileAlt}
                className="h-[420px] w-full object-cover object-center"
                loading="eager"
                decoding="async"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:color-mix(in_srgb,var(--color-bg)_50%,transparent)] via-transparent to-transparent" />
            </div>
          </div>

          <div className="absolute -left-8 bottom-8 hidden rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-3 shadow-md lg:block">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-muted)]">{t.role}</p>
          </div>

          <div className="absolute -right-8 top-8 hidden rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-3 shadow-md lg:block">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-accent)]">{t.experienceBadge}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
