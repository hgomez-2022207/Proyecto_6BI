const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();

const {usuarioPost, usuarioDelete, putUsuarios} = require('../controllers/usuario.controller');

const {existeEmail, esRoleValido, existeUsuarioById} = require('../helpers/db-validators');

const { validarCampos, esAdminRole, tieneRolAutorizado } = require('../middlewares/validar-campos');

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

module.exports = router;