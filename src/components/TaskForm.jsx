import React, { useState } from 'react'
import styles from './TaskForm.module.css'

const categorie = ['Spesa', 'Casa', 'Commissione', 'Menu', 'Famiglia', 'Altro']
const persone = ['vi', 'marti', 'isa', 'dav', 'tutti']
const priorita = ['Bassa', 'Media', 'Alta']
const giorni = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica']

const categoriaEmoji = {
  Spesa: '🛒',
  Casa: '🧺',
  Commissione: '🚗',
  Menu: '🍽️',
  Famiglia: '👥',
  Altro: '✨',
}

export default function TaskForm({ onAggiungi }) {
  const [aperto, setAperto] = useState(false)

  const [form, setForm] = useState({
    titolo: '',
    categoria: 'Casa',
    persona: 'tutti',
    priorita: 'Media',
    giorno: 'Lunedì',
    note: '',
    completata: false,
  })

  function aggiornaCampo(e) {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  function submit(e) {
    e.preventDefault()

    if (!form.titolo.trim()) return

    onAggiungi({
      ...form,
      titolo: form.titolo.trim(),
      note: form.note.trim(),
      completata: false,
    })

    setForm({
      titolo: '',
      categoria: 'Casa',
      persona: 'tutti',
      priorita: 'Media',
      giorno: 'Lunedì',
      note: '',
      completata: false,
    })

    setAperto(false)
  }

  return (
    <div className={styles.card}>
      {!aperto ? (
        <button
          type="button"
          className={styles.apriBtn}
          onClick={() => setAperto(true)}
        >
          <span className={styles.apriIcon}>＋</span>
          <span>Aggiungi attività</span>
        </button>
      ) : (
        <form onSubmit={submit} className={styles.form}>
          <div className={styles.formHeader}>
            <div>
              <h2 className={styles.titolo}>Nuova attività</h2>
              <p className={styles.sub}>Aggiungi una cosa da fare in famiglia</p>
            </div>

            <button
              type="button"
              className={styles.chiudiBtn}
              onClick={() => setAperto(false)}
            >
              ✕
            </button>
          </div>

          <div className={styles.campoGrande}>
            <label className={styles.label}>Cosa bisogna fare?</label>
            <input
              name="titolo"
              value={form.titolo}
              onChange={aggiornaCampo}
              placeholder="Es. Comprare verdure, fare lavatrice..."
              className={styles.input}
              autoFocus
            />
          </div>

          <div className={styles.grid}>
            <div className={styles.campo}>
              <label className={styles.label}>Categoria</label>
              <select
                name="categoria"
                value={form.categoria}
                onChange={aggiornaCampo}
                className={styles.select}
              >
                {categorie.map(cat => (
                  <option key={cat} value={cat}>
                    {categoriaEmoji[cat]} {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.campo}>
              <label className={styles.label}>Chi?</label>
              <select
                name="persona"
                value={form.persona}
                onChange={aggiornaCampo}
                className={styles.select}
              >
                {persone.map(persona => (
                  <option key={persona} value={persona}>
                    {persona}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.campo}>
              <label className={styles.label}>Priorità</label>
              <select
                name="priorita"
                value={form.priorita}
                onChange={aggiornaCampo}
                className={styles.select}
              >
                {priorita.map(p => (
                  <option key={p} value={p}>
                    {p === 'Alta' ? '🔥' : p === 'Media' ? '🌿' : '🫧'} {p}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.campo}>
              <label className={styles.label}>Giorno</label>
              <select
                name="giorno"
                value={form.giorno}
                onChange={aggiornaCampo}
                className={styles.select}
              >
                {giorni.map(giorno => (
                  <option key={giorno} value={giorno}>
                    {giorno}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.campoGrande}>
            <label className={styles.label}>Note</label>
            <textarea
              name="note"
              value={form.note}
              onChange={aggiornaCampo}
              placeholder="Dettagli, promemoria, negozio, orario..."
              className={styles.textarea}
              rows="3"
            />
          </div>

          <div className={styles.azioni}>
            <button
              type="button"
              className={styles.btnSecondario}
              onClick={() => setAperto(false)}
            >
              Annulla
            </button>

            <button type="submit" className={styles.btnPrimario}>
              Aggiungi
            </button>
          </div>
        </form>
      )}
    </div>
  )
}