import {Router} from 'express';
import {check} from 'express-validator';
const router = Router();

import {usuarioPost, usuarioClientePost, usuarioGet, getUsuarioBiId, usuarioDelete, usuarioPut} from './usuario.controller.js';

import {existeEmail, existeUsuarioById} from '../helpers/db-validators.js';

import { validarCampos}  from '../middlewares/validar-campos.js';

router.post(
    "/admin",
    [
        check("nombre","El nombre no debe estar vacio").not().isEmpty(),
        check('correo','La cuenta del usuario').isEmail(),
        check('password','Importante si deseas acceder a la cuenta').isLength({min:6}),
        check('correo').custom(existeEmail),
        validarCampos
        
    ], usuarioPost
);  

router.post(
    "/cliente",
    [
        check("nombre","El nombre no debe estar vacio").not().isEmpty(),
        check('correo','La cuenta del usuario').isEmail(),
        check('password','Importante si deseas acceder a la cuenta').isLength({min:6}),
        check('correo').custom(existeEmail),
        validarCampos
        
    ], usuarioClientePost
);  

router.get(
    "/:id",
    [
        check('id','No es un curso').isMongoId(),
        check('id').custom(existeUsuarioById),
        validarCampos
    ],getUsuarioBiId
);

router.get('/', usuarioGet);

router.put(
    "/:id",
    [
        check("nombre","El nombre no debe estar vacio").not().isEmpty(),
        check('correo','La cuenta del usuario').isEmail(),
        check('password','Importante si deseas acceder a la cuenta').isLength({min:6}),
        check('correo').custom(existeEmail),
        validarCampos

    ],usuarioPut
);

router.delete(
    "/:id",
    [
        check('id','User no exist').isMongoId(),
        check('id').custom(existeUsuarioById),
        validarCampos
    ],usuarioDelete
);

export default router;