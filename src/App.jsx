import React, { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import StatsCards  from './components/StatsCards'
import FilterBar   from './components/FilterBar'
import TaskForm    from './components/TaskForm'
import TaskCard    from './components/TaskCard'
import GroceryList from './components/GroceryList'
import WeeklyMenu  from './components/WeeklyMenu'
import styles      from './App.module.css'

// ─── Helpers ──────────────────────────────────────────────────
function filtraTasks(tasks, filtro) {
  switch (filtro) {
    case 'tutte':      return tasks.filter(t => !t.completata)
    case 'urgenti':    return tasks.filter(t => t.priorita === 'Alta' && !t.completata)
    case 'completate': return tasks.filter(t => t.completata)
    default:           return tasks.filter(t => t.categoria === filtro && !t.completata)
  }
}

function daSupabaseTask(row) {
  return {
    id: row.id,
    titolo: row.title,
    categoria: row.category,
    persona: row.assigned_to,
    priorita: row.priority,
    giorno: row.day,
    note: row.notes || '',
    completata: row.completed,
    creatoIl: row.created_at,
  }
}

function aSupabaseTask(task) {
  return {
    title: task.titolo,
    category: task.categoria,
    assigned_to: task.persona,
    priority: task.priorita,
    day: task.giorno,
    notes: task.note || '',
    completed: task.completata || false,
  }
}

// ─── App ──────────────────────────────────────────────────────
export default function App() {
  const [tasks, setTasks]       = useState([])
  const [filtro, setFiltro]     = useState('tutte')
  const [sezione, setSezione]   = useState('attivita') // 'attivita' | 'spesa' | 'menu'
  const [loading, setLoading]   = useState(true)
  const [errore, setErrore]     = useState('')

  useEffect(() => {
    caricaTasks()
  }, [])

  async function caricaTasks() {
    setLoading(true)
    setErrore('')

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error(error)
      setErrore('Non riesco a caricare le attività da Supabase.')
      setLoading(false)
      return
    }

    setTasks((data || []).map(daSupabaseTask))
    setLoading(false)
  }

  async function aggiungiTask(nuovaTask) {
    setErrore('')

    const { data, error } = await supabase
      .from('tasks')
      .insert(aSupabaseTask(nuovaTask))
      .select()
      .single()

    if (error) {
      console.error(error)
      setErrore('Non riesco ad aggiungere questa attività.')
      return
    }

    setTasks(prev => [daSupabaseTask(data), ...prev])
  }

  async function toggleTask(id) {
    const task = tasks.find(t => t.id === id)
    if (!task) return

    const nuovoValore = !task.completata

    setTasks(prev => prev.map(t => t.id === id ? { ...t, completata: nuovoValore } : t))

    const { error } = await supabase
      .from('tasks')
      .update({ completed: nuovoValore })
      .eq('id', id)

    if (error) {
      console.error(error)
      setErrore('Non riesco ad aggiornare questa attività.')
      setTasks(prev => prev.map(t => t.id === id ? { ...t, completata: task.completata } : t))
    }
  }

  async function eliminaTask(id) {
    const vecchieTasks = tasks

    setTasks(prev => prev.filter(t => t.id !== id))

    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)

    if (error) {
      console.error(error)
      setErrore('Non riesco a eliminare questa attività.')
      setTasks(vecchieTasks)
    }
  }

  const taskFiltrate = filtraTasks(tasks, filtro)

  return (
    <div className={styles.app}>
      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div>
            <h1 className={styles.logo}>🏡 Casa HQ</h1>
            <p className={styles.sub}>La dashboard della nostra famiglia</p>
          </div>
          <div className={styles.dataBadge}>
            {new Date().toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' })}
          </div>
        </div>
      </header>

      <main className={styles.main}>
        {/* ── Stats ── */}
        <section className={styles.section}>
          <StatsCards tasks={tasks} />
        </section>

        {errore && (
          <section className={styles.section}>
            <div className={styles.vuoto}>
              <span className={styles.vuotoEmoji}>⚠️</span>
              <p>{errore}</p>
            </div>
          </section>
        )}

        {/* ── Nav sezioni ── */}
        <nav className={styles.navSezioni}>
          {[
            { id: 'attivita', label: '📋 Attività' },
            { id: 'spesa',    label: '🛒 Spesa'    },
            { id: 'menu',     label: '🍽️ Menu'     },
          ].map(s => (
            <button
              key={s.id}
              onClick={() => setSezione(s.id)}
              className={`${styles.navBtn} ${sezione === s.id ? styles.navBtnAttivo : ''}`}
            >
              {s.label}
            </button>
          ))}
        </nav>

        {/* ── Sezione Attività ── */}
        {sezione === 'attivita' && (
          <div className={styles.sezioneAttivita}>
            <TaskForm onAggiungi={aggiungiTask} />

            <FilterBar filtroAttivo={filtro} onFiltro={setFiltro} />

            {loading ? (
              <div className={styles.vuoto}>
                <span className={styles.vuotoEmoji}>⏳</span>
                <p>Carico le attività...</p>
              </div>
            ) : taskFiltrate.length === 0 ? (
              <div className={styles.vuoto}>
                <span className={styles.vuotoEmoji}>🌿</span>
                <p>Nessuna attività qui!</p>
                <p className={styles.vuotoSub}>
                  {filtro === 'completate'
                    ? 'Ancora niente completato. Dai, si può fare! 💪'
                    : filtro === 'urgenti'
                    ? 'Nessuna urgenza — respira! 😌'
                    : 'Aggiungi una nuova attività sopra.'}
                </p>
              </div>
            ) : (
              <div className={styles.taskGrid}>
                {taskFiltrate.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggle={toggleTask}
                    onElimina={eliminaTask}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Sezione Spesa ── */}
        {sezione === 'spesa' && (
          <section className={styles.section}>
            <GroceryList />
          </section>
        )}

        {/* ── Sezione Menu ── */}
        {sezione === 'menu' && (
          <section className={styles.section}>
            <WeeklyMenu />
          </section>
        )}
      </main>

      <footer className={styles.footer}>
        <p>🏡 Casa HQ · fatto con amore per la famiglia</p>
      </footer>
    </div>
  )
}