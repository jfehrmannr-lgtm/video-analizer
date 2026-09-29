"use client"

import FeaturedVideo from "@/src/components/Archive/FeaturedVideo.server";
import VideoCard from "@/src/components/VideoCard/VideoCard.server";
import { useArchiveSearch } from "@/src/hooks/useArchiveSearch";
import type { VideoCardData } from "@/src/types/video.types";
import { useQuery } from "@tanstack/react-query";
import { Fragment } from "react/jsx-runtime";

/**
 * Renders the latest archive content and its filtered video collection.
 *
 * @param props - Videos and active URL filter state.
 * @returns The latest archive section.
 */
const LatestArchiveClient = () => {
  const { search } = useArchiveSearch();

  const { data: videos = [] } = useQuery<VideoCardData[]>({
    queryKey: ["videos", ""],
    queryFn: async () => {
      const response = await fetch(`/api/videos`);

      if (!response.ok) {
        throw new Error("Failed to fetch videos");
      }

      return response.json();
    },
    staleTime: Infinity
  });

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default LatestArchiveClient;
