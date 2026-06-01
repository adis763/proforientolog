import { useState } from 'react'
import { EXPERT, STATS } from '../data'
import olgaImg from '../assets/olga_about_me.jpg'
import styles from './Expert.module.css'

function ExpertModal({ onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>
        <div className={styles.modalTop}>
          <img src={olgaImg} alt={EXPERT.name} className={styles.modalPhoto} />
          <div>
            <h2 className={styles.modalName}>{EXPERT.name}</h2>
            <p className={styles.modalRole}>{EXPERT.title}</p>
          </div>
        </div>
        <div className={styles.modalBody}>
          {EXPERT.bioSections.map((sec, i) => (
            <div key={i} className={styles.modalSection}>
              {sec.title && <h3 className={styles.modalSectionTitle}>{sec.title}</h3>}
              {sec.text && <p>{sec.text}</p>}
              {sec.bullets && (
                <ul className={styles.modalList}>
                  {sec.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
        <div className={styles.tags}>
          {EXPERT.tags.map(t => (
            <span key={t} className={styles.tag}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Expert() {
  const [open, setOpen] = useState(false)

  return (
    <section className="section" id="expert">
      <div className="container">
        <p className="section-label">Эксперт</p>

        <div className={styles.card}>
          <img
            src={olgaImg}
            alt={EXPERT.name}
            className={`${styles.photo} ${styles.clickable}`}
            onClick={() => setOpen(true)}
          />
          <div className={styles.info}>
            <h2
              className={`${styles.name} ${styles.clickable}`}
              onClick={() => setOpen(true)}
            >
              {EXPERT.name}
            </h2>
            <p className={styles.role}>{EXPERT.title}</p>
            <p className={styles.bio}>{EXPERT.bio}</p>
            <div className={styles.tags}>
              {EXPERT.tags.map(t => (
                <span key={t} className={styles.tag}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.stats}>
          {STATS.map(s => (
            <div key={s.label} className={styles.statBox}>
              <span className={styles.statNum}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {open && <ExpertModal onClose={() => setOpen(false)} />}
    </section>
  )
}
