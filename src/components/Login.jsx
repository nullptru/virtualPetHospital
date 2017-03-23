import React, {Component} from 'react'
import {Form, FormControl, FormGroup, Button, Row, Col, Image, Grid} from 'react-bootstrap/lib'
import {browserHistory} from 'react-router';
import fs from 'fs'
import 'whatwg-fetch'

import '../css/login.css'

import '../mock/serverMock' //用于测试

export default class Login extends Component {
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            userName : '',
            userPwd : '',
            captcha : '',
            errorMsg : '',
            captchaUrl: '',
            captchaText : ''
        }
    }
    generateCaptcha(){
         // this.captcha1 = ccap().get();
         // fs.writeFile("/captcha.png", this.captcha1[1],"binary", ()=> {
         //    this.captchaImage.src = "/captcha.png";
         // });
    }

    componentDidMount(){
        //this.generateCaptcha();
        sessionStorage.setItem('userType', -1);
        fetch('http://localhost:8080/captcha')
            .then((response)=>{
                return response.blob();
            }).then((blob)=>{
              this.setState({captchaUrl:URL.createObjectURL(blob)});
            })
            .catch(function(ex) {
            console.log('parsing failed', ex)
        });
    }

    handleSubmit(e){
        e.preventDefault();
        this.validate()
            .then((json)=> {
            console.log(json);
                if (json.isValidated){
                    sessionStorage.setItem('userType', json.userType);
                    const path = '/main';
                    browserHistory.push(path);
                }else{//验证不通过显示错误
                    this.setState({errorMsg: json.err});
                }
            })
            .catch(function (ex) {
               console.log('validate failed',ex);
            });
    }

    validate(){
        let isValidatePromise;
        document.cookie = "captcha=1234";
        isValidatePromise = fetch('http://localhost:8080/validate',{
            credentials: 'include',
            method : 'post',
            body : JSON.stringify({
                userName : this.state.userName,
                userPwd : this.state.userPwd,
                captcha : this.state.captcha
            }),
            headers: {
                "Content-type": "application/json"
            },
        })
            .then((response)=>{
                return response.json();
            }).then(function(json) {
                return json;
            }).catch(function(ex) {
                console.log('parsing failed', ex)
            });
        return isValidatePromise;
    }

    render() {
        return <Grid className="flex-content login-background">
            <Row className="login white-opacity-50">
                <Col>
                    <Form>
                        <FormGroup controlId="user" bsSize="large">
                            <FormControl type="text" placeholder="用户名" className="input" value={this.state.userName} onChange={(e)=>{this.setState({userName : e.target.value})}}/>
                        </FormGroup>
                        <FormGroup controlId="pwd" bsSize="large">
                            <FormControl type="userPwd" placeholder="密码" className="input" value={this.state.userPwd} onChange={(e)=>{this.setState({userPwd : e.target.value})}}/>
                        </FormGroup>
                            <FormGroup controlId="verification" bsSize="large">
                                <Row>
                                    <Col md={7}>
                                        <FormControl type="text" placeholder="验证码" className="input" value={this.state.captcha} onChange={(e)=>{this.setState({captcha : e.target.value})}}/>
                                    </Col>
                                    <Col md={5}>
                                        <Image src={this.state.captchaUrl} className="captcha"/>
                                    </Col>
                                </Row>
                            </FormGroup>
                        <Button type="submit" bsStyle="danger" style={{width:"100%"}} onClick={this.handleSubmit}>登 陆</Button>
                    </Form>
                    <hr/>
                    <p className="validate-error">{this.state.errorMsg}</p>
                </Col>
            </Row>
        </Grid>
    }
}