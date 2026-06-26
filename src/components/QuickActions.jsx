import React from 'react'

const azioni = [
  {
    label: 'Spesa',
    emoji: '🛒',
    task: {
      titolo: 'Fare spesa',
      categoria: 'Spesa',
      persona: 'tutti',
      priorita: 'Media',
      giorno: giornoOggi(),
      note: '',
      completata: false,
    },
  },
  {
    label: 'Lavatrice',
    emoji: '🧺',
    task: {
      titolo: 'Fare lavatrice',
      categoria: 'Casa',
      persona: 'tutti',
      priorita: 'Media',
      giorno: giornoOggi(),
      note: '',
      completata: false,
    },
  },
  {
    label: 'Spazzatura',
    emoji: '🗑️',
    task: {
      titolo: 'Buttare la spazzatura',
      categoria: 'Casa',
      persona: 'tutti',
      priorita: 'Alta',
      giorno: giornoOggi(),
      note: '',
      completata: false,
    },
  },
  {
    label: 'Farmacia',
    emoji: '💊',
    task: {
      titolo: 'Passare in farmacia',
      categoria: 'Commissione',
      persona: 'tutti',
      priorita: 'Alta',
      giorno: giornoOggi(),
      note: '',
      completata: false,
    },
  },
  {
    label: 'Cena',
    emoji: '🍽️',
    task: {
      titolo: 'Decidere cena',
      categoria: 'Menu',
      persona: 'tutti',
      priorita: 'Media',
      giorno: giornoOggi(),
      note: '',
      completata: false,
    },
  },
  {
    label: 'Cucina',
    emoji: '🧹',
    task: {
      titolo: 'Sistemare cucina',
      categoria: 'Casa',
      persona: 'tutti',
      priorita: 'Media',
      giorno: giornoOggi(),
      note: '',
      completata: false,
    },
  },
]

function giornoOggi() {
  const giorni = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato']
  return giorni[new Date().getDay()]
}

export default function QuickActions({ onAggiungi }) {
  return (
    <section style={cardStyle}>
      <div style={headerStyle}>
        <div>
          <h2 style={titleStyle}>⚡ Azioni rapide</h2>
          <p style={subStyle}>Aggiungi le attività più comuni con un click.</p>
        </div>
      </div>

      <div style={gridStyle}>
        {azioni.map(azione => (
          <button
            key={azione.label}
            type="button"
            onClick={() => onAggiungi(azione.task)}
            style={buttonStyle}
          >
            <span style={emojiStyle}>{azione.emoji}</span>
            <span>{azione.label}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

const cardStyle = {
  background: 'rgba(255,255,255,0.78)',
  border: '1px solid rgba(120,100,80,0.12)',
  borderRadius: '28px',
  padding: '20px',
  boxShadow: '0 18px 45px rgba(80,60,40,0.08)',
  marginBottom: '18px',
}

const headerStyle = {
  marginBottom: '16px',
}

const titleStyle = {
  margin: 0,
  color: '#3f3a34',
  fontSize: '22px',
}

const subStyle = {
  margin: '6px 0 0',
  color: '#7d746b',
  fontSize: '14px',
}

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
  gap: '10px',
}

const buttonStyle = {
  border: '1px solid rgba(143,174,139,0.28)',
  borderRadius: '20px',
  background: 'linear-gradient(135deg, rgba(237,244,234,0.9), rgba(255,250,244,0.9))',
  color: '#5f7f5b',
  padding: '14px 12px',
  fontWeight: 900,
  fontSize: '14px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  boxShadow: '0 10px 24px rgba(80,120,80,0.10)',
}

const emojiStyle = {
  fontSize: '20px',
}
