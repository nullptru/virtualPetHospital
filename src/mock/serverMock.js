// const fetchMock = require('fetch-mock');
//
// let response = {};
//
// function clear() {
//     for(let key in response){
//         delete response[key];
//     }
// }
// fetchMock
//     .post(function (url, opts) {
//         clear();
//         let isMatch = (url === 'http://localhost:8080/validate');
//         if (isMatch){
//             let bodyObj = JSON.parse(opts.body), isValidate = (bodyObj.userName === 'test' && bodyObj.userPwd === 'test') || (bodyObj.userName === 'admin' && bodyObj.userPwd === 'admin');
//             response.data = {isValidated : isValidate};
//             if (!isValidate) response.err = "输入信息有误, 请重新输入";
//             if (isValidate && bodyObj.userName === 'admin'){response.data.userType = 1} else response.data.userType = 0;
//             console.log(url, opts);
//         }
//         return isMatch;
//     }, response)
//     .get(function (url, opts) {
//         clear();
//         let isMatch = (url.match(/http:\/\/localhost:8080\/admin\/user(\/\d*)?/)) && (opts === undefined || opts.method.toLowerCase() === 'get');
//         if (isMatch){
//             console.log(`match get: ${url}`, opts);
//             response.data = [{
//                 'id' : 1,
//                 'userName' : "Nico",
//                 'userType' : '0'
//             },
//             {
//                 'id' : 2,
//                 'userName' : "Gakki",
//                 'userType' : '1'
//             },
//             {
//                 'id' : 3,
//                 'userName' : "DG",
//                 'userType' : '1'
//             }];
//             response.pages = 3;
//         }
//         return isMatch;
//     }, response)
//     .delete(function (url, opts) {
//         clear();
//         let isMatch = (url === 'http://localhost:8080/admin/user')  && (opts === undefined || opts.method.toLowerCase() === 'delete');
//         if (isMatch){
//             console.log(`match delete: ${url}`, opts);
//             response.data = {result : true};
//         }
//         return isMatch;
//     }, response)
//     .post(function (url, opts) {
//         clear();
//         let isMatch = (url === 'http://localhost:8080/admin/user')  && (opts === undefined || opts.method.toLowerCase() === 'post');
//         if (isMatch){
//             console.log(`match post: ${url}`, opts);
//             response.data = {result : true};
//         }
//         return isMatch;
//     }, response)
//     .put(function (url, opts) {
//         clear();
//         let isMatch = (url === 'http://localhost:8080/admin/user')  && (opts === undefined || opts.method.toLowerCase() === 'put');
//         if (isMatch){
//             console.log(`match put: ${url}`, opts);
//             response.data = {result : true};
//         }
//         return isMatch;
//     }, response)
//     .get(function (url, opts) {
//         clear();
//         let isMatch = (url.match(/http:\/\/localhost:8080\/admin\/medicine(\/\d*)?/)) && (opts === undefined || opts.method.toLowerCase() === 'get');
//         if (isMatch){
//             console.log(`match get: ${url}`, opts);
//             response.data = [{
//                 'id' : 1,
//                 'medicineName' : "风油精",
//                 'medicinePrice' : 100,
//                 'medicineType' : 0,
//                 'description' : '试了就知道',
//             },
//                 {
//                     'id' : 2,
//                     'medicineName' : "碳酸水",
//                     'medicinePrice' : 200,
//                     'medicineType' : 0,
//                     'description' : '试了就知道',
//                 },
//                 {
//                     'id' : 3,
//                     'medicineName' : "蜡烛",
//                     'medicinePrice' : 200,
//                     'medicineType' : 1,
//                     'description' : '试了就知道试了就知道试了就知道试了就知道试了就知道',
//                 }];
//             response.pages = 3;
//         }
//         return isMatch;
//     }, response)
//     .delete(function (url, opts) {
//         clear();
//         let isMatch = (url === 'http://localhost:8080/admin/medicine')  && (opts === undefined || opts.method.toLowerCase() === 'delete');
//         if (isMatch){
//             console.log(`match delete: ${url}`, opts);
//             response.data = {result : true};
//         }
//         return isMatch;
//     }, response)
//     .post(function (url, opts) {
//         clear();
//         let isMatch = (url === 'http://localhost:8080/admin/medicine')  && (opts === undefined || opts.method.toLowerCase() === 'post');
//         if (isMatch){
//             console.log(`match post: ${url}`, opts);
//             response.data = {result : true};
//         }
//         return isMatch;
//     }, response)
//     .put(function (url, opts) {
//         clear();
//         let isMatch = (url === 'http://localhost:8080/admin/medicine')  && (opts === undefined || opts.method.toLowerCase() === 'put');
//         if (isMatch){
//             console.log(`match put: ${url}`, opts);
//             response.data = {result : true};
//         }
//         return isMatch;
//     }, response)
//
//     .get(function (url, opts) {
//         clear();
//         let isMatch = (url.match(/http:\/\/localhost:8080\/admin\/record(\/\d*)?/)) && (opts === undefined || opts.method.toLowerCase() === 'get');
//         if (isMatch){
//             console.log(`match get: ${url}`, opts);
//             response.data = [{
//                 'id' : 1,
//                 'time' : "2015-11-11",
//                 'petName':'Kity',
//                 'petType' : '猫科动物🐱',
//                 'description' : '打死',
//                 'price' : 100,
//             },
//                 {
//                     'id' : 2,
//                     'time' : "2016-11-11",
//                     'petName':'Cheese',
//                     'petType' : '犬科动物🐩',
//                     'description' : '打死',
//                     'price' : 100,
//                 },
//                 {
//                     'id' : 3,
//                     'time' : "2017-11-11",
//                     'petName':'YMR',
//                     'petType' : '犬科动物🐩',
//                     'description' : '打死',
//                     'price' : 100,
//                 }];
//             response.pages = 3;
//         }
//         return isMatch;
//     }, response)
//     .delete(function (url, opts) {
//         clear();
//         let isMatch = (url === 'http://localhost:8080/admin/record')  && (opts === undefined || opts.method.toLowerCase() === 'delete');
//         if (isMatch){
//             console.log(`match delete: ${url}`, opts);
//             response.data = {result : true};
//         }
//         return isMatch;
//     }, response)
//     .post(function (url, opts) {
//         clear();
//         let isMatch = (url === 'http://localhost:8080/admin/record')  && (opts === undefined || opts.method.toLowerCase() === 'post');
//         if (isMatch){
//             console.log(`match post: ${url}`, opts);
//             response.data = {result : true};
//         }
//         return isMatch;
//     }, response)
//     .put(function (url, opts) {
//         clear();
//         let isMatch = (url === 'http://localhost:8080/admin/record')  && (opts === undefined || opts.method.toLowerCase() === 'put');
//         if (isMatch){
//             console.log(`match put: ${url}`, opts);
//             response.data = {result : true};
//         }
//         return isMatch;
//     }, response)
//     .get(function (url, opts) {
//         clear();
//         let isMatch = (url.match(/http:\/\/localhost:8080\/admin\/role(\/\d*)?/)) && (opts === undefined || opts.method.toLowerCase() === 'get');
//         if (isMatch){
//             console.log(`match get: ${url}`, opts);
//             response.data = [{
//                 'id' : 1,
//                 'roleName' : '前台',
//                 'subjects' : [
//                     {
//                         'id' : 1,
//                         'name' : '手术室'
//                     },
//                     {
//                         'id' : 2,
//                         'name' : '病房'
//                     },
//                     {
//                         'id' : 3,
//                         'name' : '化验室'
//                     },
//                 ]
//             },
//                 {
//                     'id' : 2,
//                     'roleName' : '前台',
//                     'subjects' : [
//                         {
//                             'id' : 1,
//                             'name' : '手术室'
//                         },
//                         {
//                             'id' : 2,
//                             'name' : '病房'
//                         },
//                         {
//                             'id' : 3,
//                             'name' : '化验室'
//                         },
//                     ]
//                 },
//                 {
//                     'id' : 3,
//                     'roleName' : '前台',
//                     'subjects' : [
//                         {
//                             'id' : 1,
//                             'name' : '手术室'
//                         },
//                         {
//                             'id' : 2,
//                             'name' : '病房'
//                         },
//                         {
//                             'id' : 3,
//                             'name' : '化验室'
//                         },
//                     ]
//                 }];
//             response.pages = 3;
//         }
//         return isMatch;
//     }, response)
//     .delete(function (url, opts) {
//         clear();
//         let isMatch = (url === 'http://localhost:8080/admin/role')  && (opts === undefined || opts.method.toLowerCase() === 'delete');
//         if (isMatch){
//             console.log(`match delete: ${url}`, opts);
//             response.data = {result : true};
//         }
//         return isMatch;
//     }, response)
//     .post(function (url, opts) {
//         clear();
//         let isMatch = (url === 'http://localhost:8080/admin/role')  && (opts === undefined || opts.method.toLowerCase() === 'post');
//         if (isMatch){
//             console.log(`match post: ${url}`, opts);
//             response.data = {result : true};
//         }
//         return isMatch;
//     }, response)
//     .put(function (url, opts) {
//         clear();
//         let isMatch = (url === 'http://localhost:8080/admin/role')  && (opts === undefined || opts.method.toLowerCase() === 'put');
//         if (isMatch){
//             console.log(`match put: ${url}`, opts);
//             response.data = {result : true};
//         }
//         return isMatch;
//     }, response)
//     .get(function (url, opts) {
//         clear();
//         let isMatch = (url.match(/http:\/\/localhost:8080\/admin\/subject(\/\d*)?/)) && (opts === undefined || opts.method.toLowerCase() === 'get');
//         if (isMatch){
//             console.log(`match get: ${url}`, opts);
//             response.data = [
//                 {
//                     'id' : 1,
//                     'roomName' : '手术室'
//                 },
//                 {
//                     'id' : 2,
//                     'roomName' : '病房'
//                 },
//                 {
//                     'id' : 3,
//                     'roomName' : '化验室'
//                 }];
//             response.pages = 3;
//         }
//         return isMatch;
//     }, response)
//     .delete(function (url, opts) {
//         clear();
//         let isMatch = (url === 'http://localhost:8080/admin/subject')  && (opts === undefined || opts.method.toLowerCase() === 'delete');
//         if (isMatch){
//             console.log(`match delete: ${url}`, opts);
//             response.data = {result : true};
//         }
//         return isMatch;
//     }, response)
//     .post(function (url, opts) {
//         clear();
//         let isMatch = (url === 'http://localhost:8080/admin/subject')  && (opts === undefined || opts.method.toLowerCase() === 'post');
//         if (isMatch){
//             console.log(`match post: ${url}`, opts);
//             response.data = {result : true};
//         }
//         return isMatch;
//     }, response)
//     .put(function (url, opts) {
//         clear();
//         let isMatch = (url === 'http://localhost:8080/admin/subject')  && (opts === undefined || opts.method.toLowerCase() === 'put');
//         if (isMatch){
//             console.log(`match put: ${url}`, opts);
//             response.data = {result : true};
//         }
//         return isMatch;
//     }, response)
//     .get(function (url, opts) {
//         clear();
//         let isMatch = (url.match(/http:\/\/localhost:8080\/admin\/examination(\/\d*)?/)) && (opts === undefined || opts.method.toLowerCase() === 'get');
//         if (isMatch){
//             console.log(`match get: ${url}`, opts);
//             response.data = [
//                 {
//                     'id' : 1,
//                     'examinationName' : '手术',
//                     'examinationPrice' : 223,
//                     'description' : '手术ce'
//                 },
//                 {
//                     'id' : 2,
//                     'examinationName' : '手术',
//                     'examinationPrice' : 123,
//                     'description' : '手术ce'
//                 },
//                 {
//                     'id' : 3,
//                     'examinationName' : '手术',
//                     'examinationPrice' : 233,
//                     'description' : '手术ce'
//                 }];
//             response.pages = 3;
//         }
//         return isMatch;
//     }, response)
//     .delete(function (url, opts) {
//         clear();
//         let isMatch = (url === 'http://localhost:8080/admin/examination')  && (opts === undefined || opts.method.toLowerCase() === 'delete');
//         if (isMatch){
//             console.log(`match delete: ${url}`, opts);
//             response.data = {result : true};
//         }
//         return isMatch;
//     }, response)
//     .post(function (url, opts) {
//         clear();
//         let isMatch = (url === 'http://localhost:8080/admin/examination')  && (opts === undefined || opts.method.toLowerCase() === 'post');
//         if (isMatch){
//             console.log(`match post: ${url}`, opts);
//             response.data = {result : true};
//         }
//         return isMatch;
//     }, response)
//     .put(function (url, opts) {
//         clear();
//         let isMatch = (url === 'http://localhost:8080/admin/examination')  && (opts === undefined || opts.method.toLowerCase() === 'put');
//         if (isMatch){
//             console.log(`match put: ${url}`, opts);
//             response.data = {result : true};
//         }
//         return isMatch;
//     }, response)
//     .get(function (url, opts) {
//         clear();
//         let isMatch = (url.match(/http:\/\/localhost:8080\/admin\/hospitalRecord(\/\d*)?/)) && (opts === undefined || opts.method.toLowerCase() === 'get');
//         if (isMatch){
//             console.log(`match get: ${url}`, opts);
//             response.data = [
//                 {
//                     'id' : 1,
//                     'patient' : 'Kitty',
//                     'startTime' : '2017/10/11',
//                     'endTime' : '2017/11/11',
//                     'description' : '手术ce'
//                 },
//                 {
//                     'id' : 2,
//                     'patient' : 'Cheese',
//                     'startTime' : '2017/10/11',
//                     'endTime' : '2017/11/11',
//                     'description' : '手术ce'
//                 },
//                 {
//                     'id' : 3,
//                     'patient' : 'John',
//                     'startTime' : '2017/10/11',
//                     'endTime' : '2017/11/11',
//                     'description' : '手术ce'
//                 }];
//             response.pages = 3;
//         }
//         return isMatch;
//     }, response)
//     .delete(function (url, opts) {
//         clear();
//         let isMatch = (url === 'http://localhost:8080/admin/hospitalRecord')  && (opts === undefined || opts.method.toLowerCase() === 'delete');
//         if (isMatch){
//             console.log(`match delete: ${url}`, opts);
//             response.data = {result : true};
//         }
//         return isMatch;
//     }, response)
//     .post(function (url, opts) {
//         clear();
//         let isMatch = (url === 'http://localhost:8080/admin/hospitalRecord')  && (opts === undefined || opts.method.toLowerCase() === 'post');
//         if (isMatch){
//             console.log(`match post: ${url}`, opts);
//             response.data = {result : true};
//         }
//         return isMatch;
//     }, response)
//     .put(function (url, opts) {
//         clear();
//         let isMatch = (url === 'http://localhost:8080/admin/hospitalRecord')  && (opts === undefined || opts.method.toLowerCase() === 'put');
//         if (isMatch){
//             console.log(`match put: ${url}`, opts);
//             response.data = {result : true};
//         }
//         return isMatch;
//     }, response)
//     .get(function (url, opts) {
//         clear();
//         let isMatch = (url.match(/http:\/\/localhost:8080\/admin\/case(\/\d*)?/)) && (opts === undefined || opts.method.toLowerCase() === 'get');
//         if (isMatch){
//             console.log(`match get: ${url}`, opts);
//             response.data = [
//                 {
//                     'id' : 1,
//                     'caseName' : 'Kitty',
//                     'symptom' : {
//                         'id' : 1,
//                         'description' : 'testDescription',
//                         'picture' : 'ttt',
//                         'video' : 'video'
//                     },
//                     'examination' : {
//                         'id' : 2,
//                         'description' : 'testDescription2',
//                         'picture' : 'ttt',
//                         'video' : 'video'
//                     },
//                     'result' : {
//                         'id' : 3,
//                         'description' : 'testDescription3',
//                         'picture' : 'ttt',
//                         'video' : 'video'
//                     },
//                     'method' : {
//                         'id' : 4,
//                         'description' : 'testDescription4',
//                         'picture' : 'ttt',
//                         'video' : 'video'
//                     }
//                 },
//                 {
//                     'id' : 3,
//                     'caseName' : 'Kitty',
//                     'symptom' : {
//                         'id' : 1,
//                         'description' : 'testDescription1',
//                         'picture' : 'ttt',
//                         'video' : 'video'
//                     },
//                     'examination' : {
//                         'id' : 2,
//                         'description' : 'testDescription2',
//                         'picture' : 'ttt',
//                         'video' : 'video'
//                     },
//                     'result' : {
//                         'id' : 3,
//                         'description' : 'testDescription3',
//                         'picture' : 'ttt',
//                         'video' : 'video'
//                     },
//                     'method' : {
//                         'id' : 4,
//                         'description' : 'testDescription4',
//                         'picture' : 'ttt',
//                         'video' : 'video'
//                     }
//                 },
//                 {
//                     'id' : 2,
//                     'caseName' : 'Kitty',
//                     'symptom' : {
//                         'id' : 1,
//                         'description' : 'testDescription1',
//                         'picture' : 'ttt',
//                         'video' : 'video'
//                     },
//                     'examination' : {
//                         'id' : 2,
//                         'description' : 'testDescription2',
//                         'picture' : 'ttt',
//                         'video' : 'video'
//                     },
//                     'result' : {
//                         'id' : 3,
//                         'description' : 'testDescription3',
//                         'picture' : 'ttt',
//                         'video' : 'video'
//                     },
//                     'method' : {
//                         'id' : 4,
//                         'description' : 'testDescription4',
//                         'picture' : 'ttt',
//                         'video' : 'video'
//                     }
//                 }];
//             response.pages = 3;
//         }
//         return isMatch;
//     }, response)
//     .delete(function (url, opts) {
//         clear();
//         let isMatch = (url === 'http://localhost:8080/admin/case')  && (opts === undefined || opts.method.toLowerCase() === 'delete');
//         if (isMatch){
//             console.log(`match delete: ${url}`, opts);
//             response.data = {result : true};
//         }
//         return isMatch;
//     }, response)
//     .post(function (url, opts) {
//         clear();
//         let isMatch = (url === 'http://localhost:8080/admin/case')  && (opts === undefined || opts.method.toLowerCase() === 'post');
//         if (isMatch){
//             console.log(`match post: ${url}`, opts);
//             response.data = {result : true};
//         }
//         return isMatch;
//     }, response)
//     .put(function (url, opts) {
//         clear();
//         let isMatch = (url === 'http://localhost:8080/admin/case')  && (opts === undefined || opts.method.toLowerCase() === 'put');
//         if (isMatch){
//             console.log(`match put: ${url}`, opts);
//             response.data = {result : true};
//         }
//         return isMatch;
//     }, response)
//     .post(function (url, opts) {
//         clear();
//         let isMatch = (url === 'http://localhost:8080/admin/case/examiniation')  && (opts === undefined || opts.method.toLowerCase() === 'post');
//         if (isMatch){
//             console.log(`match post: ${url}`, opts);
//             response.data = {result : true};
//         }
//         return isMatch;
//     }, response)
//     .get(function (url, opts) {
//         /*匹配用例描述详情*/
//         clear();
//         let isMatch = (url.match(/http:\/\/localhost:8080\/learning\/casedes(\/\s*)?/)) && (opts === undefined || opts.method.toLowerCase() === 'get');
//         if (isMatch) {
//             console.log(`match get: ${url}`, opts);
//             response.caseContent =
//                 {
//                     symptom: {'text': '抽搐不止', 'img': 'symptom_img_url', 'video': 'symptom_video_url'},
//                     examination: {'text': '抽一管血', 'img': 'exam_img_url', 'video': 'exam_video_url'},
//                     result: {'text': 'xxx浓度超过aaa则有问题', 'img': 'labIndex_img_url', 'video': 'labIndex_video_url'},
//                     method: {'text': '打疫苗', 'img': 'treatment_img_url', 'video': 'treatment_video_url'}
//                 };
//             response.caseName = "具体病例";
//         }
//         return isMatch;
//     }, response)
//
//     .post(function (url, opts) {
//         clear();
//         let isMatch = (url === 'http://localhost:8080/learning/casenav/search') && (opts === undefined || opts.method.toLowerCase() === 'post');
//         if (isMatch) {
//             console.log("request post", url, opts);
//             console.info("opts.body.searchContent=" + opts.body.searchContent);
//             let searchContent = opts.body.searchContent;
//             response.resultList = [
//                 {'caseName': '搜索结果case1', 'caseId': 'cid01'},
//                 {'caseName': '搜索结果case2', 'caseId': 'cid02'},
//                 {'caseName': '搜索结果case3', 'caseId': 'cid03'},
//                 {'caseName': '搜索结果case4', 'caseId': 'cid04'},
//                 {'caseName': '搜索结果case5', 'caseId': 'cid05'},
//                 {'caseName': '搜索结果case6', 'caseId': 'cid06'},
//                 {'caseName': '搜索结果case7', 'caseId': 'cid07'},
//                 {'caseName': '搜索结果case8', 'caseId': 'cid08'},
//                 {'caseName': '搜索结果case9', 'caseId': 'cid09'},
//                 {'caseName': '搜索结果case10', 'caseId': 'cid10'}];
//         }
//         return isMatch;
//     }, response)
//
//     .get(function (url, opts) {
//         /*用于匹配用例学习tab*/
//         clear();
//         let isMatch = (url.match(/http:\/\/localhost:8080\/learning\/casenav(\/\s*)?/)) && (opts === undefined || opts.method.toLowerCase() === 'get');
//         if (isMatch) {
//             let caseClassName = url.substring("http://localhost:3000/learning/casenav/".length, url.length);
//             response.caseList = [
//                 {'caseName': caseClassName + '1', 'caseId': 'cid01'},
//                 {'caseName': caseClassName + '2', 'caseId': 'cid02'},
//                 {'caseName': caseClassName + '3', 'caseId': 'cid03'},
//                 {'caseName': caseClassName + '4', 'caseId': 'cid04'},
//                 {'caseName': caseClassName + '5', 'caseId': 'cid05'},
//                 {'caseName': caseClassName + '6', 'caseId': 'cid06'},
//                 {'caseName': caseClassName + '7', 'caseId': 'cid07'},
//                 {'caseName': caseClassName + '8', 'caseId': 'cid08'},
//                 {'caseName': caseClassName + '9', 'caseId': 'cid09'},
//                 {'caseName': caseClassName + '10', 'caseId': 'cid10'},
//                 {'caseName': caseClassName + '11', 'caseId': 'cid11'},
//                 {'caseName': caseClassName + '12', 'caseId': 'cid12'},
//                 {'caseName': caseClassName + '13', 'caseId': 'cid12'}
//             ];
//             return isMatch;
//         }
//     }, response)
//
//
//     .get(function (url, opts) {
//         clear();
//         let isMatch = (url === 'http://localhost:8080/panoramic/getRoles') && (opts === undefined || opts.method.toLowerCase() === 'get');
//         if (isMatch) {
//             console.log("request get", url, opts);
//             response.data = [
//                 {id: 0, name: '前台', room: [0, 3]},
//                 {id: 1, name: '兽医', room: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13]},
//                 {id: 2, name: '助理', room: [1, 2, 5, 6, 7, 9, 12, 13]}
//             ];
//         }
//         return isMatch;
//     }, response);