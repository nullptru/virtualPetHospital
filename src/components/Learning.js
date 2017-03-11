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
            <Grid style={{margin:'100px auto', width:'60%'}}>
                <Row>
                    <IndexLink to='/'>{'<< '}返回上级</IndexLink>
                </Row>
                <Row onClick={this.handleClick} className="main-container">
                    <Col md={col}>
                        <div className="div-center">
                            <Image src="/assets/test.jpg" circle className="clicked" name="read"/>
                            <div className="img-label">角色扮演</div>
                        </div>
                    </Col>
                    <Col md={col}>
                        <div className="div-center">
                            <Image src="/assets/test.jpg" circle className="clicked" name="learn"/>
                            <div className="img-label">病例学习</div>
                        </div>
                    </Col>
                </Row>
            </Grid>
        );
        return imageShapeInstance;
    }
}

reactMixin.onClass(Learning, logoutMixin);