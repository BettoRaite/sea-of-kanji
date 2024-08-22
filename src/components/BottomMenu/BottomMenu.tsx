import styles from "./bottomMenu.module.css";

import searchIcon from "/icons/search.svg";
import collectionsIcon from "/icons/collection.svg";

type BottomMenuProps = {
  onShowOverlay: () => void;
  onSearchInputFocus: () => void;
};
export function BottomMenu({
  onShowOverlay,
  onSearchInputFocus,
}: BottomMenuProps) {
  return (
    <div className={styles.layout}>
      <div className={styles.buttonsLayout}>
        <button
          className={styles.button}
          type="button"
          onClick={onSearchInputFocus}
        >
          <img src={searchIcon} alt="search kanji" />
        </button>
        <button className={styles.button} type="button" onClick={onShowOverlay}>
          <img src={collectionsIcon} alt="open collections" />
        </button>
      </div>
    </div>
  );
}
