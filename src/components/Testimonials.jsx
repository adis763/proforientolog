import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import styles from './Testimonials.module.css'

function mapRow(row) {
  return {
    id:       row.id,
    initials: row.initials,
    bgColor:  row.bg_color,
    txColor:  row.tx_color,
    name:     row.name,
    role:     row.role,
    headline: row.headline,
    text:     row.body,
    result:   row.result,
  }
}

export default function Testimonials() {
  const [list, setList]   = useState([])
  const [index, setIndex] = useState(0)
  const [open, setOpen]   = useState(null)

  useEffect(() => {
    supabase
      .from('testimonials')
      .select('*')
      .order('sort_order')
      .then(({ data }) => {
        if (data?.length) setList(data.map(mapRow))
      })
  }, [])

  if (!list.length) return null

  const safeIndex = Math.min(index, list.length - 1)
  const t = list[safeIndex]

  const prev = () => setIndex(i => (i - 1 + list.length) % list.length)
  const next = () => setIndex(i => (i + 1) % list.length)

  return (
    <section className="section" id="testimonials">
      <div className="container">
        <p className="section-label">Отзывы клиентов</p>
        <h2 className="section-title">Истории тех, кто уже нашёл свой путь</h2>
        <p className="section-sub">
          Реальные отзывы подростков, родителей и взрослых — тех, кто прошёл программу
          и получил конкретный результат, а не просто «разговор о будущем».
        </p>

        <div className={styles.slider}>
          <button className={styles.arrow} onClick={prev} aria-label="Предыдущий отзыв">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>

          <button className={styles.card} onClick={() => setOpen(t)} aria-label="Открыть полный отзыв">
            <div className={styles.stars} aria-label="5 из 5 звёзд">★★★★★</div>
            <p className={styles.headline}>{t.headline}</p>
            <p className={styles.text}>{t.text}</p>
            <div className={styles.result}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              {t.result}
            </div>
            <div className={styles.footer}>
              <div className={styles.avatar} style={{ background: t.bgColor, color: t.txColor }}>
                {t.initials}
              </div>
              <div>
                <p className={styles.name}>{t.name}</p>
                <p className={styles.role}>{t.role}</p>
              </div>
              <span className={styles.readMore}>Читать →</span>
            </div>
          </button>

          <button className={styles.arrow} onClick={next} aria-label="Следующий отзыв">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>

        <div className={styles.dots}>
          {list.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === safeIndex ? styles.dotActive : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Отзыв ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {open && (
        <div className={styles.overlay} onClick={() => setOpen(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <button className={styles.close} onClick={() => setOpen(null)} aria-label="Закрыть">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            <div className={styles.stars}>★★★★★</div>
            <p className={styles.headline}>{open.headline}</p>
            <p className={styles.modalText}>{open.text}</p>
            <div className={styles.result}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              {open.result}
            </div>
            <div className={styles.footer} style={{ marginTop: '1rem' }}>
              <div className={styles.avatar} style={{ background: open.bgColor, color: open.txColor }}>
                {open.initials}
              </div>
              <div>
                <p className={styles.name}>{open.name}</p>
                <p className={styles.role}>{open.role}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
