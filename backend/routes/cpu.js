const express = require('express')
const router  = express.Router()
const { runScheduler } = require('../services/cpu/scheduler')
router.post('/schedule', (req, res) => {
  try {
    const { algorithm, processes, quantum } = req.body
    if (!processes?.length) return res.status(400).json({ error: 'No processes provided' })
    res.json({ success: true, ...runScheduler(algorithm, processes, quantum) })
  } catch (err) { res.status(500).json({ error: err.message }) }
})
module.exports = router
