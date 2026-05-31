import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { LEAD_MAGNETS } from '../data'
import { EMAILJS_SERVICE_ID, EMAILJS_PUBLIC_KEY, TEMPLATE_CONTACT } from '../emailjs'
import { supabase } from '../supabase'
import styles from './Materials.module.css'

export default function Materials() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  function openModal(magnet) {
    setSelected(magnet)
    setSent(false)
    setEmail('')
    setName('')
    setOpen(true)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!email) return
    setLoading(true)

    const host = window.location.origin
    const fileUrl = selected?.url ? `${host}${selected.url}` : ''

    emailjs.send(
      EMAILJS_SERVICE_ID,
      TEMPLATE_CONTACT,
      {
        from_name:    name || 'друг',
        from_email:   email,
        from_phone:   '',
        message:      `Запрос материала: ${selected?.title ?? ''}`,
        name:         name || 'друг',
        title:        selected?.title ?? 'Бесплатные материалы',
        material_url: fileUrl,
      },
      EMAILJS_PUBLIC_KEY,
    ).then(() => {
      supabase.from('leads').insert({
        type:     'material',
        name:     name || '',
        email:    email,
        material: selected?.title ?? '',
      }).then(({ error }) => { if (error) console.error('leads insert:', error) })
      setSent(true)
    }).catch(() => {
      alert('Ошибка отправки. Попробуйте ещё раз.')
    }).finally(() => {
      setLoading(false)
    })
  }

  return (
    <>
      <section className="section" id="materials">
        <div className="container">
          <div className={styles.teaser}>
            <div className={styles.teaserIcon} aria-hidden="true">🎁</div>
            <div className={styles.teaserBody}>
              <p className={styles.teaserTitle}>Бесплатные материалы</p>
              <p className={styles.teaserSub}>
                Три чек-листа для старта — отправлю на вашу почту
              </p>
            </div>
            <button className={styles.teaserBtn} onClick={() => setOpen(true)}>
              Получить
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {open && (
        <div className={styles.overlay} onClick={() => setOpen(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <button className={styles.close} onClick={() => setOpen(false)} aria-label="Закрыть">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            {!sent ? (
              <>
                <p className={styles.modalLabel}>Бесплатные материалы</p>
                <h3 className={styles.modalTitle}>Выберите материал — пришлю на почту</h3>

                <div className={styles.magnets}>
                  {LEAD_MAGNETS.map(m => (
                    <button
                      key={m.id}
                      className={`${styles.magnetCard} ${selected?.id === m.id ? styles.magnetActive : ''}`}
                      onClick={() => setSelected(m)}
                    >
                      <span className={styles.magnetIcon} aria-hidden="true">{m.icon}</span>
                      <div>
                        <p className={styles.magnetTitle}>{m.title}</p>
                        <p className={styles.magnetDesc}>{m.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Ваше имя"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                  <input
                    className={styles.input}
                    type="email"
                    placeholder="Email для отправки *"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                  <button
                    className={styles.submitBtn}
                    type="submit"
                    disabled={!email || loading}
                  >
                    {loading ? 'Отправляю...' : 'Получить на почту'}
                    {!loading && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                      </svg>
                    )}
                  </button>
                  <p className={styles.formNote}>Без спама · Только один файл</p>
                </form>
              </>
            ) : (
              <div className={styles.success}>
                <div className={styles.successIcon}>✓</div>
                <h3 className={styles.successTitle}>Готово!</h3>
                <p className={styles.successText}>
                  Материал отправлен на <strong>{email}</strong>.
                  Проверьте папку «Входящие» или «Спам».
                </p>
                <button className={styles.teaserBtn} onClick={() => setOpen(false)}>
                  Закрыть
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
