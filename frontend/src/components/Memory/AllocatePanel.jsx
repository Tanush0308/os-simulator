import React, { useState } from 'react'
import Card from '../shared/Card'

export default function AllocatePanel({ memAlgo, setMemAlgo, allocate, resetMemory, message }) {
  const [name, setName] = useState('P5')
  const [size, setSize] = useState(80)
  const inp = { background: 'var(--bg2)', border: '1px solid var(--border2)', borderRadius: 7, padding: '8px 12px', color: 'var(--text)', fontSize: 13, width: '100%', outline: 'none' }

  return (
    <Card title="Allocate Process" accentColor="var(--amber)">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, alignItems: 'end', marginBottom: 14 }}>
        <div>
          <label style={{ display: 'block', fontSize: 12, color: 'var(--text2)', marginBottom: 5 }}>Algorithm</label>
          <select value={memAlgo} onChange={e => setMemAlgo(e.target.value)} style={inp}>
            <option value="FirstFit">First Fit</option>
            <option value="BestFit">Best Fit</option>
            <option value="WorstFit">Worst Fit</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 12, color: 'var(--text2)', marginBottom: 5 }}>Process Name</label>
          <input value={name} onChange={e => setName(e.target.value)} style={inp} placeholder="e.g. P5" />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 12, color: 'var(--text2)', marginBottom: 5 }}>Size (KB)</label>
          <input type="number" value={size} onChange={e => setSize(parseInt(e.target.value) || 0)} style={inp} min={1} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => allocate(name, size)} style={{ padding: '9px 18px', borderRadius: 8, background: 'var(--accent2)', color: '#fff', border: 'none', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--sans)' }}>
          Allocate
        </button>
        <button onClick={resetMemory} style={{ padding: '9px 18px', borderRadius: 8, background: 'transparent', color: 'var(--text2)', border: '1px solid var(--border2)', fontSize: 13, cursor: 'pointer', fontFamily: 'var(--sans)' }}>
          Reset Memory
        </button>
      </div>
      {message && <div style={{ marginTop: 8, fontSize: 12, fontFamily: 'var(--mono)', color: message.type === 'ok' ? 'var(--green)' : 'var(--red)' }}>{message.text}</div>}
    </Card>
  )
}
