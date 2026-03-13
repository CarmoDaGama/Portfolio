export const translations = {
  en: {
    nav: {
      about: 'About',
      skills: 'Skills',
      experience: 'Experience',
      education: 'Education',
      contact: 'Contact',
      toggleLanguage: 'Switch language',
    },
    hero: {
      welcome: 'Welcome to my portfolio',
      titlePrefix: "Hi, I'm",
      role: 'Full-Stack Developer',
      description:
        'Specialized in React.js + Node.js/Laravel with 5+ years building internal web applications and critical systems. Currently studying Computer Science at Escola 42 Luanda.',
      ctaContact: 'Get In Touch',
      ctaCv: 'View CV',
      scroll: 'Scroll',
    },
    about: {
      eyebrow: 'Who I Am',
      title: 'About Me',
      codeRole: 'Full-Stack Dev',
      codePassion: 'Building things',
      paragraphs: [
        "I'm a Full-Stack Developer specialized in React.js + Node.js/Laravel with over 5 years of experience in maintenance, evolution and development of internal web applications and critical systems.",
        'My expertise spans frontend and backend module creation, complex API integrations (RESTful/SOAP), bug fixing, automated testing (unit and integration) and complete technical documentation.',
        'Currently studying Computer Science at Escola 42 Luanda, focused on Cybersecurity, Operating Systems and Kernel Development, always pushing boundaries.',
      ],
      stats: [
        { value: '5+', label: 'Years of Experience' },
        { value: '20+', label: 'Projects Completed' },
        { value: '15+', label: 'Technologies' },
      ],
      hire: 'Hire Me',
      linkedin: 'LinkedIn',
    },
    skills: {
      eyebrow: 'What I Know',
      title: 'Skills & Technologies',
      categories: [
        {
          title: 'Frontend',
          skills: ['React.js', 'React Native', 'JavaScript', 'TypeScript'],
        },
        {
          title: 'Backend',
          skills: ['Node.js', 'PHP', 'C#', '.NET Platform'],
        },
        {
          title: 'Databases',
          skills: ['SQL Server', 'MySQL', 'MongoDB'],
        },
        {
          title: 'Infrastructure',
          skills: ['Windows Server', 'Linux Systems', 'Shell Scripts', 'Docker'],
        },
        {
          title: 'Architecture',
          skills: ['Domain-Driven Design (DDD)', 'API Development', 'Microservices Development'],
        },
        {
          title: 'Tools & Practices',
          skills: ['Git', 'CI/CD', 'Agile Methodologies'],
        },
      ],
    },
    experience: {
      eyebrow: 'My Journey',
      title: 'Work Experience',
      current: 'Current',
      items: [
        {
          role: 'Fullstack Developer',
          company: 'Self-employed',
          location: 'Luanda, Angola',
          period: 'Oct 2024 - Present',
          current: true,
          bullets: [
            'Develop and deliver full-stack web projects using React.js + Node.js/Laravel + Firebase, focused on maintenance, evolution and rapid launch of internal applications and dashboards.',
            'Create and integrate frontend and backend modules, including external RESTful APIs (Google Maps, WeatherAPI, Directions API), delivering functional MVPs of health and monitoring apps in 3-4 weeks.',
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
          period: 'May 2022 - Sep 2024',
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
          period: 'Sep 2019 - Nov 2021',
          current: false,
          bullets: [
            'Responsible for developing high-quality, scalable and easy-to-maintain Web and Desktop applications for Web and Windows platforms.',
            'Collaborated with cross-functional teams including designers and product managers to translate business requirements into technical specifications.',
          ],
        },
      ],
    },
    education: {
      eyebrow: 'Academic Background',
      title: 'Education',
      coursesTitle: 'Certifications & Courses',
      items: [
        {
          institution: '42',
          location: 'Luanda, Angola',
          degree: 'Computer Science Core',
          period: 'May 2024 - May 2026',
          icon: '42',
        },
        {
          institution: 'Open Source Society University',
          location: 'Remote',
          degree: 'Bachelor in Computer Science',
          period: 'Jan 2024 - Dec 2026',
          icon: 'OS',
        },
        {
          institution: 'Instituto Politecnico Industrial De Luanda (IPIL) Makarenko',
          location: 'Luanda, Angola',
          degree: 'IT/Computer Administration and Management',
          period: 'Jan 2016 - Dec 2019',
          icon: 'IP',
        },
      ],
      courses: [
        {
          title: 'C Piscine, Computer Programming',
          provider: '42',
          date: 'Mar 2024',
        },
      ],
    },
    contact: {
      eyebrow: 'Get In Touch',
      title: 'Contact Me',
      intro:
        "I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision. Feel free to reach out!",
      info: {
        email: 'Email',
        phone: 'Phone',
        location: 'Location',
        linkedin: 'LinkedIn',
      },
      form: {
        successTitle: 'Message Sent!',
        successText: "Thank you for reaching out. I'll get back to you as soon as possible.",
        name: 'Name',
        email: 'Email',
        message: 'Message',
        namePlaceholder: 'Your name',
        emailPlaceholder: 'your@email.com',
        messagePlaceholder: 'Tell me about your project...',
        submit: 'Send Message',
        helper: 'This form is for demonstration purposes only.',
      },
    },
    footer: {
      builtWith: 'Built with',
      rights: 'All rights reserved.',
    },
  },
  pt: {
    nav: {
      about: 'Sobre',
      skills: 'Habilidades',
      experience: 'Experiencia',
      education: 'Educacao',
      contact: 'Contacto',
      toggleLanguage: 'Mudar idioma',
    },
    hero: {
      welcome: 'Bem-vindo ao meu portfolio',
      titlePrefix: 'Ola, eu sou',
      role: 'Desenvolvedor Full-Stack',
      description:
        'Especializado em React.js + Node.js/Laravel com mais de 5 anos construindo aplicacoes web internas e sistemas criticos. Atualmente estudo Ciencia da Computacao na Escola 42 Luanda.',
      ctaContact: 'Entrar em Contacto',
      ctaCv: 'Ver CV',
      scroll: 'Descer',
    },
    about: {
      eyebrow: 'Quem Sou',
      title: 'Sobre Mim',
      codeRole: 'Dev Full-Stack',
      codePassion: 'Construir coisas',
      paragraphs: [
        'Sou um Desenvolvedor Full-Stack especializado em React.js + Node.js/Laravel com mais de 5 anos de experiencia em manutencao, evolucao e desenvolvimento de aplicacoes web internas e sistemas criticos.',
        'A minha experiencia inclui criacao de modulos frontend e backend, integracoes complexas de APIs (RESTful/SOAP), correcao de bugs, testes automatizados (unitarios e integracao) e documentacao tecnica completa.',
        'Atualmente estudo Ciencia da Computacao na Escola 42 Luanda, com foco em Ciberseguranca, Sistemas Operativos e Desenvolvimento de Kernel, sempre a superar limites.',
      ],
      stats: [
        { value: '5+', label: 'Anos de Experiencia' },
        { value: '20+', label: 'Projetos Concluidos' },
        { value: '15+', label: 'Tecnologias' },
      ],
      hire: 'Contrata-me',
      linkedin: 'LinkedIn',
    },
    skills: {
      eyebrow: 'O Que Domino',
      title: 'Habilidades e Tecnologias',
      categories: [
        {
          title: 'Frontend',
          skills: ['React.js', 'React Native', 'JavaScript', 'TypeScript'],
        },
        {
          title: 'Backend',
          skills: ['Node.js', 'PHP', 'C#', '.NET Platform'],
        },
        {
          title: 'Bases de Dados',
          skills: ['SQL Server', 'MySQL', 'MongoDB'],
        },
        {
          title: 'Infraestrutura',
          skills: ['Windows Server', 'Linux Systems', 'Shell Scripts', 'Docker'],
        },
        {
          title: 'Arquitetura',
          skills: ['Domain-Driven Design (DDD)', 'API Development', 'Microservices Development'],
        },
        {
          title: 'Ferramentas e Praticas',
          skills: ['Git', 'CI/CD', 'Agile Methodologies'],
        },
      ],
    },
    experience: {
      eyebrow: 'A Minha Jornada',
      title: 'Experiencia Profissional',
      current: 'Atual',
      items: [
        {
          role: 'Desenvolvedor Fullstack',
          company: 'Freelancer',
          location: 'Luanda, Angola',
          period: 'Out 2024 - Presente',
          current: true,
          bullets: [
            'Desenvolvo e entrego projetos web full-stack com React.js + Node.js/Laravel + Firebase, focados em manutencao, evolucao e lancamento rapido de aplicacoes internas e dashboards.',
            'Crio e integro modulos frontend e backend, incluindo APIs RESTful externas (Google Maps, WeatherAPI, Directions API), entregando MVPs funcionais de aplicacoes de saude e monitorizacao em 3-4 semanas.',
            'Identifico e corrijo bugs, implemento testes de usabilidade, suporte offline e documentacao tecnica completa.',
            'Uso arquiteturas modulares (NestJS, Flutter, Expo) e ferramentas de CI/CD (Nx/Turborepo) para entregar solucoes cross-platform escalaveis.',
            'Colaboro com clientes e equipas remotas na analise de requisitos, especificacoes tecnicas e suporte pos-entrega de 30 dias.',
            'Desenvolvo aplicacoes moveis com React Native, priorizando ciberseguranca, autenticacao e integracoes RESTful em projetos de saude publica.',
          ],
        },
        {
          role: 'Desenvolvedor Fullstack',
          company: 'Kivembasoft',
          location: 'Luanda, Angola',
          period: 'Mai 2022 - Set 2024',
          current: false,
          bullets: [
            'Mantive e evolui aplicacoes web internas para faturacao certificada pela AGT, desenvolvendo e melhorando modulos frontend e backend.',
            'Realizei integracoes complexas de APIs RESTful e SOAP com sistemas externos (bancos, operadores de pagamento e servicos da AGT).',
            'Identifiquei e corrigi bugs criticos em producao, implementando testes automatizados (unitarios e integracao) e documentacao tecnica completa.',
            'Colaborei diariamente com equipas multidisciplinares (produto, QA e operacoes) usando metodologias ageis (Scrum/Kanban) e controlo de versao Git.',
            'Otimizei bases de dados relacionais e nao relacionais (MySQL, MongoDB e SQL Server) em ambientes de alta transacao.',
            'Contribui para boas praticas, CI/CD (Azure DevOps) e versionamento de codigo num ambiente hibrido/remoto.',
          ],
        },
        {
          role: 'Desenvolvedor Back-End',
          company: 'Crisoftec',
          location: 'Luanda, Angola',
          period: 'Set 2019 - Nov 2021',
          current: false,
          bullets: [
            'Responsavel pelo desenvolvimento de aplicacoes Web e Desktop de alta qualidade, escalaveis e de facil manutencao para plataformas Web e Windows.',
            'Colaborei com equipas multifuncionais incluindo designers e gestores de produto para transformar requisitos de negocio em especificacoes tecnicas.',
          ],
        },
      ],
    },
    education: {
      eyebrow: 'Formacao Academica',
      title: 'Educacao',
      coursesTitle: 'Certificacoes e Cursos',
      items: [
        {
          institution: '42',
          location: 'Luanda, Angola',
          degree: 'Nucleo de Ciencia da Computacao',
          period: 'Mai 2024 - Mai 2026',
          icon: '42',
        },
        {
          institution: 'Open Source Society University',
          location: 'Remoto',
          degree: 'Licenciatura em Ciencia da Computacao',
          period: 'Jan 2024 - Dez 2026',
          icon: 'OS',
        },
        {
          institution: 'Instituto Politecnico Industrial De Luanda (IPIL) Makarenko',
          location: 'Luanda, Angola',
          degree: 'Administracao e Gestao Informatica',
          period: 'Jan 2016 - Dez 2019',
          icon: 'IP',
        },
      ],
      courses: [
        {
          title: 'C Piscine, Programacao de Computadores',
          provider: '42',
          date: 'Mar 2024',
        },
      ],
    },
    contact: {
      eyebrow: 'Entrar em Contacto',
      title: 'Contacte-me',
      intro:
        'Estou sempre aberto para discutir novos projetos, ideias criativas ou oportunidades para fazer parte da sua visao. Fique a vontade para entrar em contacto!',
      info: {
        email: 'Email',
        phone: 'Telefone',
        location: 'Localizacao',
        linkedin: 'LinkedIn',
      },
      form: {
        successTitle: 'Mensagem Enviada!',
        successText: 'Obrigado pelo contacto. Vou responder assim que possivel.',
        name: 'Nome',
        email: 'Email',
        message: 'Mensagem',
        namePlaceholder: 'O seu nome',
        emailPlaceholder: 'seu@email.com',
        messagePlaceholder: 'Fale-me sobre o seu projeto...',
        submit: 'Enviar Mensagem',
        helper: 'Este formulario e apenas para demonstracao.',
      },
    },
    footer: {
      builtWith: 'Construido com',
      rights: 'Todos os direitos reservados.',
    },
  },
};
