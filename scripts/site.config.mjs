export { homePath, projectPath } from '../src/lib/routes.js';

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
    liveSite: 'Ver site',
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
    liveSite: 'Visit site',
    viewRepo: 'View on GitHub',
    backHome: 'Back to portfolio',
    caseStudy: 'Case study',
    metaSuffix: 'Carmo Da Gama',
    allProjects: 'All projects',
    switchLanguage: 'Versão portuguesa',
  },
};

/**
 * Head content that differs between the two home pages. Everything else in
 * index.html is language-neutral and is reused as-is.
 */
export const HOME_META = {
  pt: {
    lang: 'pt',
    title: 'Carmo Da Gama – Backend & Full-Stack Developer (Node.js/NestJS, TypeScript)',
    description:
      'Portfólio de Carmo Da Gama, desenvolvedor backend com cerca de 7 anos em Node.js/NestJS, TypeScript e PostgreSQL. Plataformas de faturação certificadas pela AGT, integrações bancárias e sistemas críticos em produção em Luanda, Angola.',
    ogTitle: 'Carmo Da Gama – Backend & Full-Stack Developer',
    ogDescription:
      'Cerca de 7 anos a construir plataformas de faturação, pagamentos e crédito com Node.js/NestJS, TypeScript e PostgreSQL.',
  },
  en: {
    lang: 'en',
    title: 'Carmo Da Gama – Backend & Full-Stack Developer (Node.js/NestJS, TypeScript)',
    description:
      "Carmo Da Gama's portfolio: a backend developer with around 7 years in Node.js/NestJS, TypeScript and PostgreSQL. AGT-certified billing platforms, banking integrations and critical systems in production in Luanda, Angola.",
    ogTitle: 'Carmo Da Gama – Backend & Full-Stack Developer',
    ogDescription:
      'Around 7 years building billing, payment and credit platforms with Node.js/NestJS, TypeScript and PostgreSQL.',
  },
};
