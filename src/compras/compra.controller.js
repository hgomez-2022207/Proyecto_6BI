import bcryptjs from 'bcryptjs';
import Factura from '../factura/factura.js';
import Producto from '../producto/productos.model.js';
import {response} from 'express';
import PDFDocument from 'pdfkit';
import fs from 'fs';

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

export const generarPDF = async (req, res) => {
    const { correo } = req.body;
    try {
        const factura = await Factura.findOne({ correo: correo });

        if (!factura) {
            return res.status(404).json({ msg: 'No se encontró la factura' });
        }

        const doc = new PDFDocument();
        const directorio = process.env.ARCHIVOS_DIR;

        if (!directorio) {
            throw new Error('La variable de entorno ARCHIVOS_DIR no está definida');
        }

        if (!fs.existsSync(directorio)) {
            fs.mkdirSync(directorio, { recursive: true });
        }

        res.setHeader('Content-Disposition', 'attachment; filename="registro.pdf"');
        const writeStream = fs.createWriteStream(`facturas/registro.pdf`);
        doc.pipe(writeStream);

        doc.text(`Fecha: ${factura.fecha}`);
        doc.text(`Correo: ${factura.correo}`);
        doc.text(`Productos: ${factura.productos}`);
        doc.text(`Unidades: ${factura.cantidad}`);
        doc.text(`Precio: ${factura.precio}`);
        doc.text(`Total: ${factura.total}`);
        
        factura.estado = false;

        await factura.save();

        doc.end();

        writeStream.on('finish', () => {
            res.status(200).json({ msg: 'El PDF se generó correctamente' });
        });
    } catch (error) {
        console.error('Error al generar el PDF:', error);
        res.status(500).json({ msg: 'Error al generar el PDF' });
    }
};
