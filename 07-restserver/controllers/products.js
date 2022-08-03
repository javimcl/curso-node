const { response } = require('express');
const { body } = require('express-validator');
const { Product } = require('../models');

//obtenerCategorias - paginado - total - populate
const getProducts = async (req, res = response) => {
    const { limit = 5, desde = 0 } = req.query;
    const query = { state: true };
    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .skip(Number(desde))
            .limit(Number(limit))
    ])

    res.status(200).json({
        total,
        products
    });

}

const getProductById = async (req, res = response) => {
    const { id } = req.params;
    const product = await Product.findById(id)
                                        .populate('user', 'name')
                                        .populate('category', 'name')
    res.status(200).json({ product })

}

const createProduct = async (req, res = response) => {

    const {state, user, ...body} = req.body;

    const productDB = await Product.findOne({ name: body.name });

    if (productDB) {
        return res.status(400).json({
            msg: `La product ${productDB.name}, ya existe`
        });
    }

    const category = req.body.category
    console.log(category)

    // Generar la data a guardar
    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.user._id,
        category : req.body.category
    }

    const product = new Product(data);

    // Guardar DB
    await product.save();

    res.status(201).json(product);

}

const updateProduct = async (req, res = response) => {
    const { id } = req.params;
    const { state, user, ...data } = req.body;
    if (data.name) {
        data.name = data.name.toUpperCase();    
    }
    
    data.user = req.user._id;

    const product = await Product.findByIdAndUpdate(id, data, { new: true })

    res.status(200).json({ product })

}

const deleteProduct = async (req, res = response) => {
    const { id } = req.params;
   await Product.findByIdAndUpdate(id, {state: false}, { new: true })
   
    res.status(200).json('Product deleted')
}

module.exports = {
    getProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
}
