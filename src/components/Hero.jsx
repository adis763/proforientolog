import { EXPERT, QUOTE, AUDIENCES } from '../data'
import styles from './Hero.module.css'
import PathInfographic from './PathInfographic'
import teensImg from '../assets/audiences/teens.png'
import adultsImg from '../assets/audiences/adults.png'
import parentsImg from '../assets/audiences/parents.png'
import studentsImg from '../assets/audiences/students.png'

const COLOR_MAP = {
  teal:   { bg: 'var(--clr-teal-50)',   icon: 'var(--clr-teal-400)' },
  purple: { bg: 'var(--clr-purple-50)', icon: 'var(--clr-purple-400)' },
  coral:  { bg: 'var(--clr-coral-50)',  icon: 'var(--clr-coral-400)' },
  amber:  { bg: 'var(--clr-amber-50)',  icon: 'var(--clr-amber-400)' },
}

const AUDIENCE_IMAGES = {
  teens: teensImg,
  adults: adultsImg,
  parents: parentsImg,
  students: studentsImg,
}

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className="container">

        <PathInfographic />

        <blockquote className={`${styles.quote} fade-up fade-up-delay-2`}>
          <p className={styles.quoteText}>«{QUOTE.text}»</p>
          <cite className={styles.quoteCite}>— {QUOTE.author}</cite>
        </blockquote>

        <h3 className={`${styles.audiencesTitle} fade-up fade-up-delay-3`}>
          Кому будет полезна профориентация?
        </h3>

        <div className={`${styles.audiences} fade-up fade-up-delay-3`}>
          {AUDIENCES.map(a => {
            const colors = COLOR_MAP[a.color]
            return (
              <div
                key={a.id}
                className={styles.audCard}
                style={{ '--aud-bg': colors.bg, '--aud-icon': colors.icon }}
              >
                <img src={AUDIENCE_IMAGES[a.id]} alt={a.title} className={styles.audIcon} />
                <h3 className={styles.audTitle}>{a.title}</h3>
                <p className={styles.audDesc}>{a.desc}</p>
              </div>
            )
          })}
        </div>

        <div className={`${styles.ctaRow} fade-up fade-up-delay-4`}>
          <a href="#contacts" className={styles.ctaBtn}>
            Записаться на бесплатную консультацию
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <p className={styles.ctaNote}>Онлайн · Без обязательств · Отвечаю в Telegram и WhatsApp</p>
        </div>

      </div>
    </section>
  )
}
