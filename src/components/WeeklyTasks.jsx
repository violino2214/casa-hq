import React from 'react'
import { getFamilyMember } from '../data/familyMembers'

const giorni = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica']

const giornoEmoji = {
  Lunedì: '🌙',
  Martedì: '🌿',
  Mercoledì: '☀️',
  Giovedì: '🌤️',
  Venerdì: '🎉',
  Sabato: '🌸',
  Domenica: '🌟',
}

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

export default function WeeklyTasks({ tasks, onToggle, onElimina }) {
  const aperte = tasks.filter(t => !t.completata)
  const completate = tasks.filter(t => t.completata)

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <div>
          <h2 style={titleStyle}>🗓️ Settimana</h2>
          <p style={subStyle}>Le attività divise per giorno, così si capisce subito cosa tocca fare.</p>
        </div>

        <div style={statsStyle}>
          <span style={statPillStyle}>📌 {aperte.length} da fare</span>
          <span style={statPillStyle}>✅ {completate.length} fatte</span>
        </div>
      </div>

      <div style={gridStyle}>
        {giorni.map(giorno => {
          const tasksGiorno = tasks.filter(t => t.giorno === giorno)
          const aperteGiorno = tasksGiorno.filter(t => !t.completata)

          return (
            <section key={giorno} style={dayColumnStyle}>
              <div style={dayHeaderStyle}>
                <div>
                  <h3 style={dayTitleStyle}>
                    {giornoEmoji[giorno]} {giorno}
                  </h3>
                  <p style={daySubStyle}>
                    {aperteGiorno.length === 0
                      ? 'Niente da fare'
                      : `${aperteGiorno.length} da fare`}
                  </p>
                </div>
              </div>

              <div style={dayListStyle}>
                {tasksGiorno.length === 0 ? (
                  <div style={emptyStyle}>🌿 Libero</div>
                ) : (
                  tasksGiorno.map(task => {
                    const membro = getFamilyMember(task.persona)

                    return (
                      <article
                        key={task.id}
                        style={{
                          ...miniCardStyle,
                          borderColor: `${membro.color}55`,
                          opacity: task.completata ? 0.55 : 1,
                        }}
                      >
                        <div style={miniTopStyle}>
                          <button
                            type="button"
                            onClick={() => onToggle(task.id)}
                            style={{
                              ...miniCheckStyle,
                              borderColor: membro.color,
                              background: task.completata ? membro.color : 'white',
                            }}
                            aria-label="Segna come fatto"
                          >
                            {task.completata ? '✓' : ''}
                          </button>

                          <div style={{ flex: 1, minWidth: 0 }}>
                            <h4
                              style={{
                                ...miniTitleStyle,
                                textDecoration: task.completata ? 'line-through' : 'none',
                              }}
                            >
                              {task.titolo}
                            </h4>

                            <div style={miniMetaStyle}>
                              <span style={miniTagStyle}>
                                {categoriaEmoji[task.categoria] || '✨'} {task.categoria}
                              </span>

                              <span
                                style={{
                                  ...miniTagStyle,
                                  background: membro.background,
                                  color: membro.color,
                                  borderColor: `${membro.color}55`,
                                }}
                              >
                                {membro.emoji} {membro.label}
                              </span>

                              <span style={miniTagStyle}>
                                {prioritaEmoji[task.priorita] || '🌿'} {task.priorita}
                              </span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => onElimina(task.id)}
                            style={deleteStyle}
                            aria-label="Elimina"
                          >
                            ×
                          </button>
                        </div>
                      </article>
                    )
                  })
                )}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}

const cardStyle = {
  background: 'rgba(255,255,255,0.84)',
  border: '1px solid rgba(120,100,80,0.14)',
  borderRadius: '30px',
  padding: '24px',
  boxShadow: '0 18px 50px rgba(80,60,40,0.10)',
}

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '16px',
  marginBottom: '22px',
  flexWrap: 'wrap',
}

const titleStyle = {
  margin: 0,
  color: '#3f3a34',
  fontSize: '28px',
}

const subStyle = {
  margin: '7px 0 0',
  color: '#7d746b',
  fontSize: '15px',
}

const statsStyle = {
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
}

const statPillStyle = {
  display: 'inline-flex',
  padding: '9px 12px',
  borderRadius: '999px',
  background: '#f8efe3',
  color: '#6b5f54',
  fontWeight: 800,
  fontSize: '13px',
  border: '1px solid rgba(120,100,80,0.12)',
}

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
  gap: '16px',
}

const dayColumnStyle = {
  background: 'rgba(248,239,227,0.52)',
  border: '1px solid rgba(120,100,80,0.12)',
  borderRadius: '24px',
  padding: '16px',
  minHeight: '180px',
}

const dayHeaderStyle = {
  marginBottom: '12px',
}

const dayTitleStyle = {
  margin: 0,
  color: '#4c453e',
  fontSize: '18px',
}

const daySubStyle = {
  margin: '4px 0 0',
  color: '#8a7d70',
  fontSize: '13px',
  fontWeight: 700,
}

const dayListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
}

const emptyStyle = {
  border: '1px dashed rgba(120,100,80,0.18)',
  borderRadius: '18px',
  padding: '18px',
  textAlign: 'center',
  color: '#9a9188',
  fontWeight: 800,
  background: 'rgba(255,255,255,0.48)',
}

const miniCardStyle = {
  background: 'rgba(255,255,255,0.8)',
  border: '1.5px solid rgba(120,100,80,0.14)',
  borderRadius: '18px',
  padding: '12px',
  boxShadow: '0 10px 24px rgba(80,60,40,0.07)',
}

const miniTopStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '10px',
}

const miniCheckStyle = {
  width: '26px',
  height: '26px',
  minWidth: '26px',
  borderRadius: '999px',
  border: '2px solid #8fae8b',
  color: 'white',
  fontWeight: 900,
  cursor: 'pointer',
  marginTop: '2px',
}

const miniTitleStyle = {
  margin: '0 0 8px',
  color: '#3f3a34',
  fontSize: '15px',
  lineHeight: 1.25,
  wordBreak: 'break-word',
}

const miniMetaStyle = {
  display: 'flex',
  gap: '6px',
  flexWrap: 'wrap',
}

const miniTagStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  padding: '5px 7px',
  borderRadius: '999px',
  border: '1px solid rgba(120,100,80,0.12)',
  background: 'rgba(255,255,255,0.76)',
  color: '#6b5f54',
  fontSize: '11px',
  fontWeight: 800,
}

const deleteStyle = {
  border: 'none',
  background: 'rgba(120,100,80,0.08)',
  color: '#8a7d70',
  width: '24px',
  height: '24px',
  minWidth: '24px',
  borderRadius: '999px',
  cursor: 'pointer',
  fontWeight: 900,
}
