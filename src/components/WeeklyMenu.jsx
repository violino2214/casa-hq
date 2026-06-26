import React, { useState } from 'react'
import { DEMO_MENU } from '../data'
import styles from './WeeklyMenu.module.css'

const giornoEmoji = {
  'Lunedì':    '🌙',
  'Martedì':   '🌿',
  'Mercoledì': '☀️',
  'Giovedì':   '🌤️',
  'Venerdì':   '🎉',
  'Sabato':    '🌸',
  'Domenica':  '🌟',
}

export default function WeeklyMenu() {
  const [menu, setMenu]         = useState(DEMO_MENU)
  const [editIdx, setEditIdx]   = useState(null)
  const [editData, setEditData] = useState({})

  const apriEdit = idx => {
    setEditIdx(idx)
    setEditData({ ...menu[idx] })
  }

  const salva = () => {
    setMenu(prev => prev.map((g, i) => i === editIdx ? { ...editData } : g))
    setEditIdx(null)
  }

  const aggiorna = e =>
    setEditData(d => ({ ...d, [e.target.name]: e.target.value }))

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.titolo}>🍽️ Menu della settimana</h2>
        <p className={styles.sub}>Clicca su un giorno per modificare</p>
      </div>

      <div className={styles.lista}>
        {menu.map((g, idx) => (
          <div key={g.giorno} className={styles.riga}>
            {editIdx === idx ? (
              /* ── Modalità modifica ── */
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
                      value={editData.pranzo}
                      onChange={aggiorna}
                      className={styles.editInput}
                      placeholder="Cosa si mangia a pranzo?"
                    />
                  </div>
                  <div className={styles.editCampo}>
                    <label className={styles.editLabel}>🌙 Cena</label>
                    <input
                      name="cena"
                      value={editData.cena}
                      onChange={aggiorna}
                      className={styles.editInput}
                      placeholder="Cosa si mangia a cena?"
                    />
                  </div>
                  <div className={styles.editCampo}>
                    <label className={styles.editLabel}>💬 Note</label>
                    <input
                      name="note"
                      value={editData.note}
                      onChange={aggiorna}
                      className={styles.editInput}
                      placeholder="Note..."
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* ── Modalità visualizzazione ── */
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
