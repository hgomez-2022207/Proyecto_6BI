import {Router} from 'express';
import {check} from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import {productoPost, productoGet, productoById, productoPut, productoDelete} from './producto.controller.js';

import {existeProductoById} from '../helpers/db-validators.js';

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
        validarCampos
        
    ], productoPost
);  

router.get(
    "/:id",
    [
        check('id','No es un curso').isMongoId(),
        check('id').custom(existeProductoById),
    ],productoById
);

router.get("/",productoGet);

router.put(
    "/:id",
    [
        check("nombre","El nombre del producto").not().isEmpty(),
        check('precio','El precio de producto debe ser registrado').not().isEmpty(),
        check('cantidad','Acaso no tenemos existencias del producto?').not().isEmpty(),
        check('empresa','Los creadores del producto').not().isEmpty(),
        check('descripcion','Como le expicaremos a los clientes cual es la funcion del producto').not().isEmpty(),
        check('categoria','Nos da una idea del funcionamiento del producto').not().isEmpty(),
        validarCampos
        
    ], productoPut
);  

router.delete(
    "/:id",
    [
        check('id','Este producto no esta disponible').isMongoId(),
        check('id').custom(existeProductoById),
    ],productoDelete
);

export default router;