const bcryptjs = require('bcryptjs');
const Categoria = require('../models/categorias');
const { response } = require('express');

const categoriaPost = async(req,res) => {
    console.log('categoria');
    const {nombreCategoria, edad} = req.body;
    const categoria = new Categoria({nombreCategoria,edad});

    await categoria.save();

    res.status(200).json({
        categoria
    });
}

module.exports = {
    categoriaPost,
}