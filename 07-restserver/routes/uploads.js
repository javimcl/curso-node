const { Router } = require('express');
const { check } = require('express-validator');
const { uploadsFile, updatePicture, showPicture, updatePictureCloudinary } = require('../controllers/uploads');
const { allowedCollections } = require('../helpers');
const { validateFields, validateFileUpload } = require('../middlewares');

const router = Router();

router.post('/', validateFileUpload ,uploadsFile);

router.put('/:collection/:id', [
    validateFileUpload,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('collection').custom(c=> allowedCollections(c,['users','products'])),
    validateFields
], updatePictureCloudinary)
// ], updatePicture)

router.get('/:collection/:id', [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('collection').custom(c=> allowedCollections(c,['users','products'])),
    validateFields
], showPicture)

module.exports = router;