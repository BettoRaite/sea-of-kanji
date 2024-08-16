import styles from "./bottomMenu.module.css";

import searchIcon from "/icons/search.svg";
import collectionsIcon from "/icons/collection.svg";

type BottomMenuProps = {
  onShowOverlay: () => void;
};
export function BottomMenu({ onShowOverlay }: BottomMenuProps) {
  return (
    <div className={styles.layout}>
      <div className={styles.buttonsLayout}>
        <button className={styles.button} type="button">
          <img src={searchIcon} alt="search kanji" />
        </button>
        <button className={styles.button} type="button" onClick={onShowOverlay}>
          <img src={collectionsIcon} alt="open collections" />
        </button>
      </div>
    </div>
  );
}
