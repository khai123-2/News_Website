
const {multipleMongooseToObject} = require('../../util/mongoose')
const Category =require('../models/category');
const Post=   require('../models/post');
class MeController {

    show(req,res,next){

        Post.find({})
        .populate('category_Id')
        .then(posts=>{
            res.render('me/storedPosts',{posts:multipleMongooseToObject(posts)})
        })
        .catch(next)
    }

    display(req,res,next){

        Category.find({})

        .then(types =>{
            res.render('me/storedCategory', {types : multipleMongooseToObject(types)})
        })
        .catch(next)
    }

}

module.exports = new MeController