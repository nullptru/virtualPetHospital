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
            <Grid style={{margin:'100px auto', width:'60%'}}>
                <Row>
                    <IndexLink to='/'>{'<< '}返回上级</IndexLink>
                </Row>
                <Row onClick={this.handleClick} className="main-container">
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
        );
        return imageShapeInstance;
    }
}

reactMixin.onClass(Main, logoutMixin);