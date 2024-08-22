import { type ChangeEvent, type KeyboardEvent, forwardRef } from "react";
import styles from "./searchBar.module.css";
import searchIcon from "/icons/search.svg";
import filterMenuIcon from "/icons/filter-menu-open.svg";
import { useState } from "react";

type SearchBarProps = {
  onSearch: (searchQuery: string) => void;
};

export type InputRef = HTMLInputElement;

export const SearchBar = forwardRef<InputRef, SearchBarProps>(
  ({ onSearch }, inputRef) => {
    const [input, setInput] = useState("");
    function handlerChange(e: ChangeEvent<HTMLInputElement>) {
      setInput(e.target.value);
    }
    function handleClick() {
      onSearch(input);
    }
    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
      if (e.code === "Enter") {
        onSearch(input);
      }
    }
    return (
      <div className={styles.layout}>
        <button className={styles.toggleFilterMenuButton} type="button">
          <img src={filterMenuIcon} alt="Expand filter menu" />
        </button>
        <div className={styles.searchBarLayout}>
          <input
            ref={inputRef}
            className={styles.searchBar}
            id="search-bar"
            type="text"
            aria-label="Search kanji"
            value={input}
            onChange={handlerChange}
            placeholder="Type any kanji character"
            onKeyDown={handleKeyDown}
          />
          <button
            className={styles.searchButton}
            type="button"
            onClick={handleClick}
          >
            <img src={searchIcon} alt="Search kanji" />
          </button>
        </div>
      </div>
    );
  }
);
