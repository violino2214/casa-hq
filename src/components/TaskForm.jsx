import React, { useState } from 'react'
import { familyMemberList } from '../data/familyMembers'

const categorie = ['Spesa', 'Casa', 'Commissione', 'Menu', 'Famiglia', 'Altro']
const priorita = ['Bassa', 'Media', 'Alta']
const giorni = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica']

const categoriaEmoji = {
  Spesa: '🛒',
  Casa: '🏠',
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
    setForm(prev => ({ ...prev, [name]: value }))
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

  if (!aperto) {
    return (
      <div style={cardStyle}>
        <button
          type="button"
          onClick={() => setAperto(true)}
          style={openButtonStyle}
        >
          <span style={{ fontSize: 22 }}>＋</span>
          <span>Aggiungi attività</span>
        </button>
      </div>
    )
  }

  return (
    <div style={cardStyle}>
      <form onSubmit={submit}>
        <div style={headerStyle}>
          <div>
            <h2 style={titleStyle}>Nuova attività</h2>
            <p style={subStyle}>Aggiungi una cosa da fare in famiglia</p>
          </div>

          <button
            type="button"
            onClick={() => setAperto(false)}
            style={closeButtonStyle}
          >
            ×
          </button>
        </div>

        <label style={labelStyle}>Cosa bisogna fare?</label>
        <input
          name="titolo"
          value={form.titolo}
          onChange={aggiornaCampo}
          placeholder="Es. Comprare verdure, fare lavatrice..."
          style={inputStyle}
          autoFocus
        />

        <div style={gridStyle}>
          <div>
            <label style={labelStyle}>Categoria</label>
            <select
              name="categoria"
              value={form.categoria}
              onChange={aggiornaCampo}
              style={selectStyle}
            >
              {categorie.map(cat => (
                <option key={cat} value={cat}>
                  {categoriaEmoji[cat]} {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={labelStyle}>Chi?</label>
            <select
              name="persona"
              value={form.persona}
              onChange={aggiornaCampo}
              style={selectStyle}
            >
              {familyMemberList.map(persona => (
                <option key={persona.name} value={persona.name}>
                  {persona.emoji} {persona.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={labelStyle}>Priorità</label>
            <select
              name="priorita"
              value={form.priorita}
              onChange={aggiornaCampo}
              style={selectStyle}
            >
              {priorita.map(p => (
                <option key={p} value={p}>
                  {p === 'Alta' ? '🔴' : p === 'Media' ? '🌿' : '🫧'} {p}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={labelStyle}>Giorno</label>
            <select
              name="giorno"
              value={form.giorno}
              onChange={aggiornaCampo}
              style={selectStyle}
            >
              {giorni.map(giorno => (
                <option key={giorno} value={giorno}>
                  {giorno}
                </option>
              ))}
            </select>
          </div>
        </div>

        <label style={labelStyle}>Note</label>
        <textarea
          name="note"
          value={form.note}
          onChange={aggiornaCampo}
          placeholder="Dettagli, promemoria, negozio, orario..."
          rows="3"
          style={textareaStyle}
        />

        <div style={actionsStyle}>
          <button
            type="button"
            onClick={() => setAperto(false)}
            style={secondaryButtonStyle}
          >
            Annulla
          </button>

          <button type="submit" style={primaryButtonStyle}>
            Aggiungi
          </button>
        </div>
      </form>
    </div>
  )
}

const cardStyle = {
  background: 'rgba(255,255,255,0.84)',
  border: '1px solid rgba(120,100,80,0.14)',
  borderRadius: '28px',
  padding: '22px',
  boxShadow: '0 18px 50px rgba(80,60,40,0.10)',
  marginBottom: '18px',
}

const openButtonStyle = {
  width: '100%',
  border: '2px dashed rgba(143,174,139,0.55)',
  borderRadius: '22px',
  background: 'rgba(237,244,234,0.62)',
  padding: '20px',
  fontSize: '17px',
  fontWeight: 800,
  color: '#5f7f5b',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
}

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '14px',
  marginBottom: '22px',
}

const titleStyle = {
  margin: 0,
  color: '#3f3a34',
  fontSize: '24px',
}

const subStyle = {
  margin: '6px 0 0',
  color: '#7d746b',
  fontSize: '15px',
}

const closeButtonStyle = {
  border: 'none',
  background: 'rgba(120,100,80,0.08)',
  color: '#7d746b',
  width: '34px',
  height: '34px',
  borderRadius: '999px',
  cursor: 'pointer',
  fontSize: '22px',
  fontWeight: 800,
}

const labelStyle = {
  display: 'block',
  margin: '0 0 8px',
  color: '#6b5f54',
  fontSize: '12px',
  fontWeight: 900,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
}

const inputStyle = {
  width: '100%',
  boxSizing: 'border-box',
  border: '1px solid rgba(120,100,80,0.18)',
  borderRadius: '18px',
  background: '#fffaf4',
  padding: '15px 16px',
  fontSize: '16px',
  color: '#3f3a34',
  marginBottom: '18px',
  outlineColor: '#8fae8b',
}

const selectStyle = {
  ...inputStyle,
  marginBottom: 0,
}

const textareaStyle = {
  ...inputStyle,
  minHeight: '92px',
  resize: 'vertical',
  marginBottom: 0,
  fontFamily: 'inherit',
}

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: '16px',
  marginBottom: '18px',
}

const actionsStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '10px',
  marginTop: '20px',
  flexWrap: 'wrap',
}

const secondaryButtonStyle = {
  border: '1px solid rgba(120,100,80,0.16)',
  borderRadius: '999px',
  padding: '12px 18px',
  background: 'white',
  color: '#6b5f54',
  fontWeight: 800,
  cursor: 'pointer',
}

const primaryButtonStyle = {
  border: 'none',
  borderRadius: '999px',
  padding: '12px 20px',
  background: '#8fae8b',
  color: 'white',
  fontWeight: 900,
  cursor: 'pointer',
  boxShadow: '0 12px 28px rgba(80,120,80,0.22)',
}
