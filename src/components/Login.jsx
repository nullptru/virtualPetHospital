import React, {Component} from 'react'
import {Form, FormControl, FormGroup, Button, Row, Col, Image} from 'react-bootstrap/lib'

import '../css/login.css'

export default class Login extends Component {

    generateCaptcha(){
         // this.captcha1 = ccap().get();
         // fs.writeFile("/captcha.png", this.captcha1[1],"binary", ()=> {
         //    this.captchaImage.src = "/captcha.png";
         // });
    }

    componentDidMount(){
        //this.generateCaptcha();
    }

    render() {
        return <div className="flex-content login-background">
            <Row className="login white-opacity-50">
                <Col>
                    <Form>
                        <FormGroup controlId="user" bsSize="large">
                            <FormControl type="text" placeholder="用户名" defaultValue="" className="input"/>
                        </FormGroup>
                        <FormGroup controlId="pwd" bsSize="large">
                            <FormControl type="password" placeholder="密码" defaultValue="" className="input"/>
                        </FormGroup>
                            <FormGroup controlId="verification" bsSize="large">
                                <Row>
                                    <Col md={7}>
                                        <FormControl type="text" placeholder="验证码" defaultValue="" className="input"/>
                                    </Col>
                                    <Col md={5}>
                                        <Image/>
                                    </Col>
                                </Row>
                            </FormGroup>
                        <Button type="submit" bsStyle="danger" style={{width:"100%"}}>登 陆</Button>
                    </Form>
                    <hr/>
                </Col>
            </Row>
        </div>
    }
}