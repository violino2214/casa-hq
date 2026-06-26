import React from 'react'
import styles from './StatsCards.module.css'

export default function StatsCards({ tasks }) {
  const totale      = tasks.length
  const daFare      = tasks.filter(t => !t.completata).length
  const completate  = tasks.filter(t => t.completata).length
  const urgenti     = tasks.filter(t => t.priorita === 'Alta' && !t.completata).length

  const stats = [
    { label: 'Totale', valore: totale,     emoji: '📋', accent: 'powder' },
    { label: 'Da fare', valore: daFare,    emoji: '⏳', accent: 'amber'  },
    { label: 'Fatte',  valore: completate, emoji: '✅', accent: 'sage'   },
    { label: 'Urgenti', valore: urgenti,   emoji: '🔴', accent: 'rose'   },
  ]

  return (
    <div className={styles.grid}>
      {stats.map(s => (
        <div key={s.label} className={`${styles.card} ${styles[s.accent]}`}>
          <span className={styles.emoji}>{s.emoji}</span>
          <span className={styles.valore}>{s.valore}</span>
          <span className={styles.label}>{s.label}</span>
        </div>
      ))}
    </div>
  )
}
