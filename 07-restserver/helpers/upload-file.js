const { v4: uuidv4 } = require('uuid');
const path = require("path")
const uploadFile = (files, extensionValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {

    return new Promise((resolve, reject) => {

        const { archivo } = files;

        const nombreCortado = archivo.name.split('.')
        const extension = nombreCortado[nombreCortado.length - 1];

        //Validar las extensiones
        // const extensionValidas = ['png', 'jpg', 'jpeg', 'gif']
        if (!extensionValidas.includes(extension)) {
            return reject(
                `La extension ${extension} no es permitida, ${extensionValidas}`);

        }

        const nameTemp = uuidv4() + '.' + extension;

        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nameTemp);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err)
            }
            resolve(nameTemp)
        })
    })



}

module.exports = {
    uploadFile
}