// import mongoose from 'mongoose';

import mongoose from 'mongoose';

const JobApplicationSchema = new mongoose.Schema({
  name: {
    type: String
  },

  email: {
    type: String,
    lowercase: true  
  },

  mobile: {
    type: String
  },

  about: {
    type: String
  },

  resume: {
    type: String
  },

  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Career'
  },

  status: {
    type: String,
    enum: ['new', 'reviewing', 'shortlisted', 'rejected', 'hired'],
    default: 'new'
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// module.exports = mongoose.model('JobApplication', JobApplicationSchema);
export default JobApplicationSchema
