

const  {Schema, model } = require('mongoose')

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: [true,'The name is required']
    },
    email: {
        type: String,
        required: [true,'The email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true,'The password is required'], 
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },

});

UsuarioSchema.methods.toJSON = function()  {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model('User', UsuarioSchema);