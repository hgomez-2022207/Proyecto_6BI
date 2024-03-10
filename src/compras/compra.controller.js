import bcryptjs from 'bcryptjs';
import Factura from '../factura/factura.js';
import Producto from '../producto/productos.model.js';
import {response} from 'express';

export const compraPut = async (req, res = response) =>{
    const{ correo } = req.query;
    const {nombre,cantidad} = req.body;
    const f = await Factura.findOne({correo});
    const p = await Producto.findOne({nombre});

    if(!f){
        return res.status(404).json({
            msg: "Correo invalido no existe en el registro de compra"
        });
    }

    if(!p){
        return res.status(404).json({
            msg: 'Producto no registrado'
        });
    }

    if(p.cantidad < cantidad){
        return res.status(404).json({
            msg: 'Cantidad del producto insuficiente'
        });
    }

    if (isNaN(cantidad) || isNaN(p.precio)) {
        return res.status(400).json({
            msg: "La cantidad y el precio deben ser valores numéricos"
        });
    }

    if (f.total === null || typeof f.total === 'undefined') {
        f.total = 0;
    }    

    f.productos.push(nombre);
    f.cantidad.push(cantidad);
    f.precio.push(p.precio);

    console.log(cantidad);
    console.log(p.precio);
    f.total += cantidad * p.precio;
    p.vendidos =p.vendidos + cantidad;
    p.cantidad =p.cantidad - cantidad;

    await f.save();
    await p.save();

    //const producto = await Factura.findByIdAndUpdate(p.id, p);
    //const factura = await Factura.findByIdAndUpdate(f.id, f);

    res.status(200).json({
        msg: "Los datos de la factura han sido actualizados",
        factura:f,
        producto:p
    });
}
