import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import styles from './WeeklyMenu.module.css'

const giorniSettimana = [
  'Lunedì',
  'Martedì',
  'Mercoledì',
  'Giovedì',
  'Venerdì',
  'Sabato',
  'Domenica',
]

const giornoEmoji = {
  'Lunedì':    '🌙',
  'Martedì':   '🌿',
  'Mercoledì': '☀️',
  'Giovedì':   '🌤️',
  'Venerdì':   '🎉',
  'Sabato':    '🌸',
  'Domenica':  '🌟',
}

function daSupabaseMenu(row) {
  return {
    id: row.id,
    giorno: row.day,
    pranzo: row.lunch || '',
    cena: row.dinner || '',
    note: row.notes || '',
    creatoIl: row.created_at,
  }
}

function ordinaMenu(menu) {
  return [...menu].sort(
    (a, b) => giorniSettimana.indexOf(a.giorno) - giorniSettimana.indexOf(b.giorno)
  )
}

export default function WeeklyMenu() {
  const [menu, setMenu] = useState([])
  const [editIdx, setEditIdx] = useState(null)
  const [editData, setEditData] = useState({})
  const [loading, setLoading] = useState(true)
  const [errore, setErrore] = useState('')

  useEffect(() => {
    caricaMenu()
  }, [])

  async function caricaMenu() {
    setLoading(true)
    setErrore('')

    const { data, error } = await supabase
      .from('menu_items')
      .select('*')

    if (error) {
      console.error(error)
      setErrore('Non riesco a caricare il menu.')
      setLoading(false)
      return
    }

    let menuCaricato = (data || []).map(daSupabaseMenu)

    // Se il database è vuoto, crea automaticamente i 7 giorni
    if (menuCaricato.length === 0) {
      const righeIniziali = giorniSettimana.map(giorno => ({
        day: giorno,
        lunch: '',
        dinner: '',
        notes: '',
      }))

      const { data: creati, error: erroreCreazione } = await supabase
        .from('menu_items')
        .insert(righeIniziali)
        .select()

      if (erroreCreazione) {
        console.error(erroreCreazione)
        setErrore('Non riesco a creare il menu settimanale.')
        setLoading(false)
        return
      }

      menuCaricato = (creati || []).map(daSupabaseMenu)
    }

    setMenu(ordinaMenu(menuCaricato))
    setLoading(false)
  }

  const apriEdit = idx => {
    setEditIdx(idx)
    setEditData({ ...menu[idx] })
  }

  const aggiorna = e => {
    setEditData(d => ({ ...d, [e.target.name]: e.target.value }))
  }

  async function salva() {
    if (editIdx === null || !editData.id) return

    const vecchioMenu = menu

    const menuAggiornato = menu.map((g, i) =>
      i === editIdx ? { ...editData } : g
    )

    setMenu(ordinaMenu(menuAggiornato))
    setEditIdx(null)
    setErrore('')

    const { error } = await supabase
      .from('menu_items')
      .update({
        lunch: editData.pranzo || '',
        dinner: editData.cena || '',
        notes: editData.note || '',
      })
      .eq('id', editData.id)

    if (error) {
      console.error(error)
      setErrore('Non riesco a salvare questo giorno del menu.')
      setMenu(vecchioMenu)
    }
  }

  if (loading) {
    return (
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.titolo}>🍽️ Menu della settimana</h2>
          <p className={styles.sub}>Carico il menu condiviso...</p>
        </div>
        <p className={styles.vuoto}>⏳ Caricamento...</p>
      </div>
    )
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.titolo}>🍽️ Menu della settimana</h2>
        <p className={styles.sub}>Clicca su un giorno per modificare</p>
      </div>

      {errore && (
        <p className={styles.vuoto}>⚠️ {errore}</p>
      )}

      <div className={styles.lista}>
        {menu.map((g, idx) => (
          <div key={g.id || g.giorno} className={styles.riga}>
            {editIdx === idx ? (
              <div className={styles.editBox}>
                <div className={styles.editHeader}>
                  <span className={styles.editGiorno}>
                    {giornoEmoji[g.giorno]} {g.giorno}
                  </span>
                  <div className={styles.editAzioni}>
                    <button onClick={salva} className={styles.btnSalva}>✓ Salva</button>
                    <button onClick={() => setEditIdx(null)} className={styles.btnAnnulla}>✕</button>
                  </div>
                </div>

                <div className={styles.editCampi}>
                  <div className={styles.editCampo}>
                    <label className={styles.editLabel}>☀️ Pranzo</label>
                    <input
                      name="pranzo"
                      value={editData.pranzo || ''}
                      onChange={aggiorna}
                      className={styles.editInput}
                      placeholder="Cosa si mangia a pranzo?"
                    />
                  </div>

                  <div className={styles.editCampo}>
                    <label className={styles.editLabel}>🌙 Cena</label>
                    <input
                      name="cena"
                      value={editData.cena || ''}
                      onChange={aggiorna}
                      className={styles.editInput}
                      placeholder="Cosa si mangia a cena?"
                    />
                  </div>

                  <div className={styles.editCampo}>
                    <label className={styles.editLabel}>💬 Note</label>
                    <input
                      name="note"
                      value={editData.note || ''}
                      onChange={aggiorna}
                      className={styles.editInput}
                      placeholder="Note..."
                    />
                  </div>
                </div>
              </div>
            ) : (
              <button
                className={styles.giornoCard}
                onClick={() => apriEdit(idx)}
              >
                <div className={styles.giornoLabel}>
                  <span className={styles.giornoEmoji}>{giornoEmoji[g.giorno]}</span>
                  <span className={styles.giornoNome}>{g.giorno}</span>
                </div>

                <div className={styles.pasti}>
                  <div className={styles.pasto}>
                    <span className={styles.pastoLabel}>Pranzo</span>
                    <span className={styles.pastoValore}>
                      {g.pranzo || <em className={styles.vuoto}>—</em>}
                    </span>
                  </div>

                  <div className={styles.divisore} />

                  <div className={styles.pasto}>
                    <span className={styles.pastoLabel}>Cena</span>
                    <span className={styles.pastoValore}>
                      {g.cena || <em className={styles.vuoto}>—</em>}
                    </span>
                  </div>
                </div>

                {g.note && (
                  <span className={styles.noteTag}>💬 {g.note}</span>
                )}

                <span className={styles.editHint}>✏️</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}