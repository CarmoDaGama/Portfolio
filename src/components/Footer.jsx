import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { translations } = useLanguage();
  const t = translations.footer;

  return (
    <footer className="dark:bg-gray-950 bg-gray-50 border-t dark:border-gray-800 border-gray-200 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
              CG
            </span>
            <span className="dark:text-white text-gray-900 font-semibold">Carmo Da Gama</span>
          </div>

          <p className="dark:text-gray-500 text-gray-600 text-sm">
            {t.builtWith}{' '}
            <span className="text-blue-400">React</span> &amp;{' '}
            <span className="text-blue-400">Vite</span>
          </p>

          <p className="dark:text-gray-500 text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Carmo Da Gama. {t.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
