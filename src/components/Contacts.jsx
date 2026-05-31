import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { getExpertData } from '../useExpert'
import { EMAILJS_SERVICE_ID, EMAILJS_PUBLIC_KEY, TEMPLATE_CONTACT } from '../emailjs'
import { supabase } from '../supabase'
import styles from './Contacts.module.css'

export default function Contacts() {
  const EXPERT = getExpertData()

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(false)

    emailjs.send(
      EMAILJS_SERVICE_ID,
      TEMPLATE_CONTACT,
      {
        from_name:    form.name,
        from_email:   form.email,
        from_phone:   form.phone,
        message:      form.message,
      },
      EMAILJS_PUBLIC_KEY,
    ).then(() => {
      supabase.from('leads').insert({
        type:    'contact',
        name:    form.name,
        email:   form.email,
        phone:   form.phone,
        message: form.message,
      }).then(({ error }) => { if (error) console.error('leads insert:', error) })
      setSent(true)
      setForm({ name: '', email: '', phone: '', message: '' })
    }).catch(() => {
      setError(true)
    }).finally(() => {
      setLoading(false)
    })
  }

  return (
    <section className="section" id="contacts">
      <div className="container">
        <p className="section-label">Контакты</p>
        <h2 className="section-title">Готовы сделать первый шаг?</h2>
        <p className="section-sub">
          Запишитесь на консультацию — и уже на первой встрече станет понятно,
          в каком направлении двигаться. Никаких обязательств.
        </p>

        {sent ? (
          <div className={styles.success}>
            <div className={styles.successIcon}>✓</div>
            <h3 className={styles.successTitle}>Заявка отправлена!</h3>
            <p className={styles.successText}>
              Свяжусь с вами в течение 24 часов. Проверьте почту или мессенджер.
            </p>
            <button className={styles.successReset} onClick={() => setSent(false)}>
              Отправить ещё раз
            </button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label}>Имя *</label>
                <input
                  className={styles.input}
                  type="text"
                  name="name"
                  placeholder="Как вас зовут?"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Email *</label>
                <input
                  className={styles.input}
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Телефон / Telegram</label>
              <input
                className={styles.input}
                type="text"
                name="phone"
                placeholder="+7 900 000-00-00 или @username"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Сообщение</label>
              <textarea
                className={`${styles.input} ${styles.textarea}`}
                name="message"
                placeholder="Расскажите коротко о вашей ситуации — кто вы, что беспокоит, чего хотите достичь"
                value={form.message}
                onChange={handleChange}
                rows={4}
              />
            </div>

            {error && (
              <p className={styles.errorMsg}>
                Ошибка отправки. Попробуйте ещё раз или напишите напрямую в Telegram.
              </p>
            )}

            <button className={styles.submitBtn} type="submit" disabled={loading}>
              {loading ? 'Отправляю...' : 'Отправить заявку'}
              {!loading && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              )}
            </button>
            <p className={styles.formNote}>Онлайн · Без обязательств · Отвечаю в течение 24 ч</p>
          </form>
        )}

        <div className={styles.pills}>
          {EXPERT.telegram && (
            <a href={EXPERT.telegram} className={styles.pill} target="_blank" rel="noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="m22 2-7 20-4-9-9-4 20-7z"/><path d="M22 2 11 13"/>
              </svg>
              Написать в Telegram
            </a>
          )}
          {EXPERT.telegramChannel && (
            <a href={EXPERT.telegramChannel} className={styles.pill} target="_blank" rel="noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="m22 2-7 20-4-9-9-4 20-7z"/><path d="M22 2 11 13"/>
              </svg>
              Telegram-канал
            </a>
          )}
          {EXPERT.whatsapp && (
            <a href={EXPERT.whatsapp} className={styles.pill} target="_blank" rel="noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17z"/>
              </svg>
              WhatsApp
            </a>
          )}
          {EXPERT.phone && (
            <a href={`tel:${EXPERT.phone.replace(/\D/g, '')}`} className={styles.pill}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17z"/>
              </svg>
              {EXPERT.phone}
            </a>
          )}
        </div>

        <footer className={styles.footer}>
          <span>{EXPERT.name} · Профориентолог</span>
        </footer>
      </div>
    </section>
  )
}
