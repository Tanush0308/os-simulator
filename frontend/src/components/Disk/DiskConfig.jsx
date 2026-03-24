import React from 'react'
import Card from '../shared/Card'

export default function DiskConfig({ head, setHead, requests, setRequests, diskAlgo, setDiskAlgo, run }) {
  const inp = { width: '100%', background: 'var(--bg2)', border: '1px solid var(--border2)', borderRadius: 7, padding: '8px 12px', color: 'var(--text)', fontSize: 13, outline: 'none', marginBottom: 12 }
  return (
    <Card title="Disk Configuration" accentColor="var(--teal)">
      <label style={{ display: 'block', fontSize: 12, color: 'var(--text2)', marginBottom: 5 }}>Initial Head Position (0–199)</label>
      <input type="number" value={head} min={0} max={199} onChange={e => setHead(parseInt(e.target.value) || 0)} style={inp} />
      <label style={{ display: 'block', fontSize: 12, color: 'var(--text2)', marginBottom: 5 }}>Request Queue (comma-separated)</label>
      <input value={requests.join(',')} onChange={e => setRequests(e.target.value.split(',').map(Number).filter(n => !isNaN(n) && n >= 0))} style={inp} />
      <label style={{ display: 'block', fontSize: 12, color: 'var(--text2)', marginBottom: 5 }}>Algorithm</label>
      <select value={diskAlgo} onChange={e => setDiskAlgo(e.target.value)} style={{ ...inp, marginBottom: 16 }}>
        <option value="FCFS">FCFS — First Come First Served</option>
        <option value="SSTF">SSTF — Shortest Seek Time First</option>
        <option value="SCAN">SCAN — Elevator</option>
        <option value="C-SCAN">C-SCAN — Circular SCAN</option>
      </select>
      <button onClick={run} style={{ padding: '9px 18px', borderRadius: 8, background: 'var(--accent2)', color: '#fff', border: 'none', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--sans)' }}>
        Run Disk Scheduling
      </button>
    </Card>
  )
}
