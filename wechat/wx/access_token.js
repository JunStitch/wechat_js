const { appID, appsecret } = require('../config')

// npm install request request-promise-native, 但只需要引入request-promise-native
const rp = require('request-promise-native')

const { writeFile, readFile } = require('fs')


class Wechat {
    constructor() {

    }
    /* 
        getAccessToken()的返回值是一个Promise对象
    */
    getAccessToken() {

        const url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appID + '&secret=' + appsecret + ''

        return new Promise((resolve, reject) => {
            rp({ method: 'GET', url, json: true })
                .then(res => {
                    // console.log(res);
                    res.expires_in = Date.now() + (res.expires_in - 300) * 1000;
                    // 将Promise 对象改成成功的状态
                    resolve(res);
                })
                .catch(err => {
                    console.log(err);
                    reject("getAccessToken出现error，" + err)
                })
        })

    }

    /* 
        saveAccessToken() 用来存access_token
    */
    saveAccessToken(accessToken) {
        //将对象转换为字符串  
        accessToken = JSON.stringify(accessToken)
        //将access_token保存文件
        return new Promise((resolve, reject) => {
            writeFile('./accessToken.txt', accessToken, err => {
                if (!err) {
                    console.log("文件保存成功")
                    resolve()
                } else {
                    console.log("文件保存异常")
                    reject(err)
                }
            })
        })
    }

    //读取(readAccessToken)
    readAccessToken() {
        //读取本地的access_token文件
        return new Promise((resolve, reject) => {
            readFile('./accessToken.txt', (err, data) => {
                if (!err) {
                    console.log("文件读取成功")
                    //将json字符串转换成js对象
                    data = JSON.parse(data)
                    resolve(data)
                } else {
                    console.log("文件读取异常")
                    reject("readAccessToken" + err)
                }
            })
        })

    }

    // 读取本地文件 判断是否过期 isValidAccessToken
    isValidAccessToken(data) {
        //验证传入的参数是否是有效的
        if (!data && !data.access_token && !data.expires_in) {
            //acess_token无效
            console.log("无效的accessToken")
            return false
        }

        //检测access_token是否在有效期内
        return data.expires_in > Date.now()
        //如果过期时间大于现在时间 返回ture
    }

    //用来获取没有过期的access_token
    fetchAccessToken(){
        if (this.access_token && this.expires_in && this.isValidAccessToken(this)) {
            //token有效 直接使用
            console.log('token有效, 直接使用')
            return Promise.resolve({
                access_token: this.access_token,
                express_in: this.expires_in
            })
        }

        return  this.readAccessToken()
                .then(async res => {
                    if (this.isValidAccessToken(res)) {
                        // 有效的access_token
                        console.log("有效的accessToken");
                        // resolve(res);
                        return Promise.resolve(res);
                    } else {
                        const res = await this.getAccessToken();
                        
                        await this.saveAccessToken(res);
                        // resolve(res);
                        return Promise.resolve(res);
                    }
                })
                .catch(async err => {
                    const res = await this.getAccessToken();
                        
                    await this.saveAccessToken(res);
                    // resolve(res);
                    return Promise.resolve(res);
                })
                .then(res => {
                    console.log(res)
                    console.log('token无效, 返回使用')
                    this.access_token = res.access_token;
                    this.expires_in = res.expires_in;
                    return Promise.resolve(res);
                    // return {access_token:this.access_token, expires_in:this.expires_in};
                })
    }

    createMenu(menu){
        return new Promise(async (resolve, reject) => {
            try{
                const data = await this.fetchAccessToken();

                console.log(data.access_token);
    
            }
            catch(e){
                console.log("createMenu 出错，" + e)
            }
        })
    }
}

w = new Wechat()
w.createMenu("123")
// h = await w.fetchAccessToken();
// console.log(h.access_token)

// const g = h.then(function(value) {
//     // console.log(value.access_token)
//     resolve(value)
// })

