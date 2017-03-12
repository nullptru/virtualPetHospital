const fetchMock = require('fetch-mock');

let response = {};

function clear() {
    for(let key in response){
        delete response[key];
    }
}
fetchMock
    .post(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:3001/login/validate');
        if (isMatch){
            let bodyObj = JSON.parse(opts.body);
            response.isValidate = (bodyObj.username === 'test' && bodyObj.password === 'test') || (bodyObj.username === 'admin' && bodyObj.password === 'admin');
            if (!response.isValidate) response.errorMsg = "输入信息有误, 请重新输入";
            if (response.isValidate && bodyObj.username === 'admin'){response.userType = 1} else response.userType = 0;
            console.log(url, opts);
        }
        return isMatch;
    }, response)
    .get(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:3001/admin/user') && (opts === undefined || opts.method.toLowerCase() === 'get');
        if (isMatch){
            console.log(`match get: ${url}`, opts);
            response.data = [{
                'id' : 1,
                'username' : "Nico",
                'userType' : '0'
            },
            {
                'id' : 2,
                'username' : "Gakki",
                'userType' : '1'
            },
            {
                'id' : 3,
                'username' : "DG",
                'userType' : '1'
            }];
        }
        return isMatch;
    }, response)
    .delete(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:3001/admin/user')  && (opts === undefined || opts.method.toLowerCase() === 'delete');
        if (isMatch){
            console.log(`match delete: ${url}`, opts);
            response.data = {result : true};
        }
        return isMatch;
    }, response)
    .post(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:3001/admin/user')  && (opts === undefined || opts.method.toLowerCase() === 'post');
        if (isMatch){
            console.log(`match post: ${url}`, opts);
            response.data = {result : true};
        }
        return isMatch;
    }, response)
    .put(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:3001/admin/user')  && (opts === undefined || opts.method.toLowerCase() === 'put');
        if (isMatch){
            console.log(`match put: ${url}`, opts);
            response.data = {result : true};
        }
        return isMatch;
    }, response);