import React, {Component} from 'react'
import {Grid, Row, Col, Nav, NavItem} from 'react-bootstrap/lib'
import {Link, browserHistory} from 'react-router';
import '../../css/index.css'

import logoutMixin from '../../mixin/LogoutHandle'
import reactMixin from 'react-mixin'

export default class Index extends Component {
    constructor(props){
        super(props);
        let location = this.props.location.pathname, // /admin/user
         tmpArr = location.split('/');
        this.handleSelect = this.handleSelect.bind(this);
        this.sections = ['用户管理','药品管理','档案管理', '角色管理','科室管理','化验项目管理','病例管理','住院管理'];
        this.titles = ['user','medicine','record', 'role','subject','examination','case', 'hospitalRecord'];
        let activeKey = tmpArr[tmpArr.length - 1] || this.titles[0];
        this.state = {
            activeKey : activeKey
        };

    }

    handleSelect(e){
        this.setState({activeKey: e});
        browserHistory.push(`/admin/${e}`)
    }

    render() {
        let sectionDoms = [], count = 0;
        this.titles.forEach((title)=>{
            sectionDoms.push(<NavItem key={title} eventKey={title}>{this.sections[count++]}</NavItem>);
        });

        return (
            <div className="case-outer-box">
                <Grid style={{marginTop:'50px',marginBottom:'50px'}}>
                    <Row style={{marginBottom:'20px'}}>
                        <Col md={2}>
                            <Link className="btn-menu-link-case" to='/main'>返回上级 <span className="glyphicon glyphicon-triangle-top"></span></Link>
                        </Col>
                        <Col md={10}><h1 style={{color:'#fff',textShadow:'0 0 5px #3f8dc9'}}>虚拟宠物医院学习系统 | 数据管理</h1></Col>
                    </Row>

                    <Row>
                        <Col sm={2} md={2} className="tab-nav">
                            <Nav bsStyle="pills" stacked activeKey={this.state.activeKey} onSelect={this.handleSelect}>
                                {sectionDoms}
                            </Nav>
                        </Col>
                        <Col sm={10} md={10} className="tab-container tab-content">
                            {this.props.children}
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

reactMixin.onClass(Index, logoutMixin);