import React, {Component} from 'react'
import {Image, Grid, Row, Col} from 'react-bootstrap/lib'
import {browserHistory ,IndexLink} from 'react-router';
import reactMixin from 'react-mixin'

import '../css/main.css'
import logoutMixin from '../mixin/LogoutHandle'

export default class Main extends Component {
    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        const path = e.target.name;
        browserHistory.push(path);
    }

    render() {
        let userType = Number.parseInt(sessionStorage.getItem('userType'), 10), col = 6;
        console.log(userType);
        if (userType === 1) col = 4;
        else  col = 6;
        const imageShapeInstance = (
            <div className="main-outer-box">
                <Grid className="main-inner-box">
                    <Row>
                        <Col md={10}><h1 style={{color:'#fff',textShadow:'0 0 5px #3f8dc9'}}>虚拟宠物医院学习系统 | 主界面</h1></Col>
                        <Col md={2}><IndexLink className="btn-menu-link" to='/'>返回上级 <span className="glyphicon glyphicon-triangle-top"></span></IndexLink></Col>
                    </Row>
                    <Row onClick={this.handleClick} className="main-container" style={{marginTop:'140px'}}>
                        <Col md={col}>
                            <div className="div-center">
                                <Image src="/assets/icon_panoramic.jpg" circle className="clicked" name="/panoramic?mode=0"/>
                                <div className="img-label">3D导览</div>
                            </div>
                        </Col>
                        <Col md={col}>
                            <div className="div-center">
                                <Image src="/assets/icon_learning.jpg" circle className="clicked" name="/learning"/>
                                <div className="img-label">职能学习</div>
                            </div>
                        </Col>
                        {userType === 1 ? <Col md={col}>
                            <div className="div-center">
                                <Image src="/assets/icon_manage.jpg" circle className="clicked" name="/admin"/>
                                <div className="img-label">后台管理</div>
                            </div>
                        </Col> : ''}
                    </Row>
                </Grid>
            </div>
        );
        return imageShapeInstance;
    }
}

reactMixin.onClass(Main, logoutMixin);