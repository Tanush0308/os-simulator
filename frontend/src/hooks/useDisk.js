import { useState } from 'react'

export function useDisk() {
  const [head,       setHead]       = useState(53)
  const [requests,   setRequests]   = useState([98, 183, 37, 122, 14, 124, 65, 67])
  const [diskAlgo,   setDiskAlgo]   = useState('FCFS')
  const [diskResult, setDiskResult] = useState(null)

  const run = () => {
    const rem = [...requests]; let seek = 0, cur = head; const seq = []
    if (diskAlgo === 'FCFS') {
      rem.forEach(r => { seek += Math.abs(r - cur); cur = r; seq.push(r) })
    } else if (diskAlgo === 'SSTF') {
      while (rem.length) {
        const i = rem.reduce((b, r, i, a) => Math.abs(r - cur) < Math.abs(a[b] - cur) ? i : b, 0)
        seek += Math.abs(rem[i] - cur); cur = rem[i]; seq.push(rem.splice(i, 1)[0])
      }
    } else if (diskAlgo === 'SCAN') {
      rem.sort((a, b) => a - b)
      const right = rem.filter(r => r >= cur), left = rem.filter(r => r < cur).reverse()
      ;[...right, ...left].forEach(r => { seek += Math.abs(r - cur); cur = r; seq.push(r) })
    } else {
      rem.sort((a, b) => a - b)
      const right = rem.filter(r => r >= cur), left = rem.filter(r => r < cur)
      ;[...right, ...left].forEach(r => { seek += Math.abs(r - cur); cur = r; seq.push(r) })
    }
    setDiskResult({ sequence: seq, totalSeek: seek, algorithm: diskAlgo, head })
  }

  return { head, setHead, requests, setRequests, diskAlgo, setDiskAlgo, diskResult, run }
}
