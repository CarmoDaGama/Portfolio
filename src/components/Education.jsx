import { useLanguage } from '../context/LanguageContext';

export default function Education() {
  const { translations } = useLanguage();
  const t = translations.education;

  return (
    <section id="education" className="py-24 bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-blue-400 font-medium tracking-widest uppercase text-sm mb-2">
            {t.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">{t.title}</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Education cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {t.items.map((edu, idx) => (
            <div
              key={idx}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/10 flex flex-col gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                  <span className="text-blue-400 font-bold text-xs">{edu.icon}</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base leading-snug">{edu.institution}</h3>
                  <p className="text-gray-500 text-xs mt-0.5 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {edu.location}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-800 pt-4">
                <p className="text-blue-300 font-medium text-sm mb-1">{edu.degree}</p>
                <p className="text-gray-500 text-xs flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {edu.period}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Courses */}
        <div>
          <h3 className="text-white font-semibold text-xl mb-6 text-center">
            {t.coursesTitle}
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {t.courses.map((course, idx) => (
              <div
                key={idx}
                className="bg-gray-900 border border-gray-800 rounded-xl px-6 py-4 flex items-center gap-4 hover:border-blue-500/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{course.title}</p>
                  <p className="text-gray-400 text-xs">
                    {course.provider} · {course.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
