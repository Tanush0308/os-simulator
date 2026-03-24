import React, { useRef, useState } from 'react'
import Card from '../shared/Card'

export default function ControlPanel({
  algo, setAlgo, quantum, setQuantum,
  simRunning, startSimulation, pauseSimulation, stepSimulation, resetSimulation,
  handleFileUpload, uploadedFiles, processes
}) {
  const inputRef = useRef()
  const [dragOver, setDragOver] = useState(false)

  const handleDrop = e => {
    e.preventDefault()
    setDragOver(false)
    const files = Array.from(e.dataTransfer.files).filter(f => f.name.endsWith('.py'))
    if (files.length) handleFileUpload(files)
  }

  const handleChange = e => {
    if (e.target.files.length) handleFileUpload(e.target.files)
    // reset so same files can be re-uploaded
    e.target.value = ''
  }

  const btn = (label, fn, bg, color, disabled) => (
    <button
      key={label} onClick={fn} disabled={disabled}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 500,
        cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1,
        border: '1px solid var(--border2)', background: bg || 'transparent',
        color: color || 'var(--text2)', fontFamily: 'var(--sans)', transition: 'all 0.15s'
      }}
    >{label}</button>
  )

  return (
    <Card title="Control Panel" accentColor="var(--accent)">

      {/* ── File Upload Zone ── */}
      <div style={{ marginBottom: 16 }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6
        }}>
          <label style={{ fontSize: 12, color: 'var(--text2)', fontWeight: 500 }}>
            Upload Python Files
          </label>
          <span style={{ fontSize: 11, color: 'var(--text3)' }}>
            {uploadedFiles.length > 0 ? `${uploadedFiles.length} file(s) → ${uploadedFiles.length} process(es)` : 'each file = one process'}
          </span>
        </div>

        {/* Drop zone */}
        <div
          onClick={() => inputRef.current.click()}
          onDragOver={e => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          style={{
            border: `1.5px dashed ${dragOver ? 'var(--accent)' : 'var(--border2)'}`,
            borderRadius: 10, padding: '18px 20px', textAlign: 'center', cursor: 'pointer',
            background: dragOver ? 'rgba(99,179,237,0.08)' : 'rgba(99,179,237,0.02)',
            transition: 'all 0.2s'
          }}
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            accept=".py"
            style={{ display: 'none' }}
            onChange={handleChange}
          />
          <div style={{ fontSize: 24, marginBottom: 6, opacity: dragOver ? 1 : 0.45 }}>⬆</div>
          <div style={{ fontSize: 12, color: dragOver ? 'var(--accent)' : 'var(--text2)', fontWeight: 500 }}>
            {dragOver ? 'Drop files here' : 'Click or drag & drop .py files'}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 3 }}>
            Select multiple files — they become P1, P2, P3...
          </div>
        </div>

        {/* File list */}
        {uploadedFiles.length > 0 && (
          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 6, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Loaded Processes
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {uploadedFiles.map((f, i) => {
                const proc = processes[i]
                const lines = f.code ? f.code.split('\n').filter(l => l.trim()).length : 0
                return (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    background: 'var(--bg2)', border: '1px solid var(--border)',
                    borderRadius: 7, padding: '7px 10px'
                  }}>
                    {/* PID badge */}
                    <span style={{
                      background: 'rgba(99,179,237,0.15)', border: '1px solid rgba(99,179,237,0.3)',
                      color: 'var(--accent)', borderRadius: 5, padding: '1px 7px',
                      fontFamily: 'var(--mono)', fontSize: 11, flexShrink: 0
                    }}>
                      {proc?.id || `P${i + 1}`}
                    </span>

                    {/* File icon + name */}
                    <span style={{ fontSize: 14, flexShrink: 0 }}>📄</span>
                    <span style={{
                      flex: 1, fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--text)',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                    }}>
                      {f.name}
                    </span>

                    {/* Line count */}
                    <span style={{ fontSize: 10, color: 'var(--text3)', flexShrink: 0, fontFamily: 'var(--mono)' }}>
                      {lines} lines
                    </span>

                    {/* Code ready indicator */}
                    <span style={{
                      fontSize: 10, padding: '1px 6px', borderRadius: 4,
                      background: f.code ? 'rgba(72,187,120,0.15)' : 'rgba(252,129,129,0.15)',
                      color: f.code ? 'var(--green)' : 'var(--red)',
                      border: `1px solid ${f.code ? 'rgba(72,187,120,0.3)' : 'rgba(252,129,129,0.3)'}`,
                      flexShrink: 0
                    }}>
                      {f.code ? '✓ ready' : '✗ empty'}
                    </span>
                  </div>
                )
              })}
            </div>
            <div style={{ marginTop: 8, fontSize: 11, color: 'var(--text3)', lineHeight: 1.5 }}>
              💡 Adjust AT / BT / Priority in the process table on the right, then click <strong style={{ color: 'var(--text2)' }}>Run</strong>
            </div>
          </div>
        )}
      </div>

      {/* ── Algorithm + Quantum ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
        <div>
          <label style={{ display: 'block', fontSize: 12, color: 'var(--text2)', marginBottom: 5 }}>Algorithm</label>
          <select value={algo} onChange={e => setAlgo(e.target.value)} style={{
            width: '100%', background: 'var(--bg2)', border: '1px solid var(--border2)',
            borderRadius: 7, padding: '8px 12px', color: 'var(--text)', fontSize: 13, outline: 'none'
          }}>
            <option value="FCFS">FCFS</option>
            <option value="SJF">SJF</option>
            <option value="RR">Round Robin</option>
            <option value="Priority">Priority</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 12, color: 'var(--text2)', marginBottom: 5 }}>
            Time Quantum {algo !== 'RR' && <span style={{ opacity: 0.4 }}>(RR only)</span>}
          </label>
          <input type="number" value={quantum} min={1} max={20} disabled={algo !== 'RR'}
            onChange={e => setQuantum(parseInt(e.target.value) || 2)}
            style={{
              width: '100%', background: 'var(--bg2)', border: '1px solid var(--border2)',
              borderRadius: 7, padding: '8px 12px', color: 'var(--text)', fontSize: 13, outline: 'none',
              opacity: algo !== 'RR' ? 0.4 : 1
            }}
          />
        </div>
      </div>

      {/* ── Action buttons ── */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {btn('▶ Run', startSimulation, 'var(--accent2)', '#fff', simRunning)}
        {btn('⏭ Step', stepSimulation, null, null, false)}
        {btn('⏸ Pause', pauseSimulation, null, null, !simRunning)}
        {btn('↺ Reset', resetSimulation, 'rgba(252,129,129,0.15)', 'var(--red)', false)}
      </div>

      {simRunning && (
        <div style={{
          marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(72,187,120,0.12)', border: '1px solid rgba(72,187,120,0.3)',
          borderRadius: 20, padding: '5px 14px', fontSize: 12, color: 'var(--green)'
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--green)', animation: 'blink 1s infinite', display: 'inline-block'
          }} />
          Simulation running...
        </div>
      )}
    </Card>
  )
}
