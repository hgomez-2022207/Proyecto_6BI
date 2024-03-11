import bcryptjs from 'bcryptjs';
import Factura from '../factura/factura.js';
import Usuario from '../usuario/usuario.model.js';
import {response} from 'express';

export const facturaPost = async (req,res) => {
    console.log('facturaPost')
    const {fecha,correo,metodoP} = req.body;
    const factura = new Factura({fecha,correo,metodoP});

    const user = await Usuario.findOne({correo});
    const f = await Factura.findOne({correo, estado: 'En proceso'});

    if(!user){
        return res.status('El usuario no existe').json({
            msg: "Este usuario no ha sido registrado"
        });
    }

    if (f) {
        return res.status(400).json({
            msg: "Ya existe una factura en proceso para este correo."
        });
    }

    await factura.save();

    res.status(200).json({
        factura,
        user
    });
}

export const getFacturaByEmail = async (req,res) =>{
    const {correo} = req.query;
    try {
        const f = await Factura.findOne({correo:correo});
        if(!f){
            return res.status(200).json({
                msg: "El usuario con este correo no existe",
            });
        }
        res.status(200).json({
            msg: "Listado de facturas",
            facturas:f
        });
    } catch (error) {
        console.error('Error al listar las facturas:', error);
    }
}

