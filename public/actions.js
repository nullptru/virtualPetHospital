/**
 * Created by 亚仪 on 2017/3/16.
 */

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] == obj) {
            return true;
        }
    }
    return false;
}
/******************************************/
//加载医院平面图热点
function action_initMaps(){
    for(var i=0;i<sceneData.length;i++){
        var layer=sceneData[i];
        var str='';
        str+='set(ln,'+'spot_location_'+layer.name+');';
        str+='addlayer(get(ln));';
        str+='copy(lr, layer[get(ln)]);';
        str+='set(lr.parent, bd_scroller_container);';
        str+='set(lr.keep, true);';
        str+='lr.loadstyle('+mapSpotStyle_normal+');';
        str+='set(lr.tooltip, '+layer.tooltip+');';
        str+='set(lr.width, '+layer.width+');';
        str+='set(lr.height,'+layer.height+');';
        str+='set(lr.x, '+layer.x+');';
        str+='set(lr.y, '+layer.y+');';
        str+='set(lr.onclick,transition_location(spot_location_'+layer.name+',scene_'+layer.name+',-98,0,31););';
        krpano.call(str);
    }
}
//根据角色权限更新医院平面图热点
function action_updateMapsWithRole(){
    for(var i=0;i<sceneData.length;i++){
        var layer=sceneData[i];
        var str='';
        str+='set(ln,'+'spot_location_'+layer.name+');';
        str+='addlayer(get(ln));';
        str+='copy(lr, layer[get(ln)]);';
        str+='set(lr.parent, bd_scroller_container);';
        str+='set(lr.keep, true);';
        str+='set(lr.tooltip, '+layer.tooltip+');';
        str+='set(lr.width, '+layer.width+');';
        str+='set(lr.height,'+layer.height+');';
        str+='set(lr.x, '+layer.x+');';
        str+='set(lr.y, '+layer.y+');';
        if(roles[currentRoleId].room.contains(layer.id)){
            str+='lr.loadstyle('+mapSpotStyle_normal+');';
            str+='set(lr.onclick,transition_location(spot_location_'+layer.name+',scene_'+layer.name+',-98,0,31););';
        }else{
            str+='lr.loadstyle('+mapSpotStyle_forbid+');';
        }
        krpano.call(str);
    }
}
//根据角色权限设定当前起始位置
function action_setInitScene(){
    var str='';
    if(currentRoleId==0) {
        str += 'loadscene(scene_qiantai, null, MERGE);';
        str += 'set(layer[current_location].html,"前台");';
    }else if(currentRoleId==1) {
        str += 'loadscene(scene_zhenshi, null, MERGE);';
        str += 'set(layer[current_location].html,"诊室")';
    }else if(currentRoleId==2) {
        str += 'loadscene(scene_zhusheshi, null, MERGE);';
        str += 'set(layer[current_location].html,"注射室")';
    }
    krpano.call(str);
}
//根据模式与角色权限更新热点
function action_updateSceneHotspotWithRole(curScene){
    var str='';
    if(currentMode==0){//3D导览模式下：隐藏设备热点
        for(var i=0;i<deviceList.length;i++){
            var name='spot_'+deviceList[i].name;
            str += 'set(hotspot['+name+'].visible,false);';
        }
    }else if(currentMode==1){//角色扮演模式：根据角色权限更新场景切换热点
        for(var i=0;i<sceneData.length;i++){
            if(!roles[currentRoleId].room.contains(i)){
                var name='spot_'+sceneData[i].name;
                str += 'set(hotspot['+name+'].visible,false);';
            }
        }
    }
    str += 'layer[spot_location_'+lastActiveMapSpot+'].loadStyle('+mapSpotStyle_normal+');';
    str += 'layer[spot_location_'+curScene+'].loadStyle('+mapSpotStyle_active+');';
    lastActiveMapSpot=curScene;
    krpano.call(str);
}
//每次切换场景时设置当前active位置
function action_setCurrentMapLocation(curRole){
    if(!curRole){
        lastActiveMapSpot='qiantai';
    }else{
        if(curRole==0){
            lastActiveMapSpot='qiantai';
        }else if(curRole==1){
            lastActiveMapSpot='zhenshi';
        }else if(curRole==2){
            lastActiveMapSpot='zhusheshi';
        }else{
            console.log('action_setCurrentMapLocation() 传参有误');
        }
    }
    var str = 'layer[spot_location_'+lastActiveMapSpot+'].loadStyle('+mapSpotStyle_active+');';
    krpano.call(str);
}
//返回上级
function action_goBack(){
    if(currentMode==0){
        krpano.call("openurl('/main',_self);");
    }else if(currentMode==1){
        krpano.call("openurl('/learning/roleplay',_self);");
    }else{
        console.log('模式传参有误！');
    }

}
/**********************************/