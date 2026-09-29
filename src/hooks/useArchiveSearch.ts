"use client";

import { createContext, useContext } from "react";

export type ArchiveSearchContextValue = {
  search: string;
  setSearch: (search: string) => void;
};

export const ArchiveSearchContext = createContext<ArchiveSearchContextValue | null>(null);

/**
 * Reads the local archive search state shared by the search form and video list.
 *
 * @returns The current search value and its state setter.
 * @throws If used outside of an archive search provider.
 */
export const useArchiveSearch = (): ArchiveSearchContextValue => {
  const context = useContext(ArchiveSearchContext);

  if (!context) {
    throw new Error("useArchiveSearch must be used within an ArchiveSearchProvider");
  }

  return context;
};
