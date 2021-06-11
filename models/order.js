//CommonJS
const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const productCartSchema = mongoose.Schema({
    product:{
        type:ObjectId,
        ref:'Product'
    },
    name:String,
    count:Number,
    price:Number
})

const ProductCart = mongoose.model('ProductCart',productCartSchema)

const orderSchema = mongoose.Schema({
    products:[productCartSchema],
    transaction_id:{},
    amount:Number,
    address:String,
    status:{
        type:String,
        default:"Received",
        enum:["Canceled","Delivered","shipped","Processing","Received"]
    },
    updated:Date,
    user:{
        type:ObjectId,
        ref:'User'
    }
},{timestamp:true})

const Order = mongoose.model('Order',orderSchema)

module.exports= {ProductCart,Order}


//With ES6 
/* 
import { Schema, model } from 'mongoose'
const {ObjectId} = Schema

const productCartSchema = Schema({
    product:{
        type:ObjectId,
        ref:'Product'
    },
    name:String,
    count:Number,
    price:Number
})

const ProductCart = model('ProductCart',productCartSchema)

const orderSchema = Schema({
    products:[productCartSchema],
    transaction_id= {},
    amount:Number,
    address:String,
    updated:Date,
    user:{
        type:ObjectId,
        ref:'User'
    }
},{timestamp:true})

const Order = model('Order',orderSchema)

export default {ProductCart,Order}
 */