import { useLanguage } from '../context/LanguageContext';
import heroPortrait from '../assets/hero.webp';

export default function About() {
  const { translations } = useLanguage();
  const t = translations.about;
  const recentTech = [
    ...new Set(translations.skills.categories.flatMap((category) => category.skills)),
  ].slice(0, 8);

  return (
    <section id="about" className="defer-render py-24">
      <div className="section-shell">
        <div className="section-title">
          <span className="section-title-index">01.</span>
          <h2 className="section-title-text">{t.title}</h2>
          <span className="section-title-line" />
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[1.12fr_0.88fr]">
          <div className="space-y-5">
            {t.paragraphs.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed text-[var(--color-muted)]">
                {paragraph}
              </p>
            ))}

            <div className="pt-3">
              <p className="mono-label mb-3">Recent technologies</p>
              <ul className="grid grid-cols-2 gap-2 sm:max-w-xl">
                {recentTech.map((tech) => (
                  <li key={tech} className="font-mono text-xs text-[var(--color-muted)]">
                    <span className="mr-2 text-[var(--color-accent)]">▹</span>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 gap-3 pt-3 sm:grid-cols-3">
              {t.stats.map((stat) => (
                <div key={stat.label} className="glass-card p-4 text-center">
                  <p className="font-mono text-2xl text-[var(--color-accent)]">{stat.value}</p>
                  <p className="mt-1 text-xs text-[var(--color-muted)]">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a href="mailto:carmodagama@gmail.com" className="solid-button">
                {t.hire}
              </a>
              <a
                href="https://linkedin.com/in/carmodagama"
                target="_blank"
                rel="noopener noreferrer"
                className="outline-button"
              >
                {t.linkedin}
              </a>
            </div>
          </div>

          <div className="glass-card p-4 sm:p-5">
            <div className="relative overflow-hidden rounded-xl border border-[var(--color-line)]">
              <img
                src={heroPortrait}
                alt="Developer portrait"
                className="h-[420px] w-full object-cover object-center"
                loading="lazy"
                decoding="async"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:color-mix(in_srgb,var(--color-bg)_56%,transparent)] via-transparent to-transparent" />
            </div>

            <div className="mt-4 rounded-lg border border-[var(--color-line)] px-4 py-3">
              <p className="font-mono text-xs text-[var(--color-accent)]">const developer = {'{'}</p>
              <p className="pl-3 font-mono text-xs text-[var(--color-muted)]">
                name: &quot;Carmo Da Gama&quot;,
              </p>
              <p className="pl-3 font-mono text-xs text-[var(--color-muted)]">role: &quot;{t.codeRole}&quot;,</p>
              <p className="pl-3 font-mono text-xs text-[var(--color-muted)]">passion: &quot;{t.codePassion}&quot;</p>
              <p className="font-mono text-xs text-[var(--color-accent)]">{'}'}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
