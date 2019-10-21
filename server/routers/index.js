const router = require('express').Router()
const questionRouter = require('./questionRouter')

router.get('/', (req,res,next) => {
  res.status(200).json({msg:"Data Connected"})
})

router.use('/questions', questionRouter)

module.exports = router