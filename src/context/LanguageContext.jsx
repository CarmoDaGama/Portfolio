/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from '../i18n/translations';
import { DEFAULT_LANGUAGE, persistLanguage } from '../lib/preferences';

const LanguageContext = createContext(null);

export function LanguageProvider({ children, initialLanguage = DEFAULT_LANGUAGE }) {
  const [language, setLanguage] = useState(initialLanguage);

  useEffect(() => {
    persistLanguage(language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
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
