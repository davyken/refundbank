import type { LegalDocument } from "./legal-content";

export function LegalPage({ document }: { document: LegalDocument }) {
  return (
    <article className="mx-auto max-w-3xl px-4 pt-32 pb-24 sm:px-8 sm:pt-40 sm:pb-32">
      <p className="text-sm font-semibold tracking-widest text-mint uppercase">Legal</p>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">{document.title}</h1>
      <p className="mt-4 text-lg text-muted">{document.summary}</p>
      <p className="mt-2 text-sm text-muted">Last updated {document.updated}</p>
      <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
        {document.sections.map((section) => (
          <section key={section.heading} className="py-8">
            <h2 className="text-xl font-bold">{section.heading}</h2>
            <div className="mt-3 space-y-3 leading-relaxed text-muted">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
