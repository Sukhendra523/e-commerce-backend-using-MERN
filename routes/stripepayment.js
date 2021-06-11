const express = require('express')
const router = express.Router()
const {makepayment} = require('../controllers/stripepayment')
router.post("/stripepayment",makepayment)

module.exports = router