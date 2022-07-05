
const { response } = require('express');

const usersGet = (req = request , res = response) => {

    const {q, nombre = 'No name', apikey, page=1, limit} = req.query;

    res.json({
        msg: 'get API controller',
        q,
        nombre,
        apikey,
        page,
        limit
    })
}

const usersPost = (req, res = response) => {

    const body = req.body;

    res.json({
        msg: 'post API controller',
        body
    })
}

const usersPut = (req, res = response) => {
    const id = req.params.id;
    res.json({
        msg: 'put API controller',
        id
    })
}

const usersPath = (req, res = response) => {
    res.json({
        msg: 'path API controller'
    })
}

const usersDelete = (req, res = response) => {
    res.json({
        msg: 'delete API controller'
    })
}
module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPath,
    usersDelete
}