import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { familyMemberList, getFamilyMember } from '../data/familyMembers'

function daSupabaseNote(row) {
  return {
    id: row.id,
    testo: row.text,
    autore: row.author || 'vi',
    fissata: row.pinned,
    creataIl: row.created_at,
  }
}

export default function NotesBoard() {
  const [notes, setNotes] = useState([])
  const [testo, setTesto] = useState('')
  const [autore, setAutore] = useState('vi')
  const [loading, setLoading] = useState(true)
  const [errore, setErrore] = useState('')

  useEffect(() => {
    caricaNote()
  }, [])

  async function caricaNote() {
    setLoading(true)
    setErrore('')

    const { data, error } = await supabase
      .from('family_notes')
      .select('*')
      .order('pinned', { ascending: false })
      .order('created_at', { ascending: false })

    if (error) {
      console.error(error)
      setErrore('Non riesco a caricare la bacheca.')
      setLoading(false)
      return
    }

    setNotes((data || []).map(daSupabaseNote))
    setLoading(false)
  }

  async function aggiungiNota(e) {
    e.preventDefault()
    if (!testo.trim()) return

    const testoPulito = testo.trim()
    setTesto('')
    setErrore('')

    const { data, error } = await supabase
      .from('family_notes')
      .insert({
        text: testoPulito,
        author: autore,
        pinned: false,
      })
      .select()
      .single()

    if (error) {
      console.error(error)
      setErrore('Non riesco ad aggiungere la nota.')
      setTesto(testoPulito)
      return
    }

    setNotes(prev => [daSupabaseNote(data), ...prev])
  }

  async function togglePin(id) {
    const nota = notes.find(n => n.id === id)
    if (!nota) return

    const nuovoValore = !nota.fissata
    const vecchie = notes

    setNotes(prev =>
      prev.map(n => n.id === id ? { ...n, fissata: nuovoValore } : n)
        .sort((a, b) => Number(b.fissata) - Number(a.fissata))
    )

    const { error } = await supabase
      .from('family_notes')
      .update({ pinned: nuovoValore })
      .eq('id', id)

    if (error) {
      console.error(error)
      setErrore('Non riesco ad aggiornare la nota.')
      setNotes(vecchie)
    }
  }

  async function eliminaNota(id) {
    const vecchie = notes

    setNotes(prev => prev.filter(n => n.id !== id))

    const { error } = await supabase
      .from('family_notes')
      .delete()
      .eq('id', id)

    if (error) {
      console.error(error)
      setErrore('Non riesco a eliminare la nota.')
      setNotes(vecchie)
    }
  }

  return (
    <div style={pageStyle}>
      <section style={heroStyle}>
        <div>
          <p style={eyebrowStyle}>Messaggi di casa</p>
          <h2 style={titleStyle}>💬 Bacheca famiglia</h2>
          <p style={subStyle}>
            Note veloci, cose da ricordare e messaggi pratici per tutti.
          </p>
        </div>

        <div style={countStyle}>
          <strong>{notes.length}</strong>
          <span>note</span>
        </div>
      </section>

      <section style={cardStyle}>
        <form onSubmit={aggiungiNota}>
          <label style={labelStyle}>Nuova nota</label>
          <textarea
            value={testo}
            onChange={e => setTesto(e.target.value)}
            placeholder="Es. manca detersivo, ricordarsi farmacia, non buttare gli avanzi..."
            rows="3"
            style={textareaStyle}
          />

          <div style={formFooterStyle}>
            <select
              value={autore}
              onChange={e => setAutore(e.target.value)}
              style={selectStyle}
            >
              {familyMemberList
                .filter(m => m.name !== 'tutti')
                .map(m => (
                  <option key={m.name} value={m.name}>
                    {m.emoji} {m.label}
                  </option>
                ))}
            </select>

            <button type="submit" style={primaryButtonStyle}>
              Aggiungi nota
            </button>
          </div>
        </form>
      </section>

      {errore && (
        <div style={errorStyle}>⚠️ {errore}</div>
      )}

      <section style={notesGridStyle}>
        {loading ? (
          <div style={emptyStyle}>⏳ Carico la bacheca...</div>
        ) : notes.length === 0 ? (
          <div style={emptyStyle}>🌿 Nessuna nota per ora.</div>
        ) : (
          notes.map(nota => {
            const membro = getFamilyMember(nota.autore)
            const data = new Date(nota.creataIl).toLocaleDateString('it-IT', {
              day: 'numeric',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit',
            })

            return (
              <article
                key={nota.id}
                style={{
                  ...noteStyle,
                  borderColor: nota.fissata ? membro.color : 'rgba(120,100,80,0.14)',
                  boxShadow: nota.fissata
                    ? `0 18px 45px ${membro.color}22`
                    : '0 14px 34px rgba(80,60,40,0.08)',
                }}
              >
                {nota.fissata && (
                  <div style={{
                    ...pinBadgeStyle,
                    background: membro.background,
                    color: membro.color,
                  }}>
                    📌 fissata
                  </div>
                )}

                <p style={noteTextStyle}>{nota.testo}</p>

                <div style={noteFooterStyle}>
                  <span
                    style={{
                      ...authorStyle,
                      background: membro.background,
                      color: membro.color,
                      borderColor: `${membro.color}55`,
                    }}
                  >
                    {membro.emoji} {membro.label}
                  </span>

                  <span style={dateStyle}>{data}</span>
                </div>

                <div style={actionsStyle}>
                  <button
                    type="button"
                    onClick={() => togglePin(nota.id)}
                    style={smallButtonStyle}
                  >
                    {nota.fissata ? 'Togli pin' : 'Fissa'}
                  </button>

                  <button
                    type="button"
                    onClick={() => eliminaNota(nota.id)}
                    style={deleteButtonStyle}
                  >
                    Elimina
                  </button>
                </div>
              </article>
            )
          })
        )}
      </section>
    </div>
  )
}

const pageStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
}

const heroStyle = {
  background: 'linear-gradient(135deg, rgba(255,255,255,0.88), rgba(234,242,246,0.78))',
  border: '1px solid rgba(120,100,80,0.14)',
  borderRadius: '32px',
  padding: '26px',
  boxShadow: '0 18px 50px rgba(80,60,40,0.10)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '18px',
  flexWrap: 'wrap',
}

const eyebrowStyle = {
  margin: '0 0 8px',
  color: '#8fae8b',
  fontSize: '13px',
  fontWeight: 900,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
}

const titleStyle = {
  margin: 0,
  color: '#3f3a34',
  fontSize: '32px',
}

const subStyle = {
  margin: '8px 0 0',
  color: '#7d746b',
  fontSize: '15px',
  maxWidth: '560px',
  lineHeight: 1.45,
}

const countStyle = {
  minWidth: '100px',
  minHeight: '82px',
  borderRadius: '24px',
  background: 'rgba(255,255,255,0.72)',
  border: '1px solid rgba(120,100,80,0.12)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#6b5f54',
}

const cardStyle = {
  background: 'rgba(255,255,255,0.84)',
  border: '1px solid rgba(120,100,80,0.14)',
  borderRadius: '30px',
  padding: '22px',
  boxShadow: '0 18px 50px rgba(80,60,40,0.08)',
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

const textareaStyle = {
  width: '100%',
  boxSizing: 'border-box',
  border: '1px solid rgba(120,100,80,0.18)',
  borderRadius: '20px',
  background: '#fffaf4',
  padding: '15px 16px',
  fontSize: '16px',
  color: '#3f3a34',
  resize: 'vertical',
  fontFamily: 'inherit',
  outlineColor: '#8fae8b',
}

const formFooterStyle = {
  marginTop: '14px',
  display: 'flex',
  justifyContent: 'space-between',
  gap: '12px',
  flexWrap: 'wrap',
}

const selectStyle = {
  border: '1px solid rgba(120,100,80,0.18)',
  borderRadius: '999px',
  background: '#fffaf4',
  padding: '12px 14px',
  fontSize: '15px',
  color: '#3f3a34',
  fontWeight: 800,
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

const errorStyle = {
  background: '#fff1f1',
  color: '#8a3b3b',
  borderRadius: '18px',
  padding: '14px 16px',
  fontWeight: 700,
}

const notesGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: '16px',
}

const noteStyle = {
  position: 'relative',
  background: 'rgba(255,255,255,0.84)',
  border: '1.5px solid rgba(120,100,80,0.14)',
  borderRadius: '26px',
  padding: '20px',
}

const pinBadgeStyle = {
  display: 'inline-flex',
  padding: '6px 9px',
  borderRadius: '999px',
  fontSize: '12px',
  fontWeight: 900,
  marginBottom: '12px',
}

const noteTextStyle = {
  margin: 0,
  color: '#3f3a34',
  fontSize: '16px',
  lineHeight: 1.45,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
}

const noteFooterStyle = {
  marginTop: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '10px',
  flexWrap: 'wrap',
}

const authorStyle = {
  display: 'inline-flex',
  padding: '7px 10px',
  borderRadius: '999px',
  border: '1px solid',
  fontSize: '12px',
  fontWeight: 900,
}

const dateStyle = {
  color: '#9a9188',
  fontSize: '12px',
  fontWeight: 700,
}

const actionsStyle = {
  marginTop: '14px',
  display: 'flex',
  gap: '8px',
  justifyContent: 'flex-end',
  flexWrap: 'wrap',
}

const smallButtonStyle = {
  border: '1px solid rgba(120,100,80,0.14)',
  borderRadius: '999px',
  padding: '8px 12px',
  background: 'white',
  color: '#6b5f54',
  fontWeight: 800,
  cursor: 'pointer',
}

const deleteButtonStyle = {
  ...smallButtonStyle,
  color: '#9a4d4d',
  background: '#fff6f6',
}

const emptyStyle = {
  gridColumn: '1 / -1',
  border: '1px dashed rgba(120,100,80,0.18)',
  borderRadius: '22px',
  padding: '24px',
  textAlign: 'center',
  color: '#9a9188',
  fontWeight: 800,
  background: 'rgba(248,239,227,0.45)',
}
