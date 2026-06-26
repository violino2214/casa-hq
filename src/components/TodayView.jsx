import React from 'react'
import { getFamilyMember } from '../data/familyMembers'

const giorni = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato']

const categoriaEmoji = {
  Spesa: '🛒',
  Casa: '🏠',
  Commissione: '🚗',
  Menu: '🍽️',
  Famiglia: '👥',
  Altro: '✨',
}

const prioritaEmoji = {
  Alta: '🔴',
  Media: '🌿',
  Bassa: '🫧',
}

export default function TodayView({ tasks, onToggle, onElimina }) {
  const giornoOggi = giorni[new Date().getDay()]

  const tasksOggi = tasks.filter(t => t.giorno === giornoOggi)
  const daFareOggi = tasksOggi.filter(t => !t.completata)
  const fatteOggi = tasksOggi.filter(t => t.completata)
  const urgenti = tasks.filter(t => t.priorita === 'Alta' && !t.completata)

  return (
    <div style={pageStyle}>
      <section style={heroStyle}>
        <div>
          <p style={eyebrowStyle}>Focus del giorno</p>
          <h2 style={titleStyle}>☀️ Oggi è {giornoOggi}</h2>
          <p style={subStyle}>
            Qui trovi solo ciò che conta adesso: cose da fare oggi e urgenze vere.
          </p>
        </div>

        <div style={summaryStyle}>
          <div style={summaryCardStyle}>
            <span style={summaryEmojiStyle}>📌</span>
            <strong>{daFareOggi.length}</strong>
            <small>da fare oggi</small>
          </div>

          <div style={summaryCardStyle}>
            <span style={summaryEmojiStyle}>🔴</span>
            <strong>{urgenti.length}</strong>
            <small>urgenti</small>
          </div>

          <div style={summaryCardStyle}>
            <span style={summaryEmojiStyle}>✅</span>
            <strong>{fatteOggi.length}</strong>
            <small>fatte oggi</small>
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <h3 style={sectionTitleStyle}>📌 Da fare oggi</h3>
          <p style={sectionSubStyle}>
            {daFareOggi.length === 0
              ? 'Giornata libera, almeno per ora.'
              : `${daFareOggi.length} cose aperte per oggi.`}
          </p>
        </div>

        <TaskList
          tasks={daFareOggi}
          empty="🌿 Nessuna attività aperta per oggi."
          onToggle={onToggle}
          onElimina={onElimina}
        />
      </section>

      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <h3 style={sectionTitleStyle}>🔴 Urgenze</h3>
          <p style={sectionSubStyle}>
            Le cose ad alta priorità, anche se non sono segnate per oggi.
          </p>
        </div>

        <TaskList
          tasks={urgenti}
          empty="😌 Nessuna urgenza."
          onToggle={onToggle}
          onElimina={onElimina}
        />
      </section>

      {fatteOggi.length > 0 && (
        <section style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <h3 style={sectionTitleStyle}>✅ Fatte oggi</h3>
            <p style={sectionSubStyle}>Piccole vittorie della giornata.</p>
          </div>

          <TaskList
            tasks={fatteOggi}
            empty=""
            onToggle={onToggle}
            onElimina={onElimina}
          />
        </section>
      )}
    </div>
  )
}

function TaskList({ tasks, empty, onToggle, onElimina }) {
  if (tasks.length === 0) {
    return <div style={emptyStyle}>{empty}</div>
  }

  return (
    <div style={listStyle}>
      {tasks.map(task => (
        <MiniTask
          key={task.id}
          task={task}
          onToggle={onToggle}
          onElimina={onElimina}
        />
      ))}
    </div>
  )
}

function MiniTask({ task, onToggle, onElimina }) {
  const membro = getFamilyMember(task.persona)

  return (
    <article
      style={{
        ...taskStyle,
        borderColor: `${membro.color}55`,
        boxShadow: `0 12px 28px ${membro.color}18`,
        opacity: task.completata ? 0.58 : 1,
      }}
    >
      <button
        type="button"
        onClick={() => onToggle(task.id)}
        style={{
          ...checkStyle,
          borderColor: membro.color,
          background: task.completata ? membro.color : 'white',
        }}
      >
        {task.completata ? '✓' : ''}
      </button>

      <div style={{ flex: 1, minWidth: 0 }}>
        <h4
          style={{
            ...taskTitleStyle,
            textDecoration: task.completata ? 'line-through' : 'none',
          }}
        >
          {task.titolo}
        </h4>

        <div style={metaStyle}>
          <span style={tagStyle}>{categoriaEmoji[task.categoria] || '✨'} {task.categoria}</span>

          <span
            style={{
              ...tagStyle,
              background: membro.background,
              color: membro.color,
              borderColor: `${membro.color}55`,
            }}
          >
            {membro.emoji} {membro.label}
          </span>

          <span style={tagStyle}>{prioritaEmoji[task.priorita] || '🌿'} {task.priorita}</span>
          <span style={tagStyle}>📅 {task.giorno}</span>
        </div>

        {task.note && <p style={noteStyle}>{task.note}</p>}
      </div>

      <button
        type="button"
        onClick={() => onElimina(task.id)}
        style={deleteStyle}
      >
        ×
      </button>
    </article>
  )
}

const pageStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
}

const heroStyle = {
  background: 'linear-gradient(135deg, rgba(255,255,255,0.88), rgba(237,244,234,0.78))',
  border: '1px solid rgba(120,100,80,0.14)',
  borderRadius: '32px',
  padding: '26px',
  boxShadow: '0 18px 50px rgba(80,60,40,0.10)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'stretch',
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

const summaryStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(92px, 1fr))',
  gap: '10px',
  flex: '1 1 320px',
}

const summaryCardStyle = {
  background: 'rgba(255,255,255,0.72)',
  border: '1px solid rgba(120,100,80,0.12)',
  borderRadius: '22px',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
  color: '#5f564e',
}

const summaryEmojiStyle = {
  fontSize: '24px',
}

const sectionStyle = {
  background: 'rgba(255,255,255,0.84)',
  border: '1px solid rgba(120,100,80,0.14)',
  borderRadius: '30px',
  padding: '22px',
  boxShadow: '0 18px 50px rgba(80,60,40,0.08)',
}

const sectionHeaderStyle = {
  marginBottom: '14px',
}

const sectionTitleStyle = {
  margin: 0,
  color: '#3f3a34',
  fontSize: '22px',
}

const sectionSubStyle = {
  margin: '6px 0 0',
  color: '#8a7d70',
  fontSize: '14px',
}

const listStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
}

const emptyStyle = {
  border: '1px dashed rgba(120,100,80,0.18)',
  borderRadius: '22px',
  padding: '22px',
  textAlign: 'center',
  color: '#9a9188',
  fontWeight: 800,
  background: 'rgba(248,239,227,0.45)',
}

const taskStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
  background: 'rgba(255,255,255,0.78)',
  border: '1.5px solid rgba(120,100,80,0.14)',
  borderRadius: '22px',
  padding: '14px',
}

const checkStyle = {
  width: '30px',
  height: '30px',
  minWidth: '30px',
  borderRadius: '999px',
  border: '2px solid #8fae8b',
  color: 'white',
  fontWeight: 900,
  cursor: 'pointer',
  marginTop: '2px',
}

const taskTitleStyle = {
  margin: '0 0 9px',
  color: '#3f3a34',
  fontSize: '17px',
  lineHeight: 1.25,
  wordBreak: 'break-word',
}

const metaStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '7px',
}

const tagStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '5px',
  padding: '6px 9px',
  borderRadius: '999px',
  border: '1px solid rgba(120,100,80,0.12)',
  background: 'rgba(255,255,255,0.72)',
  color: '#6b5f54',
  fontSize: '12px',
  fontWeight: 800,
}

const noteStyle = {
  margin: '10px 0 0',
  padding: '10px 12px',
  borderRadius: '14px',
  background: 'rgba(248,239,227,0.65)',
  color: '#6f665d',
  fontSize: '13px',
  lineHeight: 1.4,
}

const deleteStyle = {
  border: 'none',
  background: 'rgba(120,100,80,0.08)',
  color: '#8a7d70',
  width: '28px',
  height: '28px',
  minWidth: '28px',
  borderRadius: '999px',
  cursor: 'pointer',
  fontWeight: 900,
}
