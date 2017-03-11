const fetchMock = require('fetch-mock');

let response = {};
fetchMock
    .post(function (url, opts) {
        let isMatch = (url === 'http://localhost:3001/login/validate');
        let bodyObj = JSON.parse(opts.body);
        if (isMatch){
            response.isValidate = (bodyObj.username === 'test' && bodyObj.password === 'test') || (bodyObj.username === 'admin' && bodyObj.password === 'admin');
            if (!response.isValidate) response.errorMsg = "输入信息有误, 请重新输入";
            if (response.isValidate && bodyObj.username === 'admin'){response.userType = 1} else response.userType = 0;
        }
        console.log(url, opts);
        return isMatch;
    }, response);