// var request = require("ajax-request")

// request({
//     url: "http://4b027f7f.ap.ngrok.io/materials/getLatest?catalogName=%E5%85%AC%E5%8F%B8%E5%8A%A8%E6%80%81",
//     method: 'GET',
//     data: {}
// }, function(err, res, body){
//     console.log(body)
// });


var request = require("request")

request("http://4b027f7f.ap.ngrok.io/materials/getLatest?catalogName=%E5%85%AC%E5%8F%B8%E5%8A%A8%E6%80%81", {json: true}, (err, res, body) => {
    if(err){return console.log(err)}
    console.log("length: " , body.length)
    console.log(body[0]['picUrl'])
})  



var replynews = '<xml>' +
'<ToUserName><![CDATA[message.FromUserName ]]></ToUserName> ' +
'<FromUserName><![CDATA[ message.ToUserName]]></FromUserName> ' +
'<CreateTime>'+Date.now()+'</CreateTime> ' +
'<MsgType><![CDATA[news]]></MsgType>' 
;

request("http://4b027f7f.ap.ngrok.io/materials/getLatest?catalogName=%E5%85%AC%E5%8F%B8%E5%8A%A8%E6%80%81", {json: true}, (err, res, body) => {
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
        
    console.log(body[0])
    replynews = replynews + '</Articles></xml>';
        
    console.log(replynews)

}) 

/* 
<xml>
<ToUserName><![CDATA[message.FromUserName ]]></ToUserName> 
<FromUserName><![CDATA[ message.ToUserName]]></FromUserName> 
<CreateTime>1553066795535</CreateTime> 
<MsgType><![CDATA[news]]></MsgType> 
<ArticleCount>4</ArticleCount>
<Articles>
<item><Title><![CDATA[testRestful]]></Title><Description><![CDATA[null]]></Description><PicUrl><![CDATA[http://4b027f7f.ap.ngrok.io:80/img/94461553052264875.jpg]]></PicUrl><Url><![CDATA[http://4b027f7f.ap.ngrok.io:80/materials/7]]></Url></item>
<item><Title><![CDATA[jj动态]]></Title><Description><![CDATA[null]]></Description><PicUrl><![CDATA[http://4b027f7f.ap.ngrok.io:80/img/96591553047107830.jpg]]></PicUrl><Url><![CDATA[http://4b027f7f.ap.ngrok.io:80/materials/5]]></Url></item>
<item><Title><![CDATA[公众号开发ing]]></Title><Description><![CDATA[null]]></Description><PicUrl><![CDATA[http://4b027f7f.ap.ngrok.io:80/img/55481552983075147.jpg]]></PicUrl><Url><![CDATA[http://4b027f7f.ap.ngrok.io:80/materials/4]]></Url></item>
<item><Title><![CDATA[更多]]></Title><Description><![CDATA[null]]></Description><PicUrl><![CDATA[null]]></PicUrl><Url><![CDATA[http://4b027f7f.ap.ngrok.io:80/]]></Url></item>

</Articles>
</xml>
*/