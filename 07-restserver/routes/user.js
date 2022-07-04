

const { Router } = require('express');
const { usersGet, usersPost, usersPut, usersPath, usersDelete } = require('../controllers/users');
const router = Router();

router.get('/', usersGet)
router.post('/', usersPost)
router.put('/:id', usersPut)
router.patch('/', usersPath)
router.delete('/', usersDelete)

module.exports = router;
