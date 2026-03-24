const express  = require('express')
const cors     = require('cors')
const path     = require('path')

const cpuRoutes       = require('./routes/cpu')
const memoryRoutes    = require('./routes/memory')
const diskRoutes      = require('./routes/disk')
const deadlockRoutes  = require('./routes/deadlock')
const executionRoutes = require('./routes/execution')

const app  = express()
const PORT = 5000

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api/cpu',      cpuRoutes)
app.use('/api/memory',   memoryRoutes)
app.use('/api/disk',     diskRoutes)
app.use('/api/deadlock', deadlockRoutes)
app.use('/api/execute',  executionRoutes)

app.listen(PORT, () => console.log(`OS Simulator backend running → http://localhost:${PORT}`))
