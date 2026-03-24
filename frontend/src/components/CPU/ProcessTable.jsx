import React from 'react'
import Card from '../shared/Card'
import { getColor } from '../../utils/schedulingAlgorithms'

export default function ProcessTable({ processes, addProcess, removeProcess, updateProcess }) {
  return (
    <Card title="Process Configuration" accentColor="var(--amber)"
      extra={
        <button onClick={addProcess} style={{
          padding: '4px 10px', borderRadius: 6, background: 'transparent',
          border: '1px solid var(--border2)', color: 'var(--text2)',
          fontSize: 11, cursor: 'pointer', fontFamily: 'var(--sans)'
        }}>+ Add Process</button>
      }
    >
      <div style={{
        display: 'grid', gridTemplateColumns: '40px 1fr 56px 56px 56px 28px',
        gap: 6, fontSize: 10, color: 'var(--text3)', fontWeight: 600,
        letterSpacing: '0.05em', textTransform: 'uppercase', padding: '0 4px', marginBottom: 8
      }}>
        <div>PID</div><div>File</div><div>AT</div><div>BT</div><div>Pri</div><div />
      </div>

      {processes.map((p, i) => (
        <div key={p.id} style={{
          display: 'grid', gridTemplateColumns: '40px 1fr 56px 56px 56px 28px',
          gap: 6, alignItems: 'center', padding: '5px 4px', borderRadius: 6
        }}>
          <span style={{
            background: `${getColor(i)}22`, border: `1px solid ${getColor(i)}55`,
            color: getColor(i), borderRadius: 5, padding: '2px 6px',
            fontFamily: 'var(--mono)', fontSize: 11, textAlign: 'center'
          }}>{p.id}</span>
          <span style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'var(--mono)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {p.file || p.id.toLowerCase() + '.py'}
          </span>
          {['at', 'bt', 'priority'].map(k => (
            <input key={k} type="number" value={p[k]} min={0}
              onChange={e => updateProcess(i, k, e.target.value)}
              style={{
                background: 'var(--bg2)', border: '1px solid var(--border2)',
                borderRadius: 5, padding: '4px 6px', color: 'var(--text)',
                fontSize: 11, width: '100%', fontFamily: 'var(--mono)', outline: 'none'
              }}
            />
          ))}
          <button onClick={() => removeProcess(i)} style={{
            width: 22, height: 22, borderRadius: 4, background: 'transparent',
            border: 'none', color: 'var(--text3)', cursor: 'pointer',
            fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>×</button>
        </div>
      ))}
    </Card>
  )
}
