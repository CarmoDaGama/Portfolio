import { useLanguage } from '../context/LanguageContext';

export default function Skills() {
  const { translations } = useLanguage();
  const t = translations.skills;

  return (
    <section id="skills" className="defer-render py-24">
      <div className="section-shell">
        <div className="section-title">
          <span className="section-title-index">02.</span>
          <h2 className="section-title-text">{t.title}</h2>
          <span className="section-title-line" />
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {t.categories.map((category) => (
            <article key={category.title} className="glass-card p-6">
              <h3 className="mono-label mb-5">{category.title}</h3>
              <ul className="space-y-2">
                {category.skills.map((skill) => (
                  <li key={skill} className="flex items-start gap-2 text-sm text-[var(--color-muted)]">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
