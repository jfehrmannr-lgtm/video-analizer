import ArchiveHero from "@/src/components/Archive/ArchiveHero.server";
import ArchivePulse from "@/src/components/Archive/ArchivePulse.server";
import LatestArchive from "@/src/components/Archive/LatestArchive.server";

/**
 * Renders the Home route content for the Barbakahn archive.
 *
 * @returns The Home route interface.
 */
const Home = async () => {
  return (
    <main className="min-h-screen overflow-hidden bg-[var(--ink)] text-[var(--paper)]">
      <div className="relative isolate">
        <ArchiveHero />
      </div>

      <LatestArchive />
      <ArchivePulse />
    </main>
  );
};

export default Home;
