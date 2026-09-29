export const SITE_URL = 'https://carmodagama.dev';

// Language the pre-rendered `/` markup is generated in. Must match DEFAULT_LANGUAGE
// in src/lib/preferences.js, otherwise the client will never hydrate.
export const PRERENDER_LANGUAGE = 'pt';
export const PRERENDER_THEME = 'dark';

export const PERSON = {
  name: 'Carmo Da Gama',
  givenName: 'Carmo',
  familyName: 'Da Gama',
  jobTitle: 'Backend & Full-Stack Developer',
  email: 'carmodagama@gmail.com',
  telephone: '+244928477942',
  locality: 'Luanda',
  country: 'AO',
  sameAs: [
    'https://github.com/CarmoDaGama',
    'https://linkedin.com/in/carmodagama',
  ],
  knowsAbout: [
    'Node.js',
    'NestJS',
    'TypeScript',
    'C#',
    '.NET',
    'PostgreSQL',
    'Prisma',
    'REST APIs',
    'SOAP',
    'Docker',
    'React.js',
    'Next.js',
    'React Native',
    'Laravel',
  ],
  alumniOf: 'Escola 42 Luanda',
};

// Copy shown on the generated social cards / project pages, per language.
export const COPY = {
  pt: {
    localeTag: 'pt-PT',
    ogLocale: 'pt_PT',
    tagline: 'Backend & Full-Stack · Node.js/NestJS · TypeScript · PostgreSQL',
    projectsHeading: 'Projeto',
    stack: 'Stack',
    liveSite: 'Ver plataforma',
    viewRepo: 'Ver no GitHub',
    backHome: 'Voltar ao portfólio',
    caseStudy: 'Estudo de caso',
    metaSuffix: 'Carmo Da Gama',
    allProjects: 'Todos os projetos',
    switchLanguage: 'English version',
  },
  en: {
    localeTag: 'en-US',
    ogLocale: 'en_US',
    tagline: 'Backend & Full-Stack · Node.js/NestJS · TypeScript · PostgreSQL',
    projectsHeading: 'Project',
    stack: 'Stack',
    liveSite: 'Open platform',
    viewRepo: 'View on GitHub',
    backHome: 'Back to portfolio',
    caseStudy: 'Case study',
    metaSuffix: 'Carmo Da Gama',
    allProjects: 'All projects',
    switchLanguage: 'Versão portuguesa',
  },
};

/** `/projects/<id>/` for pt (the canonical locale) and `/en/projects/<id>/` for en. */
export function projectPath(language, id) {
  return language === PRERENDER_LANGUAGE ? `/projects/${id}/` : `/${language}/projects/${id}/`;
}
