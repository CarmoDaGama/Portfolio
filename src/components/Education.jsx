import { useLanguage } from '../context/LanguageContext';

export default function Education() {
  const { translations } = useLanguage();
  const t = translations.education;

  return (
    <section id="education" className="defer-render py-24">
      <div className="section-shell">
        <div className="section-title">
          <span className="section-title-index">04.</span>
          <h2 className="section-title-text">{t.title}</h2>
          <span className="section-title-line" />
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {t.items.map((edu) => (
            <article key={`${edu.institution}-${edu.period}`} className="glass-card p-6">
              <p className="mono-label">{edu.icon}</p>
              <h3 className="mt-3 text-base font-semibold text-[var(--color-text)]">{edu.institution}</h3>
              <p className="mt-1 text-sm text-[var(--color-muted)]">{edu.degree}</p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--color-muted)]">
                {edu.period}
              </p>
              <p className="mt-1 text-xs text-[var(--color-muted)]">{edu.location}</p>
            </article>
          ))}
        </div>

        <div className="mt-12">
          <p className="mono-label mb-4">{t.coursesTitle}</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.courses.map((course) => (
              <article key={course.title} className="glass-card p-4">
                <h4 className="text-sm font-semibold text-[var(--color-text)]">{course.title}</h4>
                <p className="mt-2 text-xs text-[var(--color-muted)]">
                  {course.provider} · {course.date}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
