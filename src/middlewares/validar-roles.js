import {response} from "express";

export const tieneRolAutorizado = (...roles) => {
    return (req =request, res = response, next) =>{
        console.log(req.usuario)
        if(!req.usuario){
            return res.status(500).json({
                msg: "Se desea validar un usuario sin validar token primero"
            });
        }
    
        if(!roles.includes(req.usuario.role)){
            return res.status(401).json({
                msg: `El servicio requiere uno de los siguientes roles autorizados ${roles}`
            });
        }
        next();
    }
}