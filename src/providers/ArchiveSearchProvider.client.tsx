"use client";

import { ArchiveSearchContext } from "@/src/hooks/useArchiveSearch";
import { useState, type ReactNode } from "react";

type ArchiveSearchProviderProps = {
  children: ReactNode;
};

/**
 * Provides local search state to the archive search form and video list.
 *
 * @param props - Provider content.
 * @returns The provider-wrapped archive content.
 */
const ArchiveSearchProvider = ({ children }: ArchiveSearchProviderProps) => {
  const [search, setSearch] = useState("");

  return (
    <ArchiveSearchContext.Provider value={{ search, setSearch }}>
      {children}
    </ArchiveSearchContext.Provider>
  );
};

export default ArchiveSearchProvider;
