import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    title:String,
    text:String,
    
});

const HomeThirdSectionSchema = new mongoose.Schema({
    redTxt:String,
    blackTxt:String,
    para:String,
    img:String,
    section : [serviceSchema]
});

export default HomeThirdSectionSchema;