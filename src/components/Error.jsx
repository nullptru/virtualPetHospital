import React, {Component, PropTypes} from 'react'
import {} from 'react-bootstrap/lib'
import {browserHistory} from 'react-router'

import '../css/login.css'

export default class Error extends Component {
    constructor(){
        super();
        this.state = {
            leftTime : 3
        }
    }

    componentDidMount(){
        let stop = setInterval(()=>{
            if (this.state.leftTime === 0){
                clearInterval(stop);
                browserHistory.push('/');
            }else {
                this.setState({leftTime: this.state.leftTime - 1})
            }
        }, 1000);
    }

    render() {
        return <div className="validate-error" style={{textAlign: 'center', margin: '20'}}>用户尚未登陆,请登陆后使用,{this.state.leftTime}s后返回登陆界面</div>
    }
}