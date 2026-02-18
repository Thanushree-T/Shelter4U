import mongoose from "mongoose";

const stateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    }, { timestamps: true });

export default stateSchema;