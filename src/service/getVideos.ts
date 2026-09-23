import type { VideoCardData } from "@/src/types/video.types";

type YoutubeSearchVideo = {
  snippet: {
    publishedAt: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
    title: string;
  };
};

type YoutubeSearchResponse = {
  items: YoutubeSearchVideo[];
};

const mapYoutubeVideo = (video: YoutubeSearchVideo): VideoCardData => {
  return {
    title: video.snippet.title,
    date: video.snippet.publishedAt,
    miniature: video.snippet.thumbnails.high.url,
    category: "",
    duration: "",
    views: "",
    thumbnailClass: "",
  };
};

export const getBarbakahnVideos = async (
  channelId?: string,
): Promise<VideoCardData[]> => {
  try {
    if (!channelId) return [];

    const apiKey = process.env.YOUTUBE_API_KEY;

    const url = new URL(
      "https://www.googleapis.com/youtube/v3/search",
    );

    url.searchParams.set("part", "snippet");
    url.searchParams.set("channelId", channelId);
    url.searchParams.set("type", "video");
    url.searchParams.set("maxResults", "50");
    url.searchParams.set("key", apiKey ?? "");

    const response = await fetch(url);


    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = (await response.json()) as YoutubeSearchResponse;

    // Transform
    return data.items.map(mapYoutubeVideo);
  } catch (error) {
    console.error(error);

    return [];
  }
};
