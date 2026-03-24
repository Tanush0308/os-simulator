import React from 'react'
import Card from '../shared/Card'

export default function DiskStats({ diskResult, requests }) {
  return (
    <Card title="Statistics" accentColor="var(--amber)">
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        {[['Total Seek Time', diskResult?.totalSeek ?? '—', 'var(--amber)'], ['Requests', requests.length, 'var(--accent)']].map(([l, v, c]) => (
          <div key={l} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 16px', flex: 1 }}>
            <div style={{ fontSize: 10, color: 'var(--text3)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>{l}</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 22, fontWeight: 600, color: c }}>{v}</div>
          </div>
        ))}
      </div>
      {diskResult && (
        <>
          <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 8, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Seek Sequence</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {[diskResult.head, ...diskResult.sequence].map((v, i) => (
              <span key={i} style={{ background: i === 0 ? 'rgba(246,173,85,0.2)' : 'rgba(99,179,237,0.1)', border: `1px solid ${i === 0 ? 'rgba(246,173,85,0.4)' : 'rgba(99,179,237,0.2)'}`, borderRadius: 4, padding: '2px 8px', fontSize: 11, fontFamily: 'var(--mono)', color: i === 0 ? 'var(--amber)' : 'var(--text2)' }}>
                {v}
              </span>
            ))}
          </div>
        </>
      )}
    </Card>
  )
}
