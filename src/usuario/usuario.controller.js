import bcryptjs from 'bcryptjs';
import Usuario from'./usuario.model.js';
import { response }  from 'express';

export const usuarioPost = async (req,res) => {
    console.log('ddd')
    const {nombre,correo,password} = req.body;
    const role= 'ADMIN_ROLE'
    const usuario = new Usuario({nombre,correo,password,role});

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);

    await usuario.save();

    res.status(200).json({
        usuario
    });
}

export const usuarioClientePost = async (req,res) => {
    console.log('ddd')
    const {nombre,correo,password} = req.body;
    const role= 'CLIENTE_ROLE'
    const usuario = new Usuario({nombre,correo,password,role});

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);

    await usuario.save();

    res.status(200).json({
        usuario
    });
}

export const usuarioGet = async (req, res = response) => {
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

export const getUsuarioBiName = async(req, res = response) =>{
    const { correo } = req.query;
    const user = await Usuario.findOne({correo})

    if(!user){
        return res.status(400).json({
            msg: "El usuario que busca no existe"
        });
    }

    res.status(200).json({
        user
    });
}

export const usuarioPut = async (req, res = response) =>{
    const{ id } = req.params;
    const { _id, ...nombre} = req.body;

    await Usuario.findByIdAndUpdate(id, nombre)
    const usuario = await Usuario.findByIdAndUpdate(id, nombre);

    res.status(200).json({
        msg: "Los datos del usuario han sido actualizados",
        usuario
    });
}

export const usuarioDelete = async(req, res = response) => {
    const { id } =req.params;
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});
    const usuarioAutenticado = req.usuario;

    res.status(200).json({
        msg: "Informacion del usuario eliminada",
        usuario,
        usuarioAutenticado
    });
}
