import jwt from 'jsonwebtoken';
import {request, response} from 'express';
import Usuario from '../usuario/usuario.model.js'

export const validarJWT = async (req = request, res = response, next) =>{
    
    const tokken = req.header('x-token');

    if(!tokken){
        return res.status(401).json({
            msg: 'No hay token en la peticion',
        });
    }

    try{

        const { uid } = jwt.verify(tokken, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid);

        if(!usuario){
            return res.status(401).json({
                msg: "Usuario no existe en la base de datos"
            });
        }
        if(!usuario.estado){
            return res.status(401).json({
                msg: "Token no valido, usuario en estado false"
            });
        }

        req.usuario = usuario;
        next()

    }catch(e){

        console.log(e);
        res.status(401).json({
            msg: "Token no valido"
        })

    }
}