import { useLanguage } from '../context/LanguageContext';

export default function Skills() {
  const { translations } = useLanguage();
  const t = translations.skills;

  return (
    <section id="skills" className="defer-render py-24 dark:bg-gray-900 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-blue-400 font-medium tracking-widest uppercase text-sm mb-2">
            {t.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold dark:text-white text-gray-900">{t.title}</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.categories.map((category) => (
            <div
              key={category.title}
              className="elegant-card p-6 group"
            >
              <h3 className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-4 group-hover:text-blue-300 transition-colors">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 dark:bg-gray-800 bg-white dark:hover:bg-blue-600/20 hover:bg-blue-100 dark:hover:text-blue-300 hover:text-blue-700 dark:border-gray-700 border-gray-200 hover:border-blue-500/50 dark:text-gray-300 text-gray-700 text-sm rounded-full transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
