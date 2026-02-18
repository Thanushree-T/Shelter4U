import mongoose from 'mongoose';


const BuilderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default BuilderSchema;