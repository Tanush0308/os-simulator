import React, { useState, useEffect } from 'react'

export default function Topbar() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => setTime(new Date().toTimeString().slice(0, 8))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{
      gridColumn: '1 / -1',
      gridRow: '1',
      background: 'var(--bg2)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      gap: 16,
      zIndex: 10
    }}>
      <div style={{
        fontFamily: 'var(--mono)',
        fontSize: 13,
        fontWeight: 600,
        color: 'var(--accent)',
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }}>
        <span style={{
          width: 8, height: 8, borderRadius: '50%',
          background: 'var(--green)',
          boxShadow: '0 0 8px var(--green)',
          display: 'inline-block'
        }} />
        OS-SIM / v2.4
      </div>

      <div style={{
        marginLeft: 'auto',
        display: 'flex',
        gap: 20,
        fontFamily: 'var(--mono)',
        fontSize: 11,
        color: 'var(--text3)',
        alignItems: 'center'
      }}>
        {[['Scheduler', 'green'], ['Memory', 'amber'], ['Disk', 'green']].map(([label, col]) => (
          <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{
              width: 5, height: 5, borderRadius: '50%',
              background: `var(--${col})`,
              display: 'inline-block'
            }} />
            {label}
          </span>
        ))}
        <span style={{ color: 'var(--accent)' }}>{time}</span>
      </div>
    </div>
  )
}
