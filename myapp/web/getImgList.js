var express = require('express');
var router = express.Router();
var connection = require('./connection');
var statuCode = require('./statuCode');

router.get('/', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    let query = req.query;
    let type = query.type;

    connection().then(connectionres => {
        var connectionOpe = connectionres;
        var selectSql = `select * from images where type="${type}"`;
        // 查询数据库有没有
        connectionOpe.query(selectSql,function (err, result) {
            if(err){
                res.send({
                    ret: statuCode.selectError,
                    msg: statuCode.selectErrorMsg
                });
                return
            }
            
            res.send({
                ret: statuCode.success,
                msg: statuCode.successMsg,
                data: result
            });
        });
    }).catch(err => {
        res.send({
            ret: statuCode.connectDbError,
            msg: statuCode.connectDbErrorMsg+err
        });
    })
    // res.json({'name': 'houwenli', 'age': '18'});
})

module.exports = router;