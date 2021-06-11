const mongoose = require('mongoose')
const crypto = require('crypto')
const uuidv1 = require('uuid/v1')
var userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    lastName:{
        type:String,
        maxlength:32,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    userInfo:{
        type:String,
        trim:true
    },
    //TODO : come back here
    encryp_password:{
        type:String,
        required:true
    },
    salt :String,
    role:{
        type:Number,
        default:0
    },
    purchase:{
        type:Array,
        default:[]
    }

})
userSchema.virtual('password')
    .set(function(password){
        this._password=password
        this.salt=uuidv1()
        this.encryp_password=this.securePassword(password)
    })
    .get(function(){
        return this._password
    })
userSchema.methods ={
    authenticate:function(plainpassword){
        return this.securePassword(plainpassword) === this.encryp_password
    },
    securePassword:function(plainpassword){
        if (!plainpassword) return ""
        try {
            return crypto
            .createHmac('sha256',this.salt)
            .update(plainpassword)
            .digest('hex')
        }catch(error){
            return ""
        }
    }
}

module.exports = mongoose.model('User',userSchema)
