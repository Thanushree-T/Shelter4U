import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
    title:String,
    position:String,
    img:String
});

export default teamSchema;
