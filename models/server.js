const express = require('express');
const cors = require('cors');
const {dbConection} = require('../db/config');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.adminPath = '/api/usuario';
        this.adminPath = '/api/categorias';
        this.adminPath = '/api/factura';
        this.adminPath = '/api/productos';


        this.conectarDB();
        this.middlewares();
        this.routes();

    }

    async conectarDB(){
        await dbConection();
    }

    middlewares(){
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.adminPath, require('../routers/usuario.routes.js')),
        this.app.use(this.adminPath, require('../routers/categoria.routes.js')),
        this.app.use(this.adminPath, require('../routers/productos.routes.js')),
        this.app.use(this.adminPath, require('../routers/factura.routes.js'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor Ejecutandose y escuchando el puerto',this.port)
        });
    }
}

module.exports = Server;