import React from 'react'

export default function StatsCards({ tasks }) {
  const totale = tasks.length
  const daFare = tasks.filter(t => !t.completata).length
  const fatte = tasks.filter(t => t.completata).length
  const urgenti = tasks.filter(t => t.priorita === 'Alta' && !t.completata).length

  const stats = [
    { label: 'Totale', value: totale, emoji: '📋' },
    { label: 'Da fare', value: daFare, emoji: '⏳' },
    { label: 'Fatte', value: fatte, emoji: '✅' },
    { label: 'Urgenti', value: urgenti, emoji: '🔴' },
  ]

  return (
    <>
      <style>{`
        .stats-compact {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin-bottom: 14px;
        }

        .stats-compact-card {
          background: rgba(255,255,255,0.78);
          border: 1px solid rgba(120,100,80,0.12);
          border-radius: 22px;
          padding: 14px 12px;
          box-shadow: 0 10px 28px rgba(80,60,40,0.07);
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }

        .stats-emoji {
          width: 34px;
          height: 34px;
          min-width: 34px;
          border-radius: 14px;
          background: rgba(248,239,227,0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }

        .stats-text {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .stats-value {
          font-size: 22px;
          font-weight: 900;
          color: #3f3a34;
          line-height: 1;
        }

        .stats-label {
          margin-top: 4px;
          font-size: 11px;
          font-weight: 900;
          color: #8a7d70;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          white-space: nowrap;
        }

        @media (max-width: 760px) {
          .stats-compact {
            display: flex;
            overflow-x: auto;
            gap: 8px;
            margin-bottom: 10px;
            padding: 2px 2px 4px;
            scrollbar-width: none;
          }

          .stats-compact::-webkit-scrollbar {
            display: none;
          }

          .stats-compact-card {
            min-width: 116px;
            border-radius: 18px;
            padding: 10px 11px;
            gap: 8px;
          }

          .stats-emoji {
            width: 28px;
            height: 28px;
            min-width: 28px;
            border-radius: 12px;
            font-size: 15px;
          }

          .stats-value {
            font-size: 18px;
          }

          .stats-label {
            font-size: 10px;
          }
        }
      `}</style>

      <div className="stats-compact">
        {stats.map(stat => (
          <article key={stat.label} className="stats-compact-card">
            <div className="stats-emoji">{stat.emoji}</div>
            <div className="stats-text">
              <span className="stats-value">{stat.value}</span>
              <span className="stats-label">{stat.label}</span>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
