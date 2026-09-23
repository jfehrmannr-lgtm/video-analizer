const formatDistribution = [
  { label: "Field notes", value: "42%" },
  { label: "Conversations", value: "28%" },
  { label: "Process", value: "19%" },
  { label: "Other", value: "11%" },
];

/**
 * Renders the archive insights and format distribution.
 *
 * @returns The archive pulse section.
 */
const ArchivePulse = () => {
  return (
    <section className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-10 lg:py-28" id="about">
      <div>
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent)]">Archive pulse</p>
        <h2 className="max-w-sm text-4xl font-medium leading-tight tracking-[-0.05em] text-[var(--paper)]">More than a feed. A map of the work.</h2>
      </div>
      <div className="grid gap-8 border-t border-[var(--line)] pt-6 sm:grid-cols-2">
        <div>
          <p className="text-sm leading-6 text-[var(--muted)]">The archive makes patterns visible: recurring ideas, changing formats, and the quiet evolution between projects.</p>
          <a className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-[var(--paper)] transition-colors hover:text-[var(--accent)]" href="#archive">
            Explore all formats
            <span aria-hidden="true">-&gt;</span>
          </a>
        </div>
        <div className="space-y-4 text-xs text-[var(--muted)]">
          {formatDistribution.map((format, index) => (
            <div className={index < formatDistribution.length - 1 ? "flex items-center justify-between border-b border-[var(--line)] pb-3" : "flex items-center justify-between"} key={format.label}>
              <span>{format.label}</span>
              <span>{format.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArchivePulse;
