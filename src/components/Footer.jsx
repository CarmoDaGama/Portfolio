import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { translations } = useLanguage();
  const t = translations.footer;

  return (
    <footer className="border-t border-[var(--color-line)] py-8">
      <div className="section-shell">
        <p className="text-center font-mono text-xs tracking-[0.08em] text-[var(--color-muted)]">
          {t.builtWith} React &amp; Vite · &copy; {new Date().getFullYear()} Carmo Da Gama. {t.rights}
        </p>
      </div>
    </footer>
  );
}
