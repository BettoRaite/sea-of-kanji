import type { ChangeEvent } from "react";
import styles from "./searchBar.module.css";
import searchIcon from "/icons/search.svg";
type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
};

export function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  function handlerChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }
  return (
    <div className={styles.layout}>
      <input
        className={styles.searchBar}
        id="search-bar"
        type="text"
        aria-label="Search kanji"
        value={searchQuery}
        onChange={handlerChange}
        placeholder="Type any kanji character"
      />
      <button className={styles.searchButton} type="button">
        <img src={searchIcon} alt="Search kanji" />
      </button>
    </div>
  );
}
