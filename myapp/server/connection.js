//加载mysql模块
var mysql = require('mysql');
var databaseConfig = require('./databaseConfig');

var defDatabaseConfig;
if (process.env.NODE_ENV == 'production') {
    defDatabaseConfig = databaseConfig.buildConfig;
} else {
    defDatabaseConfig = databaseConfig.devConfig;
}

var connectDbFunc = function() {
    return new Promise((resolve, reject) => {
        try {
            //创建连接
            var connection = mysql.createConnection({
                host     : defDatabaseConfig.host,
                user     : defDatabaseConfig.user,
                password : defDatabaseConfig.password,
                database : defDatabaseConfig.database
            });
            //执行创建连接 
            connection.connect(err => {
                if (err) {
                    reject(err);
                } else {
                    resolve(connection)
                }
            });
            connection.on("close", function(err) {
                console.log("SQL CONNECTION CLOSED.");
            });
            connection.on("error", err => {
                reject(err);
            });
        } catch (err){
            reject(err);
        }
    })
}

module.exports = connectDbFunc;
