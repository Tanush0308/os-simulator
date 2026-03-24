const BASE = 'http://localhost:5000/api'

const post = (url, body) =>
  fetch(`${BASE}${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }).then(r => r.json())

export const scheduleProcesses = (algorithm, processes, quantum) =>
  post('/cpu/schedule', { algorithm, processes, quantum })

export const allocateMemory    = (algorithm, processName, size) =>
  post('/memory/allocate', { algorithm, processName, size })

export const deallocateMemory  = processName =>
  post('/memory/deallocate', { processName })

export const detectDeadlockAPI = payload =>
  post('/deadlock/detect', payload)

export const scheduleDisk      = (algorithm, head, requests) =>
  post('/disk/schedule', { algorithm, head, requests })

/**
 * Run a Python code string on the backend.
 * Returns { success, processId, output }
 */
export const runPythonCode = (code, processId, filename) =>
  post('/execute/run-code', { code, processId, filename })

/**
 * Upload .py files to backend storage.
 */
export const uploadFiles = files => {
  const form = new FormData()
  files.forEach(f => form.append('files', f))
  return fetch(`${BASE}/execute/upload`, { method: 'POST', body: form }).then(r => r.json())
}
