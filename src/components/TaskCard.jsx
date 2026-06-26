import React from 'react'
import { getFamilyMember } from '../data/familyMembers'

const categoriaEmoji = {
  Spesa: '🛒',
  Casa: '🏠',
  Commissione: '🚗',
  Menu: '🍽️',
  Famiglia: '👥',
  Altro: '✨',
}

const prioritaEmoji = {
  Alta: '🔴',
  Media: '🌿',
  Bassa: '🫧',
}

export default function TaskCard({ task, onToggle, onElimina }) {
  const membro = getFamilyMember(task.persona)

  return (
    <article
      style={{
        background: 'rgba(255,255,255,0.82)',
        border: `1.5px solid ${membro.color}55`,
        borderRadius: '26px',
        padding: '20px',
        boxShadow: `0 18px 45px ${membro.color}24`,
        opacity: task.completata ? 0.68 : 1,
        transform: task.completata ? 'scale(0.99)' : 'scale(1)',
        transition: 'all 0.18s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '7px',
          background: membro.color,
          opacity: 0.85,
        }}
      />

      <div
        style={{
          display: 'flex',
          gap: '14px',
          alignItems: 'flex-start',
        }}
      >
        <button
          type="button"
          onClick={() => onToggle(task.id)}
          aria-label="Segna come fatto"
          style={{
            width: '34px',
            height: '34px',
            minWidth: '34px',
            borderRadius: '999px',
            border: `2px solid ${membro.color}`,
            background: task.completata ? membro.color : 'white',
            color: 'white',
            fontWeight: 900,
            fontSize: '18px',
            cursor: 'pointer',
            boxShadow: `0 8px 18px ${membro.color}24`,
            marginTop: '4px',
          }}
        >
          {task.completata ? '✓' : ''}
        </button>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '12px',
              alignItems: 'flex-start',
            }}
          >
            <h3
              style={{
                margin: '0 0 12px',
                fontSize: '20px',
                lineHeight: 1.2,
                color: '#3f3a34',
                textDecoration: task.completata ? 'line-through' : 'none',
                wordBreak: 'break-word',
              }}
            >
              {task.titolo}
            </h3>

            <button
              type="button"
              onClick={() => onElimina(task.id)}
              aria-label="Elimina attività"
              style={{
                border: 'none',
                background: 'rgba(120,100,80,0.08)',
                color: '#8a7d70',
                width: '30px',
                height: '30px',
                minWidth: '30px',
                borderRadius: '999px',
                cursor: 'pointer',
                fontWeight: 800,
              }}
            >
              ×
            </button>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: task.note ? '12px' : '0',
            }}
          >
            <span style={tagStyle()}>
              {categoriaEmoji[task.categoria] || '✨'} {task.categoria}
            </span>

            <span
              style={{
                ...tagStyle(),
                background: membro.background,
                color: membro.color,
                borderColor: `${membro.color}55`,
                fontWeight: 800,
              }}
            >
              {membro.emoji} {membro.label}
            </span>

            <span style={tagStyle()}>
              {prioritaEmoji[task.priorita] || '🌿'} {task.priorita}
            </span>

            <span style={tagStyle()}>
              📅 {task.giorno}
            </span>
          </div>

          {task.note && (
            <p
              style={{
                margin: '12px 0 0',
                padding: '12px 14px',
                borderRadius: '16px',
                background: 'rgba(248,239,227,0.7)',
                color: '#6f665d',
                fontSize: '14px',
                lineHeight: 1.45,
                wordBreak: 'break-word',
              }}
            >
              {task.note}
            </p>
          )}

          <div
            style={{
              marginTop: '14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 10px',
              borderRadius: '999px',
              background: membro.background,
              color: membro.color,
              fontSize: '12px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            ruolo: {membro.role}
          </div>
        </div>
      </div>
    </article>
  )
}

function tagStyle() {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    padding: '7px 10px',
    borderRadius: '999px',
    border: '1px solid rgba(120,100,80,0.14)',
    background: 'rgba(255,255,255,0.72)',
    color: '#6b5f54',
    fontSize: '13px',
    fontWeight: 700,
    whiteSpace: 'nowrap',
  }
}
