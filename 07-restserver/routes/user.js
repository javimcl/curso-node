

const { Router } = require('express');
const { check } = require('express-validator');
const { usersGet, usersPost, usersPut, usersPath, usersDelete } = require('../controllers/users');
const { emailExist, isRoleValidate, existUserById } = require('../helpers/db-validators');

const {
    validateFields,
    validateJWT,
    validaRoles,
    getRole
} = require('../middlewares')

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
    validateFields
], usersPost)
router.put('/:id', [
    check('id', 'Id not is valid').isMongoId(),
    check('id').custom(existUserById),
    check('rol').custom(isRoleValidate),
    validateFields

], usersPut)
router.patch('/', usersPath)
router.delete('/:id', [
    validateJWT, 
    //isAdminRole,
    getRole('ADMIN_ROL'),
    check('id', 'Id not is valid').isMongoId(),
    check('id').custom(existUserById),
    validateFields
], usersDelete)

module.exports = router;
