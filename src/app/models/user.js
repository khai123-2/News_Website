const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    phone: String,
    email: String,
    password: String,
},{ timestamps :true});


module.exports = mongoose.model('user',userSchema,'User');