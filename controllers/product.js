const Product = require('../models/product')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')


exports.getProductById = (req,res,next,id)=>{
    Product.findById(id).exec((err,product)=>{
        if(err){
            return res.status(400).json({
                error:"Product Not Found"
            })
        }
        req.product=product
        next()
    })
}

exports.createProduct=(req,res)=>{
    let form =new formidable.IncomingForm()
    form.keepExtensions=true
    
    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:"Something is going wrong"
            })
        }


        //restriction on fields 
        const {name,description,price,stock,category} = fields
        if(!name || !description || !price || !stock || !category){
            return res.status(400).json({
                error:"Please fill all fields"
            })
        }

        let product = new Product(fields)

        //handling file
        if(file.photo){
            if(file.photo.size>3145728){
                return res.status(400).json({
                    error:"Size of image is too big"
                })
            }
            //uploding image
            product.photo.data= fs.readFileSync(file.photo.path)
            product.photo.contentType=file.photo.type
        }
        
        //save product to db
        product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    error:"Product can not save into DB"
                })
            }
            res.json(product)
        })
    })
}


exports.getProduct=(req,res)=>{
    req.product.photo=undefined
    return res.json(req.product)
}

//middleware
exports.photo=(req,res,next)=>{
    if(req.product.photo.data){
        res.set("Content-Type",req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}


exports.updateProduct=(req,res)=>{
    let form =new formidable.IncomingForm()
    form.keepExtensions=true
    
    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:"Something is going wrong"
            })
        }

        //updatation code
        let product = req.product
        product= _.extend(product,fields)

        //handling file
        if(file.photo){
            if(file.photo.size>3145728){
                return res.status(400).json({
                    error:"Size of image is too big"
                })
            }
            product.photo.data= fs.readFileSync(file.photo.path)
            product.photo.contentType=file.photo.type
        }
        
        //save product to db
        product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    error:"Product can not update into DB"
                })
            }
            res.json(product)
        })
    })
}

exports.deleteProduct=(req,res)=>{
    let product = req.product
    product.remove((err,product)=>{
        if(err){
            return res.status(400).json({
                error:"Can not delete"
            })
        }
        res.json({
            message:"product deleted"
        })
    })
}

exports.getAllProduct=(req,res)=>{
    let limit = req.query.limit ? parseInt(req.query.limit) : 8
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"

    Product.find()
    .select("-photo")
    .populate("category")
    .limit(limit)
    .sort([[sortBy,"asc"]])
    .exec((err,products)=>{
        if(err){
            return res.status(400).json({
                error:"No product found"
            })
        }
        res.json(products)
    })
}

//middleware to update stock and sold 
exports.updateStock=(req,res,next)=>{
    let myOpreations = req.body.order.products.map(product=>{
        return {
            updateOne:{
                filter:{_id:product._id},
                update:{$inc: {stock : -product.count, sold: +product.count}}
            }
        }
    })

    Product.bulkWrite(myOpreations,{},(err,products)=>{
        if(err){
            return res.status(400).json({
                error:"Bulk Write Opreation failed"
            })
        }
        next()
    })

}

exports.getAllUniqueCategories = (req,res)=>{
    Product.distinct("category",{},(err,category)=>{
        if(err){
            return res.status(400).json({
                error:"No category found"
            })
        }
        res.json(category)
    })
}