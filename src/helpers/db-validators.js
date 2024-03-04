const { Curso } = require('mongoose');
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({role});
    if(!existeRol){
        throw new Error(`El role ${ role } no existe en la base de datos`);
    }
}

const existeEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El usuario con el ${ id } no existe`);
    }
}

const existeUsuarioById = async (id = '') =>{
    const existeusuario = await Usuario.findOne({id});
    if(existeusuario){
        throw new Error(`El usuario no existe`)
    }
}

const existeProductoById = async (id = '') =>{
    const existeProducto = await Producto.findOne({id});
    if(existeProducto){
        throw new Error(`El producto no existe`)
    }
}


module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioById,
    existeProductoById
}