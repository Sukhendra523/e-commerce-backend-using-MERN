const mongoose = require('mongoose')

const {ObjectId} = mongoose.Schema

const productSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32
    },
    description:{
        type:String,
        required:true,
        trim:true,
        maxlength:2000
    },
    price:{
        type:Number,
        trim:true,
        required:true,
        maxlength:32
    },
    stock:{
        type:Number,
        trim:true,
        required:true,
        maxlength:32
    },
    sold:{
        type:Number,
        default:0
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    category:{
        type:ObjectId,
        ref:'Category',
        required:true
    }
},{timestamp:true})

module.exports= mongoose.model('Product',productSchema)