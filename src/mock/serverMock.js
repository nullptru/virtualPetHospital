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
        let isMatch = (url === 'http://localhost:8080/login/validate');
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
        let isMatch = (url.match(/http:\/\/localhost:8080\/admin\/user(\/\d*)?/)) && (opts === undefined || opts.method.toLowerCase() === 'get');
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
        let isMatch = (url === 'http://localhost:8080/admin/user')  && (opts === undefined || opts.method.toLowerCase() === 'delete');
        if (isMatch){
            console.log(`match delete: ${url}`, opts);
            response.data = {result : true};
        }
        return isMatch;
    }, response)
    .post(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:8080/admin/user')  && (opts === undefined || opts.method.toLowerCase() === 'post');
        if (isMatch){
            console.log(`match post: ${url}`, opts);
            response.data = {result : true};
        }
        return isMatch;
    }, response)
    .put(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:8080/admin/user')  && (opts === undefined || opts.method.toLowerCase() === 'put');
        if (isMatch){
            console.log(`match put: ${url}`, opts);
            response.data = {result : true};
        }
        return isMatch;
    }, response)
    .get(function (url, opts) {
        clear();
        let isMatch = (url.match(/http:\/\/localhost:8080\/admin\/medicine(\/\d*)?/)) && (opts === undefined || opts.method.toLowerCase() === 'get');
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
        let isMatch = (url === 'http://localhost:8080/admin/medicine')  && (opts === undefined || opts.method.toLowerCase() === 'delete');
        if (isMatch){
            console.log(`match delete: ${url}`, opts);
            response.data = {result : true};
        }
        return isMatch;
    }, response)
    .post(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:8080/admin/medicine')  && (opts === undefined || opts.method.toLowerCase() === 'post');
        if (isMatch){
            console.log(`match post: ${url}`, opts);
            response.data = {result : true};
        }
        return isMatch;
    }, response)
    .put(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:8080/admin/medicine')  && (opts === undefined || opts.method.toLowerCase() === 'put');
        if (isMatch){
            console.log(`match put: ${url}`, opts);
            response.data = {result : true};
        }
        return isMatch;
    }, response)

    .get(function (url, opts) {
        clear();
        let isMatch = (url.match(/http:\/\/localhost:8080\/admin\/record(\/\d*)?/)) && (opts === undefined || opts.method.toLowerCase() === 'get');
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
                    'petType' : '犬科动物🐩',
                    'description' : '打死',
                    'price' : 100,
                }];
            response.pages = 3;
        }
        return isMatch;
    }, response)
    .delete(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:8080/admin/record')  && (opts === undefined || opts.method.toLowerCase() === 'delete');
        if (isMatch){
            console.log(`match delete: ${url}`, opts);
            response.data = {result : true};
        }
        return isMatch;
    }, response)
    .post(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:8080/admin/record')  && (opts === undefined || opts.method.toLowerCase() === 'post');
        if (isMatch){
            console.log(`match post: ${url}`, opts);
            response.data = {result : true};
        }
        return isMatch;
    }, response)
    .put(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:8080/admin/record')  && (opts === undefined || opts.method.toLowerCase() === 'put');
        if (isMatch){
            console.log(`match put: ${url}`, opts);
            response.data = {result : true};
        }
        return isMatch;
    }, response)
    .get(function (url, opts) {
        clear();
        let isMatch = (url.match(/http:\/\/localhost:8080\/admin\/role(\/\d*)?/)) && (opts === undefined || opts.method.toLowerCase() === 'get');
        if (isMatch){
            console.log(`match get: ${url}`, opts);
            response.data = [{
                'id' : 1,
                'roleName' : '前台',
                'subjects' : [
                    {
                        'id' : 1,
                        'name' : '手术室'
                    },
                    {
                        'id' : 2,
                        'name' : '病房'
                    },
                    {
                        'id' : 3,
                        'name' : '化验室'
                    },
                ]
            },
                {
                    'id' : 2,
                    'roleName' : '前台',
                    'subjects' : [
                        {
                            'id' : 1,
                            'name' : '手术室'
                        },
                        {
                            'id' : 2,
                            'name' : '病房'
                        },
                        {
                            'id' : 3,
                            'name' : '化验室'
                        },
                    ]
                },
                {
                    'id' : 3,
                    'roleName' : '前台',
                    'subjects' : [
                        {
                            'id' : 1,
                            'name' : '手术室'
                        },
                        {
                            'id' : 2,
                            'name' : '病房'
                        },
                        {
                            'id' : 3,
                            'name' : '化验室'
                        },
                    ]
                }];
            response.pages = 3;
        }
        return isMatch;
    }, response)
    .delete(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:8080/admin/role')  && (opts === undefined || opts.method.toLowerCase() === 'delete');
        if (isMatch){
            console.log(`match delete: ${url}`, opts);
            response.data = {result : true};
        }
        return isMatch;
    }, response)
    .post(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:8080/admin/role')  && (opts === undefined || opts.method.toLowerCase() === 'post');
        if (isMatch){
            console.log(`match post: ${url}`, opts);
            response.data = {result : true};
        }
        return isMatch;
    }, response)
    .put(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:8080/admin/role')  && (opts === undefined || opts.method.toLowerCase() === 'put');
        if (isMatch){
            console.log(`match put: ${url}`, opts);
            response.data = {result : true};
        }
        return isMatch;
    }, response)
    .get(function (url, opts) {
        clear();
        let isMatch = (url.match(/http:\/\/localhost:8080\/admin\/subject(\/\d*)?/)) && (opts === undefined || opts.method.toLowerCase() === 'get');
        if (isMatch){
            console.log(`match get: ${url}`, opts);
            response.data = [
                {
                    'id' : 1,
                    'roomName' : '手术室'
                },
                {
                    'id' : 2,
                    'roomName' : '病房'
                },
                {
                    'id' : 3,
                    'roomName' : '化验室'
                }];
            response.pages = 3;
        }
        return isMatch;
    }, response)
    .delete(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:8080/admin/subject')  && (opts === undefined || opts.method.toLowerCase() === 'delete');
        if (isMatch){
            console.log(`match delete: ${url}`, opts);
            response.data = {result : true};
        }
        return isMatch;
    }, response)
    .post(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:8080/admin/subject')  && (opts === undefined || opts.method.toLowerCase() === 'post');
        if (isMatch){
            console.log(`match post: ${url}`, opts);
            response.data = {result : true};
        }
        return isMatch;
    }, response)
    .put(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:8080/admin/subject')  && (opts === undefined || opts.method.toLowerCase() === 'put');
        if (isMatch){
            console.log(`match put: ${url}`, opts);
            response.data = {result : true};
        }
        return isMatch;
    }, response)
    .get(function (url, opts) {
        clear();
        let isMatch = (url.match(/http:\/\/localhost:8080\/admin\/examination(\/\d*)?/)) && (opts === undefined || opts.method.toLowerCase() === 'get');
        if (isMatch){
            console.log(`match get: ${url}`, opts);
            response.data = [
                {
                    'id' : 1,
                    'examinationName' : '手术',
                    'examinationPrice' : 223,
                    'description' : '手术ce'
                },
                {
                    'id' : 2,
                    'examinationName' : '手术',
                    'examinationPrice' : 123,
                    'description' : '手术ce'
                },
                {
                    'id' : 3,
                    'examinationName' : '手术',
                    'examinationPrice' : 233,
                    'description' : '手术ce'
                }];
            response.pages = 3;
        }
        return isMatch;
    }, response)
    .delete(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:8080/admin/examination')  && (opts === undefined || opts.method.toLowerCase() === 'delete');
        if (isMatch){
            console.log(`match delete: ${url}`, opts);
            response.data = {result : true};
        }
        return isMatch;
    }, response)
    .post(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:8080/admin/examination')  && (opts === undefined || opts.method.toLowerCase() === 'post');
        if (isMatch){
            console.log(`match post: ${url}`, opts);
            response.data = {result : true};
        }
        return isMatch;
    }, response)
    .put(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:8080/admin/examination')  && (opts === undefined || opts.method.toLowerCase() === 'put');
        if (isMatch){
            console.log(`match put: ${url}`, opts);
            response.data = {result : true};
        }
        return isMatch;
    }, response)
    .get(function (url, opts) {
        clear();
        let isMatch = (url.match(/http:\/\/localhost:8080\/admin\/hospitalRecord(\/\d*)?/)) && (opts === undefined || opts.method.toLowerCase() === 'get');
        if (isMatch){
            console.log(`match get: ${url}`, opts);
            response.data = [
                {
                    'id' : 1,
                    'patient' : 'Kitty',
                    'startTime' : '2017/10/11',
                    'endTime' : '2017/11/11',
                    'description' : '手术ce'
                },
                {
                    'id' : 2,
                    'patient' : 'Cheese',
                    'startTime' : '2017/10/11',
                    'endTime' : '2017/11/11',
                    'description' : '手术ce'
                },
                {
                    'id' : 3,
                    'patient' : 'John',
                    'startTime' : '2017/10/11',
                    'endTime' : '2017/11/11',
                    'description' : '手术ce'
                }];
            response.pages = 3;
        }
        return isMatch;
    }, response)
    .delete(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:8080/admin/hospitalRecord')  && (opts === undefined || opts.method.toLowerCase() === 'delete');
        if (isMatch){
            console.log(`match delete: ${url}`, opts);
            response.data = {result : true};
        }
        return isMatch;
    }, response)
    .post(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:8080/admin/hospitalRecord')  && (opts === undefined || opts.method.toLowerCase() === 'post');
        if (isMatch){
            console.log(`match post: ${url}`, opts);
            response.data = {result : true};
        }
        return isMatch;
    }, response)
    .put(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:8080/admin/hospitalRecord')  && (opts === undefined || opts.method.toLowerCase() === 'put');
        if (isMatch){
            console.log(`match put: ${url}`, opts);
            response.data = {result : true};
        }
        return isMatch;
    }, response);