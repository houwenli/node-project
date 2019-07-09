var express = require('express');
var router = express.Router();
var connection = require('./connection');
var statuCode = require('./statuCode');

router.get('/', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    var param = req.query;

    var {typename, typedesc} = param;

    connection().then(connectionres => {
        if (!typename || !typedesc) {
            res.send({
                ret: statuCode.paramError,
                msg: statuCode.paramErrorMsg
            });
            return;
        }
        var connectionOpe = connectionres;
        var  insertSql = 'insert into imageType (imageType, typeDesc) values ("' + typename + '", "' + typedesc + '")';
        var selectSql = 'SELECT * FROM imageType where imageType="' + typename +'"';
        // 查询数据库有没有
        connectionOpe.query(selectSql,function (err, result) {
            if(err){
                res.send({
                    ret: statuCode.selectError,
                    msg: statuCode.selectErrorMsg
                });
                return
            }
            
            //如果有数据，则已经存在这个图片类型
            if(result.length > 0) {
                res.send({
                    ret: statuCode.hasThisType,
                    msg: statuCode.hasThisTypeMsg
                });
                return
            }
            //增
            connectionOpe.query(insertSql,function (err, result) {
                if(err){
                    res.send({
                        ret: statuCode.selectError,
                        msg: statuCode.selectErrorMsg
                    });
                }
                res.send({
                    ret: statuCode.success,
                    msg: statuCode.successMsg
                });
            });
        });
    }).catch(err => {
        res.send({
            ret: statuCode.connectDbError,
            msg: statuCode.connectDbErrorMsg
        });
    })
    // res.json({'name': 'houwenli', 'age': '18'});
})

module.exports = router;