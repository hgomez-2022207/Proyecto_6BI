const {Router} = require('express');
const {check} = require('express-validator');
const { validarCampos} = require('../middlewares/validar-campos');
const {productoPost, productoGet, productoById, productoPut, productoDelete} = require('../controllers/producto.controller');

const {existeProductoById} = require('../helpers/db-validators');

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

router.get(
    "/:id",
    [
        check('id','No es un curso').isMongoId(),
        check('id').custom(existeProductoById),
    ],productoById
);

router.get("/",productoGet);

router.put(
    "/:id",
    [
        check("nombre","El nombre del producto").not().isEmpty(),
        check('precio','El precio de producto debe ser registrado').not().isEmpty(),
        check('cantidad','Acaso no tenemos existencias del producto?').not().isEmpty(),
        check('empresa','Los creadores del producto').not().isEmpty(),
        check('descripcion','Como le expicaremos a los clientes cual es la funcion del producto').not().isEmpty(),
        check('categoria','Nos da una idea del funcionamiento del producto').not().isEmpty(),
        validarCampos
        
    ], productoPut
);  

router.delete(
    "/:id",
    [
        check('id','Este producto no esta disponible').isMongoId(),
        check('id').custom(existeProductoById),
    ],productoDelete
);

module.exports = router;