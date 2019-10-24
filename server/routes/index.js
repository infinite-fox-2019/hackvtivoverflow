const router = require('express').Router()
const userRouter = require('./userRouter')
const questionRouter = require('./questionRouter')

router.use('/user',userRouter)
router.use('/question',questionRouter)

module.exports = router