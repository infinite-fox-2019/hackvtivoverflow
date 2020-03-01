const router = require('express').Router()
const TagController = require('../controllers/tagController')

router.get('/', TagController.getAll)
router.get('/:tag', TagController.getOne)
module.exports = router