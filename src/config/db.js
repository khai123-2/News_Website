const mongoose = require('mongoose');




async function connect (){

    try {
    
    await mongoose.connect('mongodb://localhost:27017/News', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
    console.log('Connect successfully!')
    } catch {
        
        console.log('Connect failed')

    }
}

module.exports = {connect}