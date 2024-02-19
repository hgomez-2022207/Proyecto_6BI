const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { response } = require('express');

const usuarioPost = async (req,res) => {
    console.log('ddd')
    const {nombre,correo,password,role} = req.body;
    const usuario = new Usuario({nombre,correo,password,role});

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);

    await usuario.save();

    res.status(200).json({
        usuario
    });
}

const usuarioGet = async (req, res = response) => {
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, usuario] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        usuario
    });
}

const getUsuarioBiId = async(req, res = response) =>{
    const { id } = req.params;
    const usuario = await Usuario.findOne({_id:id});

    res.status(200).json({
        usuario
    });
}

module.exports = {
    usuarioPost,
    usuarioGet,
    getUsuarioBiId
}