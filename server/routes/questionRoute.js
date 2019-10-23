const router = require('express').Router()
const questionController = require('../controller/quetionController')
const { authentication } = require('../middleware/auth')

router.post('/', authentication, questionController.create)
router.get('/', questionController.find)
router.get('/user', authentication, questionController.findByUser)
router.get('/search', questionController.search)
router.get('/:id', questionController.findById)
router.patch('/:id', authentication, questionController.update)
router.delete('/:id', authentication, questionController.delete)


module.exports = router