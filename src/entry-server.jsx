import { renderToString } from 'react-dom/server';
import App from './App.jsx';
import { LanguageProvider } from './context/LanguageContext.jsx';
import { DEFAULT_LANGUAGE, DEFAULT_THEME } from './lib/preferences.js';

/**
 * Renders the whole portfolio to static HTML at build time so crawlers that do not
 * execute JavaScript (LinkedIn, most recruiter/ATS bots, social previews) still get
 * the full content instead of an empty <div id="root">.
 */
export function render({ language = DEFAULT_LANGUAGE, theme = DEFAULT_THEME } = {}) {
  return renderToString(
    <LanguageProvider initialLanguage={language}>
      <App initialTheme={theme} />
    </LanguageProvider>,
  );
}
