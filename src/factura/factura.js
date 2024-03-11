import mongoose from "mongoose";

const facturaSchema = mongoose.Schema({
    fecha:{
        type:Date,
        required:['Fecha de compra']
    },
    correo:{
        type:String,
        required:['email del comprador']
    },
    detalle: {
        type: [{
            producto: { type: String, required: true },
            precio: { type: Number, required: true },
            cantidad: { type: Number, required: true },
          
        }],
        _id: false,
    },
    metodoP:{
        type:String,
        required:['Metodo de pago']
    },
    total:{
        type: Number
    },
    estado:{
        type:String,
        default: "En proceso"
    }
});

facturaSchema.methods.toJSON = function(){
    const{ __v, _id, ...factura} = this.toObject();
    factura.uid = _id;
    return factura;
};

export default mongoose.model('Factura', facturaSchema);