import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Experience() {
  const { translations } = useLanguage();
  const t = translations.experience;
  const [activeIndex, setActiveIndex] = useState(0);

  const activeItem = t.items[activeIndex];

  return (
    <section id="experience" className="defer-render py-24">
      <div className="section-shell">
        <div className="section-title">
          <span className="section-title-index">03.</span>
          <h2 className="section-title-text">{t.title}</h2>
          <span className="section-title-line" />
        </div>

        <div className="grid gap-6 lg:grid-cols-[230px_1fr]">
          <div className="glass-card overflow-hidden">
            {t.items.map((item, index) => (
              <button
                key={item.company}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`w-full border-l-2 px-4 py-3 text-left font-mono text-xs transition-colors ${
                  index === activeIndex
                    ? 'border-[var(--color-accent)] bg-[var(--color-chip)] text-[var(--color-accent)]'
                    : 'border-transparent text-[var(--color-muted)] hover:bg-[var(--color-chip)]'
                }`}
              >
                {item.company}
              </button>
            ))}
          </div>

          <div className="glass-card p-6 sm:p-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold text-[var(--color-text)]">{activeItem.role}</h3>
                <p className="mt-1 text-sm text-[var(--color-accent)]">@ {activeItem.company}</p>
              </div>
              {activeItem.current && (
                <span className="chip border-[color:var(--color-accent)] text-[var(--color-accent)]">
                  {t.current}
                </span>
              )}
            </div>

            <p className="mb-6 font-mono text-xs uppercase tracking-[0.16em] text-[var(--color-muted)]">
              {activeItem.period} · {activeItem.location}
            </p>

            <ul className="space-y-3">
              {activeItem.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-[var(--color-muted)]">
                  <span className="mt-1 text-[var(--color-accent)]">▹</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
