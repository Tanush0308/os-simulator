import React from 'react'
import Card from '../shared/Card'

export default function DiskChart({ diskResult, head }) {
  if (!diskResult) {
    return (
      <Card title="Disk Head Movement" accentColor="var(--accent)">
        <div style={{ color: 'var(--text3)', textAlign: 'center', padding: '40px 0', fontSize: 12, background: 'var(--bg2)', borderRadius: 10 }}>
          Run scheduling to see visualization
        </div>
      </Card>
    )
  }

  const full = [head, ...diskResult.sequence]
  const W    = Math.max(600, full.length * 80)
  const H    = 160
  const MAX  = 200
  const pts  = full.map((c, i) => ({
    x: 50 + (i / (full.length - 1 || 1)) * (W - 100),
    y: 20 + (c / MAX) * (H - 40)
  }))
  const path = 'M' + pts.map(p => `${p.x},${p.y}`).join('L')

  return (
    <Card title="Disk Head Movement" accentColor="var(--accent)">
      <div style={{ overflowX: 'auto' }}>
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible', display: 'block' }}>
          <line x1={40} y1={20} x2={40} y2={H - 20} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
          <text x={8} y={24} fill="#718096" fontSize={9} fontFamily="monospace">199</text>
          <text x={14} y={H - 20} fill="#718096" fontSize={9} fontFamily="monospace">0</text>
          <path d={path} fill="none" stroke="rgba(99,179,237,0.3)" strokeWidth={1.5} strokeDasharray="4 2" />
          <path d={path} fill="none" stroke="#63b3ed" strokeWidth={2} />
          {pts.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={i === 0 ? 6 : 4}
                fill={i === 0 ? '#f6ad55' : '#63b3ed'} opacity={i === 0 ? 1 : 0.85} />
              <text x={p.x} y={p.y - 10} fill={i === 0 ? '#f6ad55' : '#a0aec0'}
                fontSize={10} fontFamily="monospace" textAnchor="middle">
                {full[i]}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </Card>
  )
}
