import type { VideoCardData } from "@/src/types/video.types";

type VideoCardProps = {
  video: VideoCardData;
};

/**
 * Renders one reusable video card in the archive grid.
 *
 * @param props - Video metadata used by the card.
 * @returns A video card linking to the archive section.
 */
const VideoCard = ({ video }: VideoCardProps) => {
  return (
    <article className="group">
      <a className="block" href="#archive">
        <div className={`${video.thumbnailClass} relative aspect-[1.45] overflow-hidden rounded-xl border border-[var(--line-strong)]`}>
          {/* Native img supports the YouTube thumbnail URL without adding remote image configuration. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={video.miniature}
            alt={video.title}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <span className="absolute bottom-3 left-3 text-[10px] font-medium uppercase tracking-[0.16em] text-white/75">{video.format}</span>
          <span className="absolute bottom-3 right-3 rounded bg-black/35 px-1.5 py-1 text-[10px] font-medium text-white/85">{video.duration}</span>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between gap-3 text-[11px] text-[var(--muted)]">
            <span>{video.date}</span>
            <span>{video.views}</span>
          </div>
          <h3 className="mt-2 text-base font-medium leading-snug tracking-[-0.02em] text-[var(--paper)] transition-colors group-hover:text-[var(--accent)]">
            {video.title}
          </h3>
        </div>
      </a>
    </article>
  );
};

export default VideoCard;
