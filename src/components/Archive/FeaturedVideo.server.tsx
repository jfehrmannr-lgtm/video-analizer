import type { VideoCardData } from "@/src/types/video.types";

type FeaturedVideoProps = {
  video: VideoCardData | null;
};

/**
 * Renders the featured video surface in the archive.
 *
 * @param props - Featured video data.
 * @returns The featured video presentation when data is available.
 */
const FeaturedVideo = ({ video }: FeaturedVideoProps) => {
  if (!video) return null;

  return (
    <article className="mt-12 grid overflow-hidden rounded-2xl border border-[var(--line-strong)] bg-[var(--surface)] lg:grid-cols-[1.2fr_0.8fr]">
      <div className="thumbnail-feature relative flex min-h-80 items-end overflow-hidden p-6 sm:p-10" role="img" aria-label="Abstract placeholder thumbnail for the featured video">
        {/* Native img supports the YouTube thumbnail URL without remote image configuration. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={video.miniature} alt={video.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        <div className="absolute left-[12%] top-[16%] h-32 w-32 rounded-full border border-white/25" />
        <div className="absolute right-[12%] top-[22%] h-44 w-44 rounded-full border border-white/15" />
        <div className="absolute bottom-[18%] left-[23%] h-px w-3/5 bg-white/35" />
        <div className="relative flex w-full items-end justify-between text-[10px] font-medium uppercase tracking-[0.18em] text-white/70">
          <span>Featured / 001</span>
          <span>18:42</span>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-10 p-6 sm:p-10">
        <div>
          <div className="flex items-center justify-between text-xs text-[var(--muted)]">
          <span className="text-[var(--accent)]">{video.format}</span>
            <span>{video.date}</span>
          </div>
          <h3 className="mt-8 max-w-md text-3xl font-medium leading-tight tracking-[-0.05em] text-[var(--paper)] sm:text-4xl">
            {video.title}
          </h3>
          <p className="mt-5 max-w-md text-sm leading-6 text-[var(--muted)]">
            {video.description || "A closer look at the stories and ideas inside the Barbakahn archive."}
          </p>
        </div>
        <a className="flex w-fit items-center gap-3 text-sm font-medium text-[var(--paper)] transition-colors hover:text-[var(--accent)]" href="#archive">
          View video
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line-strong)]">
            <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
              <path d="M3.5 8h9M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </a>
      </div>
    </article>
  );
};

export default FeaturedVideo;
