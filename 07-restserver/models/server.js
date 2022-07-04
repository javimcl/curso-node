const express = require('express')
const cors = require('cors')

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/usuarios'

        //Middlewares
        this.middlewares();

        //Routes my app
        this.routes();
    }

    middlewares(){

        //CORS
        this.app.use(cors());

        //Lectura y pase del bodu
        this.app.use(express.json());

         //Directorio publico
         this.app.use( express.static('public'));
    }

    routes() {
       this.app.use(this.usersPath, require('../routes/user'))       
    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log('Server run in port', this.port);
        })
    }
}

module.exports = Server