import Link from "next/link";

/**
 * Renders the persistent site header and primary navigation.
 *
 * @returns The application header.
 */
const SiteHeader = () => {
  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
      <Link className="group flex items-center gap-3" href="/" aria-label="Barbakahn archive home">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--accent)] text-xs font-bold tracking-[-0.08em] text-[var(--ink)] transition-transform group-hover:rotate-6">
          BK
        </span>
        <span className="text-sm font-semibold tracking-tight text-[var(--paper)]">
          Barbakahn <span className="font-normal text-[var(--muted)]">/ archive</span>
        </span>
      </Link>

      <nav className="hidden items-center gap-8 text-sm text-[var(--muted)] md:flex" aria-label="Primary navigation">
        <a className="transition-colors hover:text-[var(--paper)]" href="#archive">
          Library
        </a>
        <a className="transition-colors hover:text-[var(--paper)]" href="#formats">
          Formats
        </a>
        <a className="transition-colors hover:text-[var(--paper)]" href="#about">
          About
        </a>
      </nav>

      <a
        className="hidden items-center gap-2 rounded-full border border-[var(--line-strong)] px-4 py-2 text-xs font-medium text-[var(--paper)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] sm:flex"
        href="#archive"
      >
        Browse archive
        <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
          <path d="M3.5 8h9M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </header>
  );
};

export default SiteHeader;
