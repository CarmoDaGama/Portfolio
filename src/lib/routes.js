import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from './preferences.js';

/**
 * The URL is the source of truth for the language. The default locale lives at the
 * root and the others sit under a prefix:
 *
 *   /              /projects/tmicro/            Portuguese (canonical)
 *   /en/           /en/projects/tmicro/         English
 *
 * Both the app and the build-time pre-render import these helpers, so a page and
 * its links can never disagree about where a locale lives.
 */

const LOCALE_PREFIX = /^\/([a-z]{2})(?=\/|$)/;

/** The language a pathname encodes; the default locale for an unprefixed path. */
export function languageFromPath(pathname = '/') {
  const match = LOCALE_PREFIX.exec(pathname);
  return match && SUPPORTED_LANGUAGES.includes(match[1]) ? match[1] : DEFAULT_LANGUAGE;
}

/** The same pathname with any locale prefix removed. */
export function stripLanguage(pathname = '/') {
  const match = LOCALE_PREFIX.exec(pathname);
  if (!match || !SUPPORTED_LANGUAGES.includes(match[1])) return pathname;

  return pathname.slice(match[1].length + 1) || '/';
}

/** The equivalent of `pathname` in another language — what the language switcher links to. */
export function pathForLanguage(language, pathname = '/') {
  const rest = stripLanguage(pathname);
  return language === DEFAULT_LANGUAGE ? rest : `/${language}${rest}`;
}

export function homePath(language) {
  return language === DEFAULT_LANGUAGE ? '/' : `/${language}/`;
}

export function projectPath(language, id) {
  return language === DEFAULT_LANGUAGE ? `/projects/${id}/` : `/${language}/projects/${id}/`;
}
