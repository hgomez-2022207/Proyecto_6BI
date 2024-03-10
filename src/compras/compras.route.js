import {Router} from 'express';
import {check} from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { tieneRolAutorizado } from '../middlewares/validar-roles.js';
import {existeEmail} from '../helpers/db-validators.js';
import { compraPut } from './compra.controller.js';

const router = Router()

router.put(
    '/',
    [
        check('nombre','el producto que va a comprar').not().isEmpty(),
        check('cantidad','la cantidad de unidades que desa del producto').not().isEmpty(),
        validarCampos,
        validarJWT,
    ],compraPut
)

export default router;