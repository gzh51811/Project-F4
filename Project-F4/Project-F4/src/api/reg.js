const express = require('express');
const bodyParser = require('body-parser');
const Router = express.Router();
//引入数据库
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

//格式
let urlencodedParser = bodyParser.urlencoded({ extended: false });
let jsonParser = bodyParser.json();
//验证用户名是否存在
Router.get('/', urlencodedParser, jsonParser, async (req, res) => {
    let { shuju, name } = req.query;
    ///数据渲染
    if (shuju === 'yz') {
        MongoClient.connect("mongodb://localhost:27017", async function (err, client) {
            if (err) throw err;

            let db = client.db('pshop'); //连接数据库
            // 使用某个集合
            let collecton = db.collection('user');
            let data = await collecton.find({ "username": name }).toArray();
            client.close();
            if (data.length > 0) {
                res.send("yes")
            } else {
                res.send("no")
            }

        })
    }
});
//如果不存在，插入用户列表
Router.post('/', urlencodedParser, jsonParser, async (req, res) => {
    let { name, psw } = req.body;
    console.log(req.body)
    MongoClient.connect("mongodb://localhost:27017", async function (err, client) {
        if (err) throw err;

        let db = client.db('pshop'); //连接数据库

        let collecton = db.collection('user');
        let data = await collecton.insertOne({ "username": name, "password": psw });
        client.close();
        res.send(data)
    })
});

module.exports = Router;