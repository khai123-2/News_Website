const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name:String,
    slug: { type: String , slug:'name', unique: true },
},{ timestamps :true});

mongoose.plugin(slug);

module.exports = mongoose.model('category',categorySchema,'Category');