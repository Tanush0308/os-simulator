import React, { useState } from 'react'
import Card from '../shared/Card'

export default function DeadlockConfig({ detect }) {
  const [res,   setRes]   = useState('R1,R2,R3')
  const [alloc, setAlloc] = useState('P1:1,0,0\nP2:0,1,1\nP3:1,0,1')
  const [req,   setReq]   = useState('P1:0,1,0\nP2:1,0,0\nP3:0,0,0')

  const run = () => {
    const resources = res.split(',').map(r => r.trim())
    const allocation = {}; const request = {}
    alloc.trim().split('\n').forEach(l => { const [p, ...v] = l.split(':'); allocation[p.trim()] = v[0].split(',').map(Number) })
    req.trim().split('\n').forEach(l => { const [p, ...v] = l.split(':'); request[p.trim()] = v[0].split(',').map(Number) })
    detect({ resources, allocation, request })
  }

  const inp = { width: '100%', background: 'var(--bg2)', border: '1px solid var(--border2)', borderRadius: 7, padding: '8px 12px', color: 'var(--text)', fontSize: 13, outline: 'none', marginBottom: 14 }
  const ta  = { ...inp, fontFamily: 'var(--mono)', fontSize: 12, height: 90, resize: 'vertical' }

  return (
    <Card title="Resource Configuration" accentColor="var(--red)">
      <label style={{ display: 'block', fontSize: 12, color: 'var(--text2)', marginBottom: 5 }}>Resources (comma-separated)</label>
      <input value={res} onChange={e => setRes(e.target.value)} style={inp} />
      <label style={{ display: 'block', fontSize: 12, color: 'var(--text2)', marginBottom: 5 }}>Allocation Matrix (P:R1,R2,...)</label>
      <textarea value={alloc} onChange={e => setAlloc(e.target.value)} style={ta} />
      <label style={{ display: 'block', fontSize: 12, color: 'var(--text2)', marginBottom: 5 }}>Request Matrix (P:R1,R2,...)</label>
      <textarea value={req} onChange={e => setReq(e.target.value)} style={ta} />
      <button onClick={run} style={{ padding: '9px 18px', borderRadius: 8, background: 'var(--accent2)', color: '#fff', border: 'none', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--sans)' }}>
        Run Detection
      </button>
    </Card>
  )
}
