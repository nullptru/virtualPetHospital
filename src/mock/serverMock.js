/*
const fetchMock = require('fetch-mock');

let response = {};

function clear() {
    for (let key in response) {
        delete response[key];
    }
}
fetchMock
    .post(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:3001/login/validate');
        if (isMatch) {
            let bodyObj = JSON.parse(opts.body), isValidate = (bodyObj.username === 'test' && bodyObj.password === 'test') || (bodyObj.username === 'admin' && bodyObj.password === 'admin');
            response.data = {validate: isValidate};
            if (!isValidate) response.err = "输入信息有误, 请重新输入";
            if (isValidate && bodyObj.username === 'admin') {
                response.data.userType = 1
            } else response.data.userType = 0;
            console.log(url, opts);
        }
        return isMatch;
    }, response)
    .get(function (url, opts) {
        clear();
        let isMatch = (url.match(/http:\/\/localhost:3001\/admin\/user(\/\d*)?/)) && (opts === undefined || opts.method.toLowerCase() === 'get');
        if (isMatch) {
            console.log(`match get: ${url}`, opts);
            response.data = [{
                'id': 1,
                'username': "Nico",
                'userType': '0'
            },
                {
                    'id': 2,
                    'username': "Gakki",
                    'userType': '1'
                },
                {
                    'id': 3,
                    'username': "DG",
                    'userType': '1'
                }];
            response.pages = 3;
        }
        return isMatch;
    }, response)
    .delete(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:3001/admin/user') && (opts === undefined || opts.method.toLowerCase() === 'delete');
        if (isMatch) {
            console.log(`match delete: ${url}`, opts);
            response.data = {result: true};
        }
        return isMatch;
    }, response)
    .post(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:3001/admin/user') && (opts === undefined || opts.method.toLowerCase() === 'post');
        if (isMatch) {
            console.log(`match post: ${url}`, opts);
            response.data = {result: true};
        }
        return isMatch;
    }, response)
    .put(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:3001/admin/user') && (opts === undefined || opts.method.toLowerCase() === 'put');
        if (isMatch) {
            console.log(`match put: ${url}`, opts);
            response.data = {result: true};
        }
        return isMatch;
    }, response)
    .get(function (url, opts) {
        clear();
        let isMatch = (url.match(/http:\/\/localhost:3001\/admin\/medicine(\/\d*)?/)) && (opts === undefined || opts.method.toLowerCase() === 'get');
        if (isMatch) {
            console.log(`match get: ${url}`, opts);
            response.data = [{
                'id': 1,
                'medicineName': "风油精",
                'medicinePrice': 100,
                'medicineType': 0,
                'description': '试了就知道',
            },
                {
                    'id': 2,
                    'medicineName': "碳酸水",
                    'medicinePrice': 200,
                    'medicineType': 0,
                    'description': '试了就知道',
                },
                {
                    'id': 3,
                    'medicineName': "蜡烛",
                    'medicinePrice': 200,
                    'medicineType': 1,
                    'description': '试了就知道试了就知道试了就知道试了就知道试了就知道',
                }];
            response.pages = 3;
        }
        return isMatch;
    }, response)
    .delete(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:3001/admin/medicine') && (opts === undefined || opts.method.toLowerCase() === 'delete');
        if (isMatch) {
            console.log(`match delete: ${url}`, opts);
            response.data = {result: true};
        }
        return isMatch;
    }, response)
    .post(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:3001/admin/medicine') && (opts === undefined || opts.method.toLowerCase() === 'post');
        if (isMatch) {
            console.log(`match post: ${url}`, opts);
            response.data = {result: true};
        }
        return isMatch;
    }, response)
    .put(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:3001/admin/medicine') && (opts === undefined || opts.method.toLowerCase() === 'put');
        if (isMatch) {
            console.log(`match put: ${url}`, opts);
            response.data = {result: true};
        }
        return isMatch;
    }, response)

    .get(function (url, opts) {
        clear();
        let isMatch = (url.match(/http:\/\/localhost:3001\/admin\/record(\/\d*)?/)) && (opts === undefined || opts.method.toLowerCase() === 'get');
        if (isMatch) {
            console.log(`match get: ${url}`, opts);
            response.data = [{
                'id': 1,
                'time': "2015-11-11",
                'petName': 'Kity',
                'petType': '猫科动物🐱',
                'description': '打死',
                'price': 100,
            },
                {
                    'id': 2,
                    'time': "2016-11-11",
                    'petName': 'Cheese',
                    'petType': '犬科动物🐩',
                    'description': '打死',
                    'price': 100,
                },
                {
                    'id': 3,
                    'time': "2017-11-11",
                    'petName': 'YMR',
                    'petType': '犬科动物🐩',
                    'description': '打死',
                    'price': 100,
                }];
            response.pages = 3;
        }
        return isMatch;
    }, response)
    .delete(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:3001/admin/record') && (opts === undefined || opts.method.toLowerCase() === 'delete');
        if (isMatch) {
            console.log(`match delete: ${url}`, opts);
            response.data = {result: true};
        }
        return isMatch;
    }, response)
    .post(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:3001/admin/record') && (opts === undefined || opts.method.toLowerCase() === 'post');
        if (isMatch) {
            console.log(`match post: ${url}`, opts);
            response.data = {result: true};
        }
        return isMatch;
    }, response)
    .put(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:3001/admin/record') && (opts === undefined || opts.method.toLowerCase() === 'put');
        if (isMatch) {
            console.log(`match put: ${url}`, opts);
            response.data = {result: true};
        }
        return isMatch;
    }, response)
    .get(function (url, opts) {
        clear();
        let isMatch = (url.match(/http:\/\/localhost:3001\/admin\/role(\/\d*)?/)) && (opts === undefined || opts.method.toLowerCase() === 'get');
        if (isMatch) {
            console.log(`match get: ${url}`, opts);
            response.data = [{
                'id': 1,
                'roleName': '前台',
                'subjects': [
                    {
                        'id': 1,
                        'name': '手术室'
                    },
                    {
                        'id': 2,
                        'name': '病房'
                    },
                    {
                        'id': 3,
                        'name': '化验室'
                    },
                ]
            },
                {
                    'id': 2,
                    'roleName': '前台',
                    'subjects': [
                        {
                            'id': 1,
                            'name': '手术室'
                        },
                        {
                            'id': 2,
                            'name': '病房'
                        },
                        {
                            'id': 3,
                            'name': '化验室'
                        },
                    ]
                },
                {
                    'id': 3,
                    'roleName': '前台',
                    'subjects': [
                        {
                            'id': 1,
                            'name': '手术室'
                        },
                        {
                            'id': 2,
                            'name': '病房'
                        },
                        {
                            'id': 3,
                            'name': '化验室'
                        },
                    ]
                }];
            response.pages = 3;
        }
        return isMatch;
    }, response)
    .delete(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:3001/admin/role') && (opts === undefined || opts.method.toLowerCase() === 'delete');
        if (isMatch) {
            console.log(`match delete: ${url}`, opts);
            response.data = {result: true};
        }
        return isMatch;
    }, response)
    .post(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:3001/admin/role') && (opts === undefined || opts.method.toLowerCase() === 'post');
        if (isMatch) {
            console.log(`match post: ${url}`, opts);
            response.data = {result: true};
        }
        return isMatch;
    }, response)
    .put(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:3001/admin/role') && (opts === undefined || opts.method.toLowerCase() === 'put');
        if (isMatch) {
            console.log(`match put: ${url}`, opts);
            response.data = {result: true};
        }
        return isMatch;
    }, response)
    .get(function (url, opts) {
        clear();
        let isMatch = (url.match(/http:\/\/localhost:3001\/admin\/subject(\/\d*)?/)) && (opts === undefined || opts.method.toLowerCase() === 'get');
        if (isMatch) {
            console.log(`match get: ${url}`, opts);
            response.data = [
                {
                    'id': 1,
                    'name': '手术室'
                },
                {
                    'id': 2,
                    'name': '病房'
                },
                {
                    'id': 3,
                    'name': '化验室'
                }];
            response.pages = 3;
        }
        return isMatch;
    }, response)

    .get(function (url, opts) {
        /!*匹配用例描述详情*!/
        clear();
        let isMatch = (url.match(/http:\/\/localhost:9090\/learning\/casedes(\/\s*)?/)) && (opts === undefined || opts.method.toLowerCase() === 'get');
        if (isMatch) {
            console.log(`match get: ${url}`, opts);
            response.caseContent =
                {
                    symptom: {
                        'description': '抽搐不止',
                        'picture': ['/assets/pet/pet1.jpg', '/assets/pet/pet2.jpg', '/assets/pet/pet3.jpg'],
                        'video': 'https://media.w3.org/2010/05/sintel/trailer.mp4'
                    },
                    exam: {
                        'description': '抽一管血',
                        'picture': ['/assets/pet/pet4.jpg', '/assets/pet/pet5.jpg'],
                        'video': 'https://media.w3.org/2010/05/sintel/trailer.mp4'
                    },
                    result: {
                        'description': 'xxx浓度超过aaa则有问题',
                        'picture': ['/assets/pet/pet6.jpg', '/assets/pet/pet7.jpg'],
                        'video': 'https://media.w3.org/2010/05/sintel/trailer.mp4'
                    },
                    method: {
                        'description': '打疫苗',
                        'picture': ['/assets/pet/pet8.jpg', '/assets/pet/pet9.jpg', '/assets/pet/pet10.jpg'],
                        'video': 'https://media.w3.org/2010/05/sintel/trailer.mp4'
                    }
                };
            response.caseName = "具体病例";
        }
        return isMatch;
    }, response)

    .post(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:9090/learning/casenav/search') && (opts === undefined || opts.method.toLowerCase() === 'post');
        if (isMatch) {
            let searchContent = opts.body.searchContent;
            if (searchContent == "返回空")
                response.resultList = [];
            else {
                response.resultList = [{'caseName': '犬瘟热', 'caseId': 'cid01'},
                    {'caseName': '犬细小病毒', 'caseId': 'cid02'},
                    {'caseName': '犬传染性肝炎', 'caseId': 'cid03'},
                    {'caseName': '犬冠状病毒', 'caseId': 'cid04'},
                    {'caseName': '猫泛白细胞减少症', 'caseId': 'cid05'},
                    {'caseName': '猫病毒性病气管炎', 'caseId': 'cid06'},
                    {'caseName': '皮肤真菌感染', 'caseId': 'cid07'}];
            }
        }
        return isMatch;
    }, response)

    .get(function (url, opts) {
        /!*用于匹配用例学习tab*!/
        clear();
        let isMatch = (url.match(/http:\/\/localhost:9090\/learning\/casenav(\/\s*)?/)) && (opts === undefined || opts.method.toLowerCase() === 'get');
        if (isMatch) {
            let caseClassName = url.substring("http://localhost:3000/learning/casenav/".length, url.length);
            let caseList;

            switch (caseClassName) {
                case "contagion"://传染病
                    caseList = [{'caseName': '犬瘟热', 'caseId': 'cid01'},
                        {'caseName': '犬细小病毒', 'caseId': 'cid02'},
                        {'caseName': '犬传染性肝炎', 'caseId': 'cid03'},
                        {'caseName': '犬冠状病毒', 'caseId': 'cid04'},
                        {'caseName': '猫泛白细胞减少症', 'caseId': 'cid05'},
                        {'caseName': '猫病毒性病气管炎', 'caseId': 'cid06'},
                        {'caseName': '皮肤真菌感染', 'caseId': 'cid07'}];
                    break;
                case "parasitosis"://寄生虫病
                    caseList = [{'caseName': '蛔虫病', 'caseId': 'cid08'},
                        {'caseName': '钩虫病', 'caseId': 'cid09'},
                        {'caseName': '绦虫病', 'caseId': 'cid10'},
                        {'caseName': '球虫病', 'caseId': 'cid11'},
                        {'caseName': '疥螨虫病', 'caseId': 'cid12'},
                        {'caseName': '蚤病', 'caseId': 'cid13'}];
                    break;
                case "internal"://内科病例
                    caseList = [{'caseName': '口炎', 'caseId': 'cid14'},
                        {'caseName': '肠炎', 'caseId': 'cid15'},
                        {'caseName': '肠便秘', 'caseId': 'cid16'},
                        {'caseName': '胰腺炎', 'caseId': 'cid17'},
                        {'caseName': '肝炎', 'caseId': 'cid18'},
                        {'caseName': '腹膜炎', 'caseId': 'cid19'},
                        {'caseName': '肛门腺炎', 'caseId': 'cid20'},
                        {'caseName': '感冒', 'caseId': 'cid21'},
                        {'caseName': '鼻炎', 'caseId': 'cid22'},
                        {'caseName': '气管支气管炎', 'caseId': 'cid23'},
                        {'caseName': '肺炎', 'caseId': 'cid24'},
                        {'caseName': '心力衰竭', 'caseId': 'cid25'},
                        {'caseName': '尿道感染', 'caseId': 'cid26'},
                        {'caseName': '尿结石', 'caseId': 'cid27'},
                        {'caseName': '膀胱炎', 'caseId': 'cid28'},
                        {'caseName': '肾炎', 'caseId': 'cid29'},
                        {'caseName': '佝偻病', 'caseId': 'cid30'},
                        {'caseName': '有机磷中毒', 'caseId': 'cid31'},
                        {'caseName': '糖尿病', 'caseId': 'cid32'},
                        {'caseName': '耳血肿', 'caseId': 'cid33'},
                        {'caseName': '中耳炎', 'caseId': 'cid34'},
                        {'caseName': '眼睑内翻', 'caseId': 'cid35'},
                        {'caseName': '结膜炎', 'caseId': 'cid36'},
                        {'caseName': '角膜炎', 'caseId': 'cid37'}]
                    break;
                case "obstetrics"://外产科病例
                    caseList = [{'caseName': '外伤', 'caseId': 'cid38'},
                        {'caseName': '外科感染', 'caseId': 'cid39'},
                        {'caseName': '骨折', 'caseId': 'cid40'},
                        {'caseName': '关节脱位', 'caseId': 'cid41'},
                        {'caseName': '湿疹', 'caseId': 'cid42'},
                        {'caseName': '皮炎', 'caseId': 'cid43'},
                        {'caseName': '脓皮病', 'caseId': 'cid44'},
                        {'caseName': '脱毛症', 'caseId': 'cid45'},
                        {'caseName': '趾间囊肿', 'caseId': 'cid46'},
                        {'caseName': '疝', 'caseId': 'cid47'},
                        {'caseName': '阴道炎', 'caseId': 'cid48'},
                        {'caseName': '阴道脱出', 'caseId': 'cid49'},
                        {'caseName': '子宫蓄脓', 'caseId': 'cid50'},
                        {'caseName': '难产', 'caseId': 'cid51'},
                        {'caseName': '乳房炎', 'caseId': 'cid52'}
                    ];
                    break;
                case "surgery"://常用手术
                    caseList = [{'caseName': '绝育', 'caseId': 'cid53'},
                        {'caseName': '剖腹产', 'caseId': 'cid54'},
                        {'caseName': '瞬膜腺增生物切除', 'caseId': 'cid55'},
                        {'caseName': '眼球摘除', 'caseId': 'cid56'},
                        {'caseName': '立耳术', 'caseId': 'cid57'},
                        {'caseName': '断尾术', 'caseId': 'cid58'}];
                    break;
                case "immune"://免疫
                    caseList = [{'caseName': '犬免疫程序', 'caseId': 'cid59'},
                        {'caseName': '猫免疫程序', 'caseId': 'cid60'}];
                    break;
            }


            response.caseList = caseList;
            return isMatch;
        }
    }, response)


    .get(function (url, opts) {
        clear();
        let isMatch = (url === 'http://localhost:8080/panoramic/getRoles') && (opts === undefined || opts.method.toLowerCase() === 'get');
        if (isMatch) {
            console.log("request get", url, opts);
            response.data = [
                {id: 0, name: '前台', room: [0, 3]},
                {id: 1, name: '兽医', room: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13]},
                {id: 2, name: '助理', room: [1, 2, 5, 6, 7, 9, 12, 13]}
            ];
        }
        return isMatch;
    }, response);*/

