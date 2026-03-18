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

  const featuredProjects = filteredProjects.slice(0, 2);
  const compactProjects = filteredProjects.slice(2);

  const togglePassword = (key) => {
    setVisiblePasswords((prev) => ({ ...prev, [key]: !prev[key] }));
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

  const credentialKey = (project) => `${project.id}-${project.name}`;

  return (
    <section id="projects" className="defer-render py-24">
      <div className="section-shell">
        <div className="section-title">
          <span className="section-title-index">05.</span>
          <h2 className="section-title-text">{t.title}</h2>
          <span className="section-title-line" />
        </div>

        <div className="mb-10 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`rounded px-3 py-1.5 font-mono text-xs transition-colors ${
              selectedTag === null
                ? 'bg-[var(--color-accent)] text-white'
                : 'border border-[var(--color-line)] text-[var(--color-muted)] hover:text-[var(--color-text)]'
            }`}
          >
            {t.filterAll}
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`rounded px-3 py-1.5 font-mono text-xs transition-colors ${
                selectedTag === tag
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'border border-[var(--color-line)] text-[var(--color-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="space-y-10">
          {featuredProjects.map((project) => {
            const key = credentialKey(project);
            const isPasswordVisible = Boolean(visiblePasswords[key]);

            return (
              <article
                key={project.id}
                className="glass-card grid gap-6 overflow-hidden border p-4 sm:p-6 lg:grid-cols-[1.12fr_0.88fr]"
              >
                <div className="relative order-2 lg:order-1">
                  <p className="mono-label mb-3">{t.featuredProject}</p>
                  <h3 className="text-2xl font-semibold text-[var(--color-text)]">{project.name}</h3>

                  <div className="mt-4 rounded-lg border border-[var(--color-line)] bg-[color:color-mix(in_srgb,var(--color-surface)_82%,transparent)] p-4">
                    <p className="text-sm leading-relaxed text-[var(--color-muted)]">{project.description}</p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="chip">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 rounded-lg border border-[var(--color-line)] p-4">
                    <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--color-muted)]">
                      {t.credentials}
                    </p>

                    <div className="space-y-2 text-xs">
                      <p className="font-mono text-[var(--color-muted)]">
                        {t.userLabel}: <span className="text-[var(--color-accent)]">{project.user}</span>
                      </p>
                      <div className="flex items-center gap-3">
                        <p className="font-mono text-[var(--color-muted)]">
                          {t.passwordLabel}:{' '}
                          <span className="text-[var(--color-accent)]">
                            {isPasswordVisible ? project.password : '••••••••'}
                          </span>
                        </p>
                        <button
                          type="button"
                          onClick={() => togglePassword(key)}
                          className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-accent)]"
                        >
                          {isPasswordVisible ? t.hide : t.show}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <button type="button" onClick={() => handleOpenDemoPrompt(project)} className="solid-button">
                      {t.liveDemo}
                    </button>
                  </div>
                </div>

                <div className="order-1 overflow-hidden rounded-xl border border-[var(--color-line)] lg:order-2">
                  <img
                    src={projectPreviews[project.id]}
                    alt={`${t.previewAlt} ${project.name}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full min-h-[280px] w-full object-cover object-top"
                  />
                </div>
              </article>
            );
          })}
        </div>

        {compactProjects.length > 0 && (
          <div className="mt-12">
            <p className="mono-label mb-4">{t.otherProjects}</p>
            <div className="grid gap-4 md:grid-cols-2">
              {compactProjects.map((project) => {
                const key = credentialKey(project);
                const isPasswordVisible = Boolean(visiblePasswords[key]);

                return (
                  <article key={project.id} className="glass-card p-5">
                    <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-lg border border-[var(--color-line)]">
                      <img
                        src={projectPreviews[project.id]}
                        alt={`${t.previewAlt} ${project.name}`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover object-top"
                      />
                    </div>

                    <h3 className="text-lg font-semibold text-[var(--color-text)]">{project.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{project.description}</p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="chip">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 rounded border border-[var(--color-line)] p-3">
                      <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--color-muted)]">
                        {t.userLabel}: <span className="text-[var(--color-accent)]">{project.user}</span>
                      </p>
                      <div className="mt-1 flex items-center justify-between gap-2">
                        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--color-muted)]">
                          {t.passwordLabel}:{' '}
                          <span className="text-[var(--color-accent)]">
                            {isPasswordVisible ? project.password : '••••••••'}
                          </span>
                        </p>
                        <button
                          type="button"
                          onClick={() => togglePassword(key)}
                          className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-accent)]"
                        >
                          {isPasswordVisible ? t.hide : t.show}
                        </button>
                      </div>
                    </div>

                    <div className="mt-4">
                      <button type="button" onClick={() => handleOpenDemoPrompt(project)} className="solid-button">
                        {t.liveDemo}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm">
          <div className="glass-card w-full max-w-md p-6">
            <h3 className="text-xl font-semibold text-[var(--color-text)]">{t.modalTitle}</h3>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              {t.modalText} <span className="text-[var(--color-accent)]">{selectedProject.name}</span>
            </p>

            <div className="mt-5 space-y-3 rounded-lg border border-[var(--color-line)] p-4">
              <div className="text-sm">
                <span className="font-mono text-[var(--color-muted)]">{t.userLabel}: </span>
                <code className="text-xs text-[var(--color-accent)]">
                  {selectedProject.user}
                </code>
              </div>
              <div className="text-sm">
                <span className="font-mono text-[var(--color-muted)]">{t.passwordLabel}: </span>
                <code className="text-xs text-[var(--color-accent)]">
                  {selectedProject.password}
                </code>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={handleCloseDemoPrompt}
                className="outline-button flex-1 text-center"
              >
                {t.modalCancel}
              </button>
              <button
                type="button"
                onClick={handleProceedToDemo}
                className="solid-button flex-1 text-center"
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
