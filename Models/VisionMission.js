import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema({
  title: String,
  visionMissionText: [String],
  paragraphs: [String],
  bullets: [String],
});

const visionMissionSchema = new mongoose.Schema({
  hero: {
    heading: String,
  },
  sections: [sectionSchema],
});

export default visionMissionSchema;


