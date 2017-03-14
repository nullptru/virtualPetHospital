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
            let bodyObj = JSON.parse(opts.body), isValidate = (bodyObj.username === 'test' && bodyObj.password === 'test') || (bodyObj.username === 'admin' && bodyObj.password === 'admin');
            response.data = {validate : isValidate};
            if (!isValidate) response.err = "输入信息有误, 请重新输入";
            if (isValidate && bodyObj.username === 'admin'){response.data.userType = 1} else response.data.userType = 0;
            console.log(url, opts);
        }
        return isMatch;
    }, response)
    .get(function (url, opts) {
        clear();
        let isMatch = (url.match(/http:\/\/localhost:3001\/admin\/user(\/\d*)?/)) && (opts === undefined || opts.method.toLowerCase() === 'get');
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
            response.pages = 3;
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
    }, response)
    .get(function (url, opts) {
        clear();
        let isMatch = (url.match(/http:\/\/localhost:3001\/admin\/medicine(\/\d*)?/)) && (opts === undefined || opts.method.toLowerCase() === 'get');
        if (isMatch){
            console.log(`match get: ${url}`, opts);
            response.data = [{
                'id' : 1,
                'medicineName' : "风油精",
                'medicinePrice' : 100,
                'medicineType' : 0,
                'description' : '试了就知道',
            },
                {
                    'id' : 2,
                    'medicineName' : "碳酸水",
                    'medicinePrice' : 200,
                    'medicineType' : 0,
                    'description' : '试了就知道',
                },
                {
                    'id' : 3,
                    'medicineName' : "蜡烛",
                    'medicinePrice' : 200,
                    'medicineType' : 1,
                    'description' : '试了就知道试了就知道试了就知道试了就知道试了就知道',
                }];
            response.pages = 3;
        }
        return isMatch;
    }, response)
    .delete(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:3001/admin/medicine')  && (opts === undefined || opts.method.toLowerCase() === 'delete');
        if (isMatch){
            console.log(`match delete: ${url}`, opts);
            response.data = {result : true};
        }
        return isMatch;
    }, response)
    .post(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:3001/admin/medicine')  && (opts === undefined || opts.method.toLowerCase() === 'post');
        if (isMatch){
            console.log(`match post: ${url}`, opts);
            response.data = {result : true};
        }
        return isMatch;
    }, response)
    .put(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:3001/admin/medicine')  && (opts === undefined || opts.method.toLowerCase() === 'put');
        if (isMatch){
            console.log(`match put: ${url}`, opts);
            response.data = {result : true};
        }
        return isMatch;
    }, response)

    .get(function (url, opts) {
        clear();
        let isMatch = (url.match(/http:\/\/localhost:3001\/admin\/record(\/\d*)?/)) && (opts === undefined || opts.method.toLowerCase() === 'get');
        if (isMatch){
            console.log(`match get: ${url}`, opts);
            response.data = [{
                'id' : 1,
                'time' : "2015-11-11",
                'petName':'Kity',
                'petType' : '猫科动物🐱',
                'description' : '打死',
                'price' : 100,
            },
                {
                    'id' : 2,
                    'time' : "2016-11-11",
                    'petName':'Cheese',
                    'petType' : '犬科动物🐩',
                    'description' : '打死',
                    'price' : 100,
                },
                {
                    'id' : 3,
                    'time' : "2017-11-11",
                    'petName':'YMR',
                    'petType' : '猫科动物🐱',
                    'description' : '打死',
                    'price' : 100,
                }];
            response.pages = 3;
        }
        return isMatch;
    }, response)
    .delete(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:3001/admin/record')  && (opts === undefined || opts.method.toLowerCase() === 'delete');
        if (isMatch){
            console.log(`match delete: ${url}`, opts);
            response.data = {result : true};
        }
        return isMatch;
    }, response)
    .post(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:3001/admin/record')  && (opts === undefined || opts.method.toLowerCase() === 'post');
        if (isMatch){
            console.log(`match post: ${url}`, opts);
            response.data = {result : true};
        }
        return isMatch;
    }, response)
    .put(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:3001/admin/record')  && (opts === undefined || opts.method.toLowerCase() === 'put');
        if (isMatch){
            console.log(`match put: ${url}`, opts);
            response.data = {result : true};
        }
        return isMatch;
    }, response);