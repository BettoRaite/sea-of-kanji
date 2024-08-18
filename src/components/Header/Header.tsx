import styles from "./header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <h2>SeaOfKanji</h2>

      <nav className={styles.nav}>
        <ul className={styles.navLinks}>
          <li className={styles.navLinksItem}>
            <a className={styles.link} href="/">
              About
            </a>
          </li>

          <li className={styles.navLinksItem}>
            <a className={styles.link} href="/">
              About
            </a>
          </li>

          <li className={styles.navLinksItem}>
            <a className={styles.link} href="/">
              About
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
