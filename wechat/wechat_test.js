const express = require('express');


//引入auth模块
const auth =require('./wx/auth')

const app = express();

//服务器有效性
app.use(auth())

// 监听端口号
app.listen(8080, () => console.log('服务器启动成功了~'))
