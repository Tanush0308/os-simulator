import React from 'react'
import Card from '../shared/Card'

export default function BlockDetails({ blocks, deallocate }) {
  const td = { padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)', fontFamily: 'var(--mono)', fontSize: 12 }
  return (
    <Card title="Block Details" accentColor="var(--text3)">
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr>
              {['Block #', 'Size (KB)', 'Status', 'Process', 'Action'].map(h => (
                <th key={h} style={{ background: 'var(--bg2)', padding: '10px 14px', textAlign: 'left', fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)', borderBottom: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {blocks.map((b, i) => (
              <tr key={b.id}>
                <td style={td}>#{i}</td>
                <td style={td}>{b.size}</td>
                <td style={td}>
                  <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 11, background: b.free ? 'rgba(72,187,120,0.15)' : 'rgba(246,173,85,0.15)', color: b.free ? 'var(--green)' : 'var(--amber)' }}>
                    {b.free ? 'FREE' : 'ALLOCATED'}
                  </span>
                </td>
                <td style={td}>{b.process || '—'}</td>
                <td style={td}>
                  {!b.free && (
                    <button onClick={() => deallocate(i)} style={{ padding: '3px 10px', borderRadius: 6, background: 'rgba(252,129,129,0.15)', color: 'var(--red)', border: '1px solid rgba(252,129,129,0.3)', fontSize: 11, cursor: 'pointer', fontFamily: 'var(--sans)' }}>
                      Free
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
