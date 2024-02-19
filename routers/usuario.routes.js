const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();

const {usuarioPost, usuarioGet, getUsuarioBiId, usuarioDelete, usuarioPut} = require('../controllers/usuario.controller');

const {existeEmail, esRoleValido, existeUsuarioById} = require('../helpers/db-validators');

const { validarCampos, esAdminRole, tieneRolAutorizado } = require('../middlewares/validar-campos');

router.post(
    "/",
    [
        check("nombre","El nombre no debe estar vacio").not().isEmpty(),
        check('correo','La cuenta del usuario').isEmail(),
        check('password','Importante si deseas acceder a la cuenta').isLength({min:6}),
        check('correo').custom(existeEmail),
        check('role').custom(esRoleValido),
        validarCampos
        
    ], usuarioPost
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
        check('role').custom(esRoleValido),
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

module.exports = router;