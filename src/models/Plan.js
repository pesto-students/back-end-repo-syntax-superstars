const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const planSchema = new Schema({
    name : {type: String, required: true, default: 'untitled'},
    monthly_rate: {type: Number, required: true},
    yearly_rate : {type: Number, required: true},
    description : {type: String, required: true},
    credits: {type: Number},
},{timestamps: true})

module.exports = mongoose.model('Plan', planSchema);