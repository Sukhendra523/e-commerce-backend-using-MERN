const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        maxlength:32
    }
},{timestamp:true})

module.exports = mongoose.model('Category',categorySchema)