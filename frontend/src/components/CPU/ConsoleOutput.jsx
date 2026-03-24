import React, { useEffect, useRef } from 'react'
import Card from '../shared/Card'

const TYPE_COLORS = {
  info:    'var(--accent)',
  success: 'var(--green)',
  warn:    'var(--amber)',
  error:   'var(--red)',
  output:  '#a8f0a8',
  muted:   'var(--text3)',
}

// Give each PID a distinct prefix colour
const PID_COLORS = ['#63b3ed', '#48bb78', '#f6ad55', '#9f7aea', '#fc8181', '#4fd1c5', '#f687b3', '#68d391']
const pidColor = prefix => {
  const match = prefix?.match(/P(\d+)/)
  if (!match) return 'var(--text3)'
  return PID_COLORS[(parseInt(match[1]) - 1) % PID_COLORS.length]
}

export default function ConsoleOutput({ consoleLines }) {
  const ref = useRef()
  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight
  }, [consoleLines])

  return (
    <Card title="Execution Console" accentColor="var(--text3)">
      <div style={{ marginBottom: 8, fontSize: 11, color: 'var(--text3)', display: 'flex', gap: 16 }}>
        <span>🟢 output &nbsp; 🔵 info &nbsp; 🟡 system &nbsp; 🔴 error</span>
        <span style={{ marginLeft: 'auto' }}>{consoleLines.length} lines</span>
      </div>

      <div ref={ref} style={{
        background: '#050810',
        border: '1px solid var(--border)',
        borderRadius: 10,
        padding: '14px 16px',
        fontFamily: 'var(--mono)',
        fontSize: 12,
        minHeight: 160,
        maxHeight: 320,
        overflowY: 'auto',
        lineHeight: 1.75
      }}>
        {consoleLines.length === 0 ? (
          <div style={{ color: 'var(--text3)' }}>
            &gt; OS Simulator ready.<br />
            &gt; Upload .py files and click Run to execute them as processes.
          </div>
        ) : (
          consoleLines.map((l, i) => {
            const isProcessLine = l.prefix && l.prefix.match(/\[P\d+\]/)
            const prefixCol = isProcessLine ? pidColor(l.prefix) : '#555e6e'
            const textCol   = TYPE_COLORS[l.type] || 'var(--text2)'

            return (
              <div key={i} style={{
                display: 'flex',
                gap: 8,
                marginBottom: 1,
                // Separator line before each process execution block
                ...(l.text.startsWith('──') ? {
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  marginTop: 6, paddingTop: 6
                } : {})
              }}>
                {/* Prefix badge */}
                <span style={{
                  color: prefixCol,
                  flexShrink: 0,
                  minWidth: 52,
                  fontWeight: 600,
                  fontSize: 11
                }}>
                  {l.prefix || '>'}
                </span>
                {/* Message */}
                <span style={{ color: textCol, wordBreak: 'break-all' }}>
                  {l.text}
                </span>
              </div>
            )
          })
        )}
      </div>
    </Card>
  )
}
