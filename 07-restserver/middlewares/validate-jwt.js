const { response, request } = require('express')
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async(req = request, res = response, next) => {

    //read the headers
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'There is no token in the request'
        })

    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPTIVATEKEY)

        req.uid = uid;

        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                msg: 'Invalid token - user does not exist DB'
            })
        }

        //verificar si el uid tiene estado true
        if (!user.state) {
            return res.status(401).json({
                msg: 'Invalid token - status user: false'
            })
            
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Invalid token'
        })
    }

    next()

}

module.exports = {
    validateJWT
}