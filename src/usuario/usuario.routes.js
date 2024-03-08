import {Router} from 'express';
import {check} from 'express-validator';
const router = Router();

import {usuarioPost, usuarioClientePost, usuarioGet, getUsuarioBiName, usuarioDelete, usuarioPut} from './usuario.controller.js';

import {existeEmail, noExisteEmail, esRoleValido} from '../helpers/db-validators.js';

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
    "/:name",
    [],getUsuarioBiName
);

router.get('/', usuarioGet);

router.put(
    "/admin",
    [

        check('correo','La cuenta del usuario').isEmail(),
        check('password','Importante si deseas acceder a la cuenta').isLength({min:6}),

        check("nombre","El nombre no debe estar vacio").not().isEmpty(),
        check('newCorreo','La cuenta del usuario').isEmail(),
        check('newPassword','Importante si deseas acceder a la cuenta').isLength({min:6}),
        check('role','Crear role existente').not().isEmpty(),
        check('correo').custom(noExisteEmail),
        check('newCorreo').custom(existeEmail),
        check('role').custom(esRoleValido),
        validarCampos

    ],usuarioPut
);
/*
router.put(
    "/cliente",
    [
        check('correo','La cuenta del usuario').isEmail(),
        check('password','Importante si deseas acceder a la cuenta').isLength({min:6}),

        check("nombre","El nombre no debe estar vacio").not().isEmpty(),
        check('newCorreo','La cuenta del usuario').isEmail(),
        check('newPassword','Importante si deseas acceder a la cuenta').isLength({min:6}),
        check('correo').custom(existeEmail),
        validarCampos

    ],clientePut
);

router.delete(
    "/:id",
    [
        check('id','User no exist').isMongoId(),
        check('id').custom(existeUsuarioById),
        validarCampos
    ],usuarioDelete
);*/

export default router;