import { useState } from 'react'

const INIT_BLOCKS = [
  { id: 0, size: 100, free: true, process: null },
  { id: 1, size: 200, free: true, process: null },
  { id: 2, size: 50,  free: true, process: null },
  { id: 3, size: 300, free: true, process: null },
  { id: 4, size: 150, free: true, process: null },
  { id: 5, size: 80,  free: true, process: null },
]

function merge(blocks) {
  const b = [...blocks]
  for (let i = 0; i < b.length - 1; i++) {
    if (b[i].free && b[i + 1].free) { b[i].size += b[i + 1].size; b.splice(i + 1, 1); i-- }
  }
  return b
}

export function useMemory() {
  const [blocks,  setBlocks]  = useState(JSON.parse(JSON.stringify(INIT_BLOCKS)))
  const [memAlgo, setMemAlgo] = useState('FirstFit')
  const [message, setMessage] = useState(null)

  const allocate = (processName, size) => {
    const b = JSON.parse(JSON.stringify(blocks))
    let chosen = -1
    if (memAlgo === 'FirstFit') {
      chosen = b.findIndex(x => x.free && x.size >= size)
    } else if (memAlgo === 'BestFit') {
      let best = Infinity
      b.forEach((x, i) => { if (x.free && x.size >= size && x.size - size < best) { best = x.size - size; chosen = i } })
    } else {
      let worst = -1
      b.forEach((x, i) => { if (x.free && x.size >= size && x.size > worst) { worst = x.size; chosen = i } })
    }
    if (chosen === -1) { setMessage({ type: 'err', text: `No block found for ${size}KB` }); return }
    if (b[chosen].size > size + 10) {
      b.splice(chosen + 1, 0, { id: b.length, size: b[chosen].size - size, free: true, process: null })
      b[chosen].size = size
    }
    b[chosen].free = false; b[chosen].process = processName
    setBlocks(b)
    setMessage({ type: 'ok', text: `✓ Allocated ${size}KB → ${processName} via ${memAlgo}` })
  }

  const deallocate = idx => {
    const b = JSON.parse(JSON.stringify(blocks))
    b[idx].free = true; b[idx].process = null
    setBlocks(merge(b))
    setMessage({ type: 'ok', text: `✓ Block #${idx} freed` })
  }

  const resetMemory = () => { setBlocks(JSON.parse(JSON.stringify(INIT_BLOCKS))); setMessage(null) }

  return { blocks, memAlgo, setMemAlgo, message, allocate, deallocate, resetMemory }
}
