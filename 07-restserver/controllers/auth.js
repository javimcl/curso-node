const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generateJWT } = require("../helpers/generate-jwt");
const User = require('../models/user')

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        //verificar si el email existe
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                msg: 'password/user incorrect - email'
            })
        }

        if (!user.state) {
            return res.status(400).json({
                msg: 'password/user incorrect - state:false'
            })
        }


        //si el usuario esta activo
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'password/user incorrect - password'
            })
        }

        //verificar la constrasena

        //Generar el JWT
        const token = await generateJWT(user.id)



        res.json({
            user,
            token
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'told with administrator'
        })
    }


}

module.exports = { login };