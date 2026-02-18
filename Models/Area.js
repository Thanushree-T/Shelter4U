import mongoose from 'mongoose';


const AreaSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  createdAt: { type: Date, default: Date.now },
});

export default AreaSchema;