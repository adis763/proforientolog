import { useState, useEffect } from 'react'
import * as XLSX from 'xlsx'
import { useExpert } from '../useExpert'
import { supabase } from '../supabase'
import styles from './Admin.module.css'

const ADMIN_PASSWORD = 'olga2025'

const EXPERT_FIELDS = [
  { key: 'name',            label: 'Имя и фамилия',        type: 'text' },
  { key: 'title',           label: 'Должность / подпись',   type: 'text' },
  { key: 'telegram',        label: 'Telegram (личный чат)',  type: 'url',  placeholder: 'https://t.me/username' },
  { key: 'telegramChannel', label: 'Telegram-канал',         type: 'url',  placeholder: 'https://t.me/channelname' },
  { key: 'whatsapp',        label: 'WhatsApp',               type: 'url',  placeholder: 'https://wa.me/79001234567' },
  { key: 'phone',           label: 'Телефон',                type: 'text', placeholder: '+7 (900) 123-45-67' },
]

const EMPTY_T = {
  initials: '',
  bg_color: '#E1F5EE',
  tx_color: '#085041',
  name:     '',
  role:     '',
  headline: '',
  body:     '',
  result:   '',
  sort_order: 0,
}

function TestimonialForm({ form, onChange, onSave, onCancel, saving }) {
  return (
    <div className={styles.tForm}>
      <div className={styles.fields}>
        <div className={styles.field}>
          <label className={styles.label}>Имя и роль</label>
          <input className={styles.input} value={form.name} onChange={e => onChange('name', e.target.value)} placeholder="Юлия Протасова — мама Ивана" />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Программа</label>
          <input className={styles.input} value={form.role} onChange={e => onChange('role', e.target.value)} placeholder="Программа «Умение учиться»" />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Заголовок отзыва</label>
          <input className={styles.input} value={form.headline} onChange={e => onChange('headline', e.target.value)} placeholder="«Краткая цитата»" />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Текст отзыва</label>
          <textarea className={styles.textarea} value={form.body} onChange={e => onChange('body', e.target.value)} placeholder="Полный текст отзыва..." rows={4} />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Результат (одна строка)</label>
          <input className={styles.input} value={form.result} onChange={e => onChange('result', e.target.value)} placeholder="Краткий итог" />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Инициалы для аватара</label>
          <input className={styles.input} value={form.initials} onChange={e => onChange('initials', e.target.value)} placeholder="ЮП" maxLength={3} />
        </div>
        <div className={styles.colorRow}>
          <div className={styles.colorField}>
            <label className={styles.label}>Фон аватара</label>
            <input className={styles.colorInput} type="color" value={form.bg_color} onChange={e => onChange('bg_color', e.target.value)} />
          </div>
          <div className={styles.colorField}>
            <label className={styles.label}>Цвет текста</label>
            <input className={styles.colorInput} type="color" value={form.tx_color} onChange={e => onChange('tx_color', e.target.value)} />
          </div>
          <div className={styles.colorField}>
            <label className={styles.label}>Превью</label>
            <div className={styles.avatarPreview} style={{ background: form.bg_color, color: form.tx_color }}>
              {form.initials || '??'}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.tFormActions}>
        <button className={styles.saveBtn} type="button" onClick={onSave} disabled={saving}>
          {saving ? 'Сохранение...' : 'Сохранить'}
        </button>
        <button className={styles.cancelBtn} type="button" onClick={onCancel}>Отмена</button>
      </div>
    </div>
  )
}

export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw]         = useState('')
  const [pwError, setPwError] = useState(false)
  const [saved, setSaved]   = useState(false)

  const { data, save, reset } = useExpert()
  const [form, setForm] = useState(data)

  const [testimonials, setTestimonials] = useState([])
  const [tLoading, setTLoading]         = useState(false)
  const [tEditId, setTEditId]           = useState(null)
  const [tForm, setTForm]               = useState(null)
  const [tSaving, setTSaving]           = useState(false)

  const [leads, setLeads]               = useState([])
  const [leadsLoading, setLeadsLoading] = useState(false)

  useEffect(() => {
    if (authed) {
      fetchTestimonials()
      fetchLeads()
    }
  }, [authed])

  async function fetchLeads() {
    setLeadsLoading(true)
    const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false })
    if (data) setLeads(data)
    setLeadsLoading(false)
  }

  function exportLeads() {
    const rows = leads.map(l => ({
      'Дата':       new Date(l.created_at).toLocaleString('ru'),
      'Тип':        l.type === 'contact' ? 'Контакт' : 'Материал',
      'Имя':        l.name || '',
      'Email':      l.email || '',
      'Телефон':    l.phone || '',
      'Сообщение':  l.message || '',
      'Материал':   l.material || '',
    }))
    const ws = XLSX.utils.json_to_sheet(rows)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Заявки')
    const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([buf], { type: 'application/octet-stream' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `leads-${new Date().toISOString().slice(0,10)}.xlsx`
    a.click()
    URL.revokeObjectURL(url)
  }

  async function fetchTestimonials() {
    setTLoading(true)
    const { data } = await supabase.from('testimonials').select('*').order('sort_order')
    if (data) setTestimonials(data)
    setTLoading(false)
  }

  function handleLogin(e) {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) {
      setAuthed(true)
    } else {
      setPwError(true)
      setTimeout(() => setPwError(false), 1500)
    }
  }

  function handleChange(key, value) {
    setForm(f => ({ ...f, [key]: value }))
    setSaved(false)
  }

  function handleSave(e) {
    e.preventDefault()
    save(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  function handleReset() {
    if (!window.confirm('Сбросить все изменения к исходным данным?')) return
    reset()
    setForm(data)
  }

  function startEditT(t) {
    setTEditId(t.id)
    setTForm({ ...t })
  }

  function startAddT() {
    setTEditId('new')
    setTForm({ ...EMPTY_T, sort_order: testimonials.length })
  }

  function cancelTEdit() {
    setTEditId(null)
    setTForm(null)
  }

  function changeTForm(key, value) {
    setTForm(f => ({ ...f, [key]: value }))
  }

  async function saveTEdit() {
    setTSaving(true)
    if (tEditId === 'new') {
      await supabase.from('testimonials').insert(tForm)
    } else {
      const { id, created_at, ...updates } = tForm
      await supabase.from('testimonials').update(updates).eq('id', tEditId)
    }
    await fetchTestimonials()
    setTEditId(null)
    setTForm(null)
    setTSaving(false)
  }

  async function deleteT(id) {
    if (!window.confirm('Удалить этот отзыв?')) return
    await supabase.from('testimonials').delete().eq('id', id)
    setTestimonials(prev => prev.filter(t => t.id !== id))
  }

  if (!authed) {
    return (
      <div className={styles.loginWrap}>
        <form className={styles.loginBox} onSubmit={handleLogin}>
          <div className={styles.loginIcon}>🔒</div>
          <h1 className={styles.loginTitle}>Панель управления</h1>
          <input
            className={`${styles.input} ${pwError ? styles.inputError : ''}`}
            type="password"
            placeholder="Пароль"
            value={pw}
            onChange={e => setPw(e.target.value)}
            autoFocus
          />
          {pwError && <p className={styles.error}>Неверный пароль</p>}
          <button className={styles.btn} type="submit">Войти</button>
        </form>
      </div>
    )
  }

  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div>
            <p className={styles.headerLabel}>Панель управления</p>
            <h1 className={styles.headerTitle}>Настройки сайта</h1>
          </div>
          <a href="/" className={styles.backBtn}>← На сайт</a>
        </div>
      </header>

      <main className={styles.main}>
        <form onSubmit={handleSave}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Контактные данные</h2>
            <p className={styles.sectionSub}>
              Изменения сохраняются в браузере и сразу отображаются на сайте.
            </p>
            <div className={styles.fields}>
              {EXPERT_FIELDS.map(f => (
                <div key={f.key} className={styles.field}>
                  <label className={styles.label}>{f.label}</label>
                  <input
                    className={styles.input}
                    type={f.type}
                    placeholder={f.placeholder || ''}
                    value={form[f.key] || ''}
                    onChange={e => handleChange(f.key, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={styles.actions}>
            <button className={styles.btn} type="submit">
              {saved ? '✓ Сохранено' : 'Сохранить изменения'}
            </button>
            <button className={styles.resetBtn} type="button" onClick={handleReset}>
              Сбросить
            </button>
          </div>
        </form>

        <div className={styles.section} style={{ marginTop: '1.5rem' }}>
          <h2 className={styles.sectionTitle}>Отзывы</h2>
          <p className={styles.sectionSub}>
            Хранятся в базе данных — не зависят от браузера или деплоя.
          </p>

          {tLoading ? (
            <p className={styles.sectionSub}>Загрузка...</p>
          ) : (
            <div className={styles.tList}>
              {testimonials.map(t => (
                <div key={t.id} className={styles.tItem}>
                  {tEditId === t.id ? (
                    <TestimonialForm
                      form={tForm}
                      onChange={changeTForm}
                      onSave={saveTEdit}
                      onCancel={cancelTEdit}
                      saving={tSaving}
                    />
                  ) : (
                    <div className={styles.tItemHead}>
                      <div className={styles.tAvatar} style={{ background: t.bg_color, color: t.tx_color }}>
                        {t.initials}
                      </div>
                      <div className={styles.tItemInfo}>
                        <p className={styles.tItemName}>{t.name}</p>
                        <p className={styles.tItemRole}>{t.role}</p>
                      </div>
                      <div className={styles.tItemActions}>
                        <button className={styles.iconBtn} type="button" onClick={() => startEditT(t)} title="Редактировать">✏️</button>
                        <button className={`${styles.iconBtn} ${styles.iconBtnDanger}`} type="button" onClick={() => deleteT(t.id)} title="Удалить">✕</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {tEditId === 'new' ? (
            <div className={styles.tItem}>
              <TestimonialForm
                form={tForm}
                onChange={changeTForm}
                onSave={saveTEdit}
                onCancel={cancelTEdit}
                saving={tSaving}
              />
            </div>
          ) : (
            <button className={styles.addBtn} type="button" onClick={startAddT}>
              + Добавить отзыв
            </button>
          )}
        </div>

        {/* Leads section */}
        <div className={styles.section} style={{ marginTop: '1.5rem' }}>
          <div className={styles.leadsHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Заявки</h2>
              <p className={styles.sectionSub}>Все запросы с сайта — контакты и материалы.</p>
            </div>
            <button className={styles.exportBtn} onClick={exportLeads} disabled={!leads.length}>
              ↓ Excel
            </button>
          </div>

          {leadsLoading ? (
            <p className={styles.sectionSub}>Загрузка...</p>
          ) : leads.length === 0 ? (
            <p className={styles.sectionSub}>Заявок пока нет.</p>
          ) : (
            <div className={styles.leadsTable}>
              <div className={styles.leadsRow + ' ' + styles.leadsHead}>
                <span>Дата</span>
                <span>Тип</span>
                <span>Имя</span>
                <span>Email</span>
                <span>Детали</span>
              </div>
              {leads.map(l => (
                <div key={l.id} className={styles.leadsRow}>
                  <span className={styles.leadsDate}>{new Date(l.created_at).toLocaleDateString('ru')}</span>
                  <span className={l.type === 'contact' ? styles.badgeContact : styles.badgeMaterial}>
                    {l.type === 'contact' ? 'Контакт' : 'Материал'}
                  </span>
                  <span>{l.name || '—'}</span>
                  <span className={styles.leadsEmail}>{l.email}</span>
                  <span className={styles.leadsDetail}>{l.message || l.material || '—'}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
