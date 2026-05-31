import { EXPERT, STATS } from '../data'
import styles from './Expert.module.css'

export default function Expert() {
  return (
    <section className="section" id="expert">
      <div className="container">
        <p className="section-label">Эксперт</p>

        <div className={styles.card}>
          <div className={styles.avatar}>{EXPERT.initials}</div>
          <div className={styles.info}>
            <h2 className={styles.name}>{EXPERT.name}</h2>
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
    </section>
  )
}
