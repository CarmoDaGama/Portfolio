const experiences = [
  {
    role: 'Fullstack Developer',
    company: 'Self-employed',
    location: 'Luanda, Angola',
    period: 'Oct 2024 – Present',
    current: true,
    bullets: [
      'Develop and deliver full-stack web projects using React.js + Node.js/Laravel + Firebase, focused on maintenance, evolution and rapid launch of internal applications and dashboards.',
      'Create and integrate frontend and backend modules, including external RESTful APIs (Google Maps, WeatherAPI, Directions API), delivering functional MVPs of health and monitoring apps in 3–4 weeks.',
      'Identify and fix bugs, implement usability tests, offline support and complete technical documentation.',
      'Use modular architectures (NestJS, Flutter, Expo) and CI/CD tools (Nx/Turborepo) to deliver scalable cross-platform solutions.',
      'Collaborate with clients and remote teams on requirements analysis, technical specifications and 30-day post-delivery support.',
      'Develop mobile applications with React Native, prioritizing cybersecurity, authentication and RESTful integrations in public health projects.',
    ],
  },
  {
    role: 'Fullstack Developer',
    company: 'Kivembasoft',
    location: 'Luanda, Angola',
    period: 'May 2022 – Sep 2024',
    current: false,
    bullets: [
      'Maintained and evolved internal web applications for AGT-certified billing, developing and improving frontend and backend modules.',
      'Performed complex RESTful and SOAP API integrations with external systems (banks, payment operators and AGT services).',
      'Identified and fixed critical production bugs, implementing automated tests (unit and integration) and complete technical documentation.',
      'Collaborated daily with multidisciplinary teams (product, QA and operations) using agile methodologies (Scrum/Kanban) and Git version control.',
      'Optimized relational and non-relational databases (MySQL, MongoDB and SQL Server) in high-transaction environments.',
      'Contributed to best practices, CI/CD (Azure DevOps) and code versioning in a hybrid/remote environment.',
    ],
  },
  {
    role: 'Back-End Developer',
    company: 'Crisoftec',
    location: 'Luanda, Angola',
    period: 'Sep 2019 – Nov 2021',
    current: false,
    bullets: [
      'Responsible for developing high-quality, scalable and easy-to-maintain Web and Desktop applications for Web and Windows platforms.',
      'Collaborated with cross-functional teams including designers and product managers to translate business requirements into technical specifications.',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-blue-400 font-medium tracking-widest uppercase text-sm mb-2">
            My Journey
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Work Experience</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-600 via-blue-500/50 to-transparent" />

          <div className="space-y-10">
            {experiences.map((exp, idx) => (
              <div key={idx} className="relative pl-12 sm:pl-20">
                {/* Timeline dot */}
                <div
                  className={`absolute left-3.5 sm:left-7 top-6 w-2 h-2 rounded-full border-2 ${
                    exp.current
                      ? 'bg-blue-500 border-blue-400 shadow-lg shadow-blue-500/50'
                      : 'bg-gray-700 border-gray-600'
                  }`}
                />

                {/* Card */}
                <div className="bg-gray-900 border border-gray-800 border-l-4 border-l-blue-600 rounded-xl p-6 hover:border-gray-700 transition-colors group">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <h3 className="text-white font-bold text-lg group-hover:text-blue-300 transition-colors">
                      {exp.role}
                    </h3>
                    {exp.current && (
                      <span className="px-2.5 py-0.5 bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs rounded-full font-medium">
                        Current
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4 text-sm text-gray-400">
                    <span className="text-blue-400 font-semibold">{exp.company}</span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {exp.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} className="flex gap-2 text-gray-400 text-sm leading-relaxed">
                        <span className="text-blue-500 mt-1.5 shrink-0">▸</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
