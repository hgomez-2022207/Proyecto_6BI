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
    if(existeUsuario){
        throw new Error(`El usuario no existe`)
    }
}


module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioById,
}