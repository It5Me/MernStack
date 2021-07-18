const { Router } = require('express');
const userController = require('../controllers/userController');
const router = Router();

router.get('/signup', userController.signup_get);
router.get('/login', userController.login_get);
router.post('/signup', userController.signup_post);
router.post('/login', userController.login_post);
router.post('/forgotpassword', userController.forgotpassword);
router.put('/resetpassword/:resetToken', userController.resetpassword);
module.exports = router;
