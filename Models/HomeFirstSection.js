import mongoose from 'mongoose';

const countSchema = new mongoose.Schema({
  title: { type: String, required: true },   // e.g., "Premium Properties"
  start: { type: Number, required: true },   // e.g., 8500
  end: { type: Number, required: true },     // e.g., 9000
  duration: { type: Number },    // default animation duration
});

const HomeFirstSectionSchema = new mongoose.Schema({
  firstLine: { type: String, required: true },   // e.g., "Let's Find a Property"
  secondLine: { type: String, required: true },  // e.g., "That's Perfect for you"
  paragraphOne: { type: String },                // e.g., description paragraph
  paragraphTwo: { type: String },                // e.g., "Let's discuss soon"
  img: { type: String },
  counts: [countSchema],                         // array of count blocks
}, { timestamps: true });

export default HomeFirstSectionSchema;
