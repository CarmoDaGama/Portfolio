import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { translations } = useLanguage();
  const t = translations.contact;

  const contactInfo = [
    {
      label: t.info.email,
      value: 'carmodagama@gmail.com',
      href: 'mailto:carmodagama@gmail.com',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: t.info.phone,
      value: '+244 928477942',
      href: 'tel:+244928477942',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
    },
    {
      label: t.info.location,
      value: 'Luanda, Angola',
      href: null,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      label: t.info.linkedin,
      value: 'linkedin.com/in/carmodagama',
      href: 'https://linkedin.com/in/carmodagama',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
  ];

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = `Portfolio Contact - ${form.name}`;
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`;
    const mailtoUrl = `mailto:carmodagama@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="defer-render py-24">
      <div className="section-shell">
        <div className="section-title">
          <span className="section-title-index">06.</span>
          <h2 className="section-title-text">{t.title}</h2>
          <span className="section-title-line" />
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-5">
            <p className="max-w-xl text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">{t.intro}</p>

            <div className="space-y-3">
              {contactInfo.map((item) => (
                <div key={item.label} className="glass-card flex items-center gap-3 px-4 py-3">
                  <span className="text-[var(--color-accent)]">{item.icon}</span>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-muted)]">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-sm text-[var(--color-text)] transition-colors hover:text-[var(--color-accent)]"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-[var(--color-text)]">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <a href="mailto:carmodagama@gmail.com" className="solid-button inline-block">
              Say Hello
            </a>
          </div>

          <div className="glass-card p-6 sm:p-8">
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center gap-3 py-6 text-center">
                <p className="font-mono text-sm text-[var(--color-accent)]">{t.form.successTitle}</p>
                <p className="text-sm text-[var(--color-muted)]">{t.form.successText}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="mb-1.5 block font-mono text-xs text-[var(--color-muted)]">
                    {t.form.name}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t.form.namePlaceholder}
                    className="w-full rounded border border-[var(--color-line)] bg-[color:color-mix(in_srgb,var(--color-surface)_88%,transparent)] px-3 py-2.5 text-sm text-[var(--color-text)] outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)]"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block font-mono text-xs text-[var(--color-muted)]">
                    {t.form.email}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t.form.emailPlaceholder}
                    className="w-full rounded border border-[var(--color-line)] bg-[color:color-mix(in_srgb,var(--color-surface)_88%,transparent)] px-3 py-2.5 text-sm text-[var(--color-text)] outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)]"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block font-mono text-xs text-[var(--color-muted)]">
                    {t.form.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t.form.messagePlaceholder}
                    className="w-full resize-none rounded border border-[var(--color-line)] bg-[color:color-mix(in_srgb,var(--color-surface)_88%,transparent)] px-3 py-2.5 text-sm text-[var(--color-text)] outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)]"
                  />
                </div>

                <button type="submit" className="solid-button w-full">
                  {t.form.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
