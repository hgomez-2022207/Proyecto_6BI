const mongoose = require('mongoose');

const dbConection = async () => {
    try{

    }catch(e){
        throw new Error('Conexion fallida con la base de datos');
    }
}

module.exports = {
    dbConection
}