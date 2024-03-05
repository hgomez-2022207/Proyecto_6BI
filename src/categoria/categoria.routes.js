import {Router} from 'express';
import {check} from 'express-validator';

import {categoryPost} from './categoria.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import {existeCategoria} from '../helpers/db-validators.js';

const router = Router();

router.post("/",
    [
        check("nombreCategoria","El nombre de la categoria es obligatorio").not().isEmpty(),
        check("edad","Es para especificar una edad adecuada par la categoria del producto").not().isEmpty(),
        check("nombreCategoria").custom(existeCategoria),
        validarCampos
    ],categoryPost
);

export default router;