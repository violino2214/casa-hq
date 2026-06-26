import React, { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import StatsCards  from './components/StatsCards'
import FilterBar   from './components/FilterBar'
import MemberFilter from './components/MemberFilter'
import TaskForm    from './components/TaskForm'
import QuickActions from './components/QuickActions'
import TaskCard    from './components/TaskCard'
import GroceryList from './components/GroceryList'
import WeeklyMenu  from './components/WeeklyMenu'
import AppNav from './components/AppNav'
import WeeklyTasks from './components/WeeklyTasks'
import TodayView from './components/TodayView'
import NotesBoard from './components/NotesBoard'
import PeopleView from './components/PeopleView'
import styles      from './App.module.css'

function filtraTasks(tasks, filtro) {
  switch (filtro) {
    case 'tutte':
      return tasks.filter(t => !t.completata)
    case 'urgenti':
      return tasks.filter(t => t.priorita === 'Alta' && !t.completata)
    case 'completate':
      return tasks.filter(t => t.completata)
    default:
      return tasks.filter(t => t.categoria === filtro && !t.completata)
  }
}

function normalizzaPersona(persona) {
  const p = String(persona || '').trim().toLowerCase()

  if (['viola', 'vi'].includes(p)) return 'vi'
  if (['marti', 'martina'].includes(p)) return 'marti'
  if (['isa', 'isabella'].includes(p)) return 'isa'
  if (['dav', 'davide'].includes(p)) return 'dav'
  if (['tutti', 'famiglia', 'mamma', 'papà', 'papa', 'nonna'].includes(p)) return 'tutti'

  return p || 'tutti'
}

function filtraPerPersona(tasks, personaFiltro) {
  if (personaFiltro === 'all') return tasks

  return tasks.filter(t => {
    const personaTask = normalizzaPersona(t.persona)

    if (personaFiltro === 'tutti') {
      return personaTask === 'tutti'
    }

    return personaTask === personaFiltro || personaTask === 'tutti'
  })
}

function daSupabaseTask(row) {
  return {
    id: row.id,
    titolo: row.title,
    categoria: row.category,
    persona: normalizzaPersona(row.assigned_to),
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
    assigned_to: normalizzaPersona(task.persona),
    priority: task.priorita,
    day: task.giorno,
    notes: task.note || '',
    completed: task.completata || false,
  }
}

function LoginScreen() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [errore, setErrore]     = useState('')

  async function login(e) {
    e.preventDefault()
    setLoading(true)
    setErrore('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error(error)
      setErrore('Credenziali non corrette oppure utente non confermato.')
    }

    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      background: 'linear-gradient(135deg, #f8efe3 0%, #edf4ea 50%, #eaf2f6 100%)'
    }}>
      <form
        onSubmit={login}
        style={{
          width: '100%',
          maxWidth: '420px',
          background: 'rgba(255,255,255,0.86)',
          border: '1px solid rgba(120,100,80,0.16)',
          borderRadius: '28px',
          padding: '32px',
          boxShadow: '0 24px 70px rgba(80,60,40,0.14)',
          backdropFilter: 'blur(14px)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '26px' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>🏡</div>
          <h1 style={{ margin: 0, fontSize: '32px', color: '#3f3a34' }}>Casa HQ</h1>
          <p style={{ marginTop: '8px', color: '#7d746b' }}>
            Accesso riservato alla famiglia
          </p>
        </div>

        <label style={{ display: 'block', marginBottom: '8px', color: '#5d554d', fontWeight: 600 }}>
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="email famiglia"
          required
          style={{
            width: '100%',
            boxSizing: 'border-box',
            padding: '14px 16px',
            borderRadius: '16px',
            border: '1px solid #ddd2c6',
            marginBottom: '16px',
            fontSize: '16px',
            background: '#fffaf4'
          }}
        />

        <label style={{ display: 'block', marginBottom: '8px', color: '#5d554d', fontWeight: 600 }}>
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="password"
          required
          style={{
            width: '100%',
            boxSizing: 'border-box',
            padding: '14px 16px',
            borderRadius: '16px',
            border: '1px solid #ddd2c6',
            marginBottom: '18px',
            fontSize: '16px',
            background: '#fffaf4'
          }}
        />

        {errore && (
          <p style={{
            background: '#fff1f1',
            color: '#8a3b3b',
            padding: '12px 14px',
            borderRadius: '14px',
            fontSize: '14px',
            marginBottom: '16px'
          }}>
            ⚠️ {errore}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            border: 'none',
            borderRadius: '18px',
            padding: '15px 18px',
            fontSize: '16px',
            fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer',
            background: '#8fae8b',
            color: 'white',
            boxShadow: '0 12px 28px rgba(80,120,80,0.22)'
          }}
        >
          {loading ? 'Accesso...' : 'Accedi'}
        </button>

        <p style={{ textAlign: 'center', color: '#9a9188', fontSize: '13px', marginTop: '18px' }}>
          Solo chi ha le credenziali può vedere e modificare la dashboard.
        </p>
      </form>
    </div>
  )
}

export default function App() {
  const [session, setSession]   = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  const [tasks, setTasks]       = useState([])
  const [filtro, setFiltro]     = useState('tutte')
  const [personaFiltro, setPersonaFiltro] = useState('all')
  const [sezione, setSezione]   = useState('oggi')
  const [loading, setLoading]   = useState(true)
  const [errore, setErrore]     = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setAuthLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setAuthLoading(false)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (session) {
      caricaTasks()
    }
  }, [session])

  async function logout() {
    await supabase.auth.signOut()
    setSession(null)
    setTasks([])
  }

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

  if (authLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f8efe3',
        color: '#5d554d',
        fontSize: '18px'
      }}>
        Carico Casa HQ...
      </div>
    )
  }

  if (!session) {
    return <LoginScreen />
  }

  const taskFiltrate = filtraPerPersona(filtraTasks(tasks, filtro), personaFiltro)

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div>
            <h1 className={styles.logo}>🏡 Casa HQ</h1>
            <p className={styles.sub}>La dashboard della nostra famiglia</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <div className={styles.dataBadge}>
              {new Date().toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' })}
            </div>

            <button
              onClick={logout}
              style={{
                border: 'none',
                borderRadius: '999px',
                padding: '10px 14px',
                background: 'rgba(255,255,255,0.75)',
                color: '#6b5f54',
                cursor: 'pointer',
                fontWeight: 700,
                boxShadow: '0 8px 20px rgba(80,60,40,0.10)'
              }}
            >
              Esci
            </button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
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

        <AppNav sezione={sezione} setSezione={setSezione} />

        {sezione === 'oggi' && (
          <section className={styles.section}>
            <TodayView
              tasks={tasks}
              onToggle={toggleTask}
              onElimina={eliminaTask}
            />
          </section>
        )}

        {sezione === 'attivita' && (
          <div className={styles.sezioneAttivita}>
            <TaskForm onAggiungi={aggiungiTask} />

            <QuickActions onAggiungi={aggiungiTask} />

            <FilterBar filtroAttivo={filtro} onFiltro={setFiltro} />

            <MemberFilter personaAttiva={personaFiltro} onPersona={setPersonaFiltro} />

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

        {sezione === 'settimana' && (
          <section className={styles.section}>
            <WeeklyTasks
              tasks={tasks}
              onToggle={toggleTask}
              onElimina={eliminaTask}
            />
          </section>
        )}

        {sezione === 'persone' && (
          <section className={styles.section}>
            <PeopleView
              tasks={tasks}
              onToggle={toggleTask}
              onElimina={eliminaTask}
            />
          </section>
        )}

        {sezione === 'spesa' && (
          <section className={styles.section}>
            <GroceryList />
          </section>
        )}

        {sezione === 'bacheca' && (
          <section className={styles.section}>
            <NotesBoard />
          </section>
        )}

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
