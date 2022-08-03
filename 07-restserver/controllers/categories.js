const { response } = require('express');
const { Category } = require('../models')

//obtenerCategorias - paginado - total - populate
const getCategories = async (req, res = response) => {
    const { limit = 5, desde = 0 } = req.query;
    const query = { state: true };
    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .skip(Number(desde))
            .limit(Number(limit))
    ])

    res.status(200).json({
        total,
        categories
    });

}

const getCategoriesById = async (req, res = response) => {
    const { id } = req.params;
    const category = await Category.findById(id).populate('user', 'name')
    res.status(200).json({ category })

}


const createCategory = async (req, res = response) => {

    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne({ name });

    if (categoryDB) {
        return res.status(400).json({
            msg: `La category ${categoryDB.name}, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        name,
        user: req.user._id
    }

    const category = new Category(data);

    // Guardar DB
    await category.save();

    res.status(201).json(category);

}

const updateCategory = async (req, res = response) => {
    const { id } = req.params;
    const { state, user, ...data } = req.body;
    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    const category = await Category.findByIdAndUpdate(id, data, { new: true })

    res.status(200).json({ category })

}

const deleteCategory = async (req, res = response) => {
    const { id } = req.params;
    console.log(id)
   await Category.findByIdAndUpdate(id, {state: false}, { new: true })
   
    res.status(200).json('Categoria Eliminado')
}

module.exports = {
    createCategory,
    getCategories,
    getCategoriesById,
    updateCategory,
    deleteCategory
}