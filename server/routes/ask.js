const router = require('express').Router()
const askController = require('../controllers/ask')
const { Authentication, Authorization } = require('../middlewares/auth')

router.get('/', askController.find)
router.get('/myask', Authentication, askController.myAsk)
router.get('/:id', askController.findById)
router.post('/', Authentication, askController.create)

module.exports = router