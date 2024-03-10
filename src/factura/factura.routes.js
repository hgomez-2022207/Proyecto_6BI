import {Router} from 'express';
import {check} from 'express-validator';
import {facturaPost, getFacturaByEmail} from "./factura.controllers.js"
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { tieneRolAutorizado } from '../middlewares/validar-roles.js';
import {existeEmail} from '../helpers/db-validators.js';

const router = Router();

router.post(
    '/',
    [
        check("fecha","Fecha de la compra").not().isEmpty(),
        check("correo","El correo del cliente").not().isEmpty(),
        check("metodoP","El metodo con el que va a pagar el cliente").not().isEmpty(),
        validarCampos,
        validarJWT,
        tieneRolAutorizado('ADMIN_ROLE')
    ],facturaPost
);

router.get(
    '/',
    [validarJWT],
    getFacturaByEmail
)

export default router;