const router = require('express').Router();
const UserController = require('../controllers/userController');
const authentication = require('../middlewares/authentication');

router.post('/', UserController.create);
router.post('/login', UserController.login);
router.patch('/watchtag', authentication, UserController.updateTag);
router.get('/', UserController.getDetail);

module.exports = router;
