"use client";

import { createContext, useState } from "react";

type SearchContextProviderProps = {
  children: React.ReactNode;
};

type TSearchContext = {
  searchQuery: string;
  handleChangeSearchQuery: (search: string) => void;
};

export const SearchContext = createContext<TSearchContext | null>(
  null
);

export default function SearchContextProvider({
  children,
}: SearchContextProviderProps) {
  // state

  const [searchQuery, setSearchQuery] = useState("");

  // derived state

  // event handlers

  const handleChangeSearchQuery = (newValue: string) => {
    setSearchQuery(newValue);
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        handleChangeSearchQuery,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
