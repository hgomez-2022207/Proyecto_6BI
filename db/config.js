const mongoose = require('mongoose');

const dbConection = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_CNN, {});
        console.log('Base de datos conectada');
    }catch(e){
        throw new Error('Conexion fallida con la base de datos', e);
    }
}

module.exports = {
    dbConection
}