import { useLanguage } from '../context/LanguageContext';

export default function Skills() {
  const { translations } = useLanguage();
  const t = translations.skills;

  return (
    <section id="skills" className="py-24 bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-blue-400 font-medium tracking-widest uppercase text-sm mb-2">
            {t.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">{t.title}</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.categories.map((category) => (
            <div
              key={category.title}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/10 group"
            >
              <h3 className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-4 group-hover:text-blue-300 transition-colors">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-gray-800 hover:bg-blue-600/20 hover:text-blue-300 border border-gray-700 hover:border-blue-500/50 text-gray-300 text-sm rounded-full transition-all duration-200 cursor-default"
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
