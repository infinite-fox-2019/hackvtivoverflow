const router = require('express').Router()

const routerAnswer = require("./answer")
const routerQuestion = require("./question")
const routerRegister = require("./register")
const routerLogin = require("./login")
const routerUser = require("./user")

router.use('/login', routerLogin)
router.use('/register', routerRegister)
router.use('/answers', routerAnswer)
router.use('/questions', routerQuestion)
router.use('/users', routerUser)

module.exports = router