import React from 'react'
import Card from '../shared/Card'

export default function DeadlockResult({ dlState }) {
  const hasDeadlock = dlState?.deadlock

  return (
    <Card title="Detection Result" accentColor={hasDeadlock ? 'var(--red)' : dlState ? 'var(--green)' : 'var(--text3)'}>
      {dlState ? (
        <>
          <div style={{
            background: hasDeadlock ? 'rgba(252,129,129,0.1)' : 'rgba(72,187,120,0.1)',
            border: `1px solid ${hasDeadlock ? 'rgba(252,129,129,0.3)' : 'rgba(72,187,120,0.3)'}`,
            borderRadius: 8, padding: 16, marginBottom: 14
          }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: hasDeadlock ? 'var(--red)' : 'var(--green)', marginBottom: 6 }}>
              {hasDeadlock ? '⚠ Deadlock Detected!' : '✓ No Deadlock'}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text2)' }}>
              {hasDeadlock
                ? <span>Cycle: <span style={{ fontFamily: 'var(--mono)', color: 'var(--red)' }}>{dlState.cycle?.join(' → ')}</span></span>
                : 'System is in a safe state'
              }
            </div>
          </div>
          <div>
            {dlState.log.map((l, i) => (
              <div key={i} style={{ fontFamily: 'var(--mono)', fontSize: 12, lineHeight: 1.8, color: l.type === 'err' ? 'var(--red)' : l.type === 'ok' ? 'var(--green)' : 'var(--text2)' }}>
                {l.msg}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div style={{ color: 'var(--text3)', textAlign: 'center', padding: '20px 0', fontSize: 12 }}>
          Configure resources and run detection
        </div>
      )}
    </Card>
  )
}
