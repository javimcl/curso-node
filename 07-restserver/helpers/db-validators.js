const Role = require('../models/role');
const User = require('../models/user');

 const isRoleValidate = async(rol = '')=> {
    const existRol = await Role.findOne({rol});
    if (!existRol) {
        throw new Error(`the role: ${rol} isn't registered in the database.`)
    }
}

const emailExist = async(email='') => {
    //verify that the email exists
    const existEmail = await User.findOne({email})
    if (existEmail) {
        throw new Error(`That email ${email} is already registered .`)
    }
}

const existUserById = async(id) => {
    //verify that the email exists
    const existUser = await User.findById(id);
    if (!existUser) {
        throw new Error(`The id not exist: ${id}.`)
    }
}

module.exports = {
    isRoleValidate,
    emailExist,
    existUserById
}