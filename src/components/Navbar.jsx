import { useState, useEffect } from 'react'
import { EXPERT } from '../data'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { href: '#services',      label: 'Услуги' },
  { href: '#expert',        label: 'Об эксперте' },
  { href: '#testimonials',  label: 'Отзывы' },
  { href: '#quiz',          label: 'Тест' },
  { href: '#contacts',      label: 'Контакты' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <a
          href="#"
          className={styles.logo}
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        >
          <img src="/logo.png" alt={EXPERT.name} className={styles.logoImg} />
        </a>

        <nav className={`${styles.links} ${open ? styles.open : ''}`}>
          {NAV_LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              className={styles.link}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a href="#contacts" className={styles.navCta} onClick={() => setOpen(false)}>
            Записаться
          </a>
        </nav>

        <button
          className={styles.burger}
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
