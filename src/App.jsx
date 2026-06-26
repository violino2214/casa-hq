import React, { useState } from 'react'
import { DEMO_TASKS } from './data'
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

// ─── App ──────────────────────────────────────────────────────
export default function App() {
  const [tasks, setTasks]       = useState(DEMO_TASKS)
  const [filtro, setFiltro]     = useState('tutte')
  const [sezione, setSezione]   = useState('attivita') // 'attivita' | 'spesa' | 'menu'

  // CRUD
  const aggiungiTask = nuovaTask => setTasks(prev => [nuovaTask, ...prev])

  const toggleTask = id =>
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completata: !t.completata } : t))

  const eliminaTask = id =>
    setTasks(prev => prev.filter(t => t.id !== id))

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

            {taskFiltrate.length === 0 ? (
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
