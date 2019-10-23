const router = require('express').Router();
const user = require('../routes/userRouter')
const question = require('../routes/questionRouter')
const answer = require('../routes/answerRouter')
const tag = require('../routes/tagRouter')

router.get('/', (req, res)=> {
   res.send('Code Red')
})

router.use('/users', user)
router.use('/questions', question)
router.use('/answers', answer)
router.use('/tags', tag)

module.exports = router