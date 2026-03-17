import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { translations, language } = useLanguage();
  const t = translations.hero;

  const featurePills =
    language === 'pt'
      ? ['Sistemas Financeiros', 'APIs Escalaveis', 'MVPs em Semanas']
      : ['Financial Systems', 'Scalable APIs', 'MVPs in Weeks'];

  const valueLine =
    language === 'pt'
      ? 'Criando produtos digitais com foco em resultados reais'
      : 'Building digital products focused on real outcomes';

  const handleScroll = (href) => {
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden dark:bg-gray-950 bg-white"
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="absolute inset-0 dark:bg-gradient-to-b dark:from-gray-950/60 dark:via-transparent dark:to-gray-950 bg-gradient-to-b from-white/60 via-transparent to-white" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.17),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(14,165,233,0.12),transparent_35%),radial-gradient(circle_at_50%_90%,rgba(59,130,246,0.14),transparent_45%)]" />

      <div className="absolute top-24 left-[8%] hidden lg:block h-28 w-28 rounded-2xl border border-blue-400/30 bg-blue-500/10 backdrop-blur-sm rotate-12" />
      <div className="absolute top-36 right-[10%] hidden lg:block h-20 w-20 rounded-full border border-sky-400/30 bg-sky-500/10 backdrop-blur-sm" />
      <div className="absolute bottom-24 right-[14%] hidden lg:block h-24 w-24 rounded-3xl border border-indigo-400/25 bg-indigo-500/10 backdrop-blur-sm -rotate-6" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md px-4 py-2 mb-6 shadow-lg shadow-blue-500/10">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <p className="text-blue-500 dark:text-blue-300 font-semibold tracking-[0.18em] uppercase text-[11px]">
            {t.welcome}
          </p>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black dark:text-white text-gray-900 mb-4 leading-[1.05]">
          {t.titlePrefix}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500">
            Carmo Da Gama
          </span>
        </h1>

        <p className="mx-auto mb-4 inline-flex items-center gap-2 rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300">
          Build. Scale. Impact.
        </p>

        <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold dark:text-gray-300 text-gray-600 mb-6">
          {t.role}
        </h2>

        <p className="dark:text-gray-400 text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
          {t.description}
        </p>

        <div className="flex flex-wrap justify-center gap-2.5 mb-10">
          {featurePills.map((item) => (
            <span
              key={item}
              className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium border border-blue-500/20 dark:bg-gray-900/60 bg-white/80 dark:text-gray-200 text-gray-700 backdrop-blur"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => handleScroll('#contact')}
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-all duration-200 shadow-xl shadow-blue-600/30 hover:shadow-blue-500/45 hover:-translate-y-1"
          >
            {t.ctaContact}
          </button>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleScroll('#contact');
            }}
            className="px-8 py-3.5 border border-blue-500 dark:text-blue-400 text-blue-600 dark:hover:bg-blue-500/10 hover:bg-blue-100 font-semibold rounded-lg transition-all duration-200 hover:-translate-y-1 inline-block"
          >
            {t.ctaCv}
          </a>
        </div>
            <br />
        <div className="mt-20 hidden md:block">
          <div className="mx-auto w-fit rounded-2xl border border-blue-400/20 dark:bg-gray-900/70 bg-white/70 backdrop-blur-md px-4 py-2 text-xs tracking-wide dark:text-gray-300 text-gray-700 shadow-lg shadow-blue-500/10">
            {valueLine}
          </div>
        </div>
            <br />
        <button
          onClick={() => handleScroll('#about')}
          className="mt-10 mx-auto flex flex-col items-center gap-1 dark:text-gray-500 text-gray-500 hover:text-blue-400 transition-colors group"
          aria-label="Scroll down"
        >
          <span className="text-xs tracking-widest uppercase">{t.scroll}</span>
          <span className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center pt-2">
            <span className="w-1 h-2 bg-current rounded-full animate-bounce" />
          </span>
        </button>
      </div>
    </section>
  );
}
