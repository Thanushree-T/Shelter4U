import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PropertySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    bhkType:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    area: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Area',
        required: false
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City',
        required: false
    },
    state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'State',
        required: false
    },
    projectBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: false
    },
    location: {
        address: String,
        city: String,
        state: String,
        country: String,
        zipcode: String,
        coordinates: {
            latitude: Number,
            longitude: Number
        }
    },
    propertyType: {
        type: String,
        enum: ['Apartment', 'House', 'Villa', 'Commercial', 'Land'],
        required: true
    },
    bedrooms: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    amenities: [String],
    images: [{
        url: String,
        description: String
    }],
    propertySubtype: {
        type: String,
        required: false
    },
    propertyStage: {
        type: String,
        required: false
    },
    furnishingStatus: {
        type: String,
        required: false
    },
    ageOfConstruction: {
        type: String,
        required: false
    },
    societyName: {
        type: String,
        required: false
    },
    floorNo: {
        type: String,
        required: false
    },
    totalFloors: {
        type: Number,
        required: false
    },
    landmark: {
        type: String,
        required: false
    },
    pinCode: {
        type: String,
        required: false
    },
    areaType: {
        type: String,
        required: false
    },
    areaUnit: {
        type: String,
        required: false
    },
    priceNegotiable: {
        type: Boolean,
        required: false
    },
    maintenanceCharges: {
        type: Number,
        required: false
    },
    maintenanceType: {
        type: String,
        required: false
    },
    ownershipType: {
        type: String,
        required: false
    },
    balconies: {
        type: Number,
        required: false
    },
    parkingSpaces: {
        type: Number,
        required: false
    },
    liftsOnFloor: {
        type: Number,
        required: false
    },
    unitsOnFloor: {
        type: Number,
        required: false
    },
    overlookingView: {
        type: [String],
        required: false
    },
    videoLink: {
        type: String,
        required: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: false
    },
    ownerName: {
        type: String
    },
    ownerPhone: {
        type: String
    },
    ownerEmail: {
        type: String
    },
    approvalStatus: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    status: {
        type: String,
        enum: ['Available', 'Sold', 'Rented'],
        default: 'Available'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

export default PropertySchema;
