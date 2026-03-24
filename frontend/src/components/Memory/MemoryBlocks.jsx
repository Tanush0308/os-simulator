import React from 'react'
import Card from '../shared/Card'
import { getColor } from '../../utils/schedulingAlgorithms'

export default function MemoryBlocks({ blocks }) {
  const total = blocks.reduce((s, b) => s + b.size, 0)
  const used  = blocks.filter(b => !b.free).reduce((s, b) => s + b.size, 0)
  const frag  = blocks.filter(b => b.free).length
  let allocIdx = 0

  return (
    <Card title="Memory Blocks" accentColor="var(--accent)">
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
        {[['Total', `${total}KB`, 'var(--accent)'], ['Used', `${used}KB`, 'var(--amber)'], ['Free', `${total - used}KB`, 'var(--green)'], ['Fragments', frag, 'var(--purple)']].map(([l, v, c]) => (
          <div key={l} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 16px', flex: 1, minWidth: 80 }}>
            <div style={{ fontSize: 10, color: 'var(--text3)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>{l}</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 20, fontWeight: 600, color: c }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap', marginBottom: 12 }}>
        {blocks.map((b, i) => {
          const w = Math.max(50, Math.round((b.size / total) * 580))
          const col = b.free ? null : getColor(allocIdx++)
          return (
            <div key={b.id} title={`${b.free ? 'Free' : b.process} | ${b.size}KB`} style={{
              width: w, height: 60, borderRadius: 5, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--mono)', fontSize: 9, fontWeight: 600,
              border: '1px solid', cursor: 'default',
              background: b.free ? 'rgba(255,255,255,0.04)' : `${col}22`,
              borderColor: b.free ? 'var(--border)' : `${col}55`,
              color: b.free ? 'var(--text3)' : col,
              transition: 'all 0.3s'
            }}>
              <span>{b.free ? 'FREE' : b.process}</span>
              <span style={{ fontSize: 8, opacity: 0.7 }}>{b.size}KB</span>
            </div>
          )
        })}
      </div>
      <div style={{ height: 14, borderRadius: 4, overflow: 'hidden', background: 'var(--bg2)' }}>
        <div style={{ height: '100%', width: `${(used / total * 100).toFixed(1)}%`, background: 'linear-gradient(90deg, var(--accent2), var(--teal))', borderRadius: 4, transition: 'width 0.5s' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text3)', marginTop: 4 }}>
        <span>0KB</span><span>{total}KB</span>
      </div>
    </Card>
  )
}
