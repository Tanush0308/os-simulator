import { useState } from 'react'

export function useDeadlock() {
  const [dlState, setDlState] = useState(null)

  const detect = ({ resources, allocation, request }) => {
    const processes = Object.keys(allocation)
    const wfg = {}; const log = []
    processes.forEach(p => (wfg[p] = []))
    processes.forEach(p => {
      resources.forEach((r, ri) => {
        if ((request[p]?.[ri] ?? 0) > 0) {
          processes.forEach(q => {
            if (q !== p && (allocation[q]?.[ri] ?? 0) > 0) {
              wfg[p].push(q)
              log.push({ type: 'info', msg: `${p} waits for ${q} (resource ${r})` })
            }
          })
        }
      })
    })
    const visited = new Set(), rec = new Set()
    let cycle = null
    function dfs(n, path) {
      visited.add(n); rec.add(n)
      for (const nb of wfg[n] ?? []) {
        if (!visited.has(nb)) { if (dfs(nb, [...path, nb])) return true }
        else if (rec.has(nb)) { cycle = [...path, nb]; return true }
      }
      rec.delete(n); return false
    }
    processes.forEach(p => { if (!visited.has(p)) dfs(p, [p]) })
    if (cycle) log.push({ type: 'err', msg: `Deadlock cycle: ${cycle.join(' → ')}` })
    else       log.push({ type: 'ok',  msg: 'System is safe — no deadlock detected' })
    setDlState({ deadlock: !!cycle, cycle, wfg, log, processes })
  }

  return { dlState, detect }
}
