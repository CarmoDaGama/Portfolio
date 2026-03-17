import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import tmicroPreview from '../assets/project-tmicro.webp';
import trimedPreview from '../assets/project-trimed.webp';
import zenixPreview from '../assets/project-zenix.webp';

const projectPreviews = {
  tmicro: tmicroPreview,
  trimed: trimedPreview,
  zenix: zenixPreview,
};

export default function Projects() {
  const { translations } = useLanguage();
  const t = translations.projects;
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);

  // Get all unique tags from projects
  const allTags = Array.from(
    new Set(t.items.flatMap((project) => project.tags))
  ).sort();

  // Filter projects based on selected tag
  const filteredProjects = selectedTag
    ? t.items.filter((project) => project.tags.includes(selectedTag))
    : t.items;

  const togglePassword = (idx) => {
    setVisiblePasswords((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleOpenDemoPrompt = (project) => {
    setSelectedProject(project);
  };

  const handleCloseDemoPrompt = () => {
    setSelectedProject(null);
  };

  const handleProceedToDemo = () => {
    if (!selectedProject?.url) return;
    window.open(selectedProject.url, '_blank', 'noopener,noreferrer');
    handleCloseDemoPrompt();
  };

  return (
    <section id="projects" className="defer-render py-24 dark:bg-gray-950 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-blue-400 font-medium tracking-widest uppercase text-sm mb-2">
            {t.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold dark:text-white text-gray-900">{t.title}</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Filter tags */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedTag === null
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/50'
                : 'dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedTag === tag
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/50'
                  : 'dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Project cards grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 animate-fade-in">
          {filteredProjects.map((project, idx) => (
            <div
              key={idx}
              className="group elegant-card flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden dark:border-gray-800 border-gray-200 border-b dark:bg-gray-950 bg-gray-100">
                <img
                  src={projectPreviews[project.id]}
                  alt={`Preview do projeto ${project.name}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 dark:bg-gradient-to-t dark:from-gray-950 dark:via-gray-950/10 bg-gradient-to-t from-white via-white/10 to-transparent" />
                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full dark:border-white/10 dark:bg-gray-950/75 border-gray-300 bg-white/75 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] dark:text-blue-300 text-blue-600 backdrop-blur">
                  Preview
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                {/* Project name */}
                <h3 className="dark:text-white text-gray-900 font-bold text-xl mb-2 group-hover:text-blue-400 transition-colors">
                  {project.name}
                </h3>

                {/* Description */}
                <p className="dark:text-gray-400 text-gray-600 text-sm leading-relaxed mb-5 flex-1">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 dark:bg-blue-600/10 dark:text-blue-400 dark:border-blue-500/20 bg-blue-100 text-blue-600 border-blue-300 border text-xs rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Demo credentials */}
                <div className="elegant-subcard p-4 mb-5">
                  <p className="text-xs font-semibold dark:text-gray-400 text-gray-600 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                    {t.credentials}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="dark:text-gray-500 text-gray-500 w-20 shrink-0">{t.userLabel}:</span>
                      <code className="dark:text-blue-300 text-blue-600 dark:bg-gray-900/60 bg-gray-200/50 px-2 py-0.5 rounded text-xs break-all">
                        {project.user}
                      </code>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="dark:text-gray-500 text-gray-500 w-20 shrink-0">{t.passwordLabel}:</span>
                      <code className="dark:text-blue-300 text-blue-600 dark:bg-gray-900/60 bg-gray-200/50 px-2 py-0.5 rounded text-xs font-mono">
                        {visiblePasswords[idx] ? project.password : '••••••••'}
                      </code>
                      <button
                        onClick={() => togglePassword(idx)}
                        className="ml-auto dark:text-gray-500 dark:hover:text-gray-300 text-gray-500 hover:text-gray-700 transition-colors shrink-0"
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
                <button
                  type="button"
                  onClick={() => handleOpenDemoPrompt(project)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  {t.liveDemo}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center dark:bg-black/70 bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl border border-blue-300/80 dark:border-blue-500/30 dark:bg-gray-900 bg-white p-6 shadow-2xl dark:shadow-blue-900/30 shadow-blue-300/25">
            <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-2">{t.modalTitle}</h3>
            <p className="text-sm dark:text-gray-300 text-gray-600 mb-5">
              {t.modalText} <span className="dark:text-blue-300 text-blue-600 font-semibold">{selectedProject.name}</span>
            </p>

            <div className="elegant-subcard p-4 space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <span className="dark:text-gray-400 text-gray-600 w-24 shrink-0">{t.userLabel}:</span>
                <code className="dark:text-blue-300 text-blue-600 dark:bg-gray-900/70 bg-gray-200 px-2 py-0.5 rounded text-xs break-all">
                  {selectedProject.user}
                </code>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="dark:text-gray-400 text-gray-600 w-24 shrink-0">{t.passwordLabel}:</span>
                <code className="dark:text-blue-300 text-blue-600 dark:bg-gray-900/70 bg-gray-200 px-2 py-0.5 rounded text-xs break-all">
                  {selectedProject.password}
                </code>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleCloseDemoPrompt}
                className="flex-1 rounded-xl dark:border-gray-600 border-gray-300 border px-4 py-2.5 text-sm font-semibold dark:text-gray-200 text-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 transition-colors"
              >
                {t.modalCancel}
              </button>
              <button
                type="button"
                onClick={handleProceedToDemo}
                className="flex-1 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
              >
                {t.modalProceed}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
