import { useState } from 'react'
import { SERVICES } from '../data'
import styles from './Services.module.css'

const COLOR_CLASSES = {
  teal:   { price: styles.priceTeal,   tag: styles.tagTeal,   accent: styles.accentTeal },
  purple: { price: styles.pricePurple, tag: styles.tagPurple, accent: styles.accentPurple },
  coral:  { price: styles.priceCoral,  tag: styles.tagCoral,  accent: styles.accentCoral },
  amber:  { price: styles.priceAmber,  tag: styles.tagAmber,  accent: styles.accentAmber },
}

export default function Services() {
  const [open, setOpen] = useState(null)

  return (
    <section className="section" id="services">
      <div className="container">
        <p className="section-label">Услуги и программы</p>
        <h2 className="section-title">Выберите свой формат</h2>
        <p className="section-sub">
          Каждая программа заканчивается не советом «подумайте ещё» —
          а готовым планом конкретных шагов.
        </p>

        <div className={styles.list}>
          {SERVICES.map(svc => {
            const colors = COLOR_CLASSES[svc.color]
            return (
              <button
                key={svc.id}
                className={`${styles.card} ${svc.popular ? styles.featured : ''}`}
                onClick={() => setOpen(svc)}
              >
                {svc.popular && (
                  <span className={styles.popularBadge}>Популярный выбор</span>
                )}
                <div className={styles.head}>
                  <h3 className={styles.title}>{svc.title}</h3>
                  <span className={`${styles.price} ${colors.price}`}>{svc.price}</span>
                </div>
                <p className={styles.for}>{svc.for}</p>
                <p className={styles.desc}>{svc.desc}</p>
                {svc.tags.length > 0 && (
                  <div className={styles.tags}>
                    {svc.tags.map(t => (
                      <span key={t} className={`${styles.tag} ${colors.tag}`}>{t}</span>
                    ))}
                  </div>
                )}
                <span className={`${styles.more} ${colors.price}`}>Подробнее →</span>
              </button>
            )
          })}
        </div>
      </div>

      {open && (
        <div className={styles.overlay} onClick={() => setOpen(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <button className={styles.close} onClick={() => setOpen(null)} aria-label="Закрыть">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            {open.popular && (
              <span className={styles.popularBadge} style={{ marginBottom: '1rem', display: 'inline-block' }}>
                Популярный выбор
              </span>
            )}

            <h3 className={styles.modalTitle}>{open.title}</h3>
            <span className={`${styles.modalPrice} ${COLOR_CLASSES[open.color].price}`}>
              {open.price}
            </span>

            <p className={`${styles.for} ${styles.modalFor}`}>{open.for}</p>

            {open.details ? (
              <>
                {open.details.intro && (
                  <div className={styles.detailSection}>
                    {open.details.intro.map((p, i) => (
                      <p key={i} className={styles.modalDesc} style={{ marginBottom: '0.5rem' }}>{p}</p>
                    ))}
                  </div>
                )}

                {open.details.features && (
                  <>
                    <ul className={styles.outcomeList} style={{ marginBottom: '1.25rem' }}>
                      {open.details.features.map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                  </>
                )}

                {open.details.outcomes && (
                  <>
                    <hr className={styles.divider} />
                    <div className={styles.detailSection}>
                      <p className={styles.detailSectionTitle}>{open.details.outcomesTitle || 'Что в итоге?'}</p>
                      <ul className={styles.outcomeList}>
                        {open.details.outcomes.map((o, i) => <li key={i}>{o}</li>)}
                      </ul>
                      {open.details.outcomeNote && (
                        <p className={styles.outcomeNote}>{open.details.outcomeNote}</p>
                      )}
                    </div>
                  </>
                )}

                {open.details.problems && (
                  <>
                    <hr className={styles.divider} />
                    <div className={styles.detailSection}>
                      <p className={styles.detailSectionTitle}>С какими проблемами справится программа</p>
                      {open.details.problems.map((p, i) => (
                        <div key={i} className={styles.problemItem}>
                          <p className={styles.problemTitle}>{p.title}</p>
                          <ul className={styles.problemBullets}>
                            {p.bullets.map((b, j) => <li key={j}>{b}</li>)}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {open.details.programNote && (
                  <>
                    <hr className={styles.divider} />
                    <p className={styles.outcomeNote}>{open.details.programNote}</p>
                  </>
                )}

                {open.details.packages && (
                  <>
                    <hr className={styles.divider} />
                    <div className={styles.detailSection}>
                      {open.details.packages.map((pkg, i) => (
                        <div key={i} className={styles.packageCard}>
                          <div className={styles.packageHead}>
                            <span className={styles.packageName}>{pkg.name}</span>
                            <span className={`${styles.packagePrice} ${COLOR_CLASSES[open.color].price}`}>{pkg.price}</span>
                          </div>
                          <ul className={styles.packageIncludes}>
                            {pkg.includes.map((item, j) => <li key={j}>{item}</li>)}
                          </ul>
                          <p className={styles.packageNote}>{pkg.note}</p>
                          {pkg.roadmapNote && <p className={styles.packageNote}>{pkg.roadmapNote}</p>}
                          {pkg.extras && (
                            <>
                              <p className={styles.extrasLabel}>Дополнительно</p>
                              {pkg.extras.map((ex, j) => (
                                <div key={j} className={styles.extraItem}>
                                  <div className={styles.extraHead}>
                                    <span className={styles.extraTitle}>{ex.title}</span>
                                    <span className={`${styles.extraPrice} ${COLOR_CLASSES[open.color].price}`}>{ex.price}</span>
                                  </div>
                                  {ex.desc && <p className={styles.extraDesc}>{ex.desc}</p>}
                                </div>
                              ))}
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {(open.details.groupTraining || open.details.installment) && (
                  <div style={{ marginTop: '0.5rem' }}>
                    {open.details.groupTraining && (
                      <p className={styles.groupTraining}>{open.details.groupTraining}</p>
                    )}
                    {open.details.installment && (
                      <p className={styles.installment}>{open.details.installment}</p>
                    )}
                  </div>
                )}
              </>
            ) : (
              <>
                <p className={styles.modalDesc}>{open.desc}</p>
                {open.tags.length > 0 && (
                  <div className={styles.tags} style={{ marginBottom: '1.5rem' }}>
                    {open.tags.map(t => (
                      <span key={t} className={`${styles.tag} ${COLOR_CLASSES[open.color].tag}`}>{t}</span>
                    ))}
                  </div>
                )}
              </>
            )}

            <a href="#contacts" className={`${styles.btn} ${styles.modalBtn}`} onClick={() => setOpen(null)}>
              Записаться
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      )}
    </section>
  )
}
