import React, {Component} from 'react'
import {Image, Grid, Row, Col} from 'react-bootstrap/lib'
import {browserHistory ,IndexLink} from 'react-router';

import '../css/main.css'

export default class Main extends Component {
    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        if (sessionStorage.getItem('userType') === '-1'){
            browserHistory.push('/');
        }
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
                            <Image src="/assets/test.jpg" circle className="clicked" name="read"/>
                            <div className="img-label">3D导览</div>
                        </div>
                    </Col>
                    <Col md={col}>
                        <div className="div-center">
                            <Image src="/assets/test.jpg" circle className="clicked" name="main/learning"/>
                            <div className="img-label">职能学习</div>
                        </div>
                    </Col>
                    {userType === 1 ? <Col md={col}>
                            <div className="div-center">
                                <Image src="/assets/test.jpg" circle className="clicked" name="admin"/>
                                <div className="img-label">后台管理</div>
                            </div>
                        </Col> : ''}
                </Row>
            </Grid>
        );
        return imageShapeInstance;
    }
}