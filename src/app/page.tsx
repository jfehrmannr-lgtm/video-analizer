import ArchiveHero from "@/src/components/Archive/ArchiveHero.server";
import ArchivePulse from "@/src/components/Archive/ArchivePulse.server";
import LatestArchive from "@/src/components/Archive/LatestArchive.server";
import { getBarbakahnVideos } from "@/src/service/getVideos";
import type { VideoFilter, VideoView } from "@/src/types/video.types";
import { filterVideos, getArchiveStats, isVideoFilter, isVideoView } from "@/src/utils/video.utils";

type HomeProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/**
 * Renders the Home route content for the Barbakahn archive.
 *
 * @returns The Home route interface.
 */
const Home = async ({ searchParams }: HomeProps) => {
  const params = await searchParams;
  const searchQuery = typeof params.q === "string" ? params.q.trim() : "";
  const requestedFilter = typeof params.format === "string" ? params.format : "all";
  const activeFilter: VideoFilter = isVideoFilter(requestedFilter) ? requestedFilter : "all";
  const requestedView = typeof params.view === "string" ? params.view : "videos";
  const activeView: VideoView = isVideoView(requestedView) ? requestedView : "videos";
  const allVideos = await getBarbakahnVideos(process.env.YOUTUBE_CHANNEL_ID);
  const videos = filterVideos(allVideos, searchQuery, activeFilter, activeView);
  const stats = getArchiveStats(allVideos);

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--ink)] text-[var(--paper)]">
      <div className="relative isolate">
        <ArchiveHero searchQuery={searchQuery} stats={stats} view={activeView} />
      </div>

      <LatestArchive activeFilter={activeFilter} activeView={activeView} searchQuery={searchQuery} videos={videos} />
      <ArchivePulse formatDistribution={stats.formatDistribution} />
    </main>
  );
};

export default Home;
