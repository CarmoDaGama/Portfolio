import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'
import { readStoredLanguage, readStoredTheme } from './lib/preferences.js'

const container = document.getElementById('root')
const language = readStoredLanguage()
const theme = readStoredTheme()

const tree = (
  <StrictMode>
    <LanguageProvider initialLanguage={language}>
      <App initialTheme={theme} />
    </LanguageProvider>
  </StrictMode>
)

// The build pre-renders the page with a fixed language/theme (see scripts/prerender.mjs).
// Hydrate only when the visitor's stored preferences match that markup; otherwise render
// from scratch so a different language/theme never produces a hydration mismatch.
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
