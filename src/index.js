const express = require('express')
const morgan = require('morgan')
const app = express()
const path = require('path')
var exphbs  = require('express-handlebars');
 const db = require('./config/db')

 var cookieParser = require('cookie-parser');
 const methodOverride = require('method-override')
const route = require('./routes/index')

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.set('views',path.join(__dirname, 'resources','views') );

app.use(methodOverride('_method'))
db.connect();

route(app);

app.listen(3000);