export const SUPPORTED_LANGUAGES = ['en', 'pt'];
export const DEFAULT_LANGUAGE = 'pt';
export const DEFAULT_THEME = 'dark';

const LANGUAGE_KEY = 'portfolio-language';
const THEME_KEY = 'theme';

const isBrowser = typeof window !== 'undefined';

export function readStoredLanguage() {
  if (!isBrowser) return DEFAULT_LANGUAGE;

  const stored = window.localStorage.getItem(LANGUAGE_KEY);
  return stored && SUPPORTED_LANGUAGES.includes(stored) ? stored : DEFAULT_LANGUAGE;
}

export function readStoredTheme() {
  if (!isBrowser) return DEFAULT_THEME;

  const stored = window.localStorage.getItem(THEME_KEY);
  return stored === 'light' || stored === 'dark' ? stored : DEFAULT_THEME;
}

export function persistLanguage(language) {
  if (!isBrowser) return;
  window.localStorage.setItem(LANGUAGE_KEY, language);
}

export function persistTheme(theme) {
  if (!isBrowser) return;
  window.localStorage.setItem(THEME_KEY, theme);
}
