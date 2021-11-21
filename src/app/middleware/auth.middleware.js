const { MongooseToObject } = require('../../util/mongoose');
const User =   require('../models/user');

class AuthMiddleware {

    requireAuth(req,res,next){

        if(!req.cookies.id){
           
            res.redirect('/auth/login')
            return;
        }

        User.findOne({_id: req.cookies.id })
        .then(data=> {

            if(!data){
                res.redirect('/auth/login')
                return;
            }
            next()
        })
    }

    checkUser(req,res,next){
    
        const cookie = req.cookies.id

        if(cookie){
          
             User.findOne({_id: cookie })
             .then(user =>{

                res.locals.user = {user:MongooseToObject(user)}
                const Usermodel = res.locals.user
                res.locals.name = Usermodel.name;
                next()
             })
        }
        else{
            res.locals.user = null
            next()
        }
     
    }

   
}

module.exports = new AuthMiddleware;