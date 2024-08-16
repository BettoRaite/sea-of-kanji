import type { ChangeEvent } from "react";
import styles from "./searchBar.module.css";
type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
};
export function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  function handlerChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }
  return (
    <>
      <input
        className={styles.searchBar}
        id="search-bar"
        type="text"
        aria-label="Search kanji"
        value={searchQuery}
        onChange={handlerChange}
      />
    </>
  );
}
