
const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');


const usersGet = async (req = request, res = response) => {

    // const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

    const { limit = 5, desde = 0 } = req.query;
    const query = { state: true };
    // const users = await User.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limit));

    // const total = await User.countDocuments(query);

    const [total, users] =await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(desde))
            .limit(Number(limit))
    ])

    res.json({        
        total,
        users
    })
}

const usersPost = async (req, res = response) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json(errors);
    // }

    const { name, email, password, rol } = req.body;
    const user = new User({ name, email, password, rol });

    //encrypt the password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //save DB


    await user.save();

    res.json({
        user
    })
}

const usersPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, email, ...resto } = req.body;

    if (password) {
        //encrypt the password
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);

    }

    const user = await User.findByIdAndUpdate(id, resto);

    res.json(user)
}

const usersPath = (req, res = response) => {
    res.json({
        msg: 'path API controller'
    })
}

const usersDelete = async(req, res = response) => {
    const { id } = req.params;

    //const user = await User.findByIdAndDelete(id);

    const user = await User.findByIdAndUpdate(id, {state: false});
    res.json({
       user
    })
}
module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPath,
    usersDelete
}