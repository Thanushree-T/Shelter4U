import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
  name: String,  
  text: String,
   
});

const HomeFourthSectionSchema = new mongoose.Schema({
  title: String,
  para: String,
  section: [CustomerSchema]  
});


export default HomeFourthSectionSchema;