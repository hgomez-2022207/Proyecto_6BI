import bcryptjs from 'bcryptjs';
import Categoria from '../categoria/categorias.js';
import  response  from  'express';

export const categoryPost = async (req,res) => {
    console.log('categoryPost')
    const {categoria,edad} = req.body;
    const cat = new Categoria({categoria,edad});

    await cat.save();

    res.status(200).json({
        categoria,
        cat
    });
}