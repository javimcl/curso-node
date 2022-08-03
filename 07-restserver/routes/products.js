const { Router } = require('express');
const { check } = require('express-validator');
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/products');
const { existProductById, existCategoryById } = require('../helpers/db-validators');

const { validateJWT, validateFields, isAdminRole } = require('../middlewares');


const router = Router();

// Obtener todas las categorias - publico
router.get('/', getProducts)

// Obtener una categoria por id- publico
router.get('/:id', [
    check('id', 'Id not is valid').isMongoId(),
    validateFields,
    check('id').custom(existProductById)
],getProductById)


router.post('/', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('category', 'Id not is valid').isMongoId(),
    check('category').custom(existCategoryById),
    validateFields
], createProduct);

// Actualizar- private- cualquiera con token valida
router.put('/:id', [
    
    validateJWT,
   // check('id', 'Id not is valid').isMongoId(),
    check('name', 'Name is required').not().isEmpty(),
    check('id').custom(existProductById),
    validateFields
], updateProduct)

// borrar un producto
router.delete('/:id', [
    validateJWT,
    isAdminRole, 
    check('id', 'Id not is valid').isMongoId(),
    check('id').custom(existProductById),
    validateFields
], deleteProduct)

module.exports = router;