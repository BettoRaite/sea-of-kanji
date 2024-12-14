import { type ChangeEvent, type KeyboardEvent, forwardRef } from "react";
import styles from "./searchBar.module.css";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BiFilter } from "react-icons/bi";

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
          <BiFilter title="Expand filter menu" />
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
            <BiSearch title="Search kanji" />
          </button>
        </div>
      </div>
    );
  },
);
