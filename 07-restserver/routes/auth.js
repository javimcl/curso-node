const { Router } = require('express');
const { check } = require('express-validator');
const {login, googleSignIn} = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/login', [
    check('email', 'the email is required').isEmail(),
    check('password', 'the password is required').not().isEmpty(),
    validateFields
], login);

router.post('/google', [
    check('id_token', 'id_token is necesario').not().isEmpty(),
    validateFields
], googleSignIn);

module.exports = router;