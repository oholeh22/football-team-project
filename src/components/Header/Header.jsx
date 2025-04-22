import React from "react";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <img src="/images/logo.png" alt="logo" className={styles.logo} />
      <nav className={styles.nav}>
        <a href="/">Main</a>
        <a href="/team">Team</a>
        <a href="/fixtures">Schedule</a>
        <a href="/news">News</a>
        <a href="/contact">Contacts</a>
      </nav>
    </header>
  );
}

export default Header;
