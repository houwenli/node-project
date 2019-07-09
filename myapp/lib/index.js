var fs = require('fs'); // 引入fs模块
var path = require('path');
var os = require('os');
var util = require('./util/index');
var fsExtra = require('fs-extra')

var logPath = './data/writeLog.js';

var writeTofile = function () {
    fs.appendFile(path.join(__dirname, logPath), '\r\n' + JSON.stringify(os.cpus()), function(err) {
        if (err) {
            throw err;
        }
     
        // // 写入成功后读取测试
        // fs.readFile(path.join(__dirname, logPath), 'utf-8', function(err, data) {
        //     if (err) {
        //         throw err;
        //     }
        //     console.log(data);
        // });
    });
}

// 移动文件到指定文件夹
var moveFile = function (moveFile, filePath) {
    var moveFilePath = path.join(util.getCurrentDirPath(), moveFile);
    var moveToPath = path.join(util.getCurrentDirPath(), filePath, moveFile);
    console.log(moveFilePath, moveToPath)
    fsExtra.move(moveFilePath, moveToPath, err => {
        if (err) return console.error(err)
      
        console.log('success!')
    })
}

// 移动文件到指定文件夹
var moveFileBack = function (moveFile, filePath) {
    var moveToPath = path.join(util.getCurrentDirPath(), moveFile);
    var moveFilePath = path.join(util.getCurrentDirPath(), filePath, moveFile);
    console.log(moveFilePath, moveToPath)
    fsExtra.move(moveFilePath, moveToPath, err => {
        if (err) return console.error(err)
      
        console.log('success!')
    })
}

module.exports = {
    writeTofile,
    moveFile,
    moveFileBack
}