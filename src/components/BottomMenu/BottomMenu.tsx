import styles from "./bottomMenu.module.css";

type BottomMenuProps = {
  onShowOverlay: () => void;
};
export function BottomMenu({ onShowOverlay }: BottomMenuProps) {
  return (
    <div className={styles.mainLayout}>
      <button type="button">Search</button>
      <button type="button" onClick={onShowOverlay}>
        Saved
      </button>
    </div>
  );
}
