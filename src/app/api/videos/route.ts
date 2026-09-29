import { getBarbakahnVideos } from "@/src/service/getVideos";

/**
 * Returns Barbakahn videos for the requested search filter.
 *
 * @param request - Incoming request containing an optional `search_filter` query parameter.
 * @returns A JSON response containing the fetched videos.
 */
export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const searchFilter = url.searchParams.get("search_filter") ?? undefined;
  const videos = searchFilter === undefined
    ? await getBarbakahnVideos(process.env.YOUTUBE_CHANNEL_ID)
    : await getBarbakahnVideos(process.env.YOUTUBE_CHANNEL_ID, searchFilter);

  return Response.json(videos);
}
