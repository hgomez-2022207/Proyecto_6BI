import bcryptjs from 'bcryptjs';

import Usuario from '../usuario/usuario.model.js';

import {generarJWT} from '../helpers/generate-jwt.js';

import Factura from '../factura/factura.js'

export const login = async (req, res) => {
    const {correo, password} = req.body;

    try{
        const user = await Usuario.findOne({correo});
        const factura = await Factura.find({correo})

        if(!user){
            return res.status(400).json({
                msg: 'Credenciales incorrectas'
            });
        }

        if(!user.estado){
            return res.status(400).json({
                msg: 'Este usuario no se encuentra registrado'
            });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);

        if(!validPassword){
            return res.status(400).json({
                msg: 'Clave incorrecta'
            });
        }

       /* if(user.password !== password){
            return res.status(400).json({
                msg: 'Clave incorrecta'
            });
        }*/

        const token = await generarJWT(user.id,user.correo);

        res.status(200).json({
            msg: 'Acceso concebido',
            user,
            token,
            factura
        });

    }catch(e){
        console.log(e);
        res.status(500).json({
            msg:'Contacte con el administrador'
        });
    }
}