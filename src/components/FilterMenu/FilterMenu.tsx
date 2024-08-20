import styles from "./filterMenu.module.css";

type FilterMenuProps = {
  isHidden: boolean;
};

export function FilterMenu({ isHidden }: FilterMenuProps) {
  return (
    <section className={`${styles.layout} ${isHidden && styles.layoutHidden}`}>
      <h1>Filter search</h1>
    </section>
  );
}
