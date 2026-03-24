import React from 'react'
import { useDisk }    from '../hooks/useDisk'
import DiskConfig     from '../components/Disk/DiskConfig'
import DiskStats      from '../components/Disk/DiskStats'
import DiskChart      from '../components/Disk/DiskChart'

export default function DiskPage() {
  const disk = useDisk()
  return (
    <div style={{ animation: 'fadeUp 0.22s ease both' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>Disk Scheduling</h1>
        <p style={{ color: 'var(--text3)', fontSize: 13 }}>FCFS · SSTF · SCAN · C-SCAN disk head movement visualizer</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 0 }}>
        <DiskConfig {...disk} />
        <DiskStats  {...disk} />
      </div>
      <DiskChart {...disk} />
    </div>
  )
}
