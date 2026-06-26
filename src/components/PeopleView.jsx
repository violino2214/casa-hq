import React from 'react'
import { familyMemberList, getFamilyMember } from '../data/familyMembers'

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

export default function PeopleView({ tasks, onToggle, onElimina }) {
  const persone = familyMemberList.filter(m => m.name !== 'tutti')
  const tasksFamiglia = tasks.filter(t => t.persona === 'tutti')

  return (
    <div style={pageStyle}>
      <section style={heroStyle}>
        <div>
          <p style={eyebrowStyle}>Organizzazione famiglia</p>
          <h2 style={titleStyle}>👥 Persone</h2>
          <p style={subStyle}>
            Una vista per capire chi ha cosa da fare, senza caos e senza dover cercare tra tutte le attività.
          </p>
        </div>

        <div style={summaryStyle}>
          <strong>{tasks.filter(t => !t.completata).length}</strong>
          <span>attività aperte</span>
        </div>
      </section>

      <section style={peopleGridStyle}>
        {persone.map(persona => {
          const taskPersona = tasks.filter(t => t.persona === persona.name)
          const aperte = taskPersona.filter(t => !t.completata)
          const fatte = taskPersona.filter(t => t.completata)

          return (
            <article
              key={persona.name}
              style={{
                ...personCardStyle,
                borderColor: `${persona.color}55`,
                boxShadow: `0 18px 45px ${persona.color}20`,
              }}
            >
              <div style={personHeaderStyle}>
                <div
                  style={{
                    ...avatarStyle,
                    background: persona.background,
                    color: persona.color,
                  }}
                >
                  {persona.emoji}
                </div>

                <div>
                  <h3 style={personNameStyle}>{persona.label}</h3>
                  <p style={{ ...roleStyle, color: persona.color }}>
                    ruolo: {persona.role}
                  </p>
                </div>
              </div>

              <div style={miniStatsStyle}>
                <div style={miniStatStyle}>
                  <strong>{aperte.length}</strong>
                  <span>aperte</span>
                </div>

                <div style={miniStatStyle}>
                  <strong>{fatte.length}</strong>
                  <span>fatte</span>
                </div>
              </div>

              <div style={taskListStyle}>
                {aperte.length === 0 ? (
                  <div style={emptyStyle}>🌿 Nulla da fare per ora.</div>
                ) : (
                  aperte.map(task => (
                    <MiniTask
                      key={task.id}
                      task={task}
                      onToggle={onToggle}
                      onElimina={onElimina}
                    />
                  ))
                )}
              </div>
            </article>
          )
        })}
      </section>

      <section style={familyCardStyle}>
        <div style={familyHeaderStyle}>
          <div>
            <h3 style={familyTitleStyle}>🏡 Cose di tutti</h3>
            <p style={familySubStyle}>
              Attività generali non assegnate a una persona specifica.
            </p>
          </div>

          <span style={familyCountStyle}>
            {tasksFamiglia.filter(t => !t.completata).length} aperte
          </span>
        </div>

        {tasksFamiglia.length === 0 ? (
          <div style={emptyStyle}>Nessuna attività di famiglia.</div>
        ) : (
          <div style={familyListStyle}>
            {tasksFamiglia.map(task => (
              <MiniTask
                key={task.id}
                task={task}
                onToggle={onToggle}
                onElimina={onElimina}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

function MiniTask({ task, onToggle, onElimina }) {
  const membro = getFamilyMember(task.persona)

  return (
    <article
      style={{
        ...taskStyle,
        borderColor: `${membro.color}44`,
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
          <span style={tagStyle}>{prioritaEmoji[task.priorita] || '🌿'} {task.priorita}</span>
          <span style={tagStyle}>📅 {task.giorno}</span>
        </div>
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
  maxWidth: '580px',
  lineHeight: 1.45,
}

const summaryStyle = {
  minWidth: '110px',
  minHeight: '86px',
  borderRadius: '24px',
  background: 'rgba(255,255,255,0.72)',
  border: '1px solid rgba(120,100,80,0.12)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#6b5f54',
}

const peopleGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: '16px',
}

const personCardStyle = {
  background: 'rgba(255,255,255,0.84)',
  border: '1.5px solid rgba(120,100,80,0.14)',
  borderRadius: '30px',
  padding: '20px',
}

const personHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
  marginBottom: '16px',
}

const avatarStyle = {
  width: '56px',
  height: '56px',
  minWidth: '56px',
  borderRadius: '22px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '28px',
  fontWeight: 900,
}

const personNameStyle = {
  margin: 0,
  color: '#3f3a34',
  fontSize: '24px',
}

const roleStyle = {
  margin: '5px 0 0',
  fontSize: '12px',
  fontWeight: 900,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
}

const miniStatsStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '10px',
  marginBottom: '16px',
}

const miniStatStyle = {
  background: 'rgba(248,239,227,0.55)',
  border: '1px solid rgba(120,100,80,0.10)',
  borderRadius: '18px',
  padding: '12px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: '#6b5f54',
}

const taskListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
}

const taskStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '10px',
  background: 'rgba(255,255,255,0.78)',
  border: '1.5px solid rgba(120,100,80,0.14)',
  borderRadius: '20px',
  padding: '12px',
}

const checkStyle = {
  width: '28px',
  height: '28px',
  minWidth: '28px',
  borderRadius: '999px',
  border: '2px solid #8fae8b',
  color: 'white',
  fontWeight: 900,
  cursor: 'pointer',
  marginTop: '2px',
}

const taskTitleStyle = {
  margin: '0 0 8px',
  color: '#3f3a34',
  fontSize: '16px',
  lineHeight: 1.25,
  wordBreak: 'break-word',
}

const metaStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px',
}

const tagStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  padding: '5px 8px',
  borderRadius: '999px',
  border: '1px solid rgba(120,100,80,0.12)',
  background: 'rgba(255,255,255,0.72)',
  color: '#6b5f54',
  fontSize: '11px',
  fontWeight: 800,
}

const deleteStyle = {
  border: 'none',
  background: 'rgba(120,100,80,0.08)',
  color: '#8a7d70',
  width: '26px',
  height: '26px',
  minWidth: '26px',
  borderRadius: '999px',
  cursor: 'pointer',
  fontWeight: 900,
}

const emptyStyle = {
  border: '1px dashed rgba(120,100,80,0.18)',
  borderRadius: '20px',
  padding: '18px',
  textAlign: 'center',
  color: '#9a9188',
  fontWeight: 800,
  background: 'rgba(248,239,227,0.45)',
}

const familyCardStyle = {
  background: 'rgba(255,255,255,0.84)',
  border: '1px solid rgba(120,100,80,0.14)',
  borderRadius: '30px',
  padding: '22px',
  boxShadow: '0 18px 50px rgba(80,60,40,0.08)',
}

const familyHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '14px',
  alignItems: 'center',
  flexWrap: 'wrap',
  marginBottom: '16px',
}

const familyTitleStyle = {
  margin: 0,
  color: '#3f3a34',
  fontSize: '24px',
}

const familySubStyle = {
  margin: '6px 0 0',
  color: '#8a7d70',
  fontSize: '14px',
}

const familyCountStyle = {
  padding: '9px 12px',
  borderRadius: '999px',
  background: '#f8efe3',
  color: '#6b5f54',
  fontWeight: 900,
}

const familyListStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: '12px',
}
