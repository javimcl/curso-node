const { response } = require("express")
const { model } = require("mongoose")


const validateFileUpload = (req, res = response, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({ msg: 'Not found file - validateFileUpload' })
    }
    next();
}

module.exports = {
    validateFileUpload
}