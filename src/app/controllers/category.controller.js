
const{multipleMongooseToObject} = require('../../util/mongoose')
const {MongooseToObject} = require('../../util/mongoose')
const Category =require('../models/category');


class CategoryController {


    //[GET] category/create
    create(req,res,next){

        res.render('category/create')
        
    }
    //[POST] category/create
    store(req,res,next){

        const category = new Category(req.body);

        category.save()
        .then(() => res.redirect('/me/stored/category'))
         .catch(next)

    
    }

    //[GET] category/:id/edit

    edit(req,res,next){

        Category.findById({_id: req.params.id})

        .then(type =>{
            res.render('category/edit',{type : MongooseToObject(type)})
        })
        .catch(next)
    }

    //[PUT] category/:id

    update(req,res,next){
        Category.updateOne({_id:req.params.id},req.body)
        .then( ()=> {res.redirect('/me/stored/category')} )
        .catch(next)
    }

    //[DELETE] category/:id

    destroy(req,res,next){

        Category.deleteOne({_id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next)
    }


}

module.exports = new CategoryController;