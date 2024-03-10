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
    productos:{
        type: [String],
    },
    cantidad:{
        type:[Number],
    },
    precio:{
        type:[Number],
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