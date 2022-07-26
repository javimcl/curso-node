const mongoose = require('mongoose')

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_CNN)

        console.log('Data base online')

    } catch (error) {
        console.log(error)
        throw new Error('Error start with the data base')
    }
}

module.exports = {
    dbConnection
}