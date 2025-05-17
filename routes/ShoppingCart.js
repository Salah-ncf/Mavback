const express=require('express')
const ShoppingCartRoute=express.Router()

const ShoppingCartControler=require('../controller/shoppingCart')

ShoppingCartRoute.post('/cart',ShoppingCartControler.postShoppingCart)
ShoppingCartRoute.get('/cart',ShoppingCartControler.getShoppingCart)
ShoppingCartRoute.delete('/cart/:id',ShoppingCartControler.deleteShoppingCart)
module.exports = ShoppingCartRoute;