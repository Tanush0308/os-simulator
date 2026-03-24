import React from 'react'
import { useDeadlock }    from '../hooks/useDeadlock'
import DeadlockConfig     from '../components/Deadlock/DeadlockConfig'
import DeadlockResult     from '../components/Deadlock/DeadlockResult'
import WaitForGraph       from '../components/Deadlock/WaitForGraph'

export default function DeadlockPage() {
  const dl = useDeadlock()
  return (
    <div style={{ animation: 'fadeUp 0.22s ease both' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>Deadlock Detection</h1>
        <p style={{ color: 'var(--text3)', fontSize: 13 }}>Resource Allocation Graph → Wait-For Graph → DFS cycle detection</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 0 }}>
        <DeadlockConfig {...dl} />
        <DeadlockResult {...dl} />
      </div>
      <WaitForGraph {...dl} />
    </div>
  )
}
