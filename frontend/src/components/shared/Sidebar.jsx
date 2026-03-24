import React from 'react'

const NAV = [
  { id: 'cpu',      label: 'CPU Scheduling',  badge: '4' },
  { id: 'memory',   label: 'Memory Mgmt',     badge: '3' },
  { id: 'deadlock', label: 'Deadlock Detect', badge: '—' },
  { id: 'disk',     label: 'Disk Scheduling', badge: '5' },
]

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <div style={{
      gridColumn: '1',
      gridRow: '2',
      background: 'var(--bg2)',
      borderRight: '1px solid var(--border)',
      padding: '16px 0',
      overflowY: 'auto'
    }}>
      <div style={{ padding: '0 12px', marginBottom: 24 }}>
        <div style={{
          fontSize: 10, fontWeight: 600, letterSpacing: '0.12em',
          color: 'var(--text3)', textTransform: 'uppercase',
          padding: '0 8px', marginBottom: 6
        }}>
          Modules
        </div>

        {NAV.map(n => (
          <div
            key={n.id}
            onClick={() => onNavigate(n.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 12px', borderRadius: 8, cursor: 'pointer',
              fontSize: 13, marginBottom: 2, position: 'relative',
              color: activePage === n.id ? 'var(--accent)' : 'var(--text2)',
              background: activePage === n.id ? 'rgba(99,179,237,0.12)' : 'transparent',
              fontWeight: activePage === n.id ? 500 : 400,
              transition: 'all 0.15s'
            }}
          >
            {activePage === n.id && (
              <span style={{
                position: 'absolute', left: 0, top: '50%',
                transform: 'translateY(-50%)',
                width: 3, height: 18,
                background: 'var(--accent)',
                borderRadius: '0 3px 3px 0'
              }} />
            )}
            {n.label}
            <span style={{
              marginLeft: 'auto',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 10, padding: '1px 7px',
              fontSize: 10, fontFamily: 'var(--mono)',
              color: activePage === n.id ? 'var(--accent)' : 'var(--text3)'
            }}>
              {n.badge}
            </span>
          </div>
        ))}
      </div>

      <div style={{ padding: '0 12px' }}>
        <div style={{
          fontSize: 10, fontWeight: 600, letterSpacing: '0.12em',
          color: 'var(--text3)', textTransform: 'uppercase',
          padding: '0 8px', marginBottom: 6
        }}>
          System
        </div>
        <div style={{
          padding: '9px 12px', borderRadius: 8, cursor: 'pointer',
          fontSize: 13, color: 'var(--text2)'
        }}
          onClick={() => window.location.reload()}
        >
          ↺ Reset All
        </div>
      </div>
    </div>
  )
}
