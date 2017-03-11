import React, {Component} from 'react'
import {Form, FormControl, FormGroup, Button, Row, Col, Image, Grid} from 'react-bootstrap/lib'
import {browserHistory} from 'react-router';
import 'whatwg-fetch'

import '../css/login.css'

import '../mock/loginMock' //用于测试

export default class Login extends Component {
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            username : '',
            password : '',
            captcha : '',
            errorMsg : ''
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
        sessionStorage.setItem('isValidate', false);
    }

    handleSubmit(e){
        e.preventDefault();
        this.validate()
            .then((json)=> {
                if (json.isValidate){
                    sessionStorage.setItem('isValidate', true);
                    const path = '/main';
                    browserHistory.push(path);
                }else{//验证不通过显示错误
                    this.setState({errorMsg: json.errorMsg});
                }
            })
            .catch(function (ex) {
               console.log('validate failed',ex);
            });
    }

    validate(){
        let isValidatePromise;
        isValidatePromise = fetch('http://localhost:3001/login/validate',{
                method : 'post',
                body : JSON.stringify({
                    username : this.state.username,
                    password : this.state.password,
                    captcha : this.state.captcha
                })
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
                            <FormControl type="text" placeholder="用户名" className="input" value={this.state.username} onChange={(e)=>{this.setState({username : e.target.value})}}/>
                        </FormGroup>
                        <FormGroup controlId="pwd" bsSize="large">
                            <FormControl type="password" placeholder="密码" className="input" value={this.state.password} onChange={(e)=>{this.setState({password : e.target.value})}}/>
                        </FormGroup>
                            <FormGroup controlId="verification" bsSize="large">
                                <Row>
                                    <Col md={7}>
                                        <FormControl type="text" placeholder="验证码" className="input" value={this.state.captcha} onChange={(e)=>{this.setState({captcha : e.target.value})}}/>
                                    </Col>
                                    <Col md={5}>
                                        <Image/>
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