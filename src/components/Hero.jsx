export default function Hero() {
  const handleScroll = (href) => {
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Animated dot grid background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]" />

      {/* Blue glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <p className="text-blue-400 font-medium tracking-widest uppercase text-sm mb-4 animate-fade-in-up">
          Welcome to my portfolio
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-4 leading-tight animate-fade-in-up">
          Hi, I&apos;m{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
            Carmo Da Gama
          </span>
        </h1>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-300 mb-6 animate-fade-in-up">
          Full-Stack Developer
        </h2>

        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up">
          Specialized in{' '}
          <span className="text-blue-400 font-medium">React.js + Node.js/Laravel</span>{' '}
          with 5+ years building internal web applications and critical systems.
          Currently studying Computer Science at{' '}
          <span className="text-blue-400 font-medium">Escola 42 Luanda</span>.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
          <button
            onClick={() => handleScroll('#contact')}
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 hover:-translate-y-0.5"
          >
            Get In Touch
          </button>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleScroll('#contact'); }}
            className="px-8 py-3.5 border border-blue-500 text-blue-400 hover:bg-blue-500/10 font-semibold rounded-lg transition-all duration-200 hover:-translate-y-0.5 inline-block"
          >
            View CV
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => handleScroll('#about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-500 hover:text-blue-400 transition-colors group"
        aria-label="Scroll down"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <span className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center pt-2">
          <span className="w-1 h-2 bg-current rounded-full animate-bounce" />
        </span>
      </button>
    </section>
  );
}
