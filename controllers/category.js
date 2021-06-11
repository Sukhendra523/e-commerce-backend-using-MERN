const Category = require('../models/category')

exports.getCategoryById=(req,res,next,id)=>{
    Category.findById(id).exec((err,cate)=>{
        if(err){
            return res.status(400).json({
                error:"Category Not Found"
            })
        }
        req.category=cate
        next()
    })
}

exports.createCategory=(req,res)=>{
    const category = new Category(req.body)
    category.save((err,category)=>{
        if(err){
            return res.status(400).json({
                error:"Not able to save"
            })
        }
        res.json(category)
    })
}

exports.getCategory=(req,res)=>{
    return res.json(req.category)
}

exports.getAllCategory=(req,res)=>{
    Category.find({},(err,categories)=>{
        if(err){
            return res.status(400).json({
                error:"not able to get categories"
            })
        }
        res.json(categories)
    })
}

//first update approach
// exports.updateCategory=()=>{
//     Category.findByIdAndUpdate(
//         req.category._id,
//         {$set:req.body},
//         {new:true},
//         (err,updatedCategory)=>{
//             if(err){
//                 return res.status(400).json({
//                     error:"not able to update"
//                 })
//             }
//             res.json(updatedCategory)
//         }
//         )
// }


//2nd update approach
exports.updateCategory = (req,res)=>{
    const category = req.category
    category.name = req.body.name
    category.save((err,updatedCategory)=>{
        if(err){
            return res.status(400).json({
                error:"not able to update"
            })
        }
        res.json(updatedCategory)
    })
}

exports.removeCategory=(req,res)=>{
    const category = req.category
    category.remove((err,deletedCategory)=>{
        if(err){
            return res.status(400).json({
                error:"not able to update"
            })
        }
        res.json({
            message:`$deletedCategory is deleted successfully`
        })
    })
}