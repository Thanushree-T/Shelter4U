import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CareerSchema = new Schema({
  position: {
    type: String,
  },
  employeesNeeded: {
    type: Number,
  },
  location: {
    type: String,
  },
  qualification: {
    type: String,
  },
  experience: {
    type: Number,
  },
  jobDescription: {
    type: String,
  },
  skillRequirement: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },

});

export default CareerSchema;

