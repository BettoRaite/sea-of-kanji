import styles from "./bottomMenu.module.css";
import collectionsIcon from "/icons/collection.svg";
import { BiSearch } from "react-icons/bi";
import { MdCollections } from "react-icons/md";
import Image from "next/image";

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
          <BiSearch title="search kanji" />
        </button>
        <button className={styles.button} type="button" onClick={onShowOverlay}>
          <MdCollections title="open collections" />
        </button>
      </div>
    </div>
  );
}
