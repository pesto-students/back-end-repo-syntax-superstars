const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const documentSchema = new Schema({
    name : {type: String, required: true, default: 'untitled'},
    author : {type: String},
    text : {type: String},
    words_count : {type: Number, default: 0},
    is_file: {type: Boolean, required: true, default: false},
    file_type: {type: String},
    file_size: {type: String},
    language: {type: String, required: true, default: 'en'},
    human_score: {type: String},
    plagiarism: {type:String},
    project: {type: Schema.Types.ObjectId, ref: "Project"},
    user: {type: Schema.Types.ObjectId, ref: "User"},
},{timestamps: true, strict: false})

module.exports = mongoose.model('Document', documentSchema)