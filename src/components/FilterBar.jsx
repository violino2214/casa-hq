import React from 'react'
import styles from './FilterBar.module.css'

const FILTRI = [
  { id: 'tutte',       label: 'Tutte',       emoji: '🗂️' },
  { id: 'Spesa',       label: 'Spesa',       emoji: '🛒' },
  { id: 'Casa',        label: 'Casa',        emoji: '🏠' },
  { id: 'Commissione', label: 'Commissioni', emoji: '📋' },
  { id: 'Menu',        label: 'Menu',        emoji: '🍽️' },
  { id: 'Famiglia',    label: 'Famiglia',    emoji: '👨‍👩‍👧' },
  { id: 'urgenti',     label: 'Urgenti',     emoji: '🔴' },
  { id: 'completate',  label: 'Completate',  emoji: '✅' },
]

export default function FilterBar({ filtroAttivo, onFiltro }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.scroll}>
        {FILTRI.map(f => (
          <button
            key={f.id}
            onClick={() => onFiltro(f.id)}
            className={`${styles.btn} ${filtroAttivo === f.id ? styles.attivo : ''}`}
          >
            <span>{f.emoji}</span>
            <span>{f.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
