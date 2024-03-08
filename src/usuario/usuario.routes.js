import {Router} from 'express';
import {check} from 'express-validator';
const router = Router();

import {usuarioPost, usuarioClientePost, usuarioGet, getUsuarioBiName, usuarioDelete, usuarioPut, clientePut} from './usuario.controller.js';

import {existeEmail, noExisteEmail, esRoleValido} from '../helpers/db-validators.js';

import { validarCampos}  from '../middlewares/validar-campos.js';

import { validarJWT } from '../middlewares/validar-jwt.js';

import { tieneRolAutorizado } from '../middlewares/validar-roles.js'

router.post(
    "/admin",
    [
        check("nombre","El nombre no debe estar vacio").not().isEmpty(),
        check('correo','La cuenta del usuario').isEmail(),
        check('password','Importante si deseas acceder a la cuenta').isLength({min:6}),
        check('correo').custom(existeEmail),
        validarCampos,
        
    ], usuarioPost
);  

router.post(
    "/cliente",
    [
        check("nombre","El nombre no debe estar vacio").not().isEmpty(),
        check('correo','La cuenta del usuario').isEmail(),
        check('password','Importante si deseas acceder a la cuenta').isLength({min:6}),
        check('correo').custom(existeEmail),
        validarCampos,
        
    ], usuarioClientePost
);  

router.get(
    "/:name",
    [validarJWT,],getUsuarioBiName
);

router.get('/', usuarioGet);

router.put(
    "/admin",
    [

        check('correo','El correo anterior').isEmail(),
        check('password','Sirve para comprovar si la cuenta es tuya'),

        check("nombre","El nombre no debe estar vacio").not().isEmpty(),
        check('newCorreo','La cuenta del usuario').isEmail(),
        check('newPassword','Importante si deseas acceder a la cuenta, por favor poner una mas segura').isLength({min:6}),
        check('role','Crear role existente').not().isEmpty(),
        check('correo').custom(noExisteEmail),
        check('newCorreo').custom(existeEmail),
        check('role').custom(esRoleValido),
        validarCampos,
        validarJWT,
        tieneRolAutorizado('ADMIN_ROLE')

    ],usuarioPut
);

router.put(
    "/cliente",
    [

        check('correo','El correo anterior').isEmail(),
        check('password','Sirve para comprovar si la cuenta es tuya'),

        check("nombre","El nombre no debe estar vacio").not().isEmpty(),
        check('newCorreo','La cuenta del usuario').isEmail(),
        check('newPassword','Importante si deseas acceder a la cuenta, por favor poner una mas segura').isLength({min:6}),
        check('correo').custom(noExisteEmail),
        check('newCorreo').custom(existeEmail),
        validarCampos,
        validarJWT,

    ],clientePut
);

router.delete(
    "/",
    [
        check('correo','El correo que desea eliminar').isEmail(),
        check('password','Sirve para comprovar si la cuenta es tuya'),
        validarCampos,
        validarJWT,

    ],usuarioDelete
);


export default router;