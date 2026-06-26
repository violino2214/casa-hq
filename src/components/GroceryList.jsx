import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import styles from './GroceryList.module.css'

function daSupabaseItem(row) {
  return {
    id: row.id,
    nome: row.name,
    spuntato: row.completed,
    creatoIl: row.created_at,
  }
}

export default function GroceryList() {
  const [items, setItems] = useState([])
  const [nuovo, setNuovo] = useState('')
  const [loading, setLoading] = useState(true)
  const [errore, setErrore] = useState('')

  useEffect(() => {
    caricaSpesa()
  }, [])

  async function caricaSpesa() {
    setLoading(true)
    setErrore('')

    const { data, error } = await supabase
      .from('groceries')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error(error)
      setErrore('Non riesco a caricare la spesa.')
      setLoading(false)
      return
    }

    setItems((data || []).map(daSupabaseItem))
    setLoading(false)
  }

  async function aggiungi(e) {
    e.preventDefault()
    if (!nuovo.trim()) return

    const nomePulito = nuovo.trim()
    setNuovo('')
    setErrore('')

    const { data, error } = await supabase
      .from('groceries')
      .insert({
        name: nomePulito,
        completed: false,
      })
      .select()
      .single()

    if (error) {
      console.error(error)
      setErrore('Non riesco ad aggiungere questo prodotto.')
      setNuovo(nomePulito)
      return
    }

    setItems(prev => [daSupabaseItem(data), ...prev])
  }

  async function toggleItem(id) {
    const item = items.find(i => i.id === id)
    if (!item) return

    const nuovoValore = !item.spuntato

    setItems(prev =>
      prev.map(i => i.id === id ? { ...i, spuntato: nuovoValore } : i)
    )

    const { error } = await supabase
      .from('groceries')
      .update({ completed: nuovoValore })
      .eq('id', id)

    if (error) {
      console.error(error)
      setErrore('Non riesco ad aggiornare questo prodotto.')
      setItems(prev =>
        prev.map(i => i.id === id ? { ...i, spuntato: item.spuntato } : i)
      )
    }
  }

  async function elimina(id) {
    const vecchiItems = items

    setItems(prev => prev.filter(i => i.id !== id))

    const { error } = await supabase
      .from('groceries')
      .delete()
      .eq('id', id)

    if (error) {
      console.error(error)
      setErrore('Non riesco a eliminare questo prodotto.')
      setItems(vecchiItems)
    }
  }

  const daFare = items.filter(i => !i.spuntato)
  const spuntati = items.filter(i => i.spuntato)

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.titolo}>🛒 Spesa veloce</h2>
          <p className={styles.sub}>
            {loading ? 'Carico la lista...' : `${daFare.length} prodotti da prendere`}
          </p>
        </div>
        <div className={styles.pillCount}>
          {spuntati.length}/{items.length}
        </div>
      </div>

      {errore && (
        <p className={styles.vuoto}>⚠️ {errore}</p>
      )}

      {items.length > 0 && (
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${(spuntati.length / items.length) * 100}%` }}
          />
        </div>
      )}

      <form onSubmit={aggiungi} className={styles.form}>
        <input
          value={nuovo}
          onChange={e => setNuovo(e.target.value)}
          placeholder="Aggiungi prodotto..."
          className={styles.input}
        />
        <button type="submit" className={styles.btnAdd}>+</button>
      </form>

      {loading ? (
        <p className={styles.vuoto}>⏳ Carico la spesa...</p>
      ) : (
        <>
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
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}

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
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}

          {items.length === 0 && (
            <p className={styles.vuoto}>🌿 Lista vuota, aggiungi il primo prodotto.</p>
          )}
        </>
      )}
    </div>
  )
}