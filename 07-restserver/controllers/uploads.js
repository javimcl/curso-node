
const { response } = require("express");
const path = require("path")
const fs = require('fs')

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)
const { uploadFile } = require("../helpers");
const { User, Product } = require("../models");
const { model } = require("mongoose");

const uploadsFile = async (req, res = response) => {
    // if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    //     res.status(400).json({ msg: 'Not found file' })
    //     return;
    // }

    try {
        const name = await uploadFile(req.files, ['txt', 'md'], 'textos')
        res.json({
            name
        })
    } catch (error) {
        res.status(400).json({ error })
    }

}

const updatePicture = async (req, res = response) => {

    const { collection, id } = req.params;
    // if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    //     res.status(400).json({ msg: 'Not found file' })
    //     return;
    // }

    let modelo;

    switch (collection) {
        case 'users':
            modelo = await User.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id: ${id}`
                })
            }
            break;
        case 'products':
            modelo = await Product.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un product con el id: ${id}`
                })
            }
            break;

        default:
            return res.status(500).json({ msg: 'Validacion de coleccion' })
    }

    //Clean pictures
    if (modelo.img) {
        const pathImage = path.join(__dirname, '../uploads', collection, modelo.img);
        if (fs.existsSync(pathImage)) {
            //fs.unlinkSync(pathImage);
            return res.sendFile(pathImage)
        }
    }

    const name = await uploadFile(req.files, undefined, collection)
    modelo.img = name;

    await modelo.save();

    res.json({ modelo })
}

const updatePictureCloudinary = async (req, res = response) => {

    const { collection, id } = req.params;

    let modelo;

    switch (collection) {
        case 'users':
            modelo = await User.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id: ${id}`
                })
            }
            break;
        case 'products':
            modelo = await Product.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un product con el id: ${id}`
                })
            }
            break;

        default:
            return res.status(500).json({ msg: 'Validacion de coleccion' })
    }

    //Clean pictures
    if (modelo.img) {
        const pathImage = path.join(__dirname, '../uploads', collection, modelo.img);
        if (fs.existsSync(pathImage)) {
            //fs.unlinkSync(pathImage);
            return res.sendFile(pathImage)
        }
    }

    if (modelo.img) {
        const nameArr = modelo.img.split('/');
        const name = nameArr[nameArr.length - 1];
        const [public_id] = name.split('.')
        cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    modelo.img = secure_url;

    await modelo.save();

    res.json(modelo)
}

const showPicture = async (req, res = response) => {

    const { collection, id } = req.params;


    let modelo;

    switch (collection) {
        case 'users':
            modelo = await User.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id: ${id}`
                })
            }
            break;
        case 'products':
            modelo = await Product.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un product con el id: ${id}`
                })
            }
            break;

        default:
            return res.status(500).json({ msg: 'Validacion de coleccion' })
    }

    //Clean pictures
    if (modelo.img) {
        const pathImage = path.join(__dirname, '../uploads', collection, modelo.img);
        if (fs.existsSync(pathImage)) {
            //fs.unlinkSync(pathImage);
            return res.sendFile(pathImage)
        }
    }
    const pathImage = path.join(__dirname, '../assets/no-image.jpg')
    res.sendFile(pathImage);
}

module.exports = {
    uploadsFile,
    updatePicture,
    showPicture,
    updatePictureCloudinary
}