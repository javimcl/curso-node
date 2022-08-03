const bcryptjs = require("bcryptjs");
const { response, json } = require("express");
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");
const User = require('../models/user')

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        //verificar si el email existe
        const user = await User.findOne({ email });
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

const googleSignIn = async (req, res = response) => {
    const { id_token } = req.body;

    try {

        const {name, img, email} = await googleVerify(id_token)
        console.log({email})

        let user = await User.findOne( {email});

        console.log(user);

        if (!user) {
            //Tengo que crearlo
            const data = {
                name,
                email,
                password: ':p',
                img,
                google: true
            }
            user = new User(data);
            await user.save();
        }

        // Sie el usuario en DB
        if (!user.state) {
            return res.state(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            })
            
        }

         //Generar el JWT
         const token = await generateJWT(user.id)



       
        res.json({
            user,
            token
        })
    } catch (error) {
        console.log(error)
        json.state(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }

}

module.exports = {
    login,
    googleSignIn
};