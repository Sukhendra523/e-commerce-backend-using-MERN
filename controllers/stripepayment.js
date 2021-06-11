const stripe = require('stripe')("sk_test_51GvEvkEhUWYvq8D2P0E9mXzUcQAoStj8YmZqsR341spNrIKxgPzQYP66PeQqiN3nyuqqwv95b4vT9L4mbs52Cm0A00KCEz1MJu")
const uuid = require('uuid/v4')

exports.makepayment=(req,res)=>{
    const {products,token} = req.body
    console.log("products :" ,products)
    const amount = products.reduce((total,product)=>{
        return total+product.price
    },0)
    const idempotencyKey = uuid()
    return stripe.customers.create({
        email:token.email,
        source:token.id
    }).then(customer=>{
        stripe.charges.create({
            amount:amount*100,
            currency:"usd",
            customer:customer.id,
            receipt_email:token.email,
            description: `Purchased the product`,
            shipping: {
              name: token.card.name,
              address: {
                line1: token.card.address_line1,
                line2: token.card.address_line2,
                city: token.card.address_city,
                country: token.card.address_country,
                postal_code: token.card.address_zip
              }
            }
        },{idempotencyKey})
        .then(result=>res.status(200).json(result))
        .catch(err=>console.log(err))
    })
}