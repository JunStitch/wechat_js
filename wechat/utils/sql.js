const mysql = require('mysql');

// 引入config模块数据库参数
const {host, user, password, port, database}  = require('../config')


const connection = mysql.createConnection({
    host ,
    user ,
    password,
    port ,
    database
});

connection.connect();


var sql = 'select * from materials ';

connection.query(sql, function(err, result){
    if(err){
        console.log("select error", err.message);
        return;
    }
    console.log(result[0]); // 打印出来第一条数据
});

connection.end();