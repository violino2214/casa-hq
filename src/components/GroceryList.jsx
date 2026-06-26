import React, { useState } from 'react'
import { DEMO_SPESA } from '../data'
import styles from './GroceryList.module.css'

export default function GroceryList() {
  const [items, setItems] = useState(DEMO_SPESA)
  const [nuovo, setNuovo] = useState('')

  const aggiungi = e => {
    e.preventDefault()
    if (!nuovo.trim()) return
    setItems(prev => [...prev, { id: Date.now(), nome: nuovo.trim(), spuntato: false }])
    setNuovo('')
  }

  const toggleItem = id =>
    setItems(prev => prev.map(i => i.id === id ? { ...i, spuntato: !i.spuntato } : i))

  const elimina = id =>
    setItems(prev => prev.filter(i => i.id !== id))

  const daFare    = items.filter(i => !i.spuntato)
  const spuntati  = items.filter(i => i.spuntato)

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.titolo}>🛒 Spesa veloce</h2>
          <p className={styles.sub}>{daFare.length} prodotti da prendere</p>
        </div>
        <div className={styles.pillCount}>
          {spuntati.length}/{items.length}
        </div>
      </div>

      {/* Barra di progresso */}
      {items.length > 0 && (
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${(spuntati.length / items.length) * 100}%` }}
          />
        </div>
      )}

      {/* Form aggiungi */}
      <form onSubmit={aggiungi} className={styles.form}>
        <input
          value={nuovo}
          onChange={e => setNuovo(e.target.value)}
          placeholder="Aggiungi prodotto..."
          className={styles.input}
        />
        <button type="submit" className={styles.btnAdd}>+</button>
      </form>

      {/* Lista da fare */}
      {daFare.length > 0 && (
        <ul className={styles.lista}>
          {daFare.map(item => (
            <li key={item.id} className={styles.item}>
              <button
                onClick={() => toggleItem(item.id)}
                className={styles.check}
                aria-label="Segna come preso"
              >
                <span className={styles.checkInner} />
              </button>
              <span className={styles.nomeItem}>{item.nome}</span>
              <button
                onClick={() => elimina(item.id)}
                className={styles.del}
                aria-label="Elimina"
              >✕</button>
            </li>
          ))}
        </ul>
      )}

      {/* Lista spuntati */}
      {spuntati.length > 0 && (
        <>
          <p className={styles.sezioneLabel}>✅ Nel carrello</p>
          <ul className={styles.lista}>
            {spuntati.map(item => (
              <li key={item.id} className={`${styles.item} ${styles.itemSpuntato}`}>
                <button
                  onClick={() => toggleItem(item.id)}
                  className={`${styles.check} ${styles.checkDone}`}
                  aria-label="Togli"
                >
                  <span className={styles.checkTick}>✓</span>
                </button>
                <span className={styles.nomeItem}>{item.nome}</span>
                <button
                  onClick={() => elimina(item.id)}
                  className={styles.del}
                >✕</button>
              </li>
            ))}
          </ul>
        </>
      )}

      {items.length === 0 && (
        <p className={styles.vuoto}>🌿 Lista vuota, ottimo lavoro!</p>
      )}
    </div>
  )
}
