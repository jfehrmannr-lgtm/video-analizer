import type { VideoCardData, VideoFilter, VideoFormat, VideoView } from "@/src/types/video.types";

export type ArchiveStats = {
  firstPublished: string;
  formatCount: number;
  formatDistribution: Array<{ label: VideoFormat; value: string }>;
  totalWatchTime: string;
  videoCount: number;
};

const formatLabels: VideoFormat[] = ["Field notes", "Long form", "Conversations"];

/**
 * Checks whether a query parameter represents a supported archive filter.
 *
 * @param value - Query parameter value to validate.
 * @returns Whether the value is a supported video filter.
 */
export const isVideoFilter = (value: string): value is VideoFilter => {
  return value === "all" || value === "long-form" || value === "conversations";
};

/**
 * Checks whether a query parameter represents a supported video view.
 *
 * @param value - Query parameter value to validate.
 * @returns Whether the value selects videos or shorts.
 */
export const isVideoView = (value: string): value is VideoView => {
  return value === "videos" || value === "shorts";
};

/**
 * Filters archive videos by their title, description, or format.
 *
 * @param videos - Videos returned by the data service.
 * @param query - Search text entered by the user.
 * @param filter - Active format filter.
 * @param view - Active videos or shorts view.
 * @returns Videos matching the active search and format filter.
 */
export const filterVideos = (
  videos: VideoCardData[],
  query: string,
  filter: VideoFilter,
  view: VideoView,
): VideoCardData[] => {
  const normalizedQuery = query.trim().toLowerCase();

  return videos.filter((video) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      video.title.toLowerCase().includes(normalizedQuery) ||
      video.description.toLowerCase().includes(normalizedQuery) ||
      video.category.toLowerCase().includes(normalizedQuery);

    const matchesFilter =
      filter === "all" ||
      (filter === "long-form" && video.format === "Long form") ||
      (filter === "conversations" && video.format === "Conversations");
    const matchesView = view === "shorts" ? video.isShort : !video.isShort;

    return matchesQuery && matchesFilter && matchesView;
  });
};

/**
 * Derives the archive summary values displayed by the landing page.
 *
 * @param videos - All videos indexed for the current archive view.
 * @returns Derived archive metrics and format distribution.
 */
export const getArchiveStats = (videos: VideoCardData[]): ArchiveStats => {
  const totalDurationSeconds = videos.reduce(
    (total, video) => total + video.durationSeconds,
    0,
  );
  const formatDistribution = formatLabels.map((label) => {
    const formatCount = videos.filter((video) => video.format === label).length;
    const percentage = videos.length === 0 ? 0 : Math.round((formatCount / videos.length) * 100);

    return { label, value: `${percentage}%` };
  });
  const publishedDates = videos
    .map((video) => video.publishedAt)
    .filter((date) => date.length > 0)
    .sort();

  return {
    firstPublished: publishedDates[0] ? formatArchiveDate(publishedDates[0]) : "—",
    formatCount: new Set(videos.map((video) => video.format)).size,
    formatDistribution,
    totalWatchTime: formatWatchTime(totalDurationSeconds),
    videoCount: videos.length,
  };
};

const formatArchiveDate = (date: string): string => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "—";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(parsedDate);
};

const formatWatchTime = (totalSeconds: number): string => {
  if (totalSeconds < 60) return "0m";

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;

  return `${hours}h ${minutes}m`;
};
