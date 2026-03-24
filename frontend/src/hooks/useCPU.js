import { useState, useRef, useCallback } from 'react'
import { fcfs, sjf, roundRobin, priority, buildResults } from '../utils/schedulingAlgorithms'
import { runPythonCode } from '../services/api'

const DEFAULT_PROCESSES = [
  { id: 'P1', at: 0, bt: 6, priority: 2, file: null, code: null },
  { id: 'P2', at: 2, bt: 4, priority: 1, file: null, code: null },
  { id: 'P3', at: 4, bt: 2, priority: 3, file: null, code: null },
  { id: 'P4', at: 6, bt: 3, priority: 2, file: null, code: null },
]

// Read a File object as text string
function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload  = e => resolve(e.target.result)
    reader.onerror = () => reject(new Error(`Failed to read ${file.name}`))
    reader.readAsText(file)
  })
}

export function useCPU() {
  const [processes,      setProcesses]      = useState(DEFAULT_PROCESSES)
  const [algo,           setAlgo]           = useState('FCFS')
  const [quantum,        setQuantum]        = useState(2)
  const [timeline,       setTimeline]       = useState([])
  const [results,        setResults]        = useState([])
  const [ganttBuilt,     setGanttBuilt]     = useState([])
  const [simStep,        setSimStep]        = useState(0)
  const [simRunning,     setSimRunning]     = useState(false)
  const [stateReady,     setStateReady]     = useState([])
  const [stateRunning,   setStateRunning]   = useState(null)
  const [stateDone,      setStateDone]      = useState([])
  const [consoleLines,   setConsoleLines]   = useState([])
  const [uploadedFiles,  setUploadedFiles]  = useState([])   // [{name, code}]
  const [processOutputs, setProcessOutputs] = useState({})   // { pid: outputString }
  const intervalRef   = useRef(null)
  const executedRef   = useRef(new Set())  // track which pids already had Python run

  const addLog = (type, text, prefix = '>') =>
    setConsoleLines(prev => [...prev.slice(-99), { type, text, prefix }])

  const runLocal = useCallback(() => {
    const runners = { FCFS: fcfs, SJF: sjf, RR: p => roundRobin(p, quantum), Priority: priority }
    return (runners[algo] ?? fcfs)(processes)
  }, [processes, algo, quantum])

  // ── Upload handler: reads file content, auto-creates one process per file
  const handleFileUpload = async (fileList) => {
    const files = Array.from(fileList)
    if (!files.length) return

    addLog('info', `Reading ${files.length} file(s)...`, '[FILE]')

    // Read all files in parallel
    const loaded = await Promise.all(
      files.map(async (f, i) => {
        try {
          const code = await readFileAsText(f)
          return { name: f.name, code }
        } catch (e) {
          addLog('error', `Failed to read ${f.name}: ${e.message}`, '[FILE]')
          return { name: f.name, code: `print("Error reading ${f.name}")` }
        }
      })
    )

    setUploadedFiles(loaded)

    // Auto-create one process per file
    const newProcesses = loaded.map((f, i) => ({
      id:       `P${i + 1}`,
      at:       i * 2,
      bt:       Math.ceil(Math.random() * 5) + 2,
      priority: Math.ceil(Math.random() * 4),
      file:     f.name,
      code:     f.code,
    }))

    setProcesses(newProcesses)
    setConsoleLines([])
    setProcessOutputs({})

    addLog('success', `Loaded ${loaded.length} file(s) as processes:`, '[FILE]')
    loaded.forEach((f, i) => {
      const lines = f.code.split('\n').length
      addLog('output', `  P${i + 1} ← ${f.name} (${lines} lines)`, '[FILE]')
    })
  }

  // ── Run Python for a single process and stream output to console
  const executeProcessCode = useCallback(async (proc) => {
    if (!proc.code) return
    if (executedRef.current.has(proc.id)) return   // don't re-run
    executedRef.current.add(proc.id)

    addLog('info', `── Executing ${proc.file || proc.id + '.py'} ──`, `[${proc.id}]`)

    try {
      const result = await runPythonCode(proc.code, proc.id, proc.file || proc.id + '.py')

      if (result.success) {
        const lines = (result.output || '').split('\n').filter(l => l.trim() !== '')
        if (lines.length === 0) {
          addLog('muted', '(no output)', `[${proc.id}]`)
        } else {
          lines.forEach(line => addLog('output', line, `[${proc.id}]`))
        }
        setProcessOutputs(prev => ({ ...prev, [proc.id]: result.output }))
        addLog('success', `${proc.id} exited successfully`, `[${proc.id}]`)
      } else {
        const errLines = (result.error || result.output || 'Unknown error').split('\n')
        errLines.forEach(line => addLog('error', line, `[${proc.id}]`))
        setProcessOutputs(prev => ({ ...prev, [proc.id]: result.error || 'Error' }))
      }
    } catch (e) {
      addLog('error', `Network error — is backend running? (${e.message})`, `[${proc.id}]`)
    }
  }, [processes])

  // ── Main simulation loop
  const startSimulation = useCallback(() => {
    if (simRunning) return
    const tl  = runLocal()
    const res = buildResults(processes, tl)
    setTimeline(tl); setResults(res); setSimStep(0)
    setGanttBuilt([]); setStateReady([]); setStateRunning(null); setStateDone([])
    setSimRunning(true)
    setConsoleLines([])
    setProcessOutputs({})
    executedRef.current = new Set()

    addLog('info', `── ${algo} Simulation started (${processes.length} processes) ──`, '[SIM]')
    processes.forEach(p => {
      const label = p.file ? `${p.file}` : `${p.id}.py`
      const codeFlag = p.code ? '✓ code ready' : '✗ no code (default)'
      addLog('muted', `  ${p.id}: ${label} | AT=${p.at} BT=${p.bt} | ${codeFlag}`, '[SIM]')
    })

    let step = 0
    let done = []
    let lastRunning = null

    intervalRef.current = setInterval(() => {
      if (step >= tl.length) {
        clearInterval(intervalRef.current)
        setSimRunning(false)
        setStateRunning(null)
        addLog('success', '── Simulation complete! ──', '[SIM]')
        const avgTAT = (res.reduce((s, r) => s + r.tat, 0) / res.length).toFixed(2)
        const avgWT  = (res.reduce((s, r) => s + r.wt,  0) / res.length).toFixed(2)
        addLog('muted', `Avg TAT: ${avgTAT} | Avg WT: ${avgWT}`, '[STAT]')
        return
      }

      const cur = tl[step]
      setStateRunning(cur.process)
      setStateReady(
        processes
          .filter(p => p.at <= step && !done.includes(p.id) && p.id !== cur.process)
          .map(p => p.id)
      )

      // When a new process starts running, execute its Python code
      if (cur.process !== lastRunning) {
        lastRunning = cur.process
        const proc = processes.find(p => p.id === cur.process)
        if (proc?.code) {
          executeProcessCode(proc)
        }
      }

      // Check completions
      processes.forEach(p => {
        const last = [...tl].reverse().find(t => t.process === p.id)
        if (last?.time === step && !done.includes(p.id)) {
          done = [...done, p.id]
          setStateDone([...done])
          addLog('success', `${p.id} (${p.file || p.id + '.py'}) completed — CT=${step + 1}`, '[DONE]')
        }
      })

      setGanttBuilt(tl.slice(0, step + 1))
      setSimStep(step + 1)
      step++
    }, 400)
  }, [processes, algo, quantum, simRunning, runLocal, executeProcessCode])

  const pauseSimulation = () => {
    clearInterval(intervalRef.current)
    setSimRunning(false)
  }

  const stepSimulation = () => {
    if (!timeline.length) {
      const tl = runLocal()
      setTimeline(tl)
      setResults(buildResults(processes, tl))
      setGanttBuilt(tl.slice(0, 1))
      setSimStep(1)
      return
    }
    setSimStep(s => {
      const ns = Math.min(s + 1, timeline.length)
      setGanttBuilt(timeline.slice(0, ns))
      return ns
    })
  }

  const resetSimulation = () => {
    clearInterval(intervalRef.current)
    executedRef.current = new Set()
    setSimRunning(false); setSimStep(0); setTimeline([])
    setGanttBuilt([]); setResults([]); setStateReady([])
    setStateRunning(null); setStateDone([]); setConsoleLines([])
    setProcessOutputs({})
  }

  const addProcess = () => setProcesses(prev => [
    ...prev,
    {
      id:       `P${prev.length + 1}`,
      at:       prev.length * 2,
      bt:       Math.ceil(Math.random() * 5) + 1,
      priority: Math.ceil(Math.random() * 4),
      file:     null,
      code:     null,
    }
  ])

  const removeProcess = idx => setProcesses(prev => prev.filter((_, i) => i !== idx))

  const updateProcess = (idx, key, val) =>
    setProcesses(prev => prev.map((p, i) => i === idx ? { ...p, [key]: parseInt(val) || 0 } : p))

  return {
    processes, algo, quantum, timeline, results, ganttBuilt, simStep,
    simRunning, stateReady, stateRunning, stateDone, consoleLines,
    uploadedFiles, processOutputs,
    setAlgo, setQuantum, addProcess, removeProcess, updateProcess,
    startSimulation, pauseSimulation, stepSimulation, resetSimulation, handleFileUpload,
  }
}
