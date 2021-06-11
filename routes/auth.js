const express = require('express')
const router = express.Router()
const {signout,signup,signin,isSignedIn} = require('../controllers/auth')
const {check} = require('express-validator')


router.post('/signup',[
    check("email","email is required").isEmail(),
    check("password","password should be  at least 5 char").isLength({min:5})
],signup)

router.post('/signin',[
    check('email',"please enter a valid email").isEmail(),
    check('password',"Password is required").isLength({min:1})
],signin)

router.get('/signout',signout)

router.get('/protected',isSignedIn,(req,res)=>{
    res.json({id:req.auth})
})

module.exports=router