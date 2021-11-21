module.exports = { 
    multipleMongooseToObject : (mongooses) =>{
         return mongooses.map((mongoose) => mongoose.toObject());
    },
    MongooseToObject : (mongoose) =>{
        return mongoose ? mongoose.toObject() : mongoose;
    }
};