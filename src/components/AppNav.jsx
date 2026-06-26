import React from 'react'

const sezioni = [
  { id: 'oggi', label: 'Oggi', emoji: '☀️', desc: 'Focus del giorno' },
  { id: 'attivita', label: 'Attività', emoji: '📋', desc: 'Tutte le cose da fare' },
  { id: 'spesa', label: 'Spesa', emoji: '🛒', desc: 'Lista condivisa' },
  { id: 'menu', label: 'Menu', emoji: '🍽️', desc: 'Pranzi e cene' },
  { id: 'settimana', label: 'Settimana', emoji: '🗓️', desc: 'Vista per giorni' },
  { id: 'persone', label: 'Persone', emoji: '👥', desc: 'Vi, Marti, Isa, Dav' },
  { id: 'bacheca', label: 'Bacheca', emoji: '💬', desc: 'Note di casa' },
]

const bottomSezioni = [
  { id: 'oggi', label: 'Oggi', emoji: '☀️' },
  { id: 'attivita', label: 'Task', emoji: '📋' },
  { id: 'spesa', label: 'Spesa', emoji: '🛒' },
  { id: 'menu', label: 'Menu', emoji: '🍽️' },
  { id: 'altro', label: 'Altro', emoji: '⋯' },
]

const altroSezioni = ['settimana', 'persone', 'bacheca']

export default function AppNav({ sezione, setSezione }) {
  const isAltroActive = altroSezioni.includes(sezione)

  function handleBottomClick(id) {
    if (id === 'altro') {
      setSezione(isAltroActive ? 'oggi' : 'settimana')
      return
    }

    setSezione(id)
  }

  return (
    <>
      <style>{`
        @media (max-width: 760px) {
          body {
            padding-bottom: 92px;
          }

          .casa-desktop-nav {
            display: none !important;
          }

          .casa-mobile-top {
            display: block !important;
          }

          .casa-bottom-nav {
            display: flex !important;
          }

          .casa-main-spacer {
            height: 10px;
          }
        }

        @media (min-width: 761px) {
          .casa-mobile-top {
            display: none !important;
          }

          .casa-bottom-nav {
            display: none !important;
          }

          .casa-desktop-nav {
            display: block !important;
          }
        }

        .casa-bottom-nav button {
          -webkit-tap-highlight-color: transparent;
        }

        .casa-mobile-card {
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>

      <section className="casa-desktop-nav" style={desktopWrapStyle}>
        <div style={desktopHeaderStyle}>
          <div>
            <p style={eyebrowStyle}>Navigazione veloce</p>
            <h2 style={desktopTitleStyle}>Casa HQ</h2>
          </div>
          <span style={desktopHintStyle}>Scegli una sezione</span>
        </div>

        <div style={desktopGridStyle}>
          {sezioni.map(s => {
            const active = sezione === s.id

            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setSezione(s.id)}
                style={{
                  ...desktopCardStyle,
                  ...(active ? activeDesktopCardStyle : {}),
                }}
              >
                <span style={desktopEmojiStyle}>{s.emoji}</span>
                <span style={desktopCardTextStyle}>
                  <strong>{s.label}</strong>
                  <small>{s.desc}</small>
                </span>
              </button>
            )
          })}
        </div>
      </section>

      <section className="casa-mobile-top" style={mobileTopStyle}>
        <div style={mobileHeaderStyle}>
          <div>
            <p style={eyebrowStyle}>Casa HQ</p>
            <h2 style={mobileTitleStyle}>
              {sezioni.find(s => s.id === sezione)?.emoji || '🏡'}{' '}
              {sezioni.find(s => s.id === sezione)?.label || 'Dashboard'}
            </h2>
          </div>
        </div>

        <div style={mobileQuickGridStyle}>
          {sezioni.map(s => {
            const active = sezione === s.id

            return (
              <button
                key={s.id}
                type="button"
                className="casa-mobile-card"
                onClick={() => setSezione(s.id)}
                style={{
                  ...mobileQuickCardStyle,
                  ...(active ? activeMobileQuickCardStyle : {}),
                }}
              >
                <span style={mobileQuickEmojiStyle}>{s.emoji}</span>
                <span>{s.label}</span>
              </button>
            )
          })}
        </div>
      </section>

      <nav className="casa-bottom-nav" style={bottomNavStyle}>
        {bottomSezioni.map(s => {
          const active = s.id === 'altro' ? isAltroActive : sezione === s.id

          return (
            <button
              key={s.id}
              type="button"
              onClick={() => handleBottomClick(s.id)}
              style={{
                ...bottomButtonStyle,
                ...(active ? activeBottomButtonStyle : {}),
              }}
            >
              <span style={bottomEmojiStyle}>{s.emoji}</span>
              <span style={bottomLabelStyle}>{s.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="casa-main-spacer" />
    </>
  )
}

const desktopWrapStyle = {
  background: 'rgba(255,255,255,0.72)',
  border: '1px solid rgba(120,100,80,0.12)',
  borderRadius: '30px',
  padding: '20px',
  marginBottom: '20px',
  boxShadow: '0 18px 50px rgba(80,60,40,0.08)',
}

const desktopHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '14px',
  marginBottom: '16px',
}

const eyebrowStyle = {
  margin: 0,
  color: '#8fae8b',
  fontSize: '12px',
  fontWeight: 900,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
}

const desktopTitleStyle = {
  margin: '5px 0 0',
  color: '#3f3a34',
  fontSize: '24px',
}

const desktopHintStyle = {
  padding: '9px 12px',
  borderRadius: '999px',
  background: '#f8efe3',
  color: '#7d746b',
  fontWeight: 800,
  fontSize: '13px',
}

const desktopGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
  gap: '10px',
}

const desktopCardStyle = {
  border: '1px solid rgba(120,100,80,0.12)',
  borderRadius: '22px',
  background: 'rgba(255,250,244,0.72)',
  padding: '14px',
  display: 'flex',
  alignItems: 'center',
  gap: '11px',
  cursor: 'pointer',
  textAlign: 'left',
  color: '#5f564e',
  boxShadow: '0 10px 24px rgba(80,60,40,0.05)',
}

const activeDesktopCardStyle = {
  background: '#8fae8b',
  color: 'white',
  borderColor: '#8fae8b',
  boxShadow: '0 16px 34px rgba(80,120,80,0.22)',
}

const desktopEmojiStyle = {
  fontSize: '24px',
}

const desktopCardTextStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
}

const mobileTopStyle = {
  background: 'rgba(255,255,255,0.78)',
  border: '1px solid rgba(120,100,80,0.12)',
  borderRadius: '28px',
  padding: '18px',
  marginBottom: '16px',
  boxShadow: '0 16px 42px rgba(80,60,40,0.08)',
}

const mobileHeaderStyle = {
  marginBottom: '14px',
}

const mobileTitleStyle = {
  margin: '5px 0 0',
  color: '#3f3a34',
  fontSize: '26px',
  lineHeight: 1.1,
}

const mobileQuickGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '9px',
}

const mobileQuickCardStyle = {
  border: '1px solid rgba(120,100,80,0.12)',
  borderRadius: '20px',
  background: 'rgba(255,250,244,0.82)',
  padding: '13px 10px',
  color: '#5f564e',
  fontWeight: 900,
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '7px',
  cursor: 'pointer',
  boxShadow: '0 9px 20px rgba(80,60,40,0.05)',
}

const activeMobileQuickCardStyle = {
  background: '#8fae8b',
  color: 'white',
  borderColor: '#8fae8b',
  boxShadow: '0 12px 26px rgba(80,120,80,0.20)',
}

const mobileQuickEmojiStyle = {
  fontSize: '18px',
}

const bottomNavStyle = {
  position: 'fixed',
  left: '12px',
  right: '12px',
  bottom: '12px',
  zIndex: 999,
  height: '68px',
  background: 'rgba(255,255,255,0.92)',
  border: '1px solid rgba(120,100,80,0.16)',
  borderRadius: '26px',
  boxShadow: '0 18px 60px rgba(60,45,30,0.22)',
  backdropFilter: 'blur(18px)',
  alignItems: 'center',
  justifyContent: 'space-around',
  gap: '4px',
  padding: '8px',
}

const bottomButtonStyle = {
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

const activeBottomButtonStyle = {
  background: '#8fae8b',
  color: 'white',
  boxShadow: '0 10px 24px rgba(80,120,80,0.22)',
}

const bottomEmojiStyle = {
  fontSize: '20px',
  lineHeight: 1,
}

const bottomLabelStyle = {
  lineHeight: 1,
}
