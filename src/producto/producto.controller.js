import bcryptjs from 'bcryptjs';
import Producto from './productos.model.js';
import { response } from 'express';
import Categoria from '../categoria/categorias.js'

export const productoPost = async (req,res) => {
    try{
    console.log('productopost')
    const {nombre,precio,cantidad,empresa,descripcion,categoria} = req.body;
    
    const cat = await Categoria.findOne({categoria});

    if(!cat){
        return res.status(400).json({
            msg: 'Por favor poner una categoria existente'
        });
    }
    //producto.cat.push(cat.categoria);
    const producto = new Producto({nombre,precio,cantidad,empresa,descripcion,categoria});
    
    await producto.save();

    res.status(200).json({
        producto
    });
    }catch(e){
        console.log('hi4', e);
        res.status(500).json({
            msg:  `error when entering comment`
        });
    }
}

export const productoGet = async (req, res = response) => {
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, producto] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        producto
    });
}

export const productoById = async(req, res = response) =>{
    const { id } = req.params;
    const producto = await Producto.findOne({_id:id});

    res.status(200).json({
        producto
    });
}

export const productoPut = async (req, res = response) =>{
    const{ id } = req.params;
    const { _id, ...nombre} = req.body;

    await Producto.findByIdAndUpdate(id, nombre)
    const producto = await Producto.findByIdAndUpdate(id, nombre);

    res.status(200).json({
        msg: "Los datos del producto han sido actualizados",
        producto
    });
}

export const productoDelete = async(req,res = response) => {
    const { id } = req.params;
    const producto = await Producto.findByIdAndUpdate(id,{estado:false});
    const productoAutentico = req.producto;

    res.status(200).json({
        msg: "Informacion del producto invalidada",
        producto,
        productoAutentico
    });
}