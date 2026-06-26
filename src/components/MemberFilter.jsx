import React from 'react'
import { familyMemberList } from '../data/familyMembers'

export default function MemberFilter({ personaAttiva, onPersona }) {
  const baseButton = {
    border: '1px solid rgba(120,100,80,0.14)',
    borderRadius: '999px',
    padding: '10px 14px',
    background: 'rgba(255,255,255,0.72)',
    color: '#6b5f54',
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 8px 18px rgba(80,60,40,0.08)',
    transition: 'all 0.18s ease',
    whiteSpace: 'nowrap',
  }

  const activeButton = {
    background: '#8fae8b',
    color: 'white',
    borderColor: '#8fae8b',
    boxShadow: '0 12px 28px rgba(80,120,80,0.20)',
  }

  return (
    <div
      style={{
        margin: '18px 0 14px',
        padding: '14px',
        borderRadius: '24px',
        background: 'rgba(255,255,255,0.48)',
        border: '1px solid rgba(120,100,80,0.10)',
        overflowX: 'auto',
      }}
    >
      <p
        style={{
          margin: '0 0 10px',
          fontSize: '13px',
          fontWeight: 800,
          color: '#7d746b',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
        }}
      >
        Vista per persona
      </p>

      <div
        style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          flexWrap: 'nowrap',
        }}
      >
        <button
          type="button"
          onClick={() => onPersona('all')}
          style={{
            ...baseButton,
            ...(personaAttiva === 'all' ? activeButton : {}),
          }}
        >
          👥 Tutti
        </button>

        {familyMemberList.map(membro => {
          const isActive = personaAttiva === membro.name

          return (
            <button
              key={membro.name}
              type="button"
              onClick={() => onPersona(membro.name)}
              style={{
                ...baseButton,
                ...(isActive
                  ? {
                      background: membro.color,
                      color: 'white',
                      borderColor: membro.color,
                      boxShadow: `0 12px 28px ${membro.color}33`,
                    }
                  : {
                      background: membro.background,
                      color: membro.color,
                      borderColor: `${membro.color}55`,
                    }),
              }}
            >
              {membro.emoji} {membro.name === 'tutti' ? 'famiglia' : membro.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
