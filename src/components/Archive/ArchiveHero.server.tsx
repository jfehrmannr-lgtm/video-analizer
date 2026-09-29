import ArchiveSummary from "@/src/components/Archive/ArchiveSummary.server";
import SearchForm from "@/src/components/SearchForm/SearchForm.client";
import type { ArchiveStats } from "@/src/utils/video.utils";

type ArchiveHeroProps = {
  stats: ArchiveStats;
};

/**
 * Renders the archive introduction and discovery entry point.
 *
 * @param props - Derived archive metrics.
 * @returns The archive hero section.
 */
const ArchiveHero = ({ stats }: ArchiveHeroProps) => {
  return (
    <section className="mx-auto grid w-full max-w-7xl gap-16 px-6 pb-24 pt-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] lg:items-end lg:px-10 lg:pt-28">
      <div>
        <div className="mb-7 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          A living video index
        </div>
        <h1 className="max-w-4xl text-balance text-5xl font-medium leading-[0.98] tracking-[-0.06em] text-[var(--paper)] sm:text-7xl lg:text-[6.5rem]">
          Find the thread <span className="text-[var(--muted)]">behind the frame.</span>
        </h1>
        <p className="mt-8 max-w-xl text-base leading-7 text-[var(--muted)] sm:text-lg">
          Explore the Barbakahn catalog through stories, experiments, and the ideas that connect them. A considered home for every cut.
        </p>
        <SearchForm />
      </div>

      <ArchiveSummary stats={stats} />
    </section>
  );
};

export default ArchiveHero;
