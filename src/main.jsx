import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'
import { readStoredTheme } from './lib/preferences.js'
import { languageFromPath } from './lib/routes.js'

const container = document.getElementById('root')
const language = languageFromPath(window.location.pathname)
const theme = readStoredTheme()

const tree = (
  <StrictMode>
    <LanguageProvider language={language}>
      <App initialTheme={theme} />
    </LanguageProvider>
  </StrictMode>
)

// The build pre-renders one page per language (see scripts/prerender.mjs). The language
// always matches, because both sides read it from the same URL; the theme is a stored
// preference, so hydrate only when it matches the markup and render fresh otherwise.
const prerenderedLanguage = container.dataset.prerenderLanguage
const prerenderedTheme = container.dataset.prerenderTheme
const canHydrate =
  Boolean(prerenderedLanguage) && prerenderedLanguage === language && prerenderedTheme === theme

if (canHydrate) {
  hydrateRoot(container, tree)
} else {
  container.innerHTML = ''
  createRoot(container).render(tree)
}
