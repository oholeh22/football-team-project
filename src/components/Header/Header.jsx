import React, { useState } from 'react'
import styles from './Header.module.css'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
      <img src="/images/logo.png" alt="Emerald Wolves Logo" className={styles.logo} />
        <span className={styles.title}>Emerald Wolves</span>
      </div>

      <button
        className={styles.burger}
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <nav className={`${styles.nav} ${open ? styles.open : ''}`}>
        <a href="/">Main</a>
        <a href="/team">Team</a>
        <a href="/fixtures">Schedule</a>
        <a href="/news">News</a>
        <a href="/contact">Contacts</a>
      </nav>
    </header>
  )
}
