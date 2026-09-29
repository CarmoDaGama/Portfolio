/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo } from 'react';
import { translations } from '../i18n/translations';
import { DEFAULT_LANGUAGE } from '../lib/preferences';

const LanguageContext = createContext(null);

/**
 * The language is fixed for the lifetime of the page: it comes from the URL, and
 * switching it is a navigation, not a state change (see src/lib/routes.js).
 */
export function LanguageProvider({ children, language = DEFAULT_LANGUAGE }) {
  useEffect(() => {
    // The pre-rendered pages already carry the right lang attribute; this keeps the
    // dev server, which serves one template for every path, in step.
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      translations: translations[language],
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }

  return context;
}
