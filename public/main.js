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
    {id:0,name:'qiantai',title:'前台'},
    {id:1,name:'zhusheshi',title:'注射室'},
    {id:2,name:'yaofang',title:'药房'},
    {id:3,name:'danganshi',title:'档案室'},
    {id:4,name:'zhenshi',title:'诊室'},
    {id:5,name:'huayanshi',title:'化验室'},
    {id:6,name:'mianyishi',title:'免疫室'},
    {id:7,name:'yingxiangshi',title:'影像室'},
    {id:8,name:'zhuankejianchashi',title:'专科检查室'},
    {id:9,name:'shoushuzhunbeishi',title:'手术准备室'},
    {id:10,name:'shoushushi',title:'手术室'},
    {id:11,name:'binglijiepoushi',title:'病理解剖室'},
    {id:12,name:'chuzhishi',title:'处置室'},
    {id:13,name:'bingfang',title:'病房'}
];

var deviceList=[
    {id:0,name:'guahao',description:'挂号流程：\n1.XXXXXXX \n 2.XXXXXXXXXXXXX',media:'skin/test.mp4'},//挂号流程
    {id:1,name:'shoufei',description:'收费流程：\n1.XXXXXXX \n 2.XXXXXXXXXXXXX',media:'skin/test.mp4'},//收费流程
    {id:2,name:'dangan',description:'档案管理：',media:'skin/test.mp4'},//档案管理
    {id:3,name:'quyao',description:'取药流程：\n1.XXXXXXX \n 2.XXXXXXXXXXXXX',media:'skin/test.mp4'},//取药流程
    {id:4,name:'huayan',description:'化验仪器使用说明：\n1.XXXXXXX \n 2.XXXXXXXXXXXXX',media:'skin/test.mp4'},//化验仪器
    {id:5,name:'yimiao',description:'宠物疫苗注射说明：\n1.XXXXXXX \n 2.XXXXXXXXXXXXX',media:'skin/test.mp4'},//注射疫苗
    {id:6,name:'x_ray',description:'设备说明：\nXXXXXXXXXXX',media:'skin/test.mp4'},//拍X光片
    {id:7,name:'wenzhen',description:'问诊流程：\n1.XXXXXXX \n 2.XXXXXXXXXXXXX',media:'skin/test.mp4'},//问诊流程
    {id:8,name:'zhuankejiancha',description:'专科检查流程：\n1.XXXXXXX \n 2.XXXXXXXXXXXXX',media:'skin/test.mp4'},//专科检查流程
    {id:9,name:'zhushe',description:'药品说明：\n1.XXXXXXX \n 2.XXXXXXXXXXXXX',media:'skin/test.mp4'},//注射药品
    {id:10,name:'shoushu',description:'手术操作台使用说明：\n1.XXXXXXX \n 2.XXXXXXXXXXXXX',media:'skin/test.mp4'},//手术操作台
    {id:11,name:'shuicao',description:'手术前准备规范：\n1.XXXXXXX \n 2.XXXXXXXXXXXXX',media:'skin/test.mp4'},//手术准备前清洗
    {id:12,name:'gengyi',description:'手术衣着规范：\n1.XXXXXXX \n 2.XXXXXXXXXXXXX',media:'skin/test.mp4'},//手术准备前更衣
    {id:13,name:'chafang',description:'日常查房流程：\n1.XXXXXXX \n 2.XXXXXXXXXXXXX',media:'skin/test.mp4'},//查房
    {id:14,name:'jiepou',description:'解剖器材与方法说明：\n1.XXXXXXX \n 2.XXXXXXXXXXXXX',media:'skin/test.mp4'},//解剖
    {id:14,name:'chuzhi',description:'处置流程：\n1.XXXXXXX \n 2.XXXXXXXXXXXXX',media:'skin/test.mp4'}//处置流程
];

var roles=[];

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
    loadRoleData(callback_walkthrough);
}else if(currentMode==1){//角色扮演
    loadRoleData(callback_roleplay);
}else{
    console.log('模式传参有误！');
}