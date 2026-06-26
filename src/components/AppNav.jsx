import React, { useState } from 'react'

const sezioni = [
  { id: 'oggi', label: 'Oggi', emoji: '☀️' },
  { id: 'attivita', label: 'Task', emoji: '📋' },
  { id: 'spesa', label: 'Spesa', emoji: '🛒' },
  { id: 'menu', label: 'Menu', emoji: '🍽️' },
  { id: 'settimana', label: 'Settimana', emoji: '🗓️' },
  { id: 'persone', label: 'Persone', emoji: '👥' },
  { id: 'bacheca', label: 'Bacheca', emoji: '💬' },
]

const mainBottom = [
  { id: 'oggi', label: 'Oggi', emoji: '☀️' },
  { id: 'attivita', label: 'Task', emoji: '📋' },
  { id: 'spesa', label: 'Spesa', emoji: '🛒' },
  { id: 'menu', label: 'Menu', emoji: '🍽️' },
]

const more = [
  { id: 'settimana', label: 'Settimana', emoji: '🗓️' },
  { id: 'persone', label: 'Persone', emoji: '👥' },
  { id: 'bacheca', label: 'Bacheca', emoji: '💬' },
]

export default function AppNav({ sezione, setSezione }) {
  const [openMore, setOpenMore] = useState(false)
  const activeMore = more.some(s => s.id === sezione)

  function go(id) {
    setSezione(id)
    setOpenMore(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <style>{`
        @media (max-width: 760px) {
          body {
            padding-bottom: 92px;
          }

          .desktop-nav-clean {
            display: none !important;
          }

          .bottom-nav-clean {
            display: flex !important;
          }
        }

        @media (min-width: 761px) {
          .bottom-nav-clean {
            display: none !important;
          }

          .desktop-nav-clean {
            display: block !important;
          }
        }

        .bottom-nav-clean button {
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>

      <section className="desktop-nav-clean" style={desktopWrap}>
        <div style={desktopGrid}>
          {sezioni.map(s => {
            const active = sezione === s.id

            return (
              <button
                key={s.id}
                type="button"
                onClick={() => go(s.id)}
                style={{
                  ...desktopButton,
                  ...(active ? desktopButtonActive : {}),
                }}
              >
                <span>{s.emoji}</span>
                <strong>{s.label}</strong>
              </button>
            )
          })}
        </div>
      </section>

      {openMore && (
        <div style={moreSheet}>
          {more.map(s => (
            <button
              key={s.id}
              type="button"
              onClick={() => go(s.id)}
              style={{
                ...moreButton,
                ...(sezione === s.id ? moreButtonActive : {}),
              }}
            >
              <span style={{ fontSize: 22 }}>{s.emoji}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>
      )}

      <nav className="bottom-nav-clean" style={bottomNav}>
        {mainBottom.map(s => {
          const active = sezione === s.id

          return (
            <button
              key={s.id}
              type="button"
              onClick={() => go(s.id)}
              style={{
                ...bottomButton,
                ...(active ? bottomButtonActive : {}),
              }}
            >
              <span style={bottomEmoji}>{s.emoji}</span>
              <span style={bottomLabel}>{s.label}</span>
            </button>
          )
        })}

        <button
          type="button"
          onClick={() => setOpenMore(v => !v)}
          style={{
            ...bottomButton,
            ...(activeMore || openMore ? bottomButtonActive : {}),
          }}
        >
          <span style={bottomEmoji}>⋯</span>
          <span style={bottomLabel}>Altro</span>
        </button>
      </nav>
    </>
  )
}

const desktopWrap = {
  background: 'rgba(255,255,255,0.72)',
  border: '1px solid rgba(120,100,80,0.12)',
  borderRadius: '26px',
  padding: '12px',
  marginBottom: '18px',
  boxShadow: '0 14px 38px rgba(80,60,40,0.07)',
}

const desktopGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
  gap: '8px',
}

const desktopButton = {
  border: '1px solid rgba(120,100,80,0.12)',
  borderRadius: '18px',
  background: 'rgba(255,250,244,0.76)',
  color: '#5f564e',
  padding: '11px 12px',
  fontWeight: 900,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '7px',
}

const desktopButtonActive = {
  background: '#8fae8b',
  color: 'white',
  borderColor: '#8fae8b',
  boxShadow: '0 10px 24px rgba(80,120,80,0.18)',
}

const bottomNav = {
  position: 'fixed',
  left: '12px',
  right: '12px',
  bottom: '12px',
  zIndex: 999,
  height: '66px',
  background: 'rgba(255,255,255,0.94)',
  border: '1px solid rgba(120,100,80,0.14)',
  borderRadius: '26px',
  boxShadow: '0 18px 60px rgba(60,45,30,0.22)',
  backdropFilter: 'blur(18px)',
  alignItems: 'center',
  justifyContent: 'space-around',
  gap: '4px',
  padding: '7px',
}

const bottomButton = {
  flex: 1,
  height: '52px',
  border: 'none',
  borderRadius: '19px',
  background: 'transparent',
  color: '#7d746b',
  fontWeight: 900,
  fontSize: '11px',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '2px',
}

const bottomButtonActive = {
  background: '#8fae8b',
  color: 'white',
  boxShadow: '0 10px 24px rgba(80,120,80,0.22)',
}

const bottomEmoji = {
  fontSize: '20px',
  lineHeight: 1,
}

const bottomLabel = {
  lineHeight: 1,
}

const moreSheet = {
  position: 'fixed',
  left: '16px',
  right: '16px',
  bottom: '88px',
  zIndex: 998,
  background: 'rgba(255,255,255,0.96)',
  border: '1px solid rgba(120,100,80,0.14)',
  borderRadius: '28px',
  boxShadow: '0 18px 60px rgba(60,45,30,0.22)',
  backdropFilter: 'blur(18px)',
  padding: '12px',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '8px',
}

const moreButton = {
  border: '1px solid rgba(120,100,80,0.12)',
  borderRadius: '20px',
  background: 'rgba(255,250,244,0.78)',
  color: '#5f564e',
  padding: '15px 16px',
  fontSize: '16px',
  fontWeight: 900,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
}

const moreButtonActive = {
  background: '#8fae8b',
  color: 'white',
  borderColor: '#8fae8b',
}
