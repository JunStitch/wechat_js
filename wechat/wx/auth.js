// 中间件函数：验证服务器有效性

//引入sha1模块
const sha1 = require('sha1');

var request = require("request")

var wechat = require('./wechat')



//引入config模块
const config = require('../config')


//引入工具模块
const {getUserDataAsync,formatData,parserXMLDataAsyc} = require('../utils/tool')


module.exports = () =>{

    return async (req,res,next) => {
        // console.log(req.query);
        const {signature,echostr,timestamp,nonce} = req.query
        const {token} = config
    
        const arr = [timestamp,nonce,token];
        const arrSort = arr.sort();
        console.log(arrSort);
        const str = arr.join('')
        console.log(str); 
        const sha1Str = sha1(str)
        console.log(sha1Str);
    
        //测试服务器发送方式
        if (req.method === 'GET'){
            console.log('用户返回get操作')
            //验证消息是否来自服务器
           if (sha1Str===signature) {
               console.log("成功首次连接")
               res.send(echostr)
           } else {
               res.end('error')
           }
        }  else if (req.method === 'POST'){
            console.log('用户返回post操作')
            //验证消息是否来自服务器
            if (sha1Str !== signature) {
               res.end('error')
           }
            
           //接收请求体数据 
           const xmlData = await getUserDataAsync(req);
        //    console.log(xmlData)
           /*
        开发者id      <xml><ToUserName><![CDATA[gh_df872f0c285d]]></ToUserName>
        用户id        <FromUserName><![CDATA[oWDtu1ZTaUIee5ZvNa3KydaXvvQ0]]></FromUserName>
        时间戳        <CreateTime>1542705154</CreateTime>
        消息类型      <MsgType><![CDATA[text]]></MsgType>
        内容          <Content><![CDATA[JJ]]></Content>
        微信消息id    <MsgId>6625868184229598630</MsgId>
                      </xml>
           */
           //将 xml解析为js对象

           const jsData = await parserXMLDataAsyc(xmlData)
        //    console.log(jsData)
           console.log(jsData.xml.Content)

           //格式化数据
           const message = formatData(jsData)
           console.log(message)
        //    console.log(message.FromUserName)

        let content = '测试返回内容';
        let url = 'http://909e4577.ap.ngrok.io';

        if (message.MsgType === 'text'){
            content = "你都发了什么东西呀？";

            const replyMessage = '<xml>' +
            '<ToUserName><![CDATA['+message.FromUserName +']]></ToUserName> ' +
            '<FromUserName><![CDATA['+ message.ToUserName+']]></FromUserName> ' +
            '<CreateTime>'+Date.now()+'</CreateTime> ' +
            '<MsgType><![CDATA[text]]></MsgType>' +
            ' <Content><![CDATA['+ content+']]></Content> ' +
            '</xml>';
            res.send(replyMessage) 

        }
        else if (message.MsgType === 'event' && message.Event === "CLICK") {
            
            if(message.EventKey === "COMPANY_ACTIVITY"){
                content = "公司活动";
                // url += '/materials/getLatest?catalogName=公司活动';
            }
            else if (message.EventKey === "COMPANY_NEWS"){
                content = "公司动态";
                // url += '/materials/getLatest?catalogName=公司动态';
            }
            else if (message.EventKey === "SOLUTIONS"){
                content = "解决方案";
                // url += '/materials/getLatest?catalogName=解决方案';
            }
            url += '/materials/getLatest?catalogName=' + encodeURI(content);

            var replynews = '<xml>' +
            '<ToUserName><![CDATA['+message.FromUserName +']]></ToUserName> ' +
            '<FromUserName><![CDATA['+ message.ToUserName+']]></FromUserName> ' +
            '<CreateTime>'+Date.now()+'</CreateTime> ' +
            '<MsgType><![CDATA[news]]></MsgType>' ;

            request(url, {json: true}, (err, result, body) => {
                if(err){return console.log(err)}

                replynews +=  ' <ArticleCount>' + body.length + '</ArticleCount>' ;
                replynews += '<Articles>';
                for(i = 0; i < body.length; i++){
                    replynews += 
                        '<item>'+
                            '<Title><![CDATA['+ body[i]['title'] +']]></Title>' +
                            '<Description><![CDATA['+ body[i]['description'] +']]></Description>' +
                            '<PicUrl><![CDATA['+ body[i]['picUrl'] + ']]></PicUrl>' +
                            '<Url><![CDATA['+ body[i]['url'] +']]></Url>' +
                        '</item>' ;
                }
                    
                replynews = replynews + '</Articles></xml>';
                console.log(replynews)
                res.send(replynews)   
            })   

        } 
         
        //返回相应给服务器
         //UnhandledPromiseRejectionWarning: Error: Can't set headers after they are sent.
        // res.send(replyMessage) 
        // res.send(replynews)   
        //  res.end('')

        }  else {
           res.end('error')
        }
    }
}