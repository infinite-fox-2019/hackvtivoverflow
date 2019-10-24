const router = require('express').Router()
const tagController = require('../controllers/tag')

router.get('/', tagController.find)
router.get('/:name', tagController.findByName)

module.exports = router