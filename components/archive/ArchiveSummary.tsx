const archiveMetrics = [
  { label: "Videos indexed", value: "248" },
  { label: "Total watch time", value: "61h" },
  { label: "Formats", value: "12" },
  { label: "First published", value: "2018" },
];

/**
 * Renders the archive status and summary metrics.
 *
 * @returns The archive summary panel.
 */
const ArchiveSummary = () => {
  return (
    <aside className="border-l border-[var(--line)] pl-6 lg:mb-2" aria-label="Archive summary">
      <div className="mb-10 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
        <span>Archive / 01</span>
        <span className="flex items-center gap-2 text-[var(--accent)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          Indexing
        </span>
      </div>
      <p className="max-w-xs text-2xl leading-tight tracking-[-0.04em] text-[var(--paper)]">
        A growing collection of work, sorted for curiosity.
      </p>
      <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-[var(--line)] pt-6">
        {archiveMetrics.map((metric) => (
          <div key={metric.label}>
            <dt className="text-xs text-[var(--muted)]">{metric.label}</dt>
            <dd className="mt-2 text-2xl font-medium tracking-[-0.04em]">{metric.value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
};

export default ArchiveSummary;
