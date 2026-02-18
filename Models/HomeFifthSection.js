import mongoose from 'mongoose';
const HomeFifthSectionSchema = new mongoose.Schema({
        img: String,
        title: String
}, { timestamps: true });

export default HomeFifthSectionSchema;

