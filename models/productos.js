const {Schema, model} = require('mongoose');

const productoSchema = Schema({
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
    }
});

productoSchema.methods.toJSON = function(){
    const{ __v, nombre, _id, ...producto} = this.toObject();
    producto.uid = _id;
    return producto;
};

module.exports = model('Producto', productoSchema);