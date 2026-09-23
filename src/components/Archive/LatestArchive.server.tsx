import FeaturedVideo from "@/src/components/Archive/FeaturedVideo.server";
import VideoCard from "@/src/components/VideoCard/VideoCard.server";
import type { VideoCardData, VideoFilter, VideoView } from "@/src/types/video.types";

type LatestArchiveProps = {
  activeFilter: VideoFilter;
  activeView: VideoView;
  searchQuery: string;
  videos: VideoCardData[];
};

const filters: Array<{ label: string; value: VideoFilter }> = [
  { label: "All videos", value: "all" },
  { label: "Long form", value: "long-form" },
  { label: "Conversations", value: "conversations" },
];

const views: Array<{ label: string; value: VideoView }> = [
  { label: "Videos", value: "videos" },
  { label: "Shorts", value: "shorts" },
];

/**
 * Renders the latest archive content and its filtered video collection.
 *
 * @param props - Videos and active URL filter state.
 * @returns The latest archive section.
 */
const LatestArchive = ({ activeFilter, activeView, searchQuery, videos }: LatestArchiveProps) => {
  const getArchiveHref = (view: VideoView, filter: VideoFilter): string => {
    const params = new URLSearchParams();

    if (searchQuery) params.set("q", searchQuery);
    params.set("view", view);
    if (filter !== "all") params.set("format", filter);

    const query = params.toString();

    return query ? `/?${query}#archive` : "/#archive";
  };

  return (
    <section className="border-y border-[var(--line)] bg-[var(--ink-soft)]" id="archive">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent)]">Recently added</p>
            <h2 className="text-4xl font-medium tracking-[-0.05em] text-[var(--paper)] sm:text-5xl">The latest cut</h2>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
            <div className="flex flex-wrap gap-2 border-r border-[var(--line)] pr-2" aria-label="Content type">
              {views.map((view) => (
                <a
                  className={view.value === activeView ? "rounded-full bg-[var(--paper)] px-4 py-2.5 text-[var(--ink)]" : "rounded-full border border-[var(--line-strong)] px-4 py-2.5 text-[var(--muted)] transition-colors hover:border-[var(--paper)] hover:text-[var(--paper)]"}
                  href={getArchiveHref(view.value, activeFilter)}
                  key={view.value}
                >
                  {view.label}
                </a>
              ))}
            </div>
            <div className="flex flex-wrap gap-2" id="formats" aria-label="Format">
              {filters.map((filter) => (
                <a
                  className={filter.value === activeFilter ? "rounded-full bg-[var(--paper)] px-4 py-2.5 text-[var(--ink)]" : "rounded-full border border-[var(--line-strong)] px-4 py-2.5 text-[var(--muted)] transition-colors hover:border-[var(--paper)] hover:text-[var(--paper)]"}
                  href={getArchiveHref(activeView, filter.value)}
                  key={filter.value}
                >
                  {filter.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <FeaturedVideo video={videos[0] ?? null} />

        {videos.length > 0 ? (
          <div className="mt-16 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        ) : (
          <p className="mt-16 border-t border-[var(--line)] pt-6 text-sm text-[var(--muted)]">
            No videos match this search.
          </p>
        )}
      </div>
    </section>
  );
};

export default LatestArchive;
