const express = require('express');
const bodyParser = require('body-parser');
const Router = express.Router();
//引入数据库
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
//格式
let urlencodedParser = bodyParser.urlencoded({ extended: false });
let jsonParser = bodyParser.json();

Router.post('/', urlencodedParser, jsonParser, async (req, res) => {
    let { shuju } = req.body;
    console.log(1, req.body)
    if (shuju === 'zhuangchang') {
        MongoClient.connect("mongodb://localhost:27017", async function (err, client) {
            if (err) throw err;

            let db = client.db('pshop'); //连接数据库

            let collecton = db.collection('homezc');
            let data = await collecton.find().limit(8).toArray();
            client.close();
            // 查全部返回长度
            // console.log(data)
            res.send(data)
        })
    }
    if (shuju === 'danpin') {
        MongoClient.connect("mongodb://localhost:27017", async function (err, client) {
            if (err) throw err;

            let db = client.db('pshop'); //连接数据库

            let collecton = db.collection('homedp');
            let data = await collecton.find().limit(8).toArray();
            client.close();
            // 查全部返回长度
            // console.log(data)
            res.send(data)
        })
    }
});

Router.get('/', urlencodedParser, jsonParser, async (req, res) => {
    let { shuju, cate } = req.query;
    if (shuju === 'zhuangchang' && cate === "lanjiazai") {
        MongoClient.connect("mongodb://localhost:27017", async function (err, client) {
            if (err) throw err;
            let db = client.db('pshop'); //连接数据库
            // 使用某个集合
            let { length, page } = req.query;
            let collecton = db.collection('homezc');
            let data = await collecton.find().skip(page * length).limit(8).toArray();
            client.close();

            //查全部返回长度
            res.send(data)
        })
    }
    if (shuju === 'danpin' && cate === "lanjiazai") {
        MongoClient.connect("mongodb://localhost:27017", async function (err, client) {
            if (err) throw err;
            let db = client.db('pshop'); //连接数据库
            // 使用某个集合
            let { length, page } = req.query;
            let collecton = db.collection('homedp');
            let data = await collecton.find().skip(page * length).limit(8).toArray();
            client.close();

            //查全部返回长度
            res.send(data)
        })
    }
});

module.exports = Router;