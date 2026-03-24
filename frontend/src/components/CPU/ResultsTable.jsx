import React from 'react'
import Card from '../shared/Card'
import { getColor } from '../../utils/schedulingAlgorithms'

export default function ResultsTable({ results }) {
  const avg = k => results.length ? (results.reduce((s, r) => s + r[k], 0) / results.length).toFixed(2) : '—'
  const headers = ['PID', 'Arrival', 'Burst', 'Priority', 'CT', 'TAT', 'WT']
  const tdStyle = { padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)', fontFamily: 'var(--mono)', fontSize: 12 }

  return (
    <Card title="Scheduling Results" accentColor="var(--teal)">
      {results.length ? (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr>
                {headers.map(h => (
                  <th key={h} style={{
                    background: 'var(--bg2)', padding: '10px 14px', textAlign: 'left',
                    fontSize: 10, fontWeight: 600, letterSpacing: '0.1em',
                    textTransform: 'uppercase', color: 'var(--text3)',
                    borderBottom: '1px solid var(--border)'
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={r.id} style={{ transition: 'background 0.1s' }}>
                  <td style={tdStyle}>
                    <span style={{
                      background: `${getColor(i)}22`, border: `1px solid ${getColor(i)}55`,
                      color: getColor(i), borderRadius: 5, padding: '2px 7px',
                      fontFamily: 'var(--mono)', fontSize: 11
                    }}>{r.id}</span>
                  </td>
                  <td style={tdStyle}>{r.at}</td>
                  <td style={tdStyle}>{r.bt}</td>
                  <td style={tdStyle}>{r.priority}</td>
                  <td style={{ ...tdStyle, color: 'var(--teal)' }}>{r.ct}</td>
                  <td style={{ ...tdStyle, color: 'var(--amber)' }}>{r.tat}</td>
                  <td style={{ ...tdStyle, color: 'var(--green)' }}>{r.wt}</td>
                </tr>
              ))}
              <tr style={{ background: 'rgba(99,179,237,0.07)' }}>
                <td colSpan={4} style={{ ...tdStyle, color: 'var(--accent)', fontWeight: 600 }}>Average</td>
                <td style={{ ...tdStyle, color: 'var(--accent)' }}>—</td>
                <td style={{ ...tdStyle, color: 'var(--accent)' }}>{avg('tat')}</td>
                <td style={{ ...tdStyle, color: 'var(--accent)' }}>{avg('wt')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ color: 'var(--text3)', textAlign: 'center', padding: 20, fontSize: 12 }}>
          Run simulation to see results
        </div>
      )}
    </Card>
  )
}
