const { spawn } = require('child_process')
const fs   = require('fs')
const path = require('path')
const os   = require('os')

/**
 * Execute a Python file on disk and return its stdout.
 */
function executePythonFile(filepath, ms = 10000) {
  return _runPython(filepath, ms)
}

/**
 * Execute a raw Python code string.
 * Writes it to a temp file, runs it, then deletes it.
 */
async function executePythonCode(code, label = 'temp', ms = 10000) {
  const tmpFile = path.join(os.tmpdir(), `os_sim_${label}_${Date.now()}.py`)
  fs.writeFileSync(tmpFile, code, 'utf8')
  try {
    const output = await _runPython(tmpFile, ms)
    return output
  } finally {
    try { fs.unlinkSync(tmpFile) } catch (_) {}
  }
}

function _runPython(filepath, ms) {
  return new Promise((resolve, reject) => {
    const cmd  = process.platform === 'win32' ? 'python' : 'python3'
    const proc = spawn(cmd, [filepath])
    let out = '', err = ''

    proc.stdout.on('data', d => (out += d.toString()))
    proc.stderr.on('data', d => (err += d.toString()))

    const timer = setTimeout(() => {
      proc.kill('SIGKILL')
      reject(new Error(`Process timed out after ${ms / 1000}s`))
    }, ms)

    proc.on('close', code => {
      clearTimeout(timer)
      if (code === 0) resolve(out.trim())
      else reject(new Error(err.trim() || `Process exited with code ${code}`))
    })

    proc.on('error', e => {
      clearTimeout(timer)
      reject(new Error(`Failed to start Python: ${e.message}. Make sure Python is installed.`))
    })
  })
}

module.exports = { executePythonFile, executePythonCode }
