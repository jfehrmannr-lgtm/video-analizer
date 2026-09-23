/**
 * Describes the display data required by a video card in the archive.
 */
export type VideoFormat = "Field notes" | "Long form" | "Conversations";

export type VideoFilter = "all" | "long-form" | "conversations";

export type VideoView = "videos" | "shorts";

export type VideoCardData = {
  id: string;
  category: string;
  isShort: boolean;
  date: string;
  description: string;
  duration: string;
  durationSeconds: number;
  format: VideoFormat;
  thumbnailClass: string;
  title: string;
  views: string;
  miniature: string;
  publishedAt: string;
  viewCount: number;
};
