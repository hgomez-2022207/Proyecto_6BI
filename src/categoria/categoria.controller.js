import bcryptjs from 'bcryptjs';
import Categoria from '../categoria/categorias.js';
import  response  from  'express';

export const categoryPost = async (req,res) => {
    console.log('categoryPost')
    const {nombreCategoria,edad} = req.body;
    const categoria = new Categoria({nombreCategoria,edad});

    await categoria.save();

    res.status(200).json({
        nombreCategoria,
        categoria
    });
}