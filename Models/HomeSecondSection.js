import mongoose from 'mongoose';

const HomeSecondSectionSchema = new mongoose.Schema({
    title : String,
    redTitle : String,
    para : String,
    smallImg : String,
    bigImg : String
});

export default HomeSecondSectionSchema;