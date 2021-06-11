const express = require('express')
const router = express.Router()
const {isSignedIn,isAuthenticated,isAdmin} = require('../controllers/auth')
const {getUserById} = require('../controllers/user')
const {
    getCategoryById,
    createCategory,
    getCategory,
    getAllCategory,
    updateCategory,
    removeCategory
} = require('../controllers/category')

//prams
router.param('userId',getUserById)
router.param('categoryId',getCategoryById)

//routes
//create routes
router.post('/category/create/:userId',isSignedIn,isAuthenticated,isAdmin,createCategory)

//read routes
router.get('/category/:categoryId',getCategory)
router.get('/category',getAllCategory)

//update route
router.put(
    '/category/:categoryId/:userId',
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateCategory
)


//delete route
router.delete(
    '/category/:categoryId/:userId',
    isSignedIn,
    isAuthenticated,
    isAdmin,
    removeCategory
)


module.exports=router
