import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useDemoStatus } from '../hooks/useDemoStatus';
import { DEMO_STATUS } from '../lib/demoStatus';
import { projectPath } from '../lib/routes';
import tmicroPreview from '../assets/project-tmicro.webp';
import trimedPreview from '../assets/project-trimed.webp';
import zenixPreview from '../assets/project-zenix.webp';
import anyconnectPreview from '../assets/project-anyconnect.png';
import smcuangoPreview from '../assets/project-smcuango.webp';
import smchitotoloPreview from '../assets/project-smchitotolo.webp';
import becPreview from '../assets/project-bec.webp';
import kandongaPreview from '../assets/project-kandonga.webp';

const projectPreviews = {
  tmicro: tmicroPreview,
  trimed: trimedPreview,
  zenix: zenixPreview,
  anyconnect: anyconnectPreview,
  smcuango: smcuangoPreview,
  smchitotolo: smchitotoloPreview,
  bec: becPreview,
  kandonga: kandongaPreview,
};

const statusTone = {
  [DEMO_STATUS.CHECKING]: { dot: 'bg-[var(--color-muted)] animate-pulse', text: 'text-[var(--color-muted)]' },
  [DEMO_STATUS.ONLINE]: { dot: 'bg-emerald-400 shadow-[0_0_0_3px_rgba(52,211,153,0.18)]', text: 'text-emerald-400' },
  [DEMO_STATUS.OFFLINE]: { dot: 'bg-rose-400', text: 'text-rose-400' },
};

function SiteStatusBadge({ status, t }) {
  const tone = statusTone[status] ?? statusTone[DEMO_STATUS.CHECKING];
  const label = {
    [DEMO_STATUS.CHECKING]: t.statusChecking,
    [DEMO_STATUS.ONLINE]: t.statusOnline,
    [DEMO_STATUS.OFFLINE]: t.statusOffline,
  }[status];
  const hint = {
    [DEMO_STATUS.CHECKING]: t.statusCheckingHint,
    [DEMO_STATUS.ONLINE]: t.statusOnlineHint,
    [DEMO_STATUS.OFFLINE]: t.statusOfflineHint,
  }[status];

  return (
    <span
      title={hint}
      aria-live="polite"
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--color-line)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ${tone.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${tone.dot}`} aria-hidden="true" />
      {label}
    </span>
  );
}

// A project links to its live site when it has one, and to its repository
// otherwise. Kandonga has both, so the repository moves to the secondary row.
function ProjectActions({ project, status, language, t }) {
  const isOffline = Boolean(project.url) && status === DEMO_STATUS.OFFLINE;

  return (
    <div className="mt-5 flex flex-wrap gap-3">
      {project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={isOffline || undefined}
          onClick={isOffline ? (event) => event.preventDefault() : undefined}
          title={isOffline ? t.statusOfflineHint : undefined}
          className={`solid-button ${isOffline ? 'cursor-not-allowed opacity-50 hover:translate-y-0' : ''}`}
        >
          {t.visitSite}
        </a>
      ) : (
        project.repo && (
          <a href={project.repo} target="_blank" rel="noopener noreferrer" className="solid-button">
            {t.viewRepo}
          </a>
        )
      )}

      <a href={projectPath(language, project.id)} className="outline-button">
        {t.caseStudy}
      </a>

      {project.url && project.repo && (
        <a href={project.repo} target="_blank" rel="noopener noreferrer" className="outline-button">
          {t.viewRepo}
        </a>
      )}
    </div>
  );
}

export default function Projects() {
  const { language, translations } = useLanguage();
  const t = translations.projects;
  const [selectedTag, setSelectedTag] = useState(null);

  // Availability of every live site, probed once per session when the page loads.
  const siteStatuses = useDemoStatus(t.items.map((project) => project.url));
  const statusOf = (project) => siteStatuses[project.url] ?? DEMO_STATUS.CHECKING;

  const allTags = Array.from(new Set(t.items.flatMap((project) => project.tags))).sort();

  const filteredProjects = selectedTag
    ? t.items.filter((project) => project.tags.includes(selectedTag))
    : t.items;

  const featuredProjects = filteredProjects.slice(0, 2);
  const compactProjects = filteredProjects.slice(2);

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
          {featuredProjects.map((project) => (
            <article
              key={project.id}
              className="glass-card grid gap-6 overflow-hidden border p-4 sm:p-6 lg:grid-cols-[1.12fr_0.88fr]"
            >
              <div className="relative order-2 lg:order-1">
                <p className="mono-label mb-3">{t.featuredProject}</p>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-2xl font-semibold text-[var(--color-text)]">{project.name}</h3>
                  {project.url && <SiteStatusBadge status={statusOf(project)} t={t} />}
                </div>

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

                <ProjectActions project={project} status={statusOf(project)} language={language} t={t} />
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
          ))}
        </div>

        {compactProjects.length > 0 && (
          <div className="mt-12">
            <p className="mono-label mb-4">{t.otherProjects}</p>
            <div className="grid gap-4 md:grid-cols-2">
              {compactProjects.map((project) => (
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

                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold text-[var(--color-text)]">{project.name}</h3>
                    {project.url && <SiteStatusBadge status={statusOf(project)} t={t} />}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{project.description}</p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="chip">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <ProjectActions project={project} status={statusOf(project)} language={language} t={t} />
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
