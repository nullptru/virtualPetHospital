import React, {Component} from 'react'
import {Form, FormControl, FormGroup, Button, Row, Col, Image, Grid} from 'react-bootstrap/lib'
import {browserHistory} from 'react-router';

import '../css/login.css'

export default class Login extends Component {
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    generateCaptcha(){
         // this.captcha1 = ccap().get();
         // fs.writeFile("/captcha.png", this.captcha1[1],"binary", ()=> {
         //    this.captchaImage.src = "/captcha.png";
         // });
    }

    componentDidMount(){
        //this.generateCaptcha();
    }

    handleSubmit(e){
        e.preventDefault();
        if (this.validate()){
            const path = '/main';
            browserHistory.push(path);
        }
    }

    validate(){
        return true;
    }

    render() {
        return <Grid className="flex-content login-background">
            <Row className="login white-opacity-50">
                <Col>
                    <Form>
                        <FormGroup controlId="user" bsSize="large">
                            <FormControl type="text" placeholder="用户名" defaultValue="" className="input" ref={(username)=>{this.username = username}}/>
                        </FormGroup>
                        <FormGroup controlId="pwd" bsSize="large">
                            <FormControl type="password" placeholder="密码" defaultValue="" className="input" ref={(pwd)=>{this.password = pwd}}/>
                        </FormGroup>
                            <FormGroup controlId="verification" bsSize="large">
                                <Row>
                                    <Col md={7}>
                                        <FormControl type="text" placeholder="验证码" defaultValue="" className="input" ref={(captcha)=>{this.captcha = captcha}}/>
                                    </Col>
                                    <Col md={5}>
                                        <Image/>
                                    </Col>
                                </Row>
                            </FormGroup>
                        <Button type="submit" bsStyle="danger" style={{width:"100%"}} onClick={this.handleSubmit}>登 陆</Button>
                    </Form>
                    <hr/>
                    <p hidden>Error Message</p>
                </Col>
            </Row>
        </Grid>
    }
}