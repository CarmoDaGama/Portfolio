import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import tmicroPreview from '../assets/project-tmicro.svg';
import trimedPreview from '../assets/project-trimed.svg';
import zenixPreview from '../assets/project-zenix.svg';

const projectPreviews = {
  tmicro: tmicroPreview,
  trimed: trimedPreview,
  zenix: zenixPreview,
};

export default function Projects() {
  const { translations } = useLanguage();
  const t = translations.projects;
  const [visiblePasswords, setVisiblePasswords] = useState({});

  const togglePassword = (idx) => {
    setVisiblePasswords((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <section id="projects" className="py-24 bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-blue-400 font-medium tracking-widest uppercase text-sm mb-2">
            {t.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">{t.title}</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Project cards grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {t.items.map((project, idx) => (
            <div
              key={idx}
              className="group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden border-b border-gray-800 bg-gray-950">
                <img
                  src={projectPreviews[project.id]}
                  alt={project.name}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/10 to-transparent" />
                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-gray-950/75 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-300 backdrop-blur">
                  Preview
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                {/* Project name */}
                <h3 className="text-white font-bold text-xl mb-2 group-hover:text-blue-300 transition-colors">
                  {project.name}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-blue-600/10 text-blue-400 border border-blue-500/20 text-xs rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Demo credentials */}
                <div className="bg-gray-800/60 rounded-xl p-4 mb-5 border border-gray-700/50">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                    {t.credentials}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 w-20 shrink-0">{t.userLabel}:</span>
                      <code className="text-blue-300 bg-gray-900/60 px-2 py-0.5 rounded text-xs break-all">
                        {project.user}
                      </code>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 w-20 shrink-0">{t.passwordLabel}:</span>
                      <code className="text-blue-300 bg-gray-900/60 px-2 py-0.5 rounded text-xs font-mono">
                        {visiblePasswords[idx] ? project.password : '••••••••'}
                      </code>
                      <button
                        onClick={() => togglePassword(idx)}
                        className="ml-auto text-gray-500 hover:text-gray-300 transition-colors shrink-0"
                        aria-label="Toggle password visibility"
                      >
                        {visiblePasswords[idx] ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Live demo link */}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  {t.liveDemo}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
