import mongoose from "mongoose";;

const productoSchema = mongoose.Schema({
    nombre:{
        type: String,
        required:["Nombre del producto"]
    },
    precio:{
        type: Number,
        require:["Precio del producto"]
    },
    cantidad:{
        type:Number,
        require:["Cantidad de existencias"]
    },
    vendidos:{
        type:Number,
    },
    empresa:{
        type:String,
        required:["Marca del produto"]
    },
    descripcion:{
        type:String,
        required:['Descripcion del producto']
    },
    categoria:{
        type:String,
        required:["Categoria del producto"]
    },
    estado:{
        type:Boolean,
        default:true
    }
});

productoSchema.methods.toJSON = function(){
    const{ __v, nombre, _id, ...producto} = this.toObject();
    producto.uid = _id;
    return producto;
};

export default mongoose.model('Producto', productoSchema);