import React, { useState } from 'react'
import Topbar       from './components/shared/Topbar'
import Sidebar      from './components/shared/Sidebar'
import CPUPage      from './pages/CPUPage'
import MemoryPage   from './pages/MemoryPage'
import DeadlockPage from './pages/DeadlockPage'
import DiskPage     from './pages/DiskPage'

export default function App() {
  const [page, setPage] = useState('cpu')
  const pages = { cpu: CPUPage, memory: MemoryPage, deadlock: DeadlockPage, disk: DiskPage }
  const P = pages[page] ?? CPUPage

  return (
    <div style={{
      display: 'grid',
      gridTemplateRows: '48px 1fr',
      gridTemplateColumns: '220px 1fr',
      height: '100vh',
      overflow: 'hidden'
    }}>
      <Topbar />
      <Sidebar activePage={page} onNavigate={setPage} />
      <main style={{
        overflowY: 'auto',
        background: 'var(--bg3)',
        padding: '24px',
        gridColumn: '2',
        gridRow: '2'
      }}>
        <P />
      </main>
    </div>
  )
}
