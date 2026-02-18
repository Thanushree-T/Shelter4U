import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema({
  title: String,
  paragraphs: [String],
  bullets: [String],
});

const companyProfileSchema = new mongoose.Schema({
  hero: {
    heading: String,
  },
  sections: [sectionSchema],
});

export default companyProfileSchema;