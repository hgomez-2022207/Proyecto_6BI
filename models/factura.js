const {Schema, model} = require('mongoose');

const facturaSchema = Schema({
    numero:{
        type:String,
        required:['Numero de factura']
    },
    fecha:{
        type:Date,
        required:['Fecha de compra']
    },
    cliente:{
        type:String,
        required:['Nombre del comprador']
    },
    productos:{
        type:String,
        required:['Productos comprados']
    },
    metodoP:{
        type:String,
        required:['Metodo de pago']
    },
    precios:{
        type: Number,
        required:['Total a pagar']
    }

});

facturaSchema.methods.toJSON = function(){
    const{ __v, numero, _id, ...factura} = this.toObject();
    producto.uid = _id;
    return factura;
};

module.exports = model('Producto', facturaSchema);