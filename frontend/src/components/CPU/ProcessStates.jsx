import React from 'react'
import Card from '../shared/Card'

const Chip = ({ p, cls }) => {
  const colors = {
    ready:   { bg: 'rgba(246,173,85,0.15)',  border: 'rgba(246,173,85,0.35)',  color: 'var(--amber)' },
    running: { bg: 'rgba(72,187,120,0.15)',  border: 'rgba(72,187,120,0.35)',  color: 'var(--green)' },
    done:    { bg: 'rgba(159,122,234,0.15)', border: 'rgba(159,122,234,0.3)',  color: 'var(--purple)' },
  }
  const c = colors[cls]
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '4px 10px', borderRadius: 20, fontFamily: 'var(--mono)',
      fontSize: 11, margin: '2px', background: c.bg, border: `1px solid ${c.border}`,
      color: c.color, animation: 'chipIn 0.3s ease both',
      ...(cls === 'running' ? { animation: 'runPulse 1.2s ease-in-out infinite' } : {})
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
      {p}
    </span>
  )
}

export default function ProcessStates({ stateReady, stateRunning, stateDone }) {
  const states = [
    { label: '● Ready Queue', cls: 'ready',   items: stateReady,                  emptyText: 'empty' },
    { label: '▶ Running',     cls: 'running',  items: stateRunning ? [stateRunning] : [], emptyText: 'idle' },
    { label: '✓ Completed',   cls: 'done',     items: stateDone,                   emptyText: 'none' },
  ]
  const labelColors = { ready: 'var(--amber)', running: 'var(--green)', done: 'var(--purple)' }

  return (
    <Card title="Process State Visualization" accentColor="var(--green)">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr', alignItems: 'center', gap: 8 }}>
        {states.map((s, idx) => (
          <React.Fragment key={s.cls}>
            <div style={{
              background: 'var(--bg2)', border: '1px solid var(--border)',
              borderRadius: 10, padding: 14, minHeight: 90
            }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10, color: labelColors[s.cls] }}>
                {s.label}
              </div>
              <div>
                {s.items.length
                  ? s.items.map(p => <Chip key={p} p={p} cls={s.cls} />)
                  : <span style={{ color: 'var(--text3)', fontSize: 11 }}>{s.emptyText}</span>
                }
              </div>
            </div>
            {idx < 2 && <div style={{ color: 'var(--text3)', textAlign: 'center', fontSize: 20 }}>→</div>}
          </React.Fragment>
        ))}
      </div>
    </Card>
  )
}
