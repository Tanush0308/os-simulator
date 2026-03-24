import React from 'react'
import Card from '../shared/Card'

export default function WaitForGraph({ dlState }) {
  if (!dlState) {
    return (
      <Card title="Wait-For Graph" accentColor="var(--purple)">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200, color: 'var(--text3)', fontSize: 12, background: 'var(--bg2)', borderRadius: 10 }}>
          Graph will appear after detection
        </div>
      </Card>
    )
  }

  const { wfg, processes, cycle } = dlState
  const n = processes.length
  const cx = 300, cy = 130, r = 90
  const cycleSet = new Set(cycle || [])
  const pos = {}
  processes.forEach((p, i) => {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2
    pos[p] = { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
  })

  return (
    <Card title="Wait-For Graph" accentColor="var(--purple)">
      <div style={{ background: 'var(--bg2)', borderRadius: 10, overflow: 'hidden' }}>
        <svg width="100%" viewBox="0 0 600 280">
          <defs>
            <marker id="wfg-arr" markerWidth="6" markerHeight="6" refX="26" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#4299e1" />
            </marker>
            <marker id="wfg-arr-red" markerWidth="6" markerHeight="6" refX="26" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#fc8181" />
            </marker>
          </defs>
          {processes.map(p => (wfg[p] || []).map(q => {
            const inCycle = cycleSet.has(p) && cycleSet.has(q)
            return (
              <line key={`${p}-${q}`}
                x1={pos[p].x} y1={pos[p].y} x2={pos[q].x} y2={pos[q].y}
                stroke={inCycle ? '#fc8181' : '#4299e1'}
                strokeWidth={inCycle ? 2 : 1} strokeOpacity={0.8}
                markerEnd={`url(#wfg-arr${inCycle ? '-red' : ''})`}
              />
            )
          })).flat()}
          {processes.map(p => (
            <g key={p}>
              <circle cx={pos[p].x} cy={pos[p].y} r={22}
                fill={cycleSet.has(p) ? 'rgba(252,129,129,0.2)' : 'rgba(99,179,237,0.15)'}
                stroke={cycleSet.has(p) ? '#fc8181' : '#4299e1'}
                strokeWidth={cycleSet.has(p) ? 2 : 1}
              />
              <text x={pos[p].x} y={pos[p].y} fill={cycleSet.has(p) ? '#fc8181' : '#63b3ed'}
                fontFamily="monospace" fontSize={12} fontWeight="600"
                textAnchor="middle" dominantBaseline="central">{p}</text>
            </g>
          ))}
          {cycle && (
            <text x={300} y={260} fill="#fc8181" fontFamily="monospace" fontSize={11} textAnchor="middle">
              Deadlock: {cycle.join(' → ')}
            </text>
          )}
        </svg>
      </div>
    </Card>
  )
}
