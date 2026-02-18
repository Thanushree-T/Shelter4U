import mongoose from 'mongoose';


const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    inquiryType: {
        type: String,
        enum: ['Buy', 'Rent', 'General Inquiry'], // You can modify this as needed
        default: 'Buy'
    },
    status: {
        type: String,
        enum: ['new','pending','completed'], // Add more options if needed
        default: 'new'
    },
    lookingForSimilar: {
        type: String,
        enum: ['Yes', 'No'],
        default: 'No'
    },
    message: {
        type: String
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default leadSchema;
