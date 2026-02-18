import mongoose from 'mongoose';


const eventSchema = new mongoose.Schema({
    title: String,
    coverImage: String,
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    date: String,
    location: String,
    attendees: String
});

export default eventSchema;