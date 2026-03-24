const { MemoryAllocator } = require('../services/memory/allocator')
let allocator = new MemoryAllocator([100, 200, 50, 300, 150, 80])
const getState   = (req, res) => res.json({ success: true, blocks: allocator.blocks })
const allocate   = (req, res) => res.json(allocator.allocate(req.body.algorithm, req.body.processName, req.body.size))
const deallocate = (req, res) => res.json(allocator.deallocate(req.body.processName))
module.exports = { getState, allocate, deallocate }
