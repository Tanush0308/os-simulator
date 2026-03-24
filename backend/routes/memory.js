const express = require('express')
const router  = express.Router()
const { allocate, deallocate, getState } = require('../controllers/memoryController')
router.get('/state',       getState)
router.post('/allocate',   allocate)
router.post('/deallocate', deallocate)
module.exports = router
