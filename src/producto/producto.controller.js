import bcryptjs from 'bcryptjs';
import Producto from './productos.model';
import { response } from 'express';

export const productoPost = async (req,res) => {
    console.log('productopost')
    const {nombre,precio,cantidad,empresa,descripcion,categoria} = req.body;
    const producto = new Producto({nombre,precio,cantidad,empresa,descripcion,categoria});

    //const salt = bcryptjs.genSaltSync();

    await producto.save();

    res.status(200).json({
        producto
    });
}

const productoGet = async (req, res = response) => {
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

const productoById = async(req, res = response) =>{
    const { id } = req.params;
    const producto = await Producto.findOne({_id:id});

    res.status(200).json({
        producto
    });
}

const productoPut = async (req, res = response) =>{
    const{ id } = req.params;
    const { _id, ...nombre} = req.body;

    await Producto.findByIdAndUpdate(id, nombre)
    const producto = await Producto.findByIdAndUpdate(id, nombre);

    res.status(200).json({
        msg: "Los datos del producto han sido actualizados",
        producto
    });
}

const productoDelete = async(req,res = response) => {
    const { id } = req.params;
    const producto = await Producto.findByIdAndUpdate(id,{estado:false});
    const productoAutentico = req.producto;

    res.status(200).json({
        msg: "Informacion del producto invalidada",
        producto,
        productoAutentico
    });
}
