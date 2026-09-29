import ArchiveHero from "@/src/components/Archive/ArchiveHero.server";
import ArchivePulse from "@/src/components/Archive/ArchivePulse.server";
import LatestArchive from "@/src/components/Archive/LatestArchive.server";
import ArchiveSearchProvider from "@/src/providers/ArchiveSearchProvider.client";
import { getBarbakahnVideos } from "@/src/service/getVideos";
import type { VideoFilter, VideoView } from "@/src/types/video.types";
import { getArchiveStats, isVideoFilter, isVideoView } from "@/src/utils/video.utils";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type HomeProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/**
 * Renders the Home route content for the Barbakahn archive.
 *
 * @returns The Home route interface.
 */
const Home = async ({ searchParams }: HomeProps) => {
  const queryClient = new QueryClient();

  const allVideos = await queryClient.query({
    queryKey: ["videos", ""],
    queryFn: () =>
      getBarbakahnVideos(process.env.YOUTUBE_CHANNEL_ID),
  });
  const dehydratedState = dehydrate(queryClient);

  const params = await searchParams;
  const requestedFilter = typeof params.format === "string" ? params.format : "all";
  const activeFilter: VideoFilter = isVideoFilter(requestedFilter) ? requestedFilter : "all";
  const requestedView = typeof params.view === "string" ? params.view : "videos";
  const activeView: VideoView = isVideoView(requestedView) ? requestedView : "videos";
  const stats = getArchiveStats(allVideos);

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--ink)] text-[var(--paper)]">
      <div className="relative isolate">
        <ArchiveSearchProvider>
          <ArchiveHero stats={stats} />
          <HydrationBoundary state={dehydratedState}>
            <LatestArchive activeFilter={activeFilter} activeView={activeView} />
          </HydrationBoundary>
        </ArchiveSearchProvider>
      </div>
      <ArchivePulse formatDistribution={stats.formatDistribution} />
    </main>
  );
};

export default Home;
