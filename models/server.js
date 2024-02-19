const express = require('express');
const cors = require('cors');
const {dbConection} = require('../db/config');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioPath = '/api/usuarios';
        this.categoriaPath = '/api/categorias';
        this.facturaPath = '/api/factura';
        this.productoPath = '/api/productos';


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
        this.app.use(this.usuarioPath, require('../routers/usuario.routes.js')),
        this.app.use(this.categoriaPath, require('../routers/categoria.routes.js')),
        this.app.use(this.productoPath, require('../routers/productos.routes.js')),
        this.app.use(this.facturaPath, require('../routers/factura.routes.js'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor Ejecutandose y escuchando el puerto',this.port)
        });
    }
}

module.exports = Server;