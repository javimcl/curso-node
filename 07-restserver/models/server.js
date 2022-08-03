const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            users: '/api/users',
            auth: '/api/auth',
            categories: '/api/categories',
            products: '/api/products',
            find: '/api/find'
        }
       

        //Connect to BD
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Routes my app
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){

        //CORS
        this.app.use(cors());

        //read body
        this.app.use(express.json());

         //Public directory
         this.app.use( express.static('public'));
    }

    routes() {
       this.app.use(this.paths.auth, require('../routes/auth'))    
       this.app.use(this.paths.users, require('../routes/user'))
       this.app.use(this.paths.categories, require('../routes/categories'))       
       this.app.use(this.paths.products, require('../routes/products'))       
       this.app.use(this.paths.find, require('../routes/find'))       
    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log('Server run in port', this.port);
        })
    }
}

module.exports = Server