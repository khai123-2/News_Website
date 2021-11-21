const express = require('express')
const app = express()

const siteRouter = require('./site')
const meRouter = require('./me')
const newsRouter = require('./news')
const categoryRouter = require('./category')
const authRouter = require('./auth')

const authMiddleware = require('../app/middleware/auth.middleware')

function route(app){
    app.use('*',authMiddleware.checkUser)
    app.use('/me',authMiddleware.requireAuth,meRouter)
    app.use('/news',authMiddleware.requireAuth,newsRouter)
    app.use('/category',authMiddleware.requireAuth,categoryRouter)
    app.use('/auth',authRouter)
    app.use('/',siteRouter)

}

module.exports = route;