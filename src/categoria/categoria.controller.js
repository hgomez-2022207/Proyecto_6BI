import bcryptjs from 'bcryptjs';
import Categoria from '../categoria/categorias.js';
import Producto from '../producto/productos.model.js'
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

export const getCategoria = async (req,res) => {
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, categoria] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        categoria
    });
}

export const categoryPut = async (req,res) => {
    console.log('categoryPut');
    const {categoria} = req.query;
    const {newcategoria,edad} = req.body;

    const cat = await Categoria.findOne({categoria})
    const p = await Producto.findOne({categoria})

    if(!cat){
        return res.status(400).json({
            msg: "Categoria no existe, vuelva a ingresarla en el query"
        });
    }
    if(!p){
        cat.categoria=newcategoria;
        cat.edad=edad;
        const category = await Categoria.findByIdAndUpdate(cat.id, cat);
        return res.status(400).json({
            newcategoria,
            edad,
            msg: "Categoria no esta registrada en productos, por lo que no se ve afectado"
        });
    }

    cat.categoria=newcategoria;
    cat.edad=edad;
    p.categoria=newcategoria;

    const pcategory = await Producto.findByIdAndUpdate(p.id,p)
    const category = await Categoria.findByIdAndUpdate(cat.id, cat);

    res.status(200).json({
        msg: "Datos actualizados",
        category,
        categoria,
        edad,
        msg:'despues:',
        categoria,
        edad,
        msg: `Cambio a productos`,
        pcategory
    });
}

export const categoryDelete = async (req,res) => {
    console.log('categoryDelete');
    const {categoria} = req.query;

    const cat = await Categoria.findOne({categoria})
    const p = await Producto.findOne({categoria})

    if(!cat){
        return res.status(400).json({
            msg: "Categoria no existe, vuelva a ingresarla en el query"
        });
    }
    if(!p){
        cat.estado=false;
        const category = await Categoria.findByIdAndUpdate(cat.id, cat);
        return res.status(400).json({
            categoria,
            cat,
            msg: "Categoria no esta registrada en productos, por lo que no se ve afectado"
        });
    }

    cat.estado=false;
    p.categoria='Categorias eliminadas';

    const pcategory = await Producto.findByIdAndUpdate(p.id,p)
    const category = await Categoria.findByIdAndUpdate(cat.id, cat);

    res.status(200).json({
        msg: "Categoria eliminada",
        category,pcategory
    });
}