import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { EMAILJS_SERVICE_ID, EMAILJS_PUBLIC_KEY, TEMPLATE_QUIZ } from '../emailjs'
import styles from './Quiz.module.css'

import imgR from '../assets/types/praktik.jpg'
import imgI from '../assets/types/analitik.jpg'
import imgA from '../assets/types/tvorec.jpg'
import imgS from '../assets/types/helper.jpg'
import imgE from '../assets/types/leader.jpg'
import imgC from '../assets/types/organizator.jpg'

const TYPE_IMAGES = { R: imgR, I: imgI, A: imgA, S: imgS, E: imgE, C: imgC }

const QUESTIONS = [
  { id: 1,  text: 'Заниматься практической деятельностью: создавать, собирать или чинить технические устройства и оборудование своими руками.',          category: 'R' },
  { id: 2,  text: 'Решать сложные интеллектуальные задачи, анализировать информацию и искать логические связи.',          category: 'I' },
  { id: 3,  text: 'Придумывать оригинальные идеи и создавать что-то новое, используя воображение и свой уникальный стиль.',           category: 'A' },
  { id: 4,  text: 'Передавать знания другим людям и координировать совместную работу для достижения общих целей.',           category: 'S' },
  { id: 5,  text: 'Руководить командой, принимать важные решения и нести ответственность за итоговый результат.',           category: 'E' },
  { id: 6,  text: 'Обеспечивать порядок в делах: систематизировать документы и контролировать точность данных.',             category: 'C' },
  { id: 7,  text: 'Работать на открытом воздухе, управлять техникой или заниматься физически активным трудом.',               category: 'R' },
  { id: 8,  text: 'Проводить исследования, анализировать проблемы и искать ответы на сложные технические или научные вопросы.',    category: 'I' },
  { id: 9,  text: 'Создавать авторский контент, генерировать идеи и выражать себя через творческие проекты.',                  category: 'A' },
  { id: 10, text: 'Консультировать и поддерживать людей, помогая им находить выход из сложных жизненных ситуаций.',                  category: 'S' },
  { id: 11, text: 'Убеждать других в перспективности своих идей и активно инициировать новые проекты.',              category: 'E' },
  { id: 12, text: 'Работать в четко структурированной среде, требующей внимания к деталям и соблюдения правил.',       category: 'C' },
]

const TYPE_ILLUSTRATIONS = {
  R: (
    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="50" width="100" height="20" rx="4" fill="#E1F5EE"/>
      <rect x="20" y="30" width="30" height="20" rx="3" fill="#9FE1CB"/>
      <rect x="60" y="20" width="30" height="30" rx="3" fill="#9FE1CB"/>
      <path d="M55 40 L65 40" stroke="#1D9E75" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M38 28 L38 16 L50 16" stroke="#1D9E75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="75" cy="18" r="5" fill="#1D9E75"/>
      <path d="M70 18 L80 18 M75 13 L75 23" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M15 50 L25 30" stroke="#1D9E75" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M90 50 L90 20" stroke="#1D9E75" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 2"/>
    </svg>
  ),
  I: (
    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="40" r="22" fill="#E1F5EE" stroke="#9FE1CB" strokeWidth="2"/>
      <circle cx="50" cy="40" r="14" fill="#9FE1CB"/>
      <circle cx="50" cy="40" r="7"  fill="#1D9E75"/>
      <path d="M66 56 L80 70" stroke="#1D9E75" strokeWidth="4" strokeLinecap="round"/>
      <path d="M85 25 L95 15 M90 25 L95 20" stroke="#9FE1CB" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="95" cy="15" r="3" fill="#1D9E75"/>
      <path d="M100 45 Q105 35 100 30" stroke="#9FE1CB" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M15 25 L20 20 M15 35 L22 35 M15 45 L20 50" stroke="#9FE1CB" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  A: (
    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="55" rx="40" ry="12" fill="#E1F5EE"/>
      <path d="M30 55 Q45 10 60 30 Q75 50 90 15" stroke="#1D9E75" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <circle cx="30" cy="55" r="5" fill="#9FE1CB"/>
      <circle cx="60" cy="30" r="5" fill="#1D9E75"/>
      <circle cx="90" cy="15" r="5" fill="#9FE1CB"/>
      <path d="M95 60 L105 50 L110 55 L100 65 Z" fill="#1D9E75" opacity="0.6"/>
      <path d="M98 57 L85 70" stroke="#9FE1CB" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="18" cy="20" r="4" fill="#9FE1CB" opacity="0.5"/>
      <circle cx="25" cy="12" r="3" fill="#1D9E75" opacity="0.4"/>
    </svg>
  ),
  S: (
    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="28" r="12" fill="#9FE1CB"/>
      <circle cx="40" cy="28" r="7"  fill="#1D9E75"/>
      <circle cx="80" cy="28" r="12" fill="#E1F5EE" stroke="#9FE1CB" strokeWidth="1.5"/>
      <circle cx="80" cy="28" r="7"  fill="#9FE1CB"/>
      <path d="M25 70 Q40 48 55 60 Q65 68 80 48 Q95 30 100 70" stroke="#1D9E75" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M55 60 L65 55" stroke="#9FE1CB" strokeWidth="2" strokeLinecap="round"/>
      <path d="M45 20 Q60 10 75 20" stroke="#1D9E75" strokeWidth="1.5" strokeLinecap="round" fill="none" strokeDasharray="3 2"/>
    </svg>
  ),
  E: (
    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="60,10 75,35 105,35 82,52 90,77 60,60 30,77 38,52 15,35 45,35" fill="#E1F5EE" stroke="#9FE1CB" strokeWidth="1.5"/>
      <polygon points="60,20 70,38 90,38 74,50 80,68 60,56 40,68 46,50 30,38 50,38" fill="#1D9E75" opacity="0.7"/>
      <circle cx="60" cy="42" r="8" fill="white" opacity="0.9"/>
      <path d="M56 42 L60 38 L64 42" stroke="#1D9E75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  C: (
    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="15" width="90" height="55" rx="6" fill="#E1F5EE" stroke="#9FE1CB" strokeWidth="1.5"/>
      <rect x="25" y="25" width="30" height="5" rx="2" fill="#9FE1CB"/>
      <rect x="25" y="35" width="50" height="4" rx="2" fill="#9FE1CB" opacity="0.6"/>
      <rect x="25" y="44" width="40" height="4" rx="2" fill="#9FE1CB" opacity="0.6"/>
      <rect x="25" y="53" width="45" height="4" rx="2" fill="#9FE1CB" opacity="0.6"/>
      <rect x="75" y="28" width="20" height="25" rx="3" fill="#1D9E75" opacity="0.15"/>
      <path d="M78 48 L82 44 L86 46 L92 38" stroke="#1D9E75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
}

const TYPES = {
  R: {
    name:        'Практик',
    emoji:       '🔧',
    description: 'Вы любите работать руками, создавать и чинить. Вам подходят профессии инженера, механика, архитектора, технолога или специалиста по IT-инфраструктуре.',
    cta_message: 'Профориентолог поможет вам найти современную техническую профессию с высоким доходом — без лишних лет обучения.',
  },
  I: {
    name:        'Исследователь',
    emoji:       '🔬',
    description: 'Вы мыслите аналитически и любите разбираться в сложных вещах. Вам подходят профессии учёного, аналитика данных, программиста, врача или экономиста.',
    cta_message: 'Вместе с профориентологом вы выберете направление, где аналитический склад ума приносит максимальный результат.',
  },
  A: {
    name:        'Творец',
    emoji:       '🎨',
    description: 'Вы ценёте красоту и самовыражение. Вам подходят профессии дизайнера, архитектора, режиссёра, маркетолога или UX-специалиста.',
    cta_message: 'Профориентолог покажет, как монетизировать творческий потенциал в современных профессиях с высоким спросом.',
  },
  S: {
    name:        'Помощник',
    emoji:       '🤝',
    description: 'Вы получаете энергию от работы с людьми. Вам подходят профессии педагога, психолога, HR-специалиста, врача или социального работника.',
    cta_message: 'Профориентолог поможет выбрать профессию помогающей сферы с чёткими карьерными перспективами.',
  },
  E: {
    name:        'Лидер',
    emoji:       '🚀',
    description: 'Вы умеете убеждать и вести за собой. Вам подходят профессии предпринимателя, менеджера, юриста, маркетолога или продюсера.',
    cta_message: 'Профориентолог поможет направить лидерские качества в профессию, где вы будете расти быстро и уверенно.',
  },
  C: {
    name:        'Организатор',
    emoji:       '📋',
    description: 'Вы любите порядок, точность и системность. Вам подходят профессии бухгалтера, финансиста, логиста, администратора или аналитика.',
    cta_message: 'Профориентолог поможет найти современную профессию, где системный подход ценится и хорошо оплачивается.',
  },
}

function calcResult(answers) {
  const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 }
  QUESTIONS.forEach(q => { scores[q.category] += answers[q.id] ?? 0 })

  const max = Math.max(...Object.values(scores))
  const dominant = Object.keys(scores).filter(k => scores[k] === max)

  if (dominant.length === 1) {
    return { dominant_type: dominant[0], scores, ...TYPES[dominant[0]] }
  }

  const combined = dominant.join('-')
  const names    = dominant.map(k => TYPES[k].name).join(' · ')
  return {
    dominant_type: combined,
    scores,
    name:          names,
    emoji:         dominant.map(k => TYPES[k].emoji).join(''),
    description:   dominant.map(k => TYPES[k].description).join(' '),
    cta_message:   TYPES[dominant[0]].cta_message,
  }
}

const SCALE = [1, 2, 3, 4, 5]
const SCALE_LABELS = { 1: 'Совсем нет', 3: 'Нейтрально', 5: 'Очень нравится' }

function ResultScreen({ result, onRestart }) {
  const [name,       setName]       = useState('')
  const [email,      setEmail]      = useState('')
  const [occupation, setOccupation] = useState('')
  const [position,   setPosition]   = useState('')
  const [loading,    setLoading]    = useState(false)
  const [sent,       setSent]       = useState(false)
  const [error,      setError]      = useState(false)

  function formatMessage() {
    const lines = [
      `=== Результаты теста RIASEC ===`,
      `Доминантный тип: ${result.name} ${result.emoji}`,
      ``,
      `Баллы по категориям:`,
      ...Object.entries(result.scores).map(
        ([cat, score]) => `${TYPES[cat].emoji} ${TYPES[cat].name} (${cat}): ${score}/10`
      ),
      ``,
      `Текущая сфера деятельности: ${occupation || '—'}`,
      `Текущая должность / статус: ${position || '—'}`,
      ``,
      `Описание типа: ${result.description}`,
    ]
    return lines.join('\n')
  }

  function handleSend(e) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError(false)

    emailjs.send(
      EMAILJS_SERVICE_ID,
      TEMPLATE_QUIZ,
      {
        from_name:  name || 'Аноним',
        from_email: email,
        message:    formatMessage(),
        occupation,
        position,
      },
      EMAILJS_PUBLIC_KEY,
    ).then(() => {
      setSent(true)
    }).catch(() => {
      setError(true)
    }).finally(() => {
      setLoading(false)
    })
  }

  return (
    <section className="section" id="quiz">
      <div className="container">
        <div className={styles.result}>
          <div className={styles.resultEmoji}>{result.emoji}</div>
          <p className={styles.resultLabel}>Ваш профессиональный тип</p>
          <h2 className={styles.resultName}>{result.name}</h2>
          {TYPE_IMAGES[result.dominant_type] && (
            <div className={styles.illustration}>
              <img src={TYPE_IMAGES[result.dominant_type]} alt={result.name} />
            </div>
          )}
          <p className={styles.resultDesc}>{result.description}</p>

          <div className={styles.scores}>
            {Object.entries(result.scores).map(([cat, score]) => (
              <div key={cat} className={styles.scoreRow}>
                <span className={styles.scoreCat}>{TYPES[cat].emoji} {TYPES[cat].name}</span>
                <div className={styles.scoreBar}>
                  <div className={styles.scoreBarFill} style={{ width: `${(score / 10) * 100}%` }} />
                </div>
                <span className={styles.scoreNum}>{score}/10</span>
              </div>
            ))}
          </div>

          <div className={styles.resultCta}>
            <p className={styles.resultCtaText}>{result.cta_message}</p>
            <a href="#contacts" className={styles.resultCtaBtn}>
              Записаться на консультацию
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          {!sent ? (
            <form className={styles.sendForm} onSubmit={handleSend}>
              <p className={styles.sendTitle}>Получить детальный разбор результатов</p>
              <p className={styles.sendSub}>Ольга лично проанализирует ваш тип и пришлёт рекомендации на почту</p>
              <div className={styles.sendRow}>
                <input
                  className={styles.sendInput}
                  type="text"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                <input
                  className={styles.sendInput}
                  type="email"
                  placeholder="Email *"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <input
                  className={styles.sendInput}
                  type="text"
                  placeholder="Текущая сфера деятельности (например: IT, медицина, школьник...)"
                  value={occupation}
                  onChange={e => setOccupation(e.target.value)}
                />
                <input
                  className={styles.sendInput}
                  type="text"
                  placeholder="Должность или статус (например: менеджер, студент, в поиске...)"
                  value={position}
                  onChange={e => setPosition(e.target.value)}
                />
                <button className={styles.sendBtn} type="submit" disabled={!email || loading}>
                  {loading ? 'Отправляю...' : 'Отправить результаты'}
                </button>
              </div>
              {error && <p className={styles.sendError}>Ошибка. Попробуйте ещё раз.</p>}
            </form>
          ) : (
            <div className={styles.sendSuccess}>
              ✓ Результаты отправлены! Ольга свяжется с вами в течение 24 часов.
            </div>
          )}

          <button className={styles.restartBtn} onClick={onRestart}>
            Пройти тест заново
          </button>
        </div>
      </div>
    </section>
  )
}

export default function Quiz() {
  const [started,  setStarted]  = useState(false)
  const [step,     setStep]     = useState(0)
  const [answers,  setAnswers]  = useState({})
  const [result,   setResult]   = useState(null)

  function handleAnswer(value) {
    const q = QUESTIONS[step]
    const newAnswers = { ...answers, [q.id]: value }
    setAnswers(newAnswers)

    if (step < QUESTIONS.length - 1) {
      setTimeout(() => setStep(s => s + 1), 250)
    } else {
      setResult(calcResult(newAnswers))
    }
  }

  function restart() {
    setStarted(false)
    setStep(0)
    setAnswers({})
    setResult(null)
  }

  if (!started) {
    return (
      <section className="section" id="quiz">
        <div className="container">
          <p className="section-label">Тест</p>
          <h2 className="section-title">Узнайте свой профессиональный тип</h2>
          <p className="section-sub">
            12 коротких вопросов по модели RIASEC — и вы узнаете, какие профессии
            подходят именно вам.
          </p>

          <button className={styles.startBtn} onClick={() => setStarted(true)}>
            Пройти тест — 3 минуты
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          <p className={styles.startNote}>Бесплатно · Без регистрации</p>
        </div>
      </section>
    )
  }

  if (result) {
    return (
      <ResultScreen
        result={result}
        onRestart={restart}
      />
    )
  }

  const q = QUESTIONS[step]
  const progress = ((step) / QUESTIONS.length) * 100

  return (
    <section className="section" id="quiz">
      <div className="container">
        <div className={styles.quizBox}>
          <div className={styles.progressWrap}>
            <div className={styles.progressBar} style={{ width: `${progress}%` }} />
          </div>
          <p className={styles.stepCount}>{step + 1} / {QUESTIONS.length}</p>

          <p className={styles.prompt}>Насколько вам нравится:</p>
          <h3 className={styles.question}>{q.text}</h3>

          <div className={styles.scale}>
            {SCALE.map(v => (
              <button
                key={v}
                className={`${styles.scaleBtn} ${answers[q.id] === v ? styles.scaleBtnActive : ''}`}
                onClick={() => handleAnswer(v)}
              >
                {v}
              </button>
            ))}
          </div>

          <div className={styles.scaleLabels}>
            <span>😕 Совсем нет</span>
            <span>😊 Очень нравится</span>
          </div>
        </div>
      </div>
    </section>
  )
}
