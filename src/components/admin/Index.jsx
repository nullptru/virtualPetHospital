import React, {Component, PropTypes} from 'react'
import {Grid, Row, Col, Tab, Nav, NavItem} from 'react-bootstrap/lib'
import '../../css/index.css'

import Case from './tab/CaseManagement'
import Medicine from './tab/MedicineManagement'
import Price from './tab/PriceManagement'
import Role from './tab/RoleManagement'
import Subject from './tab/SubjectManagement'
import User from './tab/UserManagement'

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
        this.state = {
            tables: defaultJson
        };
        this.selectedPane = null;

    }

    handleSelect(e){
        console.log(e, this.selectedPane);
        //this.container.props.activeKey = e;
    }

    render() {
        let sectionsDom = [], count = 0;
        this.sections.forEach((section)=>{
            sectionsDom.push(<NavItem eventKey={section} key={count++}>{section}</NavItem>);
        });
        let panelsDom = this.getPanels();


        const tabsInstance = (
            <Grid style={{margin:'50px'}}>
                <Tab.Container defaultActiveKey={this.sections[0]} onSelect={this.handleSelect} id="adminMenu" ref={(container)=>this.container = container}>
                <Row className="clearfix">
                    <Col sm={3} md={3} className="tab-nav">
                        <Nav bsStyle="pills" stacked>
                            {sectionsDom}
                        </Nav>
                    </Col>
                    <Col sm={9} md={9} className="tab-container">
                        <Tab.Content animation>
                            {panelsDom}
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
            </Grid>
        );

        return tabsInstance
    }

    getPanels(){
        let panelsDom = [];
        panelsDom.push(
            <Tab.Pane eventKey={this.sections[0]}>
                <User tables = {this.state.tables}/>
            </Tab.Pane>);

        panelsDom.push(
            <Tab.Pane eventKey={this.sections[1]}>
                <Subject tables = {this.state.tables}/>
            </Tab.Pane>);

        panelsDom.push(
            <Tab.Pane eventKey={this.sections[2]}>
                <Role tables = {this.state.tables}/>
            </Tab.Pane>);

        panelsDom.push(
            <Tab.Pane eventKey={this.sections[3]}>
                <Medicine tables = {this.state.tables}/>
            </Tab.Pane>);

        panelsDom.push(
            <Tab.Pane eventKey={this.sections[4]}>
                <Price tables = {this.state.tables}/>
            </Tab.Pane>);

        panelsDom.push(
            <Tab.Pane eventKey={this.sections[5]}>
                <Case tables = {this.state.tables}/>
            </Tab.Pane>);
        return panelsDom;
    }
}