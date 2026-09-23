import FeaturedVideo from "@/src/components/Archive/FeaturedVideo.server";
import VideoCard from "@/src/components/VideoCard/VideoCard.server";
import type { VideoCardData } from "@/src/types/video.types";

const videos: VideoCardData[] = [
  {
    category: "Field notes",
    date: "May 18, 2024",
    duration: "18:42",
    thumbnailClass: "thumbnail-circuit",
    title: "Building a better lens for the things we watch",
    views: "12.8K views",
  },
  {
    category: "Conversations",
    date: "Apr 29, 2024",
    duration: "32:16",
    thumbnailClass: "thumbnail-studio",
    title: "The long way around: a conversation on making",
    views: "9.4K views",
  },
  {
    category: "Process",
    date: "Apr 11, 2024",
    duration: "11:05",
    thumbnailClass: "thumbnail-process",
    title: "Inside the process: from rough cut to final frame",
    views: "16.2K views",
  },
  {
    category: "Field notes",
    date: "Mar 27, 2024",
    duration: "24:09",
    thumbnailClass: "thumbnail-landscape",
    title: "A quiet study of movement, light, and place",
    views: "7.1K views",
  },
];

const filters = [
  { className: "rounded-full bg-[var(--paper)] px-4 py-2.5 text-[var(--ink)]", label: "All videos" },
  { className: "rounded-full border border-[var(--line-strong)] px-4 py-2.5 text-[var(--muted)] transition-colors hover:border-[var(--paper)] hover:text-[var(--paper)]", label: "Long form" },
  { className: "rounded-full border border-[var(--line-strong)] px-4 py-2.5 text-[var(--muted)] transition-colors hover:border-[var(--paper)] hover:text-[var(--paper)]", label: "Conversations" },
];

/**
 * Renders the latest archive content and its video collection.
 *
 * @returns The latest archive section.
 */
const LatestArchive = () => {
  return (
    <section className="border-y border-[var(--line)] bg-[var(--ink-soft)]" id="archive">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent)]">Recently added</p>
            <h2 className="text-4xl font-medium tracking-[-0.05em] text-[var(--paper)] sm:text-5xl">The latest cut</h2>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-medium" id="formats">
            {filters.map((filter) => (
              <a className={filter.className} href="#archive" key={filter.label}>
                {filter.label}
              </a>
            ))}
          </div>
        </div>

        <FeaturedVideo />

        <div className="mt-16 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {videos.map((video) => (
            <VideoCard key={video.title} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestArchive;
