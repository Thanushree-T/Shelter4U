import mongoose from 'mongoose';

const table = new mongoose.Schema({
    headers: [String],
    rows: [[String]]
})

const sectionSchema = new mongoose.Schema({
  title: String,
  paragraphs: [String],
  bullets: [String],
  table: [table],
  additionalContent: [String]
});

const loanForNRISchema = new mongoose.Schema({
  hero: {
    heading: String,
  },
  sections: [sectionSchema],
});

export default loanForNRISchema;






