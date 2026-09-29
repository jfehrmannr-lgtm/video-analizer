"use client"

import { useArchiveSearch } from "@/src/hooks/useArchiveSearch";

/**
 * Renders the archive search presentation.
 *
 * @returns The archive search form.
 */
const SearchForm = () => {
  const { search, setSearch } = useArchiveSearch();

  return (
    <form className="mt-10 flex max-w-xl items-center rounded-full border border-[var(--line-strong)] bg-[var(--surface)] p-1.5 transition-colors focus-within:border-[var(--accent)]" onSubmit={(event) => event.preventDefault()} role="search">
      <label className="sr-only" htmlFor="archive-search">
        Search the archive
      </label>
      <svg aria-hidden="true" className="ml-3 h-4 w-4 shrink-0 text-[var(--muted)]" viewBox="0 0 20 20" fill="none">
        <circle cx="8.75" cy="8.75" r="5.75" stroke="currentColor" strokeWidth="1.5" />
        <path d="m13 13 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <input className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-[var(--paper)] outline-none placeholder:text-[var(--muted)]" id="archive-search" onChange={(event) => setSearch(event.target.value)} placeholder="Search titles, topics, or formats" type="search" value={search} />
      <button className="rounded-full bg-[var(--accent)] px-4 py-2.5 text-xs font-semibold text-[var(--ink)] transition-colors hover:bg-[var(--paper)]" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
