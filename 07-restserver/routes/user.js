

const { Router } = require('express');
const { check } = require('express-validator');
const { usersGet, usersPost, usersPut, usersPath, usersDelete } = require('../controllers/users');
const { isRoleValidate, emailExist, existUserById } = require('../helpers.js/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.get('/', [

], usersGet)
router.post('/', [
    check('name', 'the name is required').not().isEmpty(),
    check('password', 'the password must be more than 6 letters').isLength({ min: 6 }),
    check('email', 'the email is not validated').isEmail(),
    check('email').custom(emailExist),
    //check('rol', 'Not a valid role').isIn(['ADMIN_ROL','USER_ROLE']),
    check('rol').custom(isRoleValidate),
    validarCampos
], usersPost)
router.put('/:id', [
    check('id', 'No es un id valid').isMongoId(),
    check('id').custom(existUserById),
    check('rol').custom(isRoleValidate),
    validarCampos

], usersPut)
router.patch('/', usersPath)
router.delete('/:id', [
    check('id', 'No es un id valid').isMongoId(),
    check('id').custom(existUserById),
    validarCampos
], usersDelete)

module.exports = router;
