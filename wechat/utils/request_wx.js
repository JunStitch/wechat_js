const rpa = require('request-promise-any');

var url = 'http://4b027f7f.ap.ngrok.io/materials/getLatest?catalogName=%E5%85%AC%E5%8F%B8%E6%B4%BB%E5%8A%A8'; 

// var rpa_array ={};
// var array_num = 0;
 
async function RequestWX(){
     let options ={
         method : 'GET',
         url: url,
     }
     let rpa_body = await rpa(options);

     console.log("rpabody type: ", typeof(rpa_body));
     
     rpa_array = JSON.parse("["+ rpa_body + ']');
    //  console.log("rpa_array type: ", typeof(rpa_array[0][0]));
     array_num =  rpa_array[0].length;
     console.log('num: ', array_num);
     console.log(rpa_array[0][0]);

     return array_num

 }
//  module.exports.RequestWX = RequestWX;
RequestWX()

// module.exports = {
//     rpa_array,
//     array_num,
// }


 
//  module.exports =  function(name, age) {
//     this.name = name ;
//     this.age = age;
//     this.about = function(){
//         console.log(this.name + ' is ' + this.age + ' years old');
//     }
// }


// module.exports = async function(){
//     let options ={
//         method : 'GET',
//         url: url,
//     }
//     let rpa_body = await rpa(options);

//     this.about = function(){
//         console.log("你想不到吧")
//     }

// }

// class Request_WX{
//     constructor(url){
//         this.url = url;
//         console.log("constructor");
//     }

//     async RequestWX(){
//         let options ={
//             method : 'GET',
//             url: this.url,
//         }
//         let rpa_body = await rpa(options);
   
//         console.log("rpabody type: ", typeof(rpa_body));
//         rpa_array = JSON.parse("["+ rpa_body + ']');
//        //  console.log("rpa_array type: ", typeof(rpa_array[0][0]));
//         array_num =  rpa_array[0].length;
//         console.log('num: ', array_num);
//         console.log(rpa_array[0][0]['url']);
//         return array_num;
//     }


// }

//var requestwx = new Request_WX('http://80fd49ea.ap.ngrok.io/materials/getLatest?catalogName=%E5%85%AC%E5%8F%B8%E6%B4%BB%E5%8A%A8');

// num = requestwx.RequestWX()

// console.log(num)