import mongoose from "mongoose";('mongoose');

const categoriaSchema = mongoose.Schema({
    categoria:{
        type:String,
        required:['Nombre de la categoria']
    },
    edad:{
        type: String,
        required:['El producto podria usarse por jovenes']
    }

});

categoriaSchema.methods.toJSON = function(){
    const{ __v, categoria, _id, ...cat} = this.toObject();
    categoria.uid = _id;
    return cat;
};

export default mongoose.model('Categoria', categoriaSchema);