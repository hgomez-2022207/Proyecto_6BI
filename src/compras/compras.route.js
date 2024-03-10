import {Router} from 'express';
import {check} from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { compraPut, generarPDF } from './compra.controller.js';

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

router.get('/registro/pdf', generarPDF);

export default router;