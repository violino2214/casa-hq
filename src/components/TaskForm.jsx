import React, { useState } from 'react'
import { CATEGORIE, PERSONE, PRIORITA, GIORNI } from '../data'
import styles from './TaskForm.module.css'

const vuoto = {
  titolo: '',
  categoria: 'Casa',
  persona: 'Tutti',
  priorita: 'Media',
  giorno: 'Lunedì',
  note: '',
}

export default function TaskForm({ onAggiungi }) {
  const [aperto, setAperto] = useState(false)
  const [form, setForm] = useState(vuoto)

  const aggiorna = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const invia = e => {
    e.preventDefault()
    if (!form.titolo.trim()) return
    onAggiungi({
      ...form,
      id: Date.now(),
      completata: false,
      creatoIl: new Date().toISOString(),
    })
    setForm(vuoto)
    setAperto(false)
  }

  if (!aperto) {
    return (
      <button className={styles.apriBtn} onClick={() => setAperto(true)}>
        <span className={styles.plus}>+</span>
        <span>Aggiungi attività</span>
      </button>
    )
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.titolo}>✏️ Nuova attività</h3>
        <button className={styles.chiudi} onClick={() => setAperto(false)}>✕</button>
      </div>

      <form onSubmit={invia} className={styles.form}>
        <div className={styles.campo}>
          <label className={styles.label}>Titolo *</label>
          <input
            name="titolo"
            value={form.titolo}
            onChange={aggiorna}
            placeholder="es. Comprare il pane..."
            className={styles.input}
            required
          />
        </div>

        <div className={styles.griglia}>
          <div className={styles.campo}>
            <label className={styles.label}>Categoria</label>
            <select name="categoria" value={form.categoria} onChange={aggiorna} className={styles.select}>
              {CATEGORIE.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div className={styles.campo}>
            <label className={styles.label}>Persona</label>
            <select name="persona" value={form.persona} onChange={aggiorna} className={styles.select}>
              {PERSONE.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>

          <div className={styles.campo}>
            <label className={styles.label}>Priorità</label>
            <select name="priorita" value={form.priorita} onChange={aggiorna} className={styles.select}>
              {PRIORITA.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>

          <div className={styles.campo}>
            <label className={styles.label}>Giorno</label>
            <select name="giorno" value={form.giorno} onChange={aggiorna} className={styles.select}>
              {GIORNI.map(g => <option key={g}>{g}</option>)}
            </select>
          </div>
        </div>

        <div className={styles.campo}>
          <label className={styles.label}>Note (opzionale)</label>
          <textarea
            name="note"
            value={form.note}
            onChange={aggiorna}
            placeholder="Aggiungi dettagli..."
            className={styles.textarea}
            rows={2}
          />
        </div>

        <div className={styles.azioni}>
          <button type="button" onClick={() => setAperto(false)} className={styles.annulla}>Annulla</button>
          <button type="submit" className={styles.salva}>✓ Aggiungi</button>
        </div>
      </form>
    </div>
  )
}
