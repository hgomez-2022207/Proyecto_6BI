import mongoose from "mongoose";('mongoose');

const categoriaSchema = mongoose.Schema({
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
    categoria.uid = _id;
    return categoria;
};

export default mongoose.model('Categoria', categoriaSchema);