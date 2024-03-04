const express = require('express');
const cors = require('cors');
const {dbConection} = require('../db/config.js');

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
        this.app.use(this.usuarioPath, require('../src/usuario/usuario.routes.js')),
        this.app.use(this.categoriaPath, require('../src/categoria/categoria.routes.js')),
        this.app.use(this.productoPath, require('../src/producto/productos.routes.js')),
        this.app.use(this.facturaPath, require('../src/factura/factura.routes.js'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor Ejecutandose y escuchando el puerto',this.port)
        });
    }
}

module.exports = Server;