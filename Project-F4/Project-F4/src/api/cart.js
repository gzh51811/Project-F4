const express = require('express');
const bodyParser = require('body-parser');
const Router = express.Router();
//引入数据库
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

//格式
let urlencodedParser = bodyParser.urlencoded({ extended: false });
let jsonParser = bodyParser.json();
//增加商品数量
Router.get('/', urlencodedParser, jsonParser, async (req, res) => {
    let { shuju, id, value, name } = req.query;
    id = id * 1;
    value = value * 1
    if (shuju === "update") {
        MongoClient.connect("mongodb://localhost:27017", async function (err, client) {
            if (err) throw err;

            let db = client.db('pshop'); //连接数据库
            let collecton = db.collection('cart');
            let data_update = await collecton.updateOne({ "goods_id": id }, { $set: { 'num': value } })
            res.send(data_update)
        })
    }
    ///数据渲染
    if (shuju === 'xl') {
        MongoClient.connect("mongodb://localhost:27017", async function (err, client) {
            if (err) throw err;

            let db = client.db('pshop'); //连接数据库
            // 使用某个集合
            // let num=10;
            let collecton = db.collection('cart');
            let data = await collecton.find({ "username": name }).limit(10).toArray();
            client.close();
            // 查全部返回长度
            res.send(data)
        })
    }
});
// const db = require('./modules/db');
//详情页添加购物车
Router.post('/', urlencodedParser, jsonParser, async (req, res) => {
    let { params } = req.body;
    let { id, num, name } = params;
    id = id * 1;

    MongoClient.connect("mongodb://localhost:27017", async function (err, client) {
        if (err) throw err;

        //购物车的该用户下有该产品 ，更新数据
        let db = client.db('pshop');
        let cart = db.collection('cart');
        let list = db.collection('list');
        let data = await cart.find({ $and: [{ "good_id": id }, { "username": name }] }).toArray();
        let date = await list.find({ $and: [{ "good_id": id }, { "username": name }] }).toArray();

        if (data.length > 0) {
            //有该商品，更新数量
            MongoClient.connect("mongodb://localhost:27017", async function (err, client) {
                if (err) throw err;
                let dbw = client.db('pshop');//连接数据库
                let collection = dbw.collection('cart')
                let data1 = await collection.update({ 'goods_id': id }, { $inc: { 'num': num } })
                res.send(data1);
            });
        } else {
            //购物车无该商品
            let dbw = client.db('pshop');//连接数据库
            let collection = dbw.collection('cart')
            let data2 = date[0];
            let date1 = await collection.insertMany({ ...data2, 'num': num, "username": name });
            res.send(date1)
        }
    });
    //删除商品

});
Router.delete('/', urlencodedParser, jsonParser, async (req, res) => {
    let { id, name } = req.query
    id = id * 1
    MongoClient.connect("mongodb://localhost:27017", async function (err, client) {
        if (err) throw err;

        let db = client.db('pshop'); //连接数据库
        //连接集合
        let collecton = db.collection('cart');

        let data_1 = await collecton.deleteOne({ "goods_id": id, "username": name });
        res.send(data_1)
    })

});
module.exports = Router;