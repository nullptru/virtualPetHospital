import React, {Component} from 'react'
import {Image, Grid, Row, Col} from 'react-bootstrap/lib'
import {browserHistory ,IndexLink} from 'react-router';

import '../css/main.css'
import logoutMixin from '../mixin/LogoutHandle'
import reactMixin from 'react-mixin'

export default class Learning extends Component {
    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        const path = e.target.name;
        browserHistory.push(path);
    }

    render() {
        let col = 6;
        const imageShapeInstance = (
            <div className="main-outer-box">
                <Grid className="main-inner-box">
                    <Row>
                        <Col md={10}><h1 style={{color:'#fff',textShadow:'0 0 5px #3f8dc9'}}>虚拟宠物医院学习系统 | 职能学习</h1></Col>
                        <Col md={2}><IndexLink className="btn-menu-link" to='/main'>返回上级 <span className="glyphicon glyphicon-triangle-top"></span></IndexLink></Col>
                    </Row>
                    <Row onClick={this.handleClick} className="main-container" style={{marginTop:'140px'}}>
                        <Col md={col}>
                            <div className="div-center">
                                <Image src="/assets/icon_role.jpg" circle className="clicked" name="/learning/roleplay"/>
                                <div className="img-label">角色扮演</div>
                            </div>
                        </Col>
                        <Col md={col}>
                            <div className="div-center">
                                <Image src="/assets/icon_case.jpg" circle className="clicked" name="/learning/casenav"/>
                                <div className="img-label">病例学习</div>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
        return imageShapeInstance;
    }
}

reactMixin.onClass(Learning, logoutMixin);