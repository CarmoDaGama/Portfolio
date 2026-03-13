const stats = [
  { value: '5+', label: 'Years of Experience' },
  { value: '20+', label: 'Projects Completed' },
  { value: '15+', label: 'Technologies' },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-blue-400 font-medium tracking-widest uppercase text-sm mb-2">
            Who I Am
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">About Me</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: decorative avatar */}
          <div className="flex flex-col items-center gap-8">
            <div className="relative">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-2xl shadow-blue-900/40">
                <span className="text-white text-6xl font-extrabold tracking-tight">CG</span>
              </div>
              <div className="absolute -inset-2 rounded-full border-2 border-blue-500/30 animate-pulse" />
            </div>

            {/* Code decoration */}
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 font-mono text-sm w-full max-w-xs">
              <div className="flex gap-1.5 mb-3">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <p className="text-blue-400">const <span className="text-green-400">developer</span> = {'{'}</p>
              <p className="text-gray-300 pl-4">name: <span className="text-yellow-300">&quot;Carmo Da Gama&quot;</span>,</p>
              <p className="text-gray-300 pl-4">role: <span className="text-yellow-300">&quot;Full-Stack Dev&quot;</span>,</p>
              <p className="text-gray-300 pl-4">experience: <span className="text-purple-400">5</span>,</p>
              <p className="text-gray-300 pl-4">passion: <span className="text-yellow-300">&quot;Building things&quot;</span></p>
              <p className="text-blue-400">{'}'}</p>
            </div>
          </div>

          {/* Right: profile text + stats */}
          <div className="space-y-6">
            <p className="text-gray-300 text-base leading-relaxed">
              I&apos;m a <span className="text-white font-semibold">Full-Stack Developer</span> specialized in
              React.js + Node.js/Laravel with over{' '}
              <span className="text-blue-400 font-semibold">5 years of experience</span> in maintenance,
              evolution and development of internal web applications and critical systems.
            </p>
            <p className="text-gray-300 text-base leading-relaxed">
              My expertise spans frontend and backend module creation, complex API integrations
              (RESTful/SOAP), bug fixing, automated testing (unit and integration) and complete
              technical documentation.
            </p>
            <p className="text-gray-300 text-base leading-relaxed">
              Currently studying Computer Science at{' '}
              <span className="text-blue-400 font-semibold">Escola 42 Luanda</span>, focused on
              Cybersecurity, Operating Systems and Kernel Development — always pushing boundaries.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center hover:border-blue-500/50 transition-colors"
                >
                  <p className="text-3xl font-extrabold text-blue-400">{stat.value}</p>
                  <p className="text-gray-400 text-xs mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-4 pt-2">
              <a
                href="mailto:carmodagama@gmail.com"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Hire Me
              </a>
              <a
                href="https://linkedin.com/in/carmodagama"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 border border-gray-700 hover:border-blue-500 text-gray-300 hover:text-white text-sm font-semibold rounded-lg transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
