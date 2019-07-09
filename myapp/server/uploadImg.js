var express = require('express');
var router = express.Router();
const multer = require('multer')
var connection = require('./connection');
var statuCode = require('./statuCode');

//配置diskStorage来控制文件存储的位置以及文件名字等
var storage = multer.diskStorage({
    // 确定图片存储的位置
    destination: function (req, file, cb){
        cb(null, 'public/uploadImgs')
    },
    // 确定图片存储时的名字,注意，如果使用原名，可能会造成再次上传同一张图片的时候的冲突
    filename: function (req, file, cb){
        cb(null, Date.now() + file.originalname)
    }
});
//生成的专门处理上传的一个工具，可以传入storage、limits等配置
var upload = multer({storage: storage});
router.post('/', upload.single('file'), function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (!req.file) {
        res.json({
            ret: statuCode.noUploadImg,
            data: '',
            msg: statuCode.noUploadImgMsg
        })
        return;
    }
    var url = 'uploadImgs/' + req.file.filename
    
    // 插入图片数据库
    var path = url;
    var type = req.body.typeName;
    var isrec = req.body.isLunbo;
    var time = Math.floor(new Date().getTime() / 1000);
    connection().then(connectionres => {
        var connectionOpe = connectionres;
        var insertSql = `insert into images (path, type, isrec, time) values ("${path}", "${type}", ${isrec}, "${time}")`;
        // 查询数据库有没有
        connectionOpe.query(insertSql,function (err, result) {
            if(err){
                res.send({
                    ret: statuCode.selectError,
                    msg: statuCode.selectErrorMsg
                });
                return
            }
            res.json({
                ret: statuCode.success,
                url: url,
                msg: statuCode.successMsg
            })
        });
    }).catch(err => {
        res.send({
            ret: statuCode.connectDbError,
            msg: statuCode.connectDbErrorMsg+err
        });
    })
})

module.exports = router;