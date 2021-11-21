const{multipleMongooseToObject} = require('../../util/mongoose')
const {MongooseToObject} = require('../../util/mongoose')
const Category =require('../models/category');
const Post=   require('../models/post');

class NewsController {

  
    //[GET] news/create
    create(req,res,next){

        Category.find({})
        .then(types=>{
            res.render('news/create', {types:multipleMongooseToObject(types) })
        })
        .catch(next)
        
    }
    //[POST] news/create
    store(req,res,next){
     
        const formData = req.body;
        formData.thumnail = req.file.path.split('\\').slice(-2).join('/');
        const post = new Post(formData);
        post.save()
         .then(() => res.redirect('/me/stored/posts'))
         .catch(next)
    }
    //[DELETE] news/:id
    destroy(req,res,next){

        Post.deleteOne({_id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next)
    }
    // [GET]news/:id/edit

    edit(req,res,next){
        Promise.all([Category.find({}),Post.findOne({_id:req.params.id})])

        .then(([types,post]) =>
        res.render('news/edit',{
         types: multipleMongooseToObject(types) ,
          post : MongooseToObject(post)
        }) )
        .catch(next);
    }

    update(req,res,next){
         
        if(req.file){
          const formData = req.body;
          formData.thumnail = req.file.path.split('\\').slice(-2).join('/');
          Post.updateOne({_id:req.params.id},formData)
          .then(()=> res.redirect('/me/stored/posts'))
          .catch(next)
        }
        else{
            Post.updateOne({_id:req.params.id},req.body)
          .then(()=> res.redirect('/me/stored/posts'))
          .catch(next)
        }
       
       
    }

}

module.exports = new NewsController