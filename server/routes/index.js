const router = require('express').Router();
const user = require('../routes/userRouter')
const question = require('../routes/questionRouter')
const answer = require('../routes/answerRouter')

router.get('/', (req, res)=> {
   res.send('Code Red')
})

router.use('/users', user)
router.use('/questions', question)
router.use('/answers', answer)

module.exports = router