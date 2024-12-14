import styles from "./bottomMenu.module.css";
import { BiSearch } from "react-icons/bi";
import { MdCollections } from "react-icons/md";
import { BiCollection } from "react-icons/bi";
import Link from "next/link";
import { APP_ROUTES } from "@/lib/constants";

type BottomMenuProps = {
  onShowOverlay?: () => void;
  onSearchInputFocus?: () => void;
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
        <Link
          href={APP_ROUTES.myCollections}
          className={
            "bg-soft-white flex justify-center items-center px-4 rounded-lg shadow-lg"
          }
        >
          <BiCollection title="go to my collections" />
        </Link>
      </div>
    </div>
  );
}
