import Role from '../role/role.js';
import Usuario from '../usuario/usuario.js';

export const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({role});
    if(!existeRol){
        throw new Error(`El role ${ role } no existe en la base de datos`);
    }
}

export const existeEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El usuario con el ${ id } no existe`);
    }
}

export const existeUsuarioById = async (id = '') =>{
    const existeusuario = await Usuario.findOne({id});
    if(existeusuario){
        throw new Error(`El usuario no existe`)
    }
}

export const existeProductoById = async (id = '') =>{
    const existeProducto = await Producto.findOne({id});
    if(existeProducto){
        throw new Error(`El producto no existe`)
    }
}
