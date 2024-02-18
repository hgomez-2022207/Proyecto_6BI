const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { response, Router } = require('express');

const {usuarioPost, usuarioDelete, putUsuarios} = require('../controllers/usuario.controllers');

const {existeEmail, esRoleValido, existeUsuarioById} = require('../helpers/db-validators');

const router = Router();

router.post(
    "/",
    [
        check("nombre","El nombre no debe estar vacio").not().isEmpty(),
        check('email','La cuenta del usuario').isEmail(),
        check('password','Importante si deseas acceder a la cuenta').isLength({min:6}),
        check('email').custom(existeEmail),
        check('role').custom(esRoleValido),
        validarCampos
    ], usuarioPost
);  

module.exports = {

}