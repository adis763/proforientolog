import styles from './PathInfographic.module.css'
import { EXPERT } from '../data'

const COMPARE = [
  {
    variant: 'gray',
    question: 'Профессия, которая приносит просто зарплату?',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <path d="M16 16s-1.5-2-4-2-4 2-4 2"/>
        <line x1="9" y1="9" x2="9.01" y2="9"/>
        <line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
    ),
    points: [
      'Риск быстрого выгорания',
      'Отсутствие интереса к задачам',
      'Работа ради денег, не смысла',
    ],
  },
  {
    variant: 'teal',
    question: 'Профессия, которая приносит радость и высокий доход?',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
        <line x1="9" y1="9" x2="9.01" y2="9"/>
        <line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
    ),
    points: [
      'Раскрытие природного потенциала',
      'Высокая мотивация и энергия',
      'Осознанное построение карьеры',
    ],
  },
]

const EXPERT_ITEMS = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/>
      </svg>
    ),
    label: 'Научная диагностика талантов',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87"/>
        <path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    label: 'Глубокая консультация',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
    label: 'Настоящая поддержка',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
    label: 'Путь к цели',
  },
]

export default function PathInfographic() {
  return (
    <section className={styles.section}>
      <div className="container">

        <h2 className={`${styles.title} fade-up`}>
          Путь к призванию:{' '}
          <span className={styles.titleAccent}>от просто зарплаты к любимому делу</span>
        </h2>

        <div className={`${styles.compare} fade-up fade-up-delay-1`}>
          {COMPARE.map(item => (
            <div key={item.variant} className={`${styles.card} ${styles[`card--${item.variant}`]}`}>
              <div className={styles.cardIcon}>{item.icon}</div>
              <p className={styles.cardQuestion}>{item.question}</p>
              <ul className={styles.cardList}>
                {item.points.map(p => (
                  <li key={p} className={styles.cardItem}>
                    <span className={styles.dot} aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.connector} aria-hidden="true">
          <div className={styles.connectorLine} />
          <div className={styles.connectorArrow}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </div>
        </div>

        <div className={`${styles.cta} fade-up fade-up-delay-2`}>
          <p className={styles.ctaTitle}>Выбор за вами!</p>
          <p className={styles.ctaSub}>
            Переход к осознанному будущему начинается с одного правильного решения сегодня.
          </p>
        </div>

        <div className={styles.connector} aria-hidden="true">
          <div className={styles.connectorLine} />
          <div className={styles.connectorArrow}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </div>
        </div>

        <div className={`${styles.expert} fade-up fade-up-delay-3`}>
          <div className={styles.expertHeader}>
            <div className={styles.expertAvatar}>{EXPERT.initials}</div>
            <div>
              <p className={styles.expertName}>{EXPERT.name}</p>
              <p className={styles.expertRole}>профориентолог</p>
            </div>
          </div>
          <p className={styles.expertBio}>
            Профессиональный проводник в мире современных специальностей и образовательных траекторий.
          </p>
          <ul className={styles.expertList}>
            {EXPERT_ITEMS.map(item => (
              <li key={item.label} className={styles.expertItem}>
                <span className={styles.expertItemIcon}>{item.icon}</span>
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.connector} aria-hidden="true">
          <div className={styles.connectorLine} />
          <div className={styles.connectorArrow}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </div>
        </div>

        <div className={`${styles.plan} fade-up fade-up-delay-4`}>
          <div className={styles.planTrack}>
            {[1, 2, 3, 4, 5].map(n => (
              <div key={n} className={styles.planStep}>
                <div className={styles.planDot} />
                {n < 5 && <div className={styles.planLine} />}
              </div>
            ))}
            <div className={styles.planArrow}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
          <p className={styles.planTitle}>Конкретный план к заданной цели</p>
          <p className={styles.planSub}>
            Пошаговый алгоритм: от выбора экзаменов до построения долгосрочного карьерного трека.
          </p>
        </div>

      </div>
    </section>
  )
}
