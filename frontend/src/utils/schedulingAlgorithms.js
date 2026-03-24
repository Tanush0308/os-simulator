export const COLORS = ['#63b3ed','#48bb78','#f6ad55','#9f7aea','#fc8181','#4fd1c5']
export const getColor = i => COLORS[i % COLORS.length]

export function mergeTimeline(tl) {
  const out = []
  tl.forEach(t => {
    if (out.length && out[out.length - 1].process === t.process) {
      out[out.length - 1].end++
    } else {
      out.push({ process: t.process, start: t.time, end: t.time + 1 })
    }
  })
  return out
}

export function fcfs(procs) {
  const sorted = [...procs].sort((a, b) => a.at - b.at)
  let time = 0
  const tl = []
  for (const p of sorted) {
    if (time < p.at) time = p.at
    for (let t = time; t < time + p.bt; t++) tl.push({ time: t, process: p.id })
    time += p.bt
  }
  return tl
}

export function sjf(procs) {
  let time = 0
  const tl = []
  const done = new Set()
  while (done.size < procs.length) {
    const avail = procs.filter(p => !done.has(p.id) && p.at <= time).sort((a, b) => a.bt - b.bt)
    if (!avail.length) { time++; continue }
    const p = avail[0]
    for (let t = time; t < time + p.bt; t++) tl.push({ time: t, process: p.id })
    time += p.bt
    done.add(p.id)
  }
  return tl
}

export function roundRobin(procs, quantum) {
  const rem = procs.map(p => ({ ...p, rem: p.bt }))
  let time = 0
  const tl = []
  const arrived = new Set()
  const ready = []
  rem.sort((a, b) => a.at - b.at)
  if (rem.length) { ready.push(rem.shift()); arrived.add(ready[0].id) }
  while (ready.length > 0 || rem.length > 0) {
    if (!ready.length) {
      time = rem[0].at
      ready.push(rem.shift())
      arrived.add(ready[0].id)
    }
    const p = ready.shift()
    const run = Math.min(quantum, p.rem)
    for (let t = time; t < time + run; t++) tl.push({ time: t, process: p.id })
    time += run
    p.rem -= run
    rem.filter(r => r.at <= time && !arrived.has(r.id)).forEach(r => {
      ready.push(r); arrived.add(r.id); rem.splice(rem.indexOf(r), 1)
    })
    if (p.rem > 0) ready.push(p)
  }
  return tl
}

export function priority(procs) {
  let time = 0
  const tl = []
  const done = new Set()
  while (done.size < procs.length) {
    const avail = procs.filter(p => !done.has(p.id) && p.at <= time).sort((a, b) => a.priority - b.priority)
    if (!avail.length) { time++; continue }
    const p = avail[0]
    for (let t = time; t < time + p.bt; t++) tl.push({ time: t, process: p.id })
    time += p.bt
    done.add(p.id)
  }
  return tl
}

export function buildResults(procs, tl) {
  return procs.map(p => {
    const times = tl.filter(t => t.process === p.id).map(t => t.time)
    const ct = times.length ? Math.max(...times) + 1 : 0
    const tat = ct - p.at
    const wt = tat - p.bt
    return { id: p.id, at: p.at, bt: p.bt, priority: p.priority ?? 1, ct, tat, wt }
  })
}
