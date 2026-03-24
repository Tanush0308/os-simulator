import React from 'react'
import { useCPU }    from '../hooks/useCPU'
import ControlPanel  from '../components/CPU/ControlPanel'
import ProcessTable  from '../components/CPU/ProcessTable'
import ProcessStates from '../components/CPU/ProcessStates'
import GanttChart    from '../components/CPU/GanttChart'
import ResultsTable  from '../components/CPU/ResultsTable'
import ConsoleOutput from '../components/CPU/ConsoleOutput'

export default function CPUPage() {
  const cpu = useCPU()
  return (
    <div style={{ animation: 'fadeUp 0.22s ease both' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>
          CPU Scheduling Simulator
        </h1>
        <p style={{ color: 'var(--text3)', fontSize: 13 }}>
          Upload .py files → each becomes a process → watch them execute with real Python output in the console
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 0 }}>
        <ControlPanel {...cpu} />
        <ProcessTable {...cpu} />
      </div>

      <ProcessStates {...cpu} />
      <GanttChart    {...cpu} />
      <ResultsTable  {...cpu} />
      <ConsoleOutput {...cpu} />
    </div>
  )
}
