import React from 'react'
import { useMemory }    from '../hooks/useMemory'
import MemoryBlocks     from '../components/Memory/MemoryBlocks'
import AllocatePanel    from '../components/Memory/AllocatePanel'
import BlockDetails     from '../components/Memory/BlockDetails'

export default function MemoryPage() {
  const mem = useMemory()
  return (
    <div style={{ animation: 'fadeUp 0.22s ease both' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>Memory Management</h1>
        <p style={{ color: 'var(--text3)', fontSize: 13 }}>First Fit · Best Fit · Worst Fit allocation strategies</p>
      </div>
      <MemoryBlocks  {...mem} />
      <AllocatePanel {...mem} />
      <BlockDetails  {...mem} />
    </div>
  )
}
