import Usuario from '../usuario/usuario.model.js';
import Categoria from '../categoria/categorias.js'
import Producto from '../producto/productos.model.js'


export const esRoleValido = async (role = '') => {
    const existeRol = await Usuario.findOne({role});
    if(!existeRol){
        throw new Error(`El role ${ role } es invalido, los roles disponibles son: "ADMIN_ROLE", "CLIENTE_ROLE"`);
    }
}

export const existeEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo, estado:true});
    if(existeEmail){
        throw new Error(`El usuario con el ${ correo } ya existe`);
    }
}

export const noExisteEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if(!existeEmail){
        throw new Error(`El usuario con el ${ correo } no existe`);
    }
}

export const existeCategoria = async (categoria = '') => {
    const existeCat = await Categoria.findOne({categoria});
    if(existeCat){
        throw new Error(`La categoria ${ categoria } ya existe`);
    }
}

export const productoExist = async (nombre = '') => {
    const existeP = await Producto.findOne({nombre});
    if(existeP){
        throw new Error(`El producto ${ nombre } ya existe`);
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
