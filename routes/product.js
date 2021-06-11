const express = require('express')
const router = express.Router()
const {
    createProduct,
    getProductById,
    getProduct,
    photo,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getAllUniqueCategories
} = require('../controllers/product')
const {isSignedIn,isAuthenticated,isAdmin} = require('../controllers/auth')
const {getUserById} = require('../controllers/user')

router.param('userId',getUserById)
router.param('productId',getProductById)


//create
router.post('/product/create/:userId',isSignedIn,isAuthenticated,isAdmin,createProduct)

//read
router.get('/product/:productId',getProduct)
router.get('/product/photo/:productId',photo)

//update
router.put('/product/:productId/:userId',updateProduct)

//delete
router.delete('/product/:productId/:userId',deleteProduct)

router.get('/products',getAllProduct)
router.get('/products/categories',getAllUniqueCategories)



module.exports = router