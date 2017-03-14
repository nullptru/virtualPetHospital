import React, {Component, ProtoType} from 'react';
import {
    View, Grid, Form,
    Nav, NavItem, Button, FormGroup, FormControl,
    Navbar, Row, Col, Tab, Table
} from 'react-bootstrap';
import CaseCatalogTab from './tab/CaseCatalogTab';
import {Link} from 'react-router';
import CaseSearchTab from './tab/CaseSearchTab'

const caseJson = [
    {'caseId': 'c01', 'caseName': '传染病1'},
    {'caseId': 'c02', 'caseName': '传染病2'},
    {'caseId': 'c03', 'caseName': '传染病3'},
    {'caseId': 'c04', 'caseName': '传染病4'},
    {'caseId': 'c05', 'caseName': '传染病5'},
];

export default class CaseStudyNav extends Component {
    constructor() {
        super();
        this.handleSelect = this.handleSelect.bind(this);
        this.caseClass = ['传染病', '寄生虫病', '内科病例', '外产科病例', '常用手术', '免疫'];
        this.caseKey = ['contagion', 'parasitosis', 'internal', 'obstetrics', 'surgery', 'immune'];
        this.searchKeyword = "";
        this.state = {
            activeKey: this.caseKey[0],
            // caseTabContent: caseJson
        };
    }

    handleSelect(e) {
        this.setState({activeKey: e});
    }

    getCaseClassNav() {
        let caseClassDom = [], count = 0;
        this.caseKey.forEach((case_key) => {
            caseClassDom.push(<NavItem eventKey={case_key} key={case_key}>{this.caseClass[count++]}</NavItem>);
        });
        return caseClassDom;
    }

    getCaseClassContent() {
        let classContent = [];
        classContent.push(
            <Tab.Pane eventKey={this.caseKey[0]}>
                <CaseCatalogTab caseClassName={this.caseClass[0]} classId="0"/>
            </Tab.Pane>
        );
        classContent.push(
            <Tab.Pane eventKey={this.caseKey[1]}>
                <CaseCatalogTab caseClassName={this.caseClass[1]} classId="1"/>
            </Tab.Pane>
        );
        classContent.push(
            <Tab.Pane eventKey={this.caseKey[2]}>
                <CaseCatalogTab caseClassName={this.caseClass[2]} classId="2"/>
            </Tab.Pane>
        );
        classContent.push(
            <Tab.Pane eventKey={this.caseKey[3]}>
                <CaseCatalogTab caseClassName={this.caseClass[3]} classId="3"/>
            </Tab.Pane>
        );
        classContent.push(
            <Tab.Pane eventKey={this.caseKey[4]}>
                <CaseCatalogTab caseClassName={this.caseClass[4]} classId="4"/>
            </Tab.Pane>
        );
        classContent.push(
            <Tab.Pane eventKey={this.caseKey[5]}>
                <CaseCatalogTab caseClassName={this.caseClass[0]} classId="5"/>
            </Tab.Pane>
        );

        return classContent;
    }

    getPageHeader() {
        return (
            <Row>
                <Col md={3}>
                    <Link to='/learning'>{'<< '}返回上级</Link>
                </Col>
                <Col md={3} xsOffset={6}>
                    <Form inline>
                        <FormGroup controlId="caseSearch">
                            <FormControl type="text" placeholder="search" className="input"/>
                        </FormGroup>
                        {"  "}
                        <Button type="submit">search</Button>
                    </Form>
                </Col>
            </Row>);
    }

    render() {
        return (<Grid style={{margin: '50px'}}>
                {this.getPageHeader()}
                <Tab.Container defaultActiveKey={this.state.activeKey}>
                    <Row className="clearfix">
                        <Col sm={3} md={3} className="tab-nav">
                            <Nav bsStyle="pills" stacked activeKey={this.state.activeKey} onSelect={this.handleSelect}
                                 id="caseStudyMenu"
                                 ref={(container) => this.container = container}>
                                {this.getCaseClassNav()}
                            </Nav>
                        </Col>
                        <Col sm={9} md={9} className="tab-container">
                            <Tab.Content animation>
                                {this.getCaseClassContent()}
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Grid>
        );
    }

}