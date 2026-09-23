import type { ArchiveStats } from "@/src/utils/video.utils";

type ArchiveSummaryProps = {
  stats: ArchiveStats;
};

/**
 * Renders the archive status and summary metrics.
 *
 * @param props - Derived archive statistics.
 * @returns The archive summary panel.
 */
const ArchiveSummary = ({ stats }: ArchiveSummaryProps) => {
  const archiveMetrics = [
    { label: "Videos indexed", value: stats.videoCount.toString() },
    { label: "Total watch time", value: stats.totalWatchTime },
    { label: "Formats", value: stats.formatCount.toString() },
    { label: "First published", value: stats.firstPublished },
  ];

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
