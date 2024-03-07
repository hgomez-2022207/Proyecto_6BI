import bcryptjs from 'bcryptjs';
import Producto from './productos.model.js';
import { response } from 'express';
import Categoria from '../categoria/categorias.js'

export const productoPost = async (req,res) => {
    
        console.log('productopost')
        const {nombre,precio,cantidad,empresa,descripcion,categoria} = req.body;
        const vendidos = 0;
    try{  
        const cat = await Categoria.findOne({categoria});

        console.log(cat)
        if(!cat){
            return res.status(400).json({
                msg: 'Por favor poner una categoria existente',
                
            });
        }

        if(!cat.estado){
            return res.status(400).json({
                msg: 'La categoria no existe',
                
            });
        }
        //producto.cat.push(cat.categoria);
        const producto = new Producto({nombre,precio,cantidad,vendidos,empresa,descripcion,categoria});
        //console.log(producto);
        //
        
        await producto.save();

        res.status(200).json({
            nombre,
            producto
        });
    }catch(e){
        res.status(500).json({
            msg:  `error aen este producto`
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

export const productoByName = async(req, res = response) =>{
    const { nombre } = req.query;
    const p = await Producto.findOne({nombre})

    if(!p){
        return res.status(400).json({
            msg: "El producto que busca no esta disponible"
        });
    }

    res.status(200).json({
        p
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

export const cantidadNull = async(req, res) => {
    try{
        const p = await Producto.findOne({cantidad:0});
        if(p.length === 0 || !p){
            return res.status(200).json({
                msg: 'No existen productos agotados'
            });
        }

        return res.status(200).json({
            p
        });
    }catch(error){
        return res.status(200).json({
            error: "Error interno"
        });
    }
}