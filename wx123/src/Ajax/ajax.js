/**promise-polyfill
 * Created by Cx 2016/12/9.
 */
import 'whatwg-fetch';
import Promise from 'promise-polyfill';
const path = require('path');

// To add to window
if (!window.Promise) {
    window.Promise = Promise;
}

/**
 * Ajax 方法
 * @param data  参数
 * @param url 路径 默认为 '/api.do'
 * @returns {*}
 */

export default function ajaxmode(data){
    return fetch('/api.do',{
        method: 'POST',
        body: JSON.stringify(data)
    }).then(function (response) {
        return response.text();
    }).then(function (body) {
        let _body = JSON.parse(body);
        if (_body.errorCode != "0") {
            // console.log(_body);
        }
        return Promise.resolve(JSON.parse(body));
    });
}






