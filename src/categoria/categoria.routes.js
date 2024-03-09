import {Router} from 'express';
import {check} from 'express-validator';

import {categoryDelete, categoryPost, categoryPut, getCategoria} from './categoria.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import {esRoleValido, existeCategoria} from '../helpers/db-validators.js';
import {tieneRolAutorizado} from '../middlewares/validar-roles.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();

router.post("/",
    [
        check("categoria","El nombre de la categoria es obligatorio").not().isEmpty(),
        check("edad","Es para especificar una edad adecuada par la categoria del producto").not().isEmpty(),
        check("categoria").custom(existeCategoria),
        validarCampos,
        validarJWT,
        tieneRolAutorizado('ADMIN_ROLE')
    ],categoryPost
);

router.get("/",[validarJWT,tieneRolAutorizado('ADMIN_ROLE')],getCategoria);

router.put("/",
    [
        check("newcategoria","El nombre de la categoria es obligatorio").not().isEmpty(),
        check("edad","Es para especificar una edad adecuada par la categoria del producto").not().isEmpty(),
        validarJWT,tieneRolAutorizado('ADMIN_ROLE')
        //check("newcategoria").custom(existeCategoria),
    ],categoryPut
);

router.delete("/",[validarJWT,tieneRolAutorizado('ADMIN_ROLE')],categoryDelete
);

export default router;