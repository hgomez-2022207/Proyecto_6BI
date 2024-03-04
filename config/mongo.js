
import mongoose from 'mongoose'

export const dbConection = async () => {
    try {
        mongoose.connection.on('error', () =>{
            console.log('mongoDB | could not connect to mongodb')
            mongoose.diconect();
        })
        mongoose.connection.on('connecting', () =>{
            console.log('try connecting')
        })
        mongoose.connection.on('connected', () =>{
            console.log('MongoDB | conected to database')
        })
        mongoose.connection.on('open', () =>{
            console.log('connected to database')
        })
        mongoose.connection.on('disconected', () =>{
            console.log('MongoDB | diconected')
        })

        await mongoose.connect(process.env.MONGODB_CNN, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 50
        });

    }catch(error){
        console.log('Database conection failed',error)
    }
}
