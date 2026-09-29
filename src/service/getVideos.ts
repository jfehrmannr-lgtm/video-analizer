import type { VideoCardData, VideoFormat } from "@/src/types/video.types";

type YoutubeSearchVideo = {
  id: {
    videoId?: string;
  };
  snippet: {
    description: string;
    publishedAt: string;
    thumbnails: {
      default?: { url: string };
      high?: { url: string };
      medium?: { url: string };
    };
    title: string;
  };
};

type YoutubeSearchResponse = {
  items: YoutubeSearchVideo[];
};

type YoutubeChannelSearchResponse = {
  items: Array<{ id: { channelId?: string } }>;
};

type YoutubeVideoDetails = {
  contentDetails?: {
    duration?: string;
  };
  id: string;
  snippet?: {
    categoryId?: string;
  };
  statistics?: {
    viewCount?: string;
  };
};

type YoutubeVideoDetailsResponse = {
  items: YoutubeVideoDetails[];
};

const youtubeCategoryNames: Record<string, string> = {
  "1": "Film & Animation",
  "10": "Music",
  "15": "Pets & Animals",
  "17": "Sports",
  "19": "Travel & Events",
  "20": "Gaming",
  "22": "People & Blogs",
  "23": "Comedy",
  "24": "Entertainment",
  "25": "News & Politics",
  "26": "Howto & Style",
  "27": "Education",
  "28": "Science & Technology",
  "29": "Nonprofits & Activism",
};

/**
 * Fetches and transforms the latest videos from Barbakahn's YouTube channel.
 *
 * @param channelId - Optional verified channel ID. If omitted, the channel is resolved by name.
 * @param searchFilter - Optional search term used to filter the channel's videos.
 * @returns Transformed video data ready for archive presentation.
 */
export const getBarbakahnVideos = async (
  channelId?: string,
  searchFilter?: string,
): Promise<VideoCardData[]> => {
  console.log("Call")
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) return [];

  try {
    const resolvedChannelId = await resolveChannelId(apiKey, channelId);

    if (!resolvedChannelId) return [];

    const searchParams: Record<string, string> = {
      channelId: resolvedChannelId,
      maxResults: "50",
      part: "snippet",
      type: "video",
    };

    if (searchFilter !== undefined) searchParams.q = searchFilter;

    const searchData = await fetchYoutube<YoutubeSearchResponse>("search", searchParams, apiKey);
    const videos = searchData.items.filter((video) => video.id.videoId);
    const videoIds = videos.flatMap((video) => (video.id.videoId ? [video.id.videoId] : []));
    const details = await getVideoDetails(videoIds, apiKey);

    return videos.map((video) => {
      const videoId = video.id.videoId as string;

      return mapYoutubeVideo(video, videoId, details.get(videoId));
    });
  } catch (error) {
    console.error(error);

    return [];
  }
};

const fetchYoutube = async <T>(
  resource: string,
  params: Record<string, string>,
  apiKey: string,
): Promise<T> => {
  const url = new URL(`https://www.googleapis.com/youtube/v3/${resource}`);

  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  url.searchParams.set("key", apiKey);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`YouTube API error: ${response.status}`);
  }

  return (await response.json()) as T;
};

const resolveChannelId = async (apiKey: string, channelId?: string): Promise<string | undefined> => {
  if (channelId) return channelId;

  const data = await fetchYoutube<YoutubeChannelSearchResponse>(
    "search",
    {
      maxResults: "1",
      part: "snippet",
      q: "Barbakahn",
      type: "channel",
    },
    apiKey,
  );

  return data.items[0]?.id.channelId;
};

const getVideoDetails = async (
  videoIds: string[],
  apiKey: string,
): Promise<Map<string, YoutubeVideoDetails>> => {
  if (videoIds.length === 0) return new Map();

  const data = await fetchYoutube<YoutubeVideoDetailsResponse>(
    "videos",
    {
      id: videoIds.join(","),
      part: "contentDetails,snippet,statistics",
    },
    apiKey,
  );

  return new Map(data.items.map((video) => [video.id, video]));
};

const mapYoutubeVideo = (
  video: YoutubeSearchVideo,
  videoId: string,
  details?: YoutubeVideoDetails,
): VideoCardData => {
  const durationSeconds = parseYoutubeDuration(details?.contentDetails?.duration ?? "PT0S");
  const format = getVideoFormat(video.snippet.title, durationSeconds);
  const viewCount = Number(details?.statistics?.viewCount ?? 0);

  return {
    id: videoId,
    category: youtubeCategoryNames[details?.snippet?.categoryId ?? ""] ?? "Video",
    date: formatPublishedDate(video.snippet.publishedAt),
    description: video.snippet.description,
    duration: formatDuration(durationSeconds),
    durationSeconds,
    format,
    isShort: isShortVideo(video.snippet.title, durationSeconds),
    miniature: getThumbnailUrl(video.snippet.thumbnails),
    publishedAt: video.snippet.publishedAt,
    thumbnailClass: "",
    title: video.snippet.title,
    viewCount: Number.isNaN(viewCount) ? 0 : viewCount,
    views: `${formatViewCount(viewCount)} views`,
  };
};

const isShortVideo = (title: string, durationSeconds: number): boolean => {
  return title.toLowerCase().includes("#shorts") || (durationSeconds > 0 && durationSeconds <= 60);
};

const getThumbnailUrl = (thumbnails: YoutubeSearchVideo["snippet"]["thumbnails"]): string => {
  return thumbnails.high?.url ?? thumbnails.medium?.url ?? thumbnails.default?.url ?? "";
};

const getVideoFormat = (title: string, durationSeconds: number): VideoFormat => {
  const normalizedTitle = title.toLowerCase();

  if (
    normalizedTitle.includes("convers") ||
    normalizedTitle.includes("preguntas") ||
    normalizedTitle.includes("responde")
  ) {
    return "Conversations";
  }

  if (durationSeconds >= 20 * 60) return "Long form";

  return "Field notes";
};

const parseYoutubeDuration = (duration: string): number => {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

  if (!match) return 0;

  const hours = Number(match[1] ?? 0);
  const minutes = Number(match[2] ?? 0);
  const seconds = Number(match[3] ?? 0);

  return hours * 3600 + minutes * 60 + seconds;
};

const formatDuration = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const paddedMinutes = minutes.toString().padStart(2, "0");
  const paddedSeconds = seconds.toString().padStart(2, "0");

  if (hours > 0) return `${hours}:${paddedMinutes}:${paddedSeconds}`;

  return `${minutes}:${paddedSeconds}`;
};

const formatPublishedDate = (date: string): string => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return date;

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
};

const formatViewCount = (viewCount: number): string => {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1,
    notation: "compact",
  }).format(viewCount);
};
