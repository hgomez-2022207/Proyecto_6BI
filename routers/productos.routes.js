const {Router} = require('express');
const {check} = require('express-validator');
const { validarCampos, esAdminRole, tieneRolAutorizado } = require('../middlewares/validar-campos');
const {productoPost} = require('../controllers/producto.controller');

const router = Router();

router.post(
    "/",
    [
        check("nombre","El nombre del producto").not().isEmpty(),
        check('precio','El precio de producto debe ser registrado').not().isEmpty(),
        check('cantidad','Acaso no tenemos existencias del producto?').not().isEmpty(),
        check('empresa','Los creadores del producto').not().isEmpty(),
        check('descripcion','Como le expicaremos a los clientes cual es la funcion del producto').not().isEmpty(),
        check('categoria','Nos da una idea del funcionamiento del producto').not().isEmpty(),
        validarCampos
        
    ], productoPost
);  

module.exports = router;