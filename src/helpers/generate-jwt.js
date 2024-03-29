import jwt from 'jsonwebtoken';
import  token  from 'morgan';

export const generarJWT = (uid = ' ',email = ' ') => {
    return new Promise((resolve, reject) => {
        const playload = ({uid,email});

        jwt.sign(
            playload,
            process.env.SECRETORPRIVATEKEY,{expiresIn: '3h'},
            (err,token) =>{
                err ? (console.log(err), reject('No se ha podido generar un tokwn')) : resolve(token);
            }
        );
    });
}