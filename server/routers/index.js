const router = require('express').Router()
const questionRouter = require('./questionRouter')
const answerRouter = require('./answerRouter')
const userRouter = require('./userRouter')

router.get('/', (req,res,next) => {
  res.status(200).json({msg:"Data Connected"})
})

router.use('/questions', questionRouter)
router.use('/answers', answerRouter)
router.use('/users', userRouter)

module.exports = router