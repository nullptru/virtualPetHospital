embedpano({swf:"krpano.swf", xml:"walkthrough.xml", target:"pano", html5:"prefer", mobilescale:1.0, passQueryParameters:true});

/***********************************/

//数据源
var mapParent='bd_scroller_container';
var mapSpotStyle_normal='spot_location_reachable|tooltip';
var mapSpotStyle_active='spot_location_active|tooltip';
var mapSpotStyle_forbid='spot_location_forbid|tooltip';

var sceneData=[
    {id:0,name:'qiantai',tooltip:'前台',width:18,height:18,x:455,y:25},
    {id:1,name:'zhusheshi',tooltip:'注射室',width:18,height:18,x:318,y:33},
    {id:2,name:'yaofang',tooltip:'药房',width:18,height:18,x:485,y:115},
    {id:3,name:'danganshi',tooltip:'档案室',width:18,height:18,x:290,y:115},
    {id:4,name:'zhenshi',tooltip:'诊室',width:18,height:18,x:230,y:33},
    {id:5,name:'huayanshi',tooltip:'化验室',width:18,height:18,x:170,y:33},
    {id:6,name:'mianyishi',tooltip:'免疫室',width:18,height:18,x:115,y:33},
    {id:7,name:'yingxiangshi',tooltip:'影像室',width:18,height:18,x:230,y:115},
    {id:8,name:'zhuankejianchashi',tooltip:'专科检查室',width:18,height:18,x:170,y:115},
    {id:9,name:'shoushuzhunbeishi',tooltip:'手术准备室',width:18,height:18,x:290,y:193},
    {id:10,name:'shoushushi',tooltip:'手术室',width:18,height:18,x:230,y:193},
    {id:11,name:'binglijiepoushi',tooltip:'病理解剖室',width:18,height:18,x:230,y:287},
    {id:12,name:'chuzhishi',tooltip:'处置室',width:18,height:18,x:290,y:287},
    {id:13,name:'bingfang',tooltip:'病房',width:18,height:18,x:405,y:235}
];

var roomList=[
    {id:0,name:'qiantai'},
    {id:1,name:'zhusheshi'},
    {id:2,name:'yaofang'},
    {id:3,name:'danganshi'},
    {id:4,name:'zhenshi'},
    {id:5,name:'huayanshi'},
    {id:6,name:'mianyishi'},
    {id:7,name:'yingxiangshi'},
    {id:8,name:'zhuankejianchashi'},
    {id:9,name:'shoushuzhunbeishi'},
    {id:10,name:'shoushushi'},
    {id:11,name:'binglijiepoushi'},
    {id:12,name:'chuzhishi'},
    {id:13,name:'bingfang'}
];

var deviceList=[
    {id:0,name:'guahao',description:'',media:''},//挂号流程
    {id:1,name:'shoufei',description:'',media:''},//收费流程
    {id:2,name:'dangan',description:'',media:''},//档案管理
    {id:3,name:'quyao',description:'',media:''},//取药流程
    {id:4,name:'huayan',description:'',media:''},//化验仪器
    {id:5,name:'yimiao',description:'',media:''},//注射疫苗
    {id:6,name:'x_ray',description:'',media:''},//拍X光片
    {id:7,name:'wenzhen',description:'',media:''},//问诊流程
    {id:8,name:'zhuankejiancha',description:'',media:''},//专科检查流程
    {id:9,name:'zhushe',description:'',media:''},//注射药品
    {id:10,name:'shoushu',description:'',media:''},//手术操作台
    {id:11,name:'shuicao',description:'',media:''},//手术准备前清洗
    {id:12,name:'gengyi',description:'',media:''},//手术准备钱更衣
    {id:13,name:'chafang',description:'',media:''},//查房
    {id:14,name:'jiepou',description:'',media:''},//解剖
    {id:14,name:'chuzhi',description:'',media:''}//处置流程
];

var roles=[
    {id:0,name:'前台',room:[0,3],initScene:0},
    {id:1,name:'执业兽医师',room:[4,5,6,7,8,9,10,11,12,13],initScene:4},
    {id:2,name:'助理',room:[1,2,5,6,7,9,12,13],initScene:1}
];


var krpano = document.getElementById("krpanoSWFObject");

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

//当前模式
var currentMode=getQueryString('mode');
//接收角色身份
var currentRoleId=getQueryString('role');


var lastActiveMapSpot='';

if(currentMode==0){//3D导览
    action_initMaps();//加载全部小地图
    action_setCurrentMapLocation();
}else if(currentMode==1){//角色扮演
    action_setInitScene(currentRoleId);
    action_updateMapsWithRole(currentRoleId);
    action_updateSceneHotspotWithRole(currentRoleId);
    action_setCurrentMapLocation(currentRoleId);
}else{
    console.log('模式传参有误！');
}