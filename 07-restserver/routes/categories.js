const { Router } = require('express');
const { check } = require('express-validator');
const { createCategory, getCategories, getCategoriesById, updateCategory, deleteCategory } = require('../controllers/categories');
const { existCategoryById } = require('../helpers/db-validators');
const { validateJWT, validateFields, isAdminRole } = require('../middlewares');


const router = Router();

// Obtener todas las categorias - publico
router.get('/', getCategories)

// Obtener una categoria por id- publico
router.get('/:id', [
    check('id', 'Id not is valid').isMongoId(),
    validateFields,
    check('id').custom(existCategoryById)
],getCategoriesById)

// Obtener una categoria por id- publico

router.post('/', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    validateFields
], createCategory);
// Actualizar- private- cualquiera con token valida
router.put('/:id', [
    
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('id').custom(existCategoryById),
    validateFields
], updateCategory)


// borrar una categoria
router.delete('/:id', [
    validateJWT,
    isAdminRole, 
    check('id', 'Id not is valid').isMongoId(),
    check('id').custom(existCategoryById),
    validateFields
], deleteCategory)

module.exports = router;