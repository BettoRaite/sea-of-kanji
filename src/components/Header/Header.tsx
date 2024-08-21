import styles from "./header.module.css";

export function Header() {
  return (
    <header className={styles.layout}>
      <div className={styles.headerWrapper}>
        <span className={styles.sun} />
        <h2 className={styles.header}>Sea Of Kanji</h2>
      </div>
      {/* <nav className={styles.nav}>
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
      </nav> */}
    </header>
  );
}
