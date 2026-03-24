const express = require('express')
const router  = express.Router()
const { detectDeadlock } = require('../services/deadlock/detector')
router.post('/detect', (req, res) => {
  try {
    const { processes, resources, allocation, request } = req.body
    res.json({ success: true, ...detectDeadlock(processes, resources, allocation, request) })
  } catch (err) { res.status(500).json({ error: err.message }) }
})
module.exports = router
