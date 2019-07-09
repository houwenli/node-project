var express = require('express');
var router = express.Router();
var connection = require('./connection');
var statuCode = require('./statuCode');

router.get('/', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    var param = req.query;

    var {username, password} = param;

    connection().then(connectionres => {
        if (!username || !password) {
            res.send({
                ret: statuCode.paramError,
                msg: statuCode.paramErrorMsg
            });
            return;
        }
        var connectionOpe = connectionres;
        var  sql = 'SELECT * FROM users where username="' + username + '" and password="' + password + '"';
        //查
        connectionOpe.query(sql,function (err, result) {
            if(err){
                res.send({
                    ret: statuCode.selectError,
                    msg: statuCode.selectErrorMsg + sql 
                });
            }
            
            //如果没有数据，则登陆信息不存在
            if(result.length == 0) {
                res.send({
                    ret: statuCode.noLoginInfo,
                    msg: statuCode.noLoginInfoMsg
                });
            } else {
                // 成功，写入cookie
                // todo
                res.send({
                    ret: statuCode.success,
                    msg: statuCode.successMsg
                });
            }
        });
    }).catch(err => {
        res.send({
            ret: statuCode.connectDbError,
            msg: statuCode.connectDbErrorMsg
        });
    })
})

module.exports = router;