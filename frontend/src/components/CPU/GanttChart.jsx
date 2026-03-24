import React from 'react'
import Card from '../shared/Card'
import { getColor, mergeTimeline } from '../../utils/schedulingAlgorithms'

export default function GanttChart({ ganttBuilt, simStep, timeline, processes }) {
  const merged = mergeTimeline(ganttBuilt)
  const colorMap = {}
  processes.forEach((p, i) => { colorMap[p.id] = getColor(i) })

  return (
    <Card title="Gantt Chart" accentColor="var(--purple)"
      extra={<span style={{ fontSize: 10, color: 'var(--text3)' }}>Step {simStep} / {timeline.length}</span>}
    >
      {merged.length ? (
        <div style={{ overflowX: 'auto', paddingBottom: 4 }}>
          <div style={{ display: 'flex', minWidth: '100%' }}>
            {merged.map((b, i) => {
              const col = colorMap[b.process] || '#888'
              const w = (b.end - b.start) * 44
              return (
                <div key={i} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  minWidth: w, height: 52, background: `${col}22`,
                  border: `1px solid ${col}66`, color: col,
                  fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 600,
                  borderRight: i < merged.length - 1 ? 'none' : undefined,
                  borderRadius: i === 0 ? '6px 0 0 6px' : i === merged.length - 1 ? '0 6px 6px 0' : 0,
                  cursor: 'default', transition: 'transform 0.15s',
                  animation: `fadeUp 0.3s ${i * 0.04}s ease both`
                }}>
                  {b.process}
                  <span style={{ fontSize: 9, opacity: 0.6 }}>{b.end - b.start}u</span>
                </div>
              )
            })}
          </div>
          <div style={{ display: 'flex', marginTop: 4 }}>
            {Array.from({ length: ganttBuilt.length + 1 }, (_, i) => (
              <div key={i} style={{ minWidth: 44, fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--text3)', paddingLeft: 4 }}>{i}</div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ color: 'var(--text3)', textAlign: 'center', padding: '24px 0', fontSize: 12 }}>
          Run simulation to see Gantt chart
        </div>
      )}
    </Card>
  )
}
