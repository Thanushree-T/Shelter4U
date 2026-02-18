import mongoose from 'mongoose';

const FooterSchema = new mongoose.Schema({
    address: String,
    mail:[String],
    contact:[String],
    disclaimer:String,
    rera:String,
    facebookLink:String,
    twitterLink:String,
    instaLink:String,
    rights:String,
    embedLink:String,
});

export default FooterSchema;