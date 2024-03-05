'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import {dbConection} from './mongo.js'

import userRoute from '../src/usuario/usuario.routes.js';
import authRoute from '../src/auth/auth.route.js'

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioPath = '/api/usuarios';
        this.categoriaPath = '/api/categorias';
        this.facturaPath = '/api/factura';
        this.productoPath = '/api/productos';
        this.authPath = '/api/auth';


        this.conectarDB();
        this.middlewares();
        this.routes();

    }

    async conectarDB(){
        await dbConection();
    }

    middlewares(){
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes(){
        this.app.use(this.usuarioPath,userRoute),
        this.app.use(this.authPath,authRoute)
        //this.app.use(this.categoriaPath, require('../src/categoria/categoria.routes.js')),
        //this.app.use(this.productoPath, require('../src/producto/productos.routes.js')),
        //this.app.use(this.facturaPath, require('../src/factura/factura.routes.js'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor Ejecutandose y escuchando el puerto',this.port)
        });
    }
}

export default  Server;