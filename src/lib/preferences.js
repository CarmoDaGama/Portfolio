export const SUPPORTED_LANGUAGES = ['en', 'pt'];
export const DEFAULT_LANGUAGE = 'pt';
export const DEFAULT_THEME = 'dark';

const THEME_KEY = 'theme';

const isBrowser = typeof window !== 'undefined';

// The language is not stored: it comes from the URL (see src/lib/routes.js), so a
// page and the link that was shared to reach it always agree, and search engines
// see one locale per address. Only the theme is a per-visitor preference.

export function readStoredTheme() {
  if (!isBrowser) return DEFAULT_THEME;

  const stored = window.localStorage.getItem(THEME_KEY);
  return stored === 'light' || stored === 'dark' ? stored : DEFAULT_THEME;
}

export function persistTheme(theme) {
  if (!isBrowser) return;
  window.localStorage.setItem(THEME_KEY, theme);
}
