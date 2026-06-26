import React from 'react'
import { getFamilyMember } from '../data/familyMembers'
import styles from './TaskCard.module.css'

const categoriaEmoji = {
  Spesa: '🛒',
  Casa: '🧺',
  Commissione: '🚗',
  Menu: '🍽️',
  Famiglia: '👥',
  Altro: '✨',
}

const prioritaEmoji = {
  Alta: '🔥',
  Media: '🌿',
  Bassa: '🫧',
}

export default function TaskCard({ task, onToggle, onElimina }) {
  const membro = getFamilyMember(task.persona)

  return (
    <article
      className={`${styles.card} ${task.completata ? styles.completata : ''}`}
      style={{
        borderColor: membro.color,
        boxShadow: `0 14px 34px ${membro.color}22`,
      }}
    >
      <div className={styles.top}>
        <button
          type="button"
          onClick={() => onToggle(task.id)}
          className={`${styles.check} ${task.completata ? styles.checkDone : ''}`}
          aria-label="Segna come fatto"
        >
          {task.completata ? '✓' : ''}
        </button>

        <div className={styles.content}>
          <h3 className={styles.titolo}>{task.titolo}</h3>

          <div className={styles.meta}>
            <span className={styles.tag}>
              {categoriaEmoji[task.categoria] || '✨'} {task.categoria}
            </span>

            <span
              className={styles.tag}
              style={{
                background: membro.background,
                color: membro.color,
                borderColor: membro.color,
              }}
            >
              {membro.emoji} {membro.label}
            </span>

            <span className={styles.tag}>
              {prioritaEmoji[task.priorita] || '🌿'} {task.priorita}
            </span>

            <span className={styles.tag}>
              📅 {task.giorno}
            </span>
          </div>

          {task.note && (
            <p className={styles.note}>{task.note}</p>
          )}

          <p
            style={{
              marginTop: '10px',
              marginBottom: 0,
              fontSize: '12px',
              color: membro.color,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            ruolo: {membro.role}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onElimina(task.id)}
          className={styles.delete}
          aria-label="Elimina attività"
        >
          ✕
        </button>
      </div>
    </article>
  )
}