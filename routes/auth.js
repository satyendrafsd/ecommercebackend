const express = require('express');
const { signup, signIn } = require('../controllers/authController');
const { checkDuplicateUsernameOrEmail, checkRoleExisted } = require('../middlewares/verifySignUp');
const router = express.Router();



router.post('/auth/signup',checkDuplicateUsernameOrEmail, checkRoleExisted, signup);
router.post('/auth/login', signIn);


module.exports = router;