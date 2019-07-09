var mysql = require('mysql');

//创建连接
var connection = mysql.createConnection({
    host     : '47.105.41.75',
    user     : 'root2',
    password : 'HOU@qiao',
    database : 'node'
});
// var connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'root',
//     database : 'node'
// });
//执行创建连接 
connection.connect(err => {
    if (err) {
        console.log(err)
    } else {
        console.log('链接成功了')
    }
});
var  sql = 'SELECT * FROM users where username="111" and password="222"';
connection.query(sql,function (err, result) {
    if(err){
        console.log(err)
        return
    }
    
    //如果没有数据，则登陆信息不存在
    console.log(111, result)
});