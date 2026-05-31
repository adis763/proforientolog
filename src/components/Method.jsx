import { METHOD_ITEMS } from '../data'
import styles from './Method.module.css'

export default function Method() {
  return (
    <section className="section">
      <div className="container">
        <p className="section-label">Методология</p>
        <h2 className="section-title">Наука, а не интуиция</h2>
        <p className="section-sub">
          В основе — авторизованная система «Выбор профессии 3.0», объединяющая
          ведущие российские и международные теории профориентации.
        </p>

        <div className={styles.grid}>
          {METHOD_ITEMS.map(item => (
            <div key={item.title} className={styles.card}>
              <span className={styles.icon} aria-hidden="true">{item.icon}</span>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.desc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
