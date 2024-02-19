const bcryptjs = require('bcryptjs');
const Producto = require('../models/productos');
const { response } = require('express');

const productoPost = async (req,res) => {
    console.log('productopost')
    const {nombre,precio,cantidad,empresa,descripcion,categoria} = req.body;
    const producto = new Producto({nombre,precio,cantidad,empresa,descripcion,categoria});

    //const salt = bcryptjs.genSaltSync();

    await producto.save();

    res.status(200).json({
        producto
    });
}

module.exports = {
    productoPost
}