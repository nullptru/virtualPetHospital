import React, {Component} from 'react'
import {Grid, Row, Col, Nav, NavItem} from 'react-bootstrap/lib'
import {Link, browserHistory} from 'react-router';
import '../../css/index.css'

import logoutMixin from '../../mixin/LogoutHandle'
import reactMixin from 'react-mixin'


const defaultJson = [{
        'id' : 1,
        'username' : "abc",
        'accessSections' : 'a,bc,d,sd',
        'isActive' : true
    },{
        'id' : 2,
        'username' : "abc",
        'accessSections' : 'a,bc,d,sd',
        'isActive' : true
    },
    {
        'id' : 3,
        'username' : "abc",
        'accessSections' : 'a,bc,d,sd',
        'isActive' : true
    }];

export default class Index extends Component {
    constructor(){
        super();
        this.handleSelect = this.handleSelect.bind(this);
        this.sections = ['用户管理','科室管理','角色管理','药品管理','收费管理','病例管理'];
        this.titles = ['user','subject','role','medicine','price','case'];
        this.state = {
            tables: defaultJson,
            activeKey : this.titles[0]
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
            <Grid style={{margin:'50px'}}>
                <Row>
                    <Col md={3}>
                        <Link to='/main'>{'<< '}返回上级</Link>
                    </Col>
                </Row>

                <Row>
                    <Col sm={3} md={3} className="tab-nav">
                        <Nav bsStyle="pills" stacked activeKey={this.state.activeKey} onSelect={this.handleSelect}>
                            {sectionDoms}
                        </Nav>
                    </Col>
                    <Col sm={9} md={9} className="tab-container">
                        {React.cloneElement(this.props.children, {tables : this.state.tables})}
                    </Col>
                </Row>
            </Grid>
        )
    }
}

reactMixin.onClass(Index, logoutMixin);