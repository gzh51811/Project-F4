const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const Router = express.Router();
const { create } = require('../js/token');
const MongoClient = mongodb.MongoClient;
var urlencodedParser = bodyParser.urlencoded({ extended: false });
let jsonParser = bodyParser.json();
//验证用户名 是否存在
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
//登录
Router.post('/', urlencodedParser, jsonParser, async (req, res) => {
    //获取前端数据
    let { user, psw } = req.body;
    
    MongoClient.connect('mongodb://127.0.0.1:27017', async (err, client) => {
        if (err) throw err;
        let db = client.db('pshop');
        let admin = db.collection('user');
        let data = await admin.findOne({ "username": user });
        console.log(data)
        let _token = create(data.username);

        if (user === data.username && psw === data.password) {
            res.send({
                username:data.username,
                password:data.password,
                msg: 'success',
                _token
            });
        } else {
            res.send('unsuccess');
        }

    });
});
module.exports = Router;