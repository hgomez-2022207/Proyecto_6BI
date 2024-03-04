import mongoose from 'mongoose';

const RoleSchema = mongoose.Schema ({
    role:{
        type: String,
         required: [true, 'El rol es obligatorio']
    }
},{
    versionKey: false
});

export default mongoose.model('Role',RoleSchema);