const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName : {type: String, required: true},
    lastName: {type: String, required: true},
    email : {type: String, required: true}, 
    password : {type: String, required: true},
    token : {type: String},
    isVerified: {type: Boolean, default: false},
    creditsLeft: {type: Number, default: 2000},
    profilePic: {type:String},
    plan: {type: Schema.Types.ObjectId, ref: "Plan", default: "64cf8ed5e7af03a0f81e7944"},
},{timestamps: true})

module.exports = mongoose.model('User', userSchema)