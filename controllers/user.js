const User = require('../models/user')
const Order = require('../models/order')

exports.getUserById=(req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:"no user found"
            })
        }
        req.profile=user
        next()
    })
}

exports.getUser=(req,res)=>{
    req.profile.salt=undefined
    req.profile.encryp_password=undefined
    return res.json(req.profile)
}

exports.updateUser=(req,res)=>{
    User.findByIdAndUpdate(
        {_id:req.profile._id},
        {$set:req.body},
        {new:true,useFindAndModify:false},
        (err,user)=>{
            if(err){
                return res.status(400).json({
                    error:"no user found"
                })
            }
            user.salt=undefined
            user.encryp_password=undefined
            res.json(user)
        }
        )
}


exports.userPurchaseList=(req,res)=>{
    Order.find({user:req.profile._id})
    .populate('user',"_id Name")
    .exec((err,order)=>{
        if(err){
            return res.status(400).json({
                error:"No Orders in this account"
            })
        }
        return res.json(order)
    })
}


exports.pushOrderInPurchaseList=(req,res,next)=>{
    let purchases=[]
    req.body.order.products.forEach(product => {
        purchases.push({
            _id:product._id,
            name:product.name,
            description:product.description,
            category:product.category,
            quantity:product.quantity,
            ammount:req.body.order.ammount,
            transaction_id:req.body.order.transaction_id
        })    
    });

    //store purchased products in purchase list
    User.findOneAndUpdate(
        {_id:req.profile._id},
        {$push :{purchases:purchases}},
        {new:true},
        (err,purchases)=>{
            if(err){
                return  res.status(400).json({
                    error:"Unable to save purchase list"
                })
            }
            next()
        }
    )
}

// Geting all user from database
// exports.getAllUser=(req,res)=>{
//     User.find({},(err,users)=>{
//         if(err || !users){
//             return res.status(403).json({
//                 error:"No user Found"
//             })
//         }
//         res.json(users)
//     })

// }