const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: String,
    description: String,
    content: String,
    author: String,
    thumnail: String,
    slug: { type: String , slug:'title', unique: true },
    category_Id: { type: Schema.Types.ObjectId, ref: 'category' }

},{ timestamps :true});

mongoose.plugin(slug);
// postSchema.plugin(mongoose_delete, { deletedAt : true , overrideMethods: 'all' } );
module.exports = mongoose.model('post',postSchema,'Posts');