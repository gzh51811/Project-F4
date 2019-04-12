
const express = require('express');
const bodyParser = require('body-parser');
const Router = express.Router();

//引入数据库
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

//格式
let urlencodedParser = bodyParser.urlencoded({ extended: false });
let jsonParser = bodyParser.json();

Router.get('/', urlencodedParser, jsonParser, async (req, res) => {
    let { shuju } = req.query;

    // if (shuju === 'fenlei') {
        MongoClient.connect("mongodb://localhost:27017", async function (err, client) {
            if (err) throw err;

            let db = client.db('config'); //连接数据库
            // 使用某个集合
            // let num=10;
            // let collecton = db.collection('classify');
            let collecton2 = db.collection('classify2');
            // let data = await collecton.find().toArray();
            let data2 = await collecton2.find().toArray();
            client.close();
            // 查全部返回长度
            // console.log(data2)
            res.send(data2)
        })
    // }
});

module.exports = Router;