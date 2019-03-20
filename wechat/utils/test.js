const rpa = require('request-promise-any');

function asyncfunc(){
    let ret = "who are you";

    return new Promise(resolve => {
        setTimeout(() => {
            resolve(ret)
        }, 1000)
    })
}

(async function() {
    let ret = await asyncfunc()

    console.log(ret)
}) ()