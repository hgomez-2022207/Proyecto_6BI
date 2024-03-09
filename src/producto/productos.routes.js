import {Router} from 'express';
import {check} from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import {productoPost, productoGet, productoPut, productoDelete, productoByName, cantidadNull, productoByCat} from './producto.controller.js';

import {existeProductoById, productoExist} from '../helpers/db-validators.js';

import { validarJWT } from '../middlewares/validar-jwt.js';

import { tieneRolAutorizado } from '../middlewares/validar-roles.js';

const router = Router();

router.post(
    "/",
    [
        check("nombre","El nombre del producto").not().isEmpty(),
        check('precio','El precio de producto debe ser registrado').not().isEmpty(),
        check('cantidad','Acaso no tenemos existencias del producto?').not().isEmpty(),
        check('empresa','Los creadores del producto').not().isEmpty(),
        check('descripcion','Como le expicaremos a los clientes cual es la funcion del producto').not().isEmpty(),
        check('categoria','Nos da una idea del funcionamiento del producto').not().isEmpty(),
        check('nombre').custom(productoExist),
        validarCampos,
        validarJWT,
        tieneRolAutorizado('ADMIN_ROLE')
        
    ], productoPost
);  

router.get(
    "/name",
    [validarJWT,],productoByName
);

router.get("/",[validarJWT,],productoGet);

router.put(
    "/:id",
    [
        check("nombre","El nombre del producto").not().isEmpty(),
        check('precio','El precio de producto debe ser registrado').not().isEmpty(),
        check('cantidad','Acaso no tenemos existencias del producto?').not().isEmpty(),
        check('empresa','Los creadores del producto').not().isEmpty(),
        check('descripcion','Como le expicaremos a los clientes cual es la funcion del producto').not().isEmpty(),
        check('categoria','Nos da una idea del funcionamiento del producto').not().isEmpty(),
        validarCampos,
        validarJWT, 
        tieneRolAutorizado('ADMIN_ROLE'),
               
    ], productoPut
);  

router.delete(
    "/:id",
    [
        check('id','Este producto no esta disponible').isMongoId(),
        check('id').custom(existeProductoById),
        validarJWT,
        tieneRolAutorizado('ADMIN_ROLE'),
        
    ],productoDelete
);

router.get('/cantidad',
    [
        validarJWT,
        tieneRolAutorizado('ADMIN_ROLE'),
    ],cantidadNull
);

router.get('/categoria',
    [
        validarJWT,
        tieneRolAutorizado('ADMIN_ROLE'),
    ],productoByCat
);

export default router;