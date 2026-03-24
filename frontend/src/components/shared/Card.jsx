import React from 'react'

export default function Card({ title, accentColor = 'var(--accent)', children, extra, style = {} }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 12,
      padding: 20,
      marginBottom: 16,
      ...style
    }}>
      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', marginBottom: 16
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontSize: 12, fontWeight: 600, letterSpacing: '0.08em',
          textTransform: 'uppercase', color: 'var(--text3)'
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: accentColor, display: 'inline-block'
          }} />
          {title}
        </div>
        {extra}
      </div>
      {children}
    </div>
  )
}
