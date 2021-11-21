const {multipleMongooseToObject} = require('../../util/mongoose')
const {MongooseToObject} = require('../../util/mongoose');
const { populate } = require('../models/category');
const  Category=require('../models/category');
const Post=   require('../models/post');
class SiteController {
    
    //[GET] /
    index(req,res,next){
        
     
       Promise.all(
            [Post.findOne({}).sort({createdAt:-1}),
            Post.find({}).skip(1).limit(5).sort({createdAt:-1}),
            Post.find({}).skip(10).limit(3).sort({createdAt:-1}),
            Post.find({category_Id:'610363936a106235840ba120'}).limit(4).sort({createdAt:-1}),
            Post.find({category_Id:'610363746a106235840ba0e8'}).limit(4).sort({createdAt:-1}),
            Post.find({category_Id:'6103638c6a106235840ba112'}).limit(4).sort({createdAt:-1})
        ])
        .then(([news,sidebar,old,sport,social,showbiz]) =>
            res.render('home',{
             news: MongooseToObject(news) ,
             sidebar : multipleMongooseToObject(sidebar),
             old : multipleMongooseToObject(old),
             sport : multipleMongooseToObject(sport),
             social : multipleMongooseToObject(social),
             showbiz : multipleMongooseToObject(showbiz)
            }) )
      
        
    }
    show(req,res,next){
        
        Promise.all(
            [Post.findOne({slug: req.params.slug}).populate('category_Id'),
            Post.find({}).skip(1).limit(5).sort({createdAt:-1}),
        ])
        .then(([post,sidebar]) =>
        res.render('news/show',{
            post: MongooseToObject(post) ,
            sidebar : multipleMongooseToObject(sidebar)
        }) )
        
    }
    display(req,res,next){

       

     Promise.all([Post.find({category_Id : req.params.id}).populate('category_Id').sort({createdAt:-1}),
                 Post.find({}).skip(1).limit(5).sort({createdAt:-1}),
                 Category.findOne({_id:req.params.id})])

                 .then(([posts,sidebar,cate]) =>
                 res.render('news/category',{
                     posts: multipleMongooseToObject(posts) ,
                     sidebar : multipleMongooseToObject(sidebar),
                     cate : MongooseToObject(cate)
                 }) )
    }

    search(req,res,next){
        const searchQuery = req.query.q;
        
        const query = {data :searchQuery };
        Promise.all([Post.find({title : { $regex : searchQuery, $options : '$i' }}),
                     Post.find({}).skip(1).limit(5).sort({createdAt:-1}),
                     query])
                    

        .then(([posts,sidebar,query])=>
        res.render('search',{
            posts: multipleMongooseToObject(posts) ,
            sidebar : multipleMongooseToObject(sidebar),
            query : query,
        })
         )
      
         .catch(next)
    }
}

module.exports = new SiteController