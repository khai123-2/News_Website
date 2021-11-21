
const {multipleMongooseToObject} = require('../../util/mongoose')
const {MongooseToObject} = require('../../util/mongoose')
const User =   require('../models/user');
class AuthController {

    show(req,res,next){

        res.render('auth/login')
    }
    check(req,res,next){

       
        const email = req.body.email;
        const password = req.body.password;
        
        User.findOne({email: email,password: password})
        .then(data =>{

           if(data){

            res.cookie('id',data.id);
            res.redirect('/');

           }
           else{
              res.redirect('/auth/login');
           }
        })
        .catch(err =>{
           res.status(500).json('Có lỗi')
        })

        
    }
    logout(req,res,next){
        res.cookie('id','',{maxAge :1}  );
       res.redirect('/')
     }

}

module.exports = new AuthController