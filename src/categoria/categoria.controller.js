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

/*export const categoryPut = async (req,res) => {
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
}*/

export const categoryPut = async (req, res) => {
    console.log('categoryPut');
    const { categoria } = req.query;
    const { newcategoria, edad } = req.body;

    try {
        const cat = await Categoria.findOne({ categoria });

        if (!cat) {
            return res.status(400).json({
                msg: "La categoría no existe, por favor verifique el parámetro de consulta"
            });
        }

        const productosToUpdate = await Producto.find({ categoria });

        if (productosToUpdate.length === 0) {
            cat.categoria = newcategoria;
            cat.edad = edad;
            const categoriaActualizada = await Categoria.findByIdAndUpdate(cat.id, cat);
            
            return res.status(200).json({
                msg: "Datos actualizados",
                categoria: categoriaActualizada,
                productos: [],
                msgProductos: "No hay productos asociados a esta categoría"
            });
        }

        const updatedProducts = await Producto.updateMany(
            { categoria },
            { categoria: newcategoria }
        );

        cat.categoria = newcategoria;
        cat.edad = edad;
        const categoriaActualizada = await Categoria.findByIdAndUpdate(cat.id, cat);

        res.status(200).json({
            msg: "Datos actualizados",
            categoria: categoriaActualizada,
            productos: updatedProducts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error interno del servidor" });
    }
};



export const categoryDelete = async (req, res) => {
    console.log('categoryDelete');
    const { categoria } = req.query;

    try {
        const cat = await Categoria.findOne({ categoria });

        if (!cat) {
            return res.status(404).json({
                msg: "Categoria no existe, por favor verifique que el nombre sea el correcto "
            });
        }

        const updatedCat = await Categoria.findByIdAndUpdate(cat.id, { estado: false });
        const productList = await Producto.find({ categoria: 'Categorias eliminadas' });

        const updatedProducts = await Producto.updateMany(
            { categoria: cat.categoria },
            { categoria: 'Categorias eliminadas' }
        );

        res.status(200).json({
            msg: "Eliminada",
            category: updatedCat,
            products: productList
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error interno del servidor" });
    }
};

