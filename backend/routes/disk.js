const express = require('express')
const router  = express.Router()
const { schedule } = require('../services/disk/diskScheduler')
router.post('/schedule', (req, res) => {
  try {
    const { algorithm, head, requests, maxCylinder } = req.body
    res.json({ success: true, ...schedule(algorithm, head, requests, maxCylinder) })
  } catch (err) { res.status(500).json({ error: err.message }) }
})
module.exports = router
