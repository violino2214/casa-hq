import React from 'react'
import { CATEGORIA_META, PRIORITA_META, PERSONA_META } from '../data'
import styles from './TaskCard.module.css'

export default function TaskCard({ task, onToggle, onElimina }) {
  const cat  = CATEGORIA_META[task.categoria] || CATEGORIA_META['Altro']
  const pri  = PRIORITA_META[task.priorita]   || PRIORITA_META['Bassa']
  const per  = PERSONA_META[task.persona]     || { emoji: '👤', color: '#666' }

  return (
    <div className={`${styles.card} ${task.completata ? styles.completata : ''}`}>
      {/* Left accent strip */}
      <div className={styles.strip} style={{ background: cat.color }} />

      <div className={styles.body}>
        {/* Top row */}
        <div className={styles.topRow}>
          <span
            className={`badge ${styles.catBadge}`}
            style={{ background: cat.bg, color: cat.color }}
          >
            {cat.emoji} {task.categoria}
          </span>
          <span
            className={`badge ${styles.priBadge}`}
            style={{ background: pri.bg, color: pri.color }}
          >
            {pri.emoji} {task.priorita}
          </span>
        </div>

        {/* Title */}
        <p className={styles.titolo}>{task.titolo}</p>

        {/* Meta row */}
        <div className={styles.metaRow}>
          <span className={styles.metaItem} style={{ color: per.color }}>
            {per.emoji} {task.persona}
          </span>
          <span className={styles.metaItem}>
            📅 {task.giorno}
          </span>
        </div>

        {/* Note */}
        {task.note && (
          <p className={styles.note}>💬 {task.note}</p>
        )}

        {/* Actions */}
        <div className={styles.azioni}>
          <button
            onClick={() => onToggle(task.id)}
            className={`${styles.btnToggle} ${task.completata ? styles.btnDaFare : styles.btnFatto}`}
          >
            {task.completata ? '↩ Da fare' : '✓ Fatto!'}
          </button>
          <button onClick={() => onElimina(task.id)} className={styles.btnElimina}>
            🗑️
          </button>
        </div>
      </div>
    </div>
  )
}
