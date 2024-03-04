import mongoose from 'mongoose';

const UsuarioSchema = mongoose.Schema({
    nombre:{
        type:String,
        required:['Nombre del usuario']
    },
    correo:{
        type:String,
        required:['Cuenta de usuario']
    },
    password:{
        type:String,
        required:['La clave de acceso']
    },
    img:{
        type:String
    },
    role:{
        type:String,
        required:['indica si el usuario es profesor o alumno'],
        enum: ["ADMIN_ROLE", "CLIENTE_ROLE"]
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }

});

UsuarioSchema.methods.toJSON = function(){
    const{ __v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
};

export default mongoose.model('Usuario', UsuarioSchema);