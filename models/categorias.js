const {Schema, model} = require('mongoose');

const categoriaSchema = Schema({
    nombreCategoria:{
        type:String,
        required:['Nombre de la categoria']
    },
    edad:{
        type: String,
        required:['El producto podria usarse por jovenes']
    }

});

categoriaSchema.methods.toJSON = function(){
    const{ __v, nombreCategoria, _id, ...categoria} = this.toObject();
    producto.uid = _id;
    return categoria;
};

module.exports = model('Categoria', categoriaSchema);