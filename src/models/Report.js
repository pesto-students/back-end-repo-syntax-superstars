const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const reportSchema = new Schema({
    plagPercent : {type: Number, required: true, default: 0},
    uniquePercent: {type: Number, required: true, default: 0},
    paraphrasePercent: {type: Number, required: true, default: 0},
    readabilityScore: {type: Number, require: true, default: 0},
    document: {type: Schema.Types.ObjectId, ref: 'Document'},
    user: {type: Schema.Types.ObjectId, ref: 'User'},

},{timestamps: true})

module.exports = mongoose.model('Report', reportSchema);