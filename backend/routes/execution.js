const express = require('express')
const router  = express.Router()
const multer  = require('multer')
const path    = require('path')
const fs      = require('fs')
const { executePythonFile, executePythonCode } = require('../services/execution/runner')

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename:    (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`)
})
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => file.originalname.endsWith('.py') ? cb(null, true) : cb(new Error('Only .py files'))
})

// POST /api/execute/upload  — upload .py files, returns stored paths
router.post('/upload', upload.array('files', 20), (req, res) => {
  const files = req.files.map(f => ({
    originalName: f.originalname,
    storedName:   f.filename,
    path:         f.path
  }))
  res.json({ success: true, files })
})

// POST /api/execute/run-file  — run an already-uploaded file by path
router.post('/run-file', async (req, res) => {
  const { filepath, processId } = req.body
  try {
    const output = await executePythonFile(filepath)
    res.json({ success: true, processId, output })
  } catch (err) {
    res.json({ success: false, processId, error: err.message, output: err.message })
  }
})

// POST /api/execute/run-code  — run raw python code string sent from browser
router.post('/run-code', async (req, res) => {
  const { code, processId, filename } = req.body
  try {
    const output = await executePythonCode(code, filename || processId)
    res.json({ success: true, processId, output })
  } catch (err) {
    res.json({ success: false, processId, error: err.message, output: err.message })
  }
})

module.exports = router
