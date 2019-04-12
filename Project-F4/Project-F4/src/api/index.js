const express = require('express');
const Router = express.Router();

const homeRouter = require('./home');
const cartRouter = require('./cart');
// const orderRouter = require('./order')
const regRouter = require('./reg')
const loginRouter = require('./login')
const ordersRouter = require('./cate')
const orders2Router = require('./cate2')
const listRouter = require('./list')

Router.use('/home', homeRouter);
Router.use('/cart', cartRouter);
// Router.use('/order', orderRouter);
Router.use('/reg', regRouter);
Router.use('/login', loginRouter);
Router.use('/cate', ordersRouter)
Router.use('/list', listRouter)
Router.use('/cate2', orders2Router)

module.exports = Router;  