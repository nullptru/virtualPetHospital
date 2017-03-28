import React, {Component} from 'react'
import {Image, Grid, Row, Col} from 'react-bootstrap/lib'
import {browserHistory ,IndexLink} from 'react-router';

import '../css/main.css'
import logoutMixin from '../mixin/LogoutHandle'
import reactMixin from 'react-mixin'

export default class RolePlay extends Component {
    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        const path = e.target.name;
        browserHistory.push(path);
    }

    render() {
        let col = 4;
        const imageShapeInstance = (
            <div className="main-outer-box">
                <Grid className="main-inner-box">
                    <Row>
                        <Col md={10}><h1 style={{color:'#fff',textShadow:'0 0 5px #3f8dc9'}}>虚拟宠物医院学习系统 | 角色扮演</h1></Col>
                        <Col md={2}><IndexLink className="btn-menu-link" to='/learning'>返回上级 <span className="glyphicon glyphicon-triangle-top"></span></IndexLink></Col>
                    </Row>
                    <Row style={{textAlign:'center',marginTop:'140px'}}>
                        <h3 style={{color:'#fff',textShadow:'1px 1px 1px #666'}}>请选择您要扮演的角色</h3>
                    </Row>
                    <Row onClick={this.handleClick} className="main-container">
                        <Col md={col}>
                            <div className="div-center">
                                <Image src="/assets/icon_reception.jpg" circle className="clicked" name="/panoramic?mode=1&role=0"/>
                                <div className="img-label">前台</div>
                            </div>
                        </Col>
                        <Col md={col}>
                            <div className="div-center" style={{marginTop:'100px'}}>
                                <Image src="/assets/icon_doctor.jpg" circle className="clicked" name="/panoramic?mode=1&role=1"/>
                                <div className="img-label">兽医</div>
                            </div>
                        </Col>
                        <Col md={col}>
                            <div className="div-center">
                                <Image src="/assets/icon_assistant.jpg" circle className="clicked" name="/panoramic?mode=1&role=2"/>
                                <div className="img-label">助理</div>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
        return imageShapeInstance;
    }
}

reactMixin.onClass(RolePlay, logoutMixin);