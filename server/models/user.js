const mongoose=require('mongoose')

//get an instance of mongoose schema
const Schema=mongoose.Schema

//create a new schema for the user data in mongodb// schema means like user table
const userSchema = new Schema({
    email:String,
    password: String

})

//need to export
module.exports=mongoose.model('user',userSchema,'eventscollection')
