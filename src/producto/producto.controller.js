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
            msg:  `error en este producto`
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

export const productoByCat = async(req, res = response) =>{
    const { categoria } = req.query;
    const c = await Categoria.findOne({categoria})
    const p = await Producto.find({categoria})

    if(!c){
        return res.status(400).json({
            msg: "Esta categoria no existe"
        });
    }

    res.status(200).json({
        p
    });
}

export const productoPut = async (req, res = response) =>{
    const{ nombre } = req.query;
    const { newNombre,precio,cantidad,empresa,descripcion,categoria} = req.body;
    const p = await Producto.findOne({nombre});
    const c = await Categoria.findOne({categoria});

    if(!p){
        return res.status(404).json({
            msg: "Este producto que desea editar no existe"
        });
    }

    if(!c){
        return res.status(404).json({
            msg: "Categoria no valida"
        });
    }

    p.nombre = newNombre;
    p.precio = precio;
    p.cantidad = cantidad;
    p.empresa = empresa;
    p.descripcion = descripcion;
    p.categoria = categoria

    const producto = await Producto.findByIdAndUpdate(p.id, p);

    res.status(200).json({
        msg: "Los datos del producto han sido actualizados",
        producto
    });
}

export const productoDelete = async (req, res = response) => {
    const { nombre } = req.query;
    const productos = await Producto.findOne({ nombre });
    
    if (productos.length === 0) {
        return res.status(404).json({
            msg: "Este producto no existe"
        });
    }

    await Producto.findByIdAndUpdate(productos.id, { estado: false });
    
    res.status(200).json({
        msg: "Información del producto eliminada",
        productos
    });
}

export const cantidadNull = async(req, res) => {
    try{
        const p = await Producto.find({cantidad:0});
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

export const getMasVendidos = async (req, res) => {
    try {
        const masVendidos = await Producto.find({}).sort({ vendidos: -1 });

        if (!masVendidos || masVendidos.length === 0) {
            return res.status(200).json({
                msg: 'No hay productos disponibles'
            });
        }

        return res.status(200).json({
            masVendidos
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Error interno del servidor"
        });
    }
};